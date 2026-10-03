/**
 * Synthetic telemetry for the /demo dashboard and device pages.
 *
 * The real app reads a device's history from the API. There is no API here, so
 * this fabricates one, modelled on what the real fleet looks like rather than
 * on textbook curves. The daily shapes come from hourly averages of live
 * CropWatch devices (2 weeks of cw_air_data, Japan time, 2026-10), aggregated
 * across many sites — no individual device or customer is reproduced:
 *
 * - barn (CO₂ sensor in a poultry house): 23 °C / 94 %RH overnight, warming to
 *   29 °C / 77 %RH at 13:00. CO₂ builds overnight to ~820 ppm at 06:00 and is
 *   ventilated down to ~580 ppm through the afternoon. A typical house has
 *   three of these along its length, and they disagree: the spread between
 *   sensors is ~±350 ppm at night (minimum ventilation, so the exhaust end goes
 *   stale) and ~±110 ppm at midday with the fans running. `barnPosition` puts a
 *   sensor along that gradient.
 * - outdoor: the temperature/humidity sensor a typical farm hangs outside the
 *   house as a reference — 19.7 °C / 99 %RH at dawn, 29.6 °C / 70 %RH at 13:00,
 *   a wider swing than inside.
 * - fridge: holds ~3.5 °C while the compressor cycles it ±0.4 °C, with short
 *   2-4 °C spikes when the door is opened during working hours.
 * - freezer: ~-19.5 °C at night, a little warmer by day, with a defrost cycle
 *   every 6 hours and door spikes in the daytime.
 * - cucumber: a cucumber greenhouse in October with the combined soil + air +
 *   light probe. Sun up 05:50-17:20, PPFD peaking ~900 µmol/m²/s around noon;
 *   house air 17 °C at night, vented to ~28 °C / 70 %RH early afternoon (VPD
 *   ~1.1 kPa, inside the cucumber band); CO₂ builds overnight, is enriched to
 *   ~750 ppm after sunrise and falls to ambient once the vents open; drip
 *   irrigation at 08:00, 11:00, 14:00 and 16:30 lifts soil moisture and EC.
 *   Its clock is frozen at 13:00 (DemoRow.clockHour) so the page always shows
 *   the house at its midday peak.
 *
 * Values come from a seeded hash of `(devEui, column, timestamp)`, so a given
 * point is stable across re-renders and range changes, and the dashboard card
 * for a device shows exactly the reading its device page has at that time.
 */

import type { DemoRow } from './demo-data';

export type RangeSelection = 'today' | 24 | 48 | 72;

export interface TimeRangeOption {
	label: string;
	value: RangeSelection;
}

export const DEFAULT_RANGE_SELECTION: RangeSelection = 'today';

export function getRangeOptions(): TimeRangeOption[] {
	return [
		{ label: '今日のみ', value: DEFAULT_RANGE_SELECTION },
		{ label: '過去 24 時間', value: 24 },
		{ label: '過去 48 時間', value: 48 },
		{ label: '過去 72 時間', value: 72 }
	];
}

const MS_PER_MIN = 60 * 1000;
const MS_PER_HOUR = 60 * MS_PER_MIN;

