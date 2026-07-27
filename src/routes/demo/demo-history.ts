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
	ph: { base: 6.4, swing: 0.12, noise: 0.04, peakHour: 12, precision: 1, min: 5.6, max: 7.4 },
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
