/**
 * Synthetic telemetry for the demo device detail page.
 *
 * The real page fetches a device's history from the API for a selected range.
 * There is no API here, so this fabricates a plausible series instead: a daily
 * sine curve (warm afternoons, cool nights) plus deterministic pseudo-noise, so
 * the chart, heatmap, stat cards and table all have something real-shaped to
 * render. Nothing in here is a measurement of anything.
 *
 * Values are generated from a seeded hash of `(devEui, column, timestamp)`, so a
 * given point is stable across re-renders and range changes — switching from
 * 24h to 72h extends the series rather than redrawing a different history.
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

/** Per-column shape of the generated curve. */
interface ColumnProfile {
	/** Mean value. */
	base: number;
	/** Peak-to-mean amplitude of the daily cycle. */
	swing: number;
	/** Amplitude of the per-sample noise. */
	noise: number;
	/** Hour of day (0-23) at which the daily cycle peaks. */
	peakHour: number;
	/** Decimal places. */
	precision: number;
	min: number;
	max: number;
	/**
	 * Follow the sun instead of a cosine: zero before sunrise and after sunset,
	 * arcing to `swing` at solar noon. Light does not have a "mean" the way
	 * temperature does, so `base` is ignored for these columns.
	 */
	daylightOnly?: boolean;
}

const PROFILES: Record<string, ColumnProfile> = {
	// Greenhouse air warms through the afternoon and cools overnight.
	temperature_c: {
		base: 23.5,
		swing: 4.2,
		noise: 0.35,
		peakHour: 14,
		precision: 2,
		min: 14,
		max: 33
	},
	// Humidity runs inverse to temperature.
	humidity: { base: 63, swing: -9, noise: 1.2, peakHour: 14, precision: 1, min: 38, max: 88 },
	// CO2 is drawn down by photosynthesis in daylight and builds up at night.
	co2: { base: 640, swing: -150, noise: 18, peakHour: 14, precision: 0, min: 410, max: 1050 },
	pressure: {
		base: 1012,
		swing: 1.6,
		noise: 0.3,
		peakHour: 10,
		precision: 1,
		min: 1002,
		max: 1024
	},
	// Soil lags the air: shallower swing, later peak.
	moisture: { base: 34, swing: -3.4, noise: 0.5, peakHour: 16, precision: 1, min: 20, max: 50 },
	ec: { base: 1.24, swing: 0.14, noise: 0.03, peakHour: 16, precision: 2, min: 0.7, max: 2.2 },
	// ── Combined-sensor air columns ──────────────────────────────────────────
	// The soil probe's forthcoming sibling reports greenhouse air alongside the
	// ground readings. Kept under `air_*` keys so the device page's CHART_COLUMNS
	// does not pull them into the soil time series.
	air_temperature: {
		base: 23.5,
		swing: 4.2,
		noise: 0.35,
		peakHour: 14,
		precision: 2,
		min: 14,
		max: 33
	},
	air_humidity: { base: 63, swing: -9, noise: 1.2, peakHour: 14, precision: 1, min: 38, max: 88 },
	air_co2: { base: 640, swing: -150, noise: 18, peakHour: 14, precision: 0, min: 410, max: 1050 },
	// PPFD is zero at night, so it arcs with the sun rather than cycling.
	// `swing` is the solar-noon peak: a diffused greenhouse under shade screen,
	// not open field. It sets the DLI too — the day's integral works out near
	// 21 mol/m²/day, which is where a leafy crop should sit.
	ppfd: {
		base: 0,
		swing: 700,
		noise: 18,
		peakHour: 12,
		precision: 0,
		min: 0,
		max: 1000,
		daylightOnly: true
	},
	// Battery drifts down slowly; no daily cycle worth speaking of.
	battery_level: {
		base: 3.6,
		swing: 0.015,
		noise: 0.006,
		peakHour: 12,
		precision: 2,
		min: 3.4,
		max: 3.66
	}
};

/**
 * Soil is not air. A probe in the ground sits cooler than the greenhouse, swings
 * a fraction as much over the day, and lags the sun by hours — so cw_soil_data
 * overrides the shared temperature curve rather than reusing the air one.
 */
const SOIL_PROFILES: Record<string, ColumnProfile> = {
	temperature_c: {
		base: 18.6,
		swing: 1.3,
		noise: 0.12,
		peakHour: 18,
		precision: 2,
		min: 11,
		max: 26
	}
};

function profileFor(dataTable: string, column: string): ColumnProfile | undefined {
	if (dataTable === 'cw_soil_data' && SOIL_PROFILES[column]) return SOIL_PROFILES[column];
	return PROFILES[column];
}

const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * MS_PER_HOUR;

/** Daylight window used by `daylightOnly` columns. */
const SUNRISE_HOUR = 5.5;
const SUNSET_HOUR = 18.5;
const SOLAR_NOON_HOUR = (SUNRISE_HOUR + SUNSET_HOUR) / 2;

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