/** Fleet hourly averages for poultry-house CO₂ sensors, index = hour (JST). */
const BARN_TEMPERATURE = [
	23.7, 23.4, 23.2, 23.1, 22.9, 23.0, 23.0, 23.6, 24.8, 26.2, 27.4, 28.5, 29.1, 29.3, 29.2, 28.7,
	27.9, 27.0, 26.0, 25.3, 24.8, 24.4, 24.2, 23.9
];
const BARN_HUMIDITY = [
	94, 94, 94, 94, 94, 94, 94, 94, 92, 87, 83, 79, 77, 77, 79, 81, 84, 87, 90, 92, 94, 94, 94, 94
];
const BARN_CO2 = [
	723, 737, 749, 761, 775, 801, 819, 770, 684, 621, 599, 587, 579, 578, 581, 579, 590, 619, 641,
	663, 673, 689, 701, 711
];
/** Fleet hourly standard deviation of CO₂ between sensors in the same house (ppm). */
const BARN_CO2_SPREAD = [
	311, 335, 350, 356, 357, 362, 349, 284, 186, 120, 112, 107, 107, 110, 112, 113, 140, 183, 193,
	210, 232, 257, 274, 289
];
/** Fleet hourly averages for the outside-air sensor at poultry farms. */
const OUTDOOR_TEMPERATURE = [
	21.2, 20.9, 20.6, 20.3, 20.0, 19.8, 19.7, 20.5, 22.1, 24.5, 26.9, 28.4, 29.2, 29.6, 29.4, 28.6,
	27.3, 25.9, 24.5, 23.6, 22.9, 22.4, 22.0, 21.6
];
const OUTDOOR_HUMIDITY = [
	97, 98, 98, 98, 99, 99, 99, 98, 95, 87, 79, 74, 71, 70, 73, 76, 80, 85, 90, 93, 95, 96, 97, 97
];

/** Deterministic [-1, 1] from a string key — a tiny xorshift over an FNV-1a hash. */
function seededUnit(key: string): number {
	let hash = 0x811c9dc5;
	for (let i = 0; i < key.length; i++) {
		hash ^= key.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193);
	}
	hash ^= hash << 13;
	hash ^= hash >>> 17;
	hash ^= hash << 5;
	return ((hash >>> 0) / 0xffffffff) * 2 - 1;
}

/** Deterministic [0, 1). */
function seeded01(key: string): number {
	return (seededUnit(key) + 1) / 2;
}

/**
 * Local hour-of-day as a fraction (14.5 = 14:30). Local, not UTC: the hourly
 * tables are Japan time, and taking the hour modulo the epoch instead would
 * shift every curve by the viewer's UTC offset.
 */
function hourOf(t: number): number {
	const at = new Date(t);
	return at.getHours() + at.getMinutes() / 60;
}

/** Linear interpolation into a 24-entry hourly table. */
function hourly(table: number[], hour: number): number {
	const i = Math.floor(hour) % 24;
	const frac = hour - Math.floor(hour);
	return table[i] + (table[(i + 1) % 24] - table[i]) * frac;
}

/** cos curve peaking at `peakHour`, in [-1, 1]. */
function daily(hour: number, peakHour: number): number {
	return Math.cos(((hour - peakHour) / 24) * Math.PI * 2);
}

/** Slow multi-day wander so a 72h range doesn't look like three identical days. */
function wander(devEui: string, t: number): number {
	const phase = seeded01(`${devEui}:wander`) * Math.PI * 2;
	return Math.sin(t / (37 * MS_PER_HOUR) + phase);
}

/** Compressor cycle as a triangle wave in [-1, 1]. */
function compressor(devEui: string, t: number, periodMin: number): number {
	const offset = seeded01(`${devEui}:compressor`);
	const phase = (t / (periodMin * MS_PER_MIN) + offset) % 1;
	return 1 - 4 * Math.abs(phase - 0.5);
}

/**
 * Sum of short warming events (door openings) that decay exponentially.
 * Each 10-minute slot inside `[fromHour, toHour)` gets a seeded chance of one
 * event at a seeded moment inside the slot.
 */
function doorSpikes(
	devEui: string,
	t: number,
	opts: {
		fromHour: number;
		toHour: number;
		chance: number;
		min: number;
		max: number;
		tauMin: number;
	}
): number {
	const slot = 10 * MS_PER_MIN;
	const lookback = Math.ceil((opts.tauMin * 5) / 10);
	let sum = 0;
	for (let k = 0; k <= lookback; k++) {
		const start = Math.floor(t / slot) * slot - k * slot;
		const hour = hourOf(start);
		if (hour < opts.fromHour || hour >= opts.toHour) continue;
		if (seeded01(`${devEui}:door:${start}`) >= opts.chance) continue;
		const at = start + seeded01(`${devEui}:door-at:${start}`) * slot;
		if (t < at) continue;
		const amp = opts.min + (opts.max - opts.min) * seeded01(`${devEui}:door-amp:${start}`);
		sum += amp * Math.exp(-(t - at) / (opts.tauMin * MS_PER_MIN));
	}
	return sum;
}

