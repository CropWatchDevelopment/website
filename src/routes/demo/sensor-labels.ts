/**
 * Column -> label/unit/icon map for the /demo dashboard.
 *
 * Trimmed port of CropWatch/src/lib/sensor-labels/index.ts, covering only the
 * columns the three demo devices report. Labels are the Japanese strings from
 * the dashboard's messages/ja.json; `thermo` | `drop` | `co2` are named glyphs
 * in CWUI's CwDataIcon.
 */

export type SensorFormat = 'number' | 'integer' | 'boolean';

export interface SensorLabel {
	label: string;
	unit: string;
	icon?: 'thermo' | 'drop' | 'co2';
	format: SensorFormat;
}

const SENSOR_LABELS: Record<string, SensorLabel> = {
	temperature_c: { label: '温度', unit: '°C', icon: 'thermo', format: 'number' },
	humidity: { label: '湿度', unit: '%', icon: 'drop', format: 'number' },
	moisture: { label: '水分', unit: '%', icon: 'drop', format: 'number' },
	co2: { label: 'CO₂', unit: 'ppm', icon: 'co2', format: 'integer' },
	pressure: { label: '気圧', unit: 'hPa', format: 'number' },
	ec: { label: 'EC', unit: 'mS/cm', format: 'number' },
	ph: { label: 'pH', unit: '', format: 'number' },
	battery_level: { label: 'バッテリー', unit: 'V', format: 'number' }
};

/** Mirrors the dashboard: identifiers and bookkeeping columns never render. */
const HIDDEN_COLUMNS = new Set(['dev_eui', 'id', 'is_simulated', 'last_update', 'created_at']);

export function labelFor(column: string): SensorLabel {
	return SENSOR_LABELS[column] ?? { label: column, unit: '', format: 'number' };
}

export function isDisplayableColumn(column: string): boolean {
	return !HIDDEN_COLUMNS.has(column);
}

/**
 * Format a reading the way the dashboard does: `integer` columns lose their
 * decimals, everything else keeps two places.
 */
export function formatMeasurement(column: string, value: number): string {
	const { format } = labelFor(column);
	return value.toLocaleString('ja-JP', {
		minimumFractionDigits: format === 'integer' ? 0 : 2,
		maximumFractionDigits: format === 'integer' ? 0 : 2
	});
}