function valueAt(
	devEui: string,
	dataTable: string,
	column: string,
	timestampMs: number
): number | null {
	const profile = profileFor(dataTable, column);
	if (!profile) return null;

	// Local hour-of-day, not UTC: `peakHour` means "2pm as the viewer sees it".
	// Taking it modulo the epoch instead shifts the whole daily cycle by the
	// viewer's UTC offset — 9 hours in Japan, which put the afternoon peak at
	// 11pm and made the greenhouse look like it warmed up overnight.
	const at = new Date(timestampMs);
	const hourOfDay = at.getHours() + at.getMinutes() / 60;

	if (profile.daylightOnly) {
		if (hourOfDay <= SUNRISE_HOUR || hourOfDay >= SUNSET_HOUR) return 0;
		const arc = Math.sin((Math.PI * (hourOfDay - SUNRISE_HOUR)) / (SUNSET_HOUR - SUNRISE_HOUR));
		// Two scales of cloud: a per-day character (so the DLI history strip has
		// bright and overcast days rather than seven identical bars) and an
		// hourly variation on top of it, which holds for the hour instead of
		// flickering sample to sample.
		const dayKey = Math.floor(timestampMs / MS_PER_DAY);
		const hourKey = Math.floor(timestampMs / MS_PER_HOUR);
		const dayCloud = 1 + seededUnit(`${devEui}:${column}:day:${dayKey}`) * 0.3;
		const hourCloud = 1 + seededUnit(`${devEui}:${column}:cloud:${hourKey}`) * 0.15;
		const lit =
			profile.swing * arc * dayCloud * hourCloud +
			seededUnit(`${devEui}:${column}:${timestampMs}`) * profile.noise;
		const bounded = Math.min(profile.max, Math.max(profile.min, lit));
		const scale = 10 ** profile.precision;
		return Math.round(bounded * scale) / scale;
	}

	const phase = ((hourOfDay - profile.peakHour) / 24) * Math.PI * 2;
	const daily = Math.cos(phase) * profile.swing;
	// Slow multi-day wander so a 72h range doesn't look like three identical days.
	const drift = Math.sin(timestampMs / (37 * MS_PER_HOUR)) * profile.swing * 0.25;
	const noise = seededUnit(`${devEui}:${column}:${timestampMs}`) * profile.noise;

	const raw = profile.base + daily + drift + noise;
	const clamped = Math.min(profile.max, Math.max(profile.min, raw));
	const factor = 10 ** profile.precision;
	return Math.round(clamped * factor) / factor;
}

/** Sampling interval for a range, chosen to keep the row count sane. */
function stepMinutes(device: DemoRow): number {
	return device.upload_interval ?? device.device_type.default_upload_interval ?? 10;
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
	const { start, end } = getRangeBounds(selection, now);
	const stepMs = stepMinutes(device) * 60 * 1000;
	const columns = Object.keys(device.details);
	const dataTable = device.device_type.data_table_v2;

	const rows: Record<string, number | string>[] = [];
	// Snap to the step grid so timestamps stay stable as `now` advances.
	for (let t = Math.floor(end / stepMs) * stepMs; t >= start; t -= stepMs) {
		const row: Record<string, number | string> = { created_at: new Date(t).toISOString() };
		for (const column of columns) {
			const value = valueAt(device.dev_eui, dataTable, column, t);
			if (value !== null) row[column] = value;
		}
		rows.push(row);
	}
	return rows;
}

/**
 * Daily Light Integral in mol/m²/day.
 *
 * PPFD is a rate (µmol/m²/s), so the day's total is the series integrated over
 * time: sum(ppfd) * seconds-per-sample / 1e6 to get from µmol to mol.
 */
export function computeDli(ppfdValues: number[], sampleMinutes: number): number {
	const secondsPerSample = sampleMinutes * 60;
	const micromoles = ppfdValues.reduce((sum, v) => sum + (Number.isFinite(v) ? v : 0), 0);
	return (micromoles * secondsPerSample) / 1_000_000;
}

/**
 * DLI for the calendar day containing `dayMs`.
 *
 * Integration stops at `until` so today reports what has actually accumulated so
 * far rather than the whole day's total — otherwise "本日の DLI" would report a
 * finished day at nine in the morning.
 */
function dliForDay(device: DemoRow, dayMs: number, until: number): number {
	const start = new Date(dayMs);
	start.setHours(0, 0, 0, 0);
	const step = stepMinutes(device);
	const stepMs = step * 60 * 1000;
	const dataTable = device.device_type.data_table_v2;
	const end = Math.min(start.getTime() + MS_PER_DAY, until);

	const values: number[] = [];
	for (let t = start.getTime(); t < end; t += stepMs) {
		values.push(valueAt(device.dev_eui, dataTable, 'ppfd', t) ?? 0);
	}
	return computeDli(values, step);
}

/**
 * The PPFD reading at solar noon on the day containing `at`, with the timestamp
 * it was taken from.
 *
 * The generated series is physically honest — zero from sunset to sunrise —
 * which leaves the PPFD gauge pinned at 0 in a "too low" state for anyone
 * opening the demo in the evening. The gauge is anchored to solar noon instead
 * so it always reads a daylight value, and reports that time as its "updated"
 * stamp rather than claiming the midday figure is current.
 *
 * Only the gauge uses this. DLI still integrates the real curve — feeding it a
 * flat midday value would put the day's total near 76 mol/m²/day, which no
 * greenhouse on earth reaches.
 */
export function solarNoonPpfd(device: DemoRow, at: number): { value: number; at: string } {
	const noon = new Date(at);
	noon.setHours(Math.floor(SOLAR_NOON_HOUR), Math.round((SOLAR_NOON_HOUR % 1) * 60), 0, 0);
	const value =
		valueAt(device.dev_eui, device.device_type.data_table_v2, 'ppfd', noon.getTime()) ?? 0;
	return { value, at: noon.toISOString() };
}

/**
 * Daily DLI totals for the DLI card's history strip, oldest first. The final
 * entry is today, which is still accumulating — the card shows it alongside the
 * completed days the same way the app does.
 */
export function buildDliHistory(
	device: DemoRow,
	now: number,
	days = 7
): { date: string; value: number }[] {
	const history: { date: string; value: number }[] = [];
	for (let i = days - 1; i >= 0; i--) {
		const dayMs = now - i * MS_PER_DAY;
		const date = new Date(dayMs);
		date.setHours(0, 0, 0, 0);
		history.push({
			date: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
			value: Math.round(dliForDay(device, dayMs, now) * 10) / 10
		});
	}
	return history;
}