/** Freezer defrost: ramps up for 15 min every 6 hours, then recovers. */
function defrost(devEui: string, t: number): number {
	const cycle = 6 * MS_PER_HOUR;
	const offset = (2 + seeded01(`${devEui}:defrost`)) * MS_PER_HOUR;
	const since = (((t - offset) % cycle) + cycle) % cycle;
	const sinceMin = since / MS_PER_MIN;
	const amp = 8.5;
	if (sinceMin <= 15) return (amp * sinceMin) / 15;
	return amp * Math.exp(-(sinceMin - 15) / 12);
}

/** October daylight for the cucumber house (local hours). */
const SUNRISE_HOUR = 5.8;
const SUNSET_HOUR = 17.3;

/** Solar arc: 0 at night, rising to 1 at solar noon. */
function sunArc(hour: number): number {
	if (hour <= SUNRISE_HOUR || hour >= SUNSET_HOUR) return 0;
	return Math.sin((Math.PI * (hour - SUNRISE_HOUR)) / (SUNSET_HOUR - SUNRISE_HOUR));
}

/** House warmth lags the sun by about an hour, so it peaks early afternoon. */
function houseWarmth(hour: number): number {
	return sunArc(hour - 1);
}

/** Drip-irrigation pulses (local hours) and how long their effect lasts. */
const IRRIGATION_HOURS = [8, 11, 14, 16.5];
const IRRIGATION_TAU_HOURS = 3;

/** Summed, decaying effect of the irrigation pulses so far (≈0-1.2). */
function irrigation(hour: number): number {
	return IRRIGATION_HOURS.reduce((sum, pulse) => {
		const since = (hour - pulse + 24) % 24;
		return sum + Math.exp(-since / IRRIGATION_TAU_HOURS);
	}, 0);
}

