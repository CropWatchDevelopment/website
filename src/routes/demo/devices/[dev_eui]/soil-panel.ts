/**
 * Port of CropWatch/src/lib/components/displays/SoilDisplay/soil-panel.ts:
 * the readings of the soil board's above / below ground panel. Metric units
 * and Japanese labels; no pH reading (the boards CropWatch ships do not
 * measure it).
 */

import type {
	CwAboveBelowLight,
	CwAboveBelowMetric,
	CwAboveBelowTarget
} from '@cropwatchdevelopment/cwui';
import {
	cropTarget,
	type CropTargetDto,
	type CropTypeDetailDto,
	type DayPeriod
} from '../../agronomy/crop-targets';
import { labelFor } from '../../sensor-labels';
import { fieldSeries, type LatestReading, type SoilField, type SoilRow } from '../../soil-readings';
import { formatBand, formatNumber, hasBounds, labReference } from './soil-crop-targets';

/** One reading of the panel. */
interface PanelReading {
	field: SoilField;
	/** CWUI metric key: picks the reading's colour and icon. */
	key: string;
	/** The crop target metric it is judged against. */
	metric: string;
	label: string;
	decimals: number;
	/** A daytime target (CO₂): at night the reading is shown without one. */
	daytimeOnly?: boolean;
	/**
	 * A lab-test target shown as a note, never judged, when the crop has no
	 * target the sensor can be compared with (soil EC → the 1:5 extract).
	 */
	referenceMetric?: string;
}

const AIR: PanelReading[] = [
	{
		field: 'air_temperature_c',
		key: 'air_temperature',
		metric: 'air_temperature',
		label: '気温',
		decimals: 1
	},
	{
		field: 'air_humidity',
		key: 'air_humidity',
		metric: 'air_humidity',
		label: '空気湿度',
		decimals: 0
	},
	{ field: 'co2', key: 'co2', metric: 'co2', label: 'CO₂', decimals: 0, daytimeOnly: true }
];

const GROUND: PanelReading[] = [
	{
		field: 'temperature_c',
		key: 'soil_temperature',
		metric: 'soil_temperature',
		label: '土壌温度',
		decimals: 1
	},
	{
		field: 'moisture',
		key: 'soil_moisture',
		metric: 'soil_moisture',
		label: '土壌水分',
		decimals: 1
	},
	{
		field: 'ec',
		key: 'soil_ec',
		metric: 'soil_ec',
		label: 'EC',
		decimals: 2,
		referenceMetric: 'soil_ec_1to5'
	}
];

export interface SoilPanelInput {
	/** The range's readings, oldest first. */
	rows: SoilRow[];
	/** Newest value of each field. */
	latest: Partial<Record<SoilField, LatestReading | null>>;
	crop: CropTypeDetailDto | null;
	period: DayPeriod;
}

function toDisplayTarget(target: CropTargetDto): CwAboveBelowTarget {
	return {
		min: target.min_value,
		optimalMin: target.optimal_min,
		optimalMax: target.optimal_max,
		max: target.max_value
	};
}

function toMetric(reading: PanelReading, input: SoilPanelInput): CwAboveBelowMetric {
	const { rows, latest, crop, period } = input;
	const unit = labelFor(reading.field).unit;
	const current = latest[reading.field]?.value;
	const metric: CwAboveBelowMetric = {
		key: reading.key,
		label: reading.label,
		unit,
		decimals: reading.decimals,
		data: fieldSeries(rows, reading.field),
		current: current === undefined ? null : current
	};
	if (!crop) return metric;

	if (reading.daytimeOnly && period === 'night') {
		return { ...metric, note: '日中のみ' };
	}
	const own = cropTarget(crop, reading.metric, period);
	if (hasBounds(own)) return { ...metric, target: toDisplayTarget(own) };

	const reference = reading.referenceMetric
		? cropTarget(crop, reading.referenceMetric, period)
		: null;
	if (!hasBounds(reference)) return metric;
	const band = formatBand(reference, (bound) => formatNumber(bound, reading.decimals), unit);
	return { ...metric, note: labReference(band) };
}

/**
 * The air and ground readings for the panel, with the crop's targets for this
 * time of day. Readings the board does not report are left out by the panel.
 */
export function buildSoilPanel(input: SoilPanelInput): {
	air: CwAboveBelowMetric[];
	ground: CwAboveBelowMetric[];
} {
	return {
		air: AIR.map((reading) => toMetric(reading, input)),
		ground: GROUND.map((reading) => toMetric(reading, input))
	};
}

/** The panel's light strip; null for boards without a light sensor. */
export function buildSoilLight(input: {
	rows: SoilRow[];
	latest: Partial<Record<SoilField, LatestReading | null>>;
	/** DLI so far today (mol/m²). */
	dli: number | null;
	/** The crop's daily light goal. */
	dliTarget: CropTargetDto | null;
}): CwAboveBelowLight | null {
	const now = input.latest.ppfd;
	if (!now) return null;
	return {
		data: fieldSeries(input.rows, 'ppfd'),
		current: now.value,
		dli: input.dli,
		dliTarget: input.dliTarget
			? { min: input.dliTarget.optimal_min, max: input.dliTarget.optimal_max }
			: null
	};
}

const clockFormat = new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit' });
const dayClockFormat = new Intl.DateTimeFormat('ja-JP', {
	month: 'short',
	day: 'numeric',
	hour: '2-digit',
	minute: '2-digit'
});

/** "84 件 · 最新 13:00" (the date too when the newest reading is not from today). */
export function soilPanelSubtitle(rows: SoilRow[], now: Date): string | undefined {
	let newest: number | null = null;
	for (const row of rows) {
		const time = Date.parse(row.created_at);
		if (Number.isFinite(time) && (newest === null || time > newest)) newest = time;
	}
	if (newest === null) return undefined;
	const sameDay = new Date(newest).toDateString() === now.toDateString();
	const time = (sameDay ? clockFormat : dayClockFormat).format(newest);
	return `${rows.length} 件 · 最新 ${time}`;
}
