/**
 * Column -> label/unit/icon map for the /demo dashboard.
 *
 * Trimmed port of CropWatch/src/lib/sensor-labels/index.ts, covering the
 * columns the demo devices report plus the derived dew point. Labels are the Japanese strings from
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
	dew_point: { label: '露点', unit: '°C', icon: 'thermo', format: 'number' },
	ec: { label: 'EC', unit: 'mS/cm', format: 'number' },
	ph: { label: 'pH', unit: '', format: 'number' },
	// Air and light channels of the combined soil probe (cucumber house).
	air_temperature_c: { label: '気温', unit: '°C', icon: 'thermo', format: 'number' },
	air_humidity: { label: '湿度', unit: '%', icon: 'drop', format: 'number' },
	ppfd: { label: 'PPFD', unit: 'µmol/m²/s', format: 'integer' }
};

/**
 * Mirrors the app (sensor-labels HIDDEN_COLUMNS): identifiers, bookkeeping
 * columns and battery never render — the app shows no battery anywhere.
 */
const HIDDEN_COLUMNS = new Set([
	'dev_eui',
	'id',
	'is_simulated',
	'last_update',
	'line_number',
	'created_at',
	'battery',
	'battery_level'
]);

/**
 * Per-data-table label overrides.
 *
 * The same column means different things depending on the device: on a soil
 * probe `temperature_c` is ground temperature, on an air sensor it is the air,
 * so the soil labels name the medium they measure.
 */
const TABLE_LABEL_OVERRIDES: Record<string, Record<string, string>> = {
	cw_soil_data: {
		temperature_c: '土壌温度',
		moisture: '土壌水分',
		ec: '土壌EC'
	}
};

export function labelFor(column: string, dataTable?: string): SensorLabel {
	const base: SensorLabel = SENSOR_LABELS[column] ?? {
		label: column,
		unit: '',
		format: 'number'
	};
	const override = dataTable ? TABLE_LABEL_OVERRIDES[dataTable]?.[column] : undefined;
	return override ? { ...base, label: override } : base;
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