/** Local calendar-day key, so per-day cloud cover is stable for a whole day. */
function dayKey(t: number): string {
	const d = new Date(t);
	return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/** PPFD (µmol/m²/s) inside the house: the sun through the film, with cloud. */
function ppfdAt(devEui: string, t: number): number {
	const arc = sunArc(hourOf(t));
	if (arc === 0) return 0;
	const dayCloud = 1 + seededUnit(`${devEui}:cloud:${dayKey(t)}`) * 0.15;
	const hourCloud = 1 + seededUnit(`${devEui}:cloud:${Math.floor(t / MS_PER_HOUR)}`) * 0.08;
	const lit = 920 * arc * dayCloud * hourCloud + seededUnit(`${devEui}:ppfd:${t}`) * 15;
	return Math.round(clamp(lit, 0, 1600));
}

/** CO₂ in the cucumber house: overnight build-up, morning enrichment, vented midday. */
function cucumberCo2(hour: number, noise: number): number {
	if (hour >= 6.5 && hour < 9.5) return 760 + noise * 25;
	if (hour >= 9.5 && hour < 10.5) return 760 - 340 * (hour - 9.5) + noise * 15;
	if (hour >= 10.5 && hour < SUNSET_HOUR) return 412 + noise * 10;
	const sinceClose = (hour - SUNSET_HOUR + 24) % 24;
	return 420 + 140 * Math.min(1, sinceClose / 13.2) + noise * 15;
}

function round(value: number, precision: number): number {
	const factor = 10 ** precision;
	return Math.round(value * factor) / factor;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

/** One column's value for a device at time `t`, or null if it doesn't report it. */
function valueAt(device: DemoRow, column: string, t: number): number | null {
	const { profile, dev_eui: devEui } = device;
	const hour = hourOf(t);
	const n = (scale: number) => seededUnit(`${devEui}:${column}:${t}`) * scale;
	const w = wander(devEui, t);

	switch (profile) {
		case 'barn': {
			// -1 = inlet end (fresh air, cooler), +1 = exhaust end (stale, warmer).
			const pos = device.barnPosition ?? 0;
			// Sensors in one house share its weather and ventilation, so they wander
			// together; only their position along the house sets them apart.
			const w = wander(`barn:${device.location?.location_id ?? devEui}`, t);
			if (column === 'temperature_c')
				return round(hourly(BARN_TEMPERATURE, hour) + pos * 0.7 + w * 0.8 + n(0.25), 2);
			if (column === 'humidity')
				return round(clamp(hourly(BARN_HUMIDITY, hour) + pos * 1.5 - w * 2 + n(1.2), 40, 100), 1);
			if (column === 'co2')
				return round(
					clamp(
						hourly(BARN_CO2, hour) + pos * hourly(BARN_CO2_SPREAD, hour) + w * 45 + n(22),
						400,
						3000
					),
					0
				);
			return null;
		}

		case 'outdoor':
			if (column === 'temperature_c')
				return round(hourly(OUTDOOR_TEMPERATURE, hour) + w * 1.2 + n(0.2), 2);
			if (column === 'humidity')
				return round(clamp(hourly(OUTDOOR_HUMIDITY, hour) - w * 3 + n(1.5), 20, 100), 1);
			return null;

		case 'fridge': {
			const door = doorSpikes(devEui, t, {
				fromHour: 8,
				toHour: 21,
				chance: 0.12,
				min: 1.8,
				max: 4.2,
				tauMin: 9
			});
			const comp = compressor(devEui, t, 75);
			if (column === 'temperature_c') return round(3.5 + comp * 0.4 + door + w * 0.15 + n(0.06), 2);
			if (column === 'humidity')
				return round(clamp(85 - comp * 1.2 + door * 1.6 + n(0.6), 40, 100), 1);
			return null;
		}

		case 'freezer': {
			const door = doorSpikes(devEui, t, {
				fromHour: 8,
				toHour: 20,
				chance: 0.08,
				min: 2.5,
				max: 6,
				tauMin: 7
			});
			const thaw = defrost(devEui, t);
			const comp = compressor(devEui, t, 95);
			if (column === 'temperature_c')
				return round(
					-19.4 + daily(hour, 14) * 0.6 + comp * 0.7 + thaw + door + w * 0.3 + n(0.08),
					2
				);
			if (column === 'humidity')
				return round(clamp(80 + thaw * 0.7 + door * 0.8 + n(1.2), 40, 100), 1);
			return null;
		}

		case 'cucumber': {
			const warm = houseWarmth(hour);
			const irr = irrigation(hour);
			// Soil (root zone): lags the air, gentle swing.
			if (column === 'temperature_c')
				return round(19.2 + daily(hour, 15) * 2.3 + w * 0.4 + n(0.05), 2);
			if (column === 'moisture') return round(30 + irr * 6 + w * 0.6 + n(0.15), 1);
			if (column === 'ec') return round(0.86 + irr * 0.25 + n(0.01), 2);
			if (column === 'ph') return round(6.3 + w * 0.05 + n(0.02), 2);
			// House air and light.
			if (column === 'air_temperature_c') return round(16.8 + warm * 11 + w * 0.5 + n(0.2), 2);
			if (column === 'air_humidity') return round(clamp(89 - warm * 20 - w + n(1), 40, 98), 1);
			if (column === 'co2') return round(cucumberCo2(hour, seededUnit(`${devEui}:co2:${t}`)), 0);
			if (column === 'ppfd') return ppfdAt(devEui, t);
			return null;
		}
	}
}

/** Upload cadence in ms (every real device reports every 10 minutes). */
function stepMs(device: DemoRow): number {
	return (device.upload_interval ?? device.device_type.default_upload_interval ?? 10) * MS_PER_MIN;
}

/**
 * What the device's clock reads at real time `now`: `now` itself, or for a
 * device with a frozen `clockHour`, the most recent HH:00.
 */
export function deviceNow(device: DemoRow, now: number): number {
	if (device.clockHour == null) return now;
	const at = new Date(now);
	at.setHours(device.clockHour, 0, 0, 0);
	if (at.getTime() > now) at.setDate(at.getDate() - 1);
	return at.getTime();
}

/** Timestamp of the device's most recent upload at or before `now`. */
export function latestUploadAt(device: DemoRow, now: number): number {
	const step = stepMs(device);
	return Math.floor(deviceNow(device, now) / step) * step;
}

/** The device's full data row at `t` — the columns it reports and nothing else. */
export function readingAt(device: DemoRow, t: number): Record<string, number> {
	const row: Record<string, number> = {};
	for (const column of Object.keys(device.details)) {
		const value = valueAt(device, column, t);
		if (value !== null) row[column] = value;
	}
	return row;
}

export function getRangeBounds(
	selection: RangeSelection,
	now: number
): { start: number; end: number } {
	if (selection === 'today') {
		const startOfDay = new Date(now);
		startOfDay.setHours(0, 0, 0, 0);
		return { start: startOfDay.getTime(), end: now };
	}
	return { start: now - selection * MS_PER_HOUR, end: now };
}

/**
 * Build the device's history for a range, newest row first — the same ordering
 * the API returns, which the display components rely on.
 */
export function buildHistory(
	device: DemoRow,
	selection: RangeSelection,
	now: number
): Record<string, number | string>[] {
	const { start } = getRangeBounds(selection, deviceNow(device, now));
	const step = stepMs(device);

	const rows: Record<string, number | string>[] = [];
	for (let t = latestUploadAt(device, now); t >= start; t -= step) {
		rows.push({ created_at: new Date(t).toISOString(), ...readingAt(device, t) });
	}
	return rows;
}

/**
 * Daily Light Integral in mol/m²/day: PPFD is a rate (µmol/m²/s), so the day's
 * total is the series integrated over time.
 */
export function computeDli(ppfdValues: number[], sampleMinutes: number): number {
	const micromoles = ppfdValues.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0);
	return (micromoles * sampleMinutes * 60) / 1_000_000;
}

/**
 * DLI for the calendar day containing `dayMs`, integrated up to `until` so
 * today reports what has accumulated so far, not the finished day.
 */
function dliForDay(device: DemoRow, dayMs: number, until: number): number {
	const start = new Date(dayMs);
	start.setHours(0, 0, 0, 0);
	const step = stepMs(device);
	const end = Math.min(start.getTime() + 24 * MS_PER_HOUR, until);
	const values: number[] = [];
	for (let t = start.getTime(); t < end; t += step) values.push(ppfdAt(device.dev_eui, t));
	return computeDli(values, step / MS_PER_MIN);
}

/**
 * Daily DLI totals for the DLI card's history strip, oldest first, ending with
 * today (still accumulating, up to the device's clock).
 */
export function buildDliHistory(
	device: DemoRow,
	now: number,
	days = 7
): { date: string; value: number }[] {
	const until = deviceNow(device, now);
	const history: { date: string; value: number }[] = [];
	for (let i = days - 1; i >= 0; i--) {
		const day = new Date(until);
		day.setDate(day.getDate() - i);
		day.setHours(0, 0, 0, 0);
		const y = day.getFullYear();
		const m = String(day.getMonth() + 1).padStart(2, '0');
		const d = String(day.getDate()).padStart(2, '0');
		history.push({
			date: `${y}-${m}-${d}`,
			value: Math.round(dliForDay(device, day.getTime(), until) * 10) / 10
		});
	}
	return history;
}
