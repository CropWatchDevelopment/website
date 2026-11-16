/**
 * Port of CropWatch/src/lib/components/displays/SoilDisplay/soil-crop-targets.ts.
 *
 * The app formats readings through the user's unit preferences; the demo is
 * metric and Japanese-only, so `formatReading` stands in for
 * formatSensorMeasurement. Strings are the app's messages/ja.json values,
 * with 〜 for ranges (this site's copy avoids en dashes). No pH row: the
 * boards CropWatch ships do not measure it.
 */

import { CW_EMPTY_VALUE, type CwTone } from '@cropwatchdevelopment/cwui';
import {
	cropTarget,
	judgeReading,
	type CropTargetDto,
	type CropTypeDetailDto,
	type DayPeriod,
	type TargetStatus
} from '../../agronomy/crop-targets';
import { labelFor } from '../../sensor-labels';
import type { SoilField } from '../../soil-readings';

const numberFormats = new Map<number, Intl.NumberFormat>();

/** A number in Japanese formatting with at most `digits` decimals. */
export function formatNumber(value: number, digits: number): string {
	let format = numberFormats.get(digits);
	if (!format) {
		format = new Intl.NumberFormat('ja-JP', { maximumFractionDigits: digits });
		numberFormats.set(digits, format);
	}
	return format.format(value);
}

/** "21.3 °C", or "—" without a value. */
export function formatReading(field: string, value: number | null, digits: number): string {
	if (value === null) return CW_EMPTY_VALUE;
	const { unit } = labelFor(field);
	const text = formatNumber(value, digits);
	return unit ? `${text} ${unit}` : text;
}

/** The lab soil test note: "0.4〜0.5 mS/cm（土壌診断・1:5抽出）". */
export function labReference(band: string): string {
	return `${band}（土壌診断・1:5抽出）`;
}

/** One line of the crop targets card: the reading now, its target and where it sits. */
export interface CropTargetRow {
	key: string;
	label: string;
	/** The reading with its unit. */
	now: string;
	/** The optimal band with its unit ("—" when the crop has none). */
	target: string;
	status: TargetStatus | null;
	/** A daytime-only target (CO₂, VPD) at night: shown for reference, not judged. */
	daytimeOnly: boolean;
}

/** A target with at least one bound. */
export function hasBounds(target: CropTargetDto | null): target is CropTargetDto {
	return (
		target !== null &&
		[target.min_value, target.optimal_min, target.optimal_max, target.max_value].some(
			(bound) => bound !== null
		)
	);
}

interface RowSpec {
	key: string;
	metric: string;
	/** The reading's field; VPD is derived instead. */
	field?: SoilField;
	label: string;
	digits: number;
	daytimeOnly?: boolean;
	/**
	 * Used, and labelled as such, when the crop has no target for the sensor's own
	 * metric: soil EC falls back to the lab soil test (1:5 extract) band.
	 */
	referenceMetric?: string;
}

const ROWS: RowSpec[] = [
	{ key: 'moisture', metric: 'soil_moisture', field: 'moisture', label: '土壌水分', digits: 1 },
	{
		key: 'temperature_c',
		metric: 'soil_temperature',
		field: 'temperature_c',
		label: '土壌温度',
		digits: 1
	},
	{
		key: 'ec',
		metric: 'soil_ec',
		field: 'ec',
		label: 'EC',
		digits: 2,
		referenceMetric: 'soil_ec_1to5'
	},
	{
		key: 'air_temperature_c',
		metric: 'air_temperature',
		field: 'air_temperature_c',
		label: '気温',
		digits: 1
	},
	{
		key: 'air_humidity',
		metric: 'air_humidity',
		field: 'air_humidity',
		label: '空気湿度',
		digits: 0
	},
	{ key: 'vpd', metric: 'vpd', label: 'VPD', digits: 2, daytimeOnly: true },
	{ key: 'co2', metric: 'co2', field: 'co2', label: 'CO₂', digits: 0, daytimeOnly: true }
];

/**
 * "19.3〜24.2 %", "≥ 20 %", "≤ 900 ppm", or "—" without a band. A target with
 * only stress limits (e.g. night humidity ≤ 93 %) shows those limits.
 */
export function formatBand(
	target: CropTargetDto | null,
	format: (value: number) => string,
	unit: string
): string {
	const hasBand = target?.optimal_min != null || target?.optimal_max != null;
	const low = (hasBand ? target?.optimal_min : target?.min_value) ?? null;
	const high = (hasBand ? target?.optimal_max : target?.max_value) ?? null;
	const withUnit = (text: string) => (unit ? `${text} ${unit}` : text);
	if (low !== null && high !== null) return withUnit(`${format(low)}〜${format(high)}`);
	if (low !== null) return withUnit(`≥ ${format(low)}`);
	if (high !== null) return withUnit(`≤ ${format(high)}`);
	return CW_EMPTY_VALUE;
}

/** The crop targets card's rows for the readings this board reports. */
export function buildCropTargetRows(input: {
	crop: CropTypeDetailDto;
	period: DayPeriod;
	readings: Partial<Record<SoilField, number | null>>;
	vpd: number | null;
}): CropTargetRow[] {
	const { crop, period, readings, vpd } = input;
	const rows: CropTargetRow[] = [];

	for (const spec of ROWS) {
		const value = spec.field ? (readings[spec.field] ?? null) : vpd;
		if (value === null) continue; // the board does not measure it

		const ownTarget = cropTarget(
			crop,
			spec.metric,
			period === 'night' && spec.daytimeOnly ? 'day' : period
		);
		// Without a target the sensor can be compared with, show the reference one.
		const reference =
			!hasBounds(ownTarget) && spec.referenceMetric
				? cropTarget(crop, spec.referenceMetric, period)
				: null;
		const isReference = hasBounds(reference);
		const target = isReference ? reference : ownTarget;
		const daytimeOnly = period === 'night' && spec.daytimeOnly === true;
		const format = (bound: number) => formatNumber(bound, spec.digits);
		const band = formatBand(target, format, spec.field ? labelFor(spec.field).unit : 'kPa');

		rows.push({
			key: spec.key,
			label: spec.label,
			now: spec.field
				? formatReading(spec.field, value, spec.digits)
				: `${formatNumber(value, spec.digits)} kPa`,
			target: isReference ? labReference(band) : band,
			status: daytimeOnly ? null : judgeReading(value, target),
			daytimeOnly
		});
	}
	return rows;
}

/** The status chip's text. */
export function targetStatusLabel(status: TargetStatus): string {
	switch (status) {
		case 'very_low':
			return 'かなり低い';
		case 'low':
			return '低い';
		case 'slightly_low':
			return 'やや低い';
		case 'optimal':
			return '適正';
		case 'slightly_high':
			return 'やや高い';
		case 'high':
			return '高い';
		case 'very_high':
			return 'かなり高い';
	}
}

/** The status chip's tone: green in band, calm blue a little off, amber off, red far off. */
export function targetStatusTone(status: TargetStatus): CwTone {
	switch (status) {
		case 'optimal':
			return 'success';
		case 'slightly_low':
		case 'slightly_high':
			return 'info';
		case 'low':
		case 'high':
			return 'warning';
		case 'very_low':
		case 'very_high':
			return 'danger';
	}
}
