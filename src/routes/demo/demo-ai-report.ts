/**
 * The cucumber house's daily growing report (栽培アドバイス), in the shape the
 * app gets from GET /devices/{dev_eui}/ai-recommendations.
 *
 * In the app the cw-ai-services worker writes one report per sensor per day:
 * a rules engine turns the previous day's readings and the crop's targets into
 * findings, and a local model only phrases them. There is no worker here, so
 * this is a daily-only port of that rules engine (cw-ai-services/src/cw_ai:
 * services/windows, aggregation, assessment and narrative, models/metrics),
 * run over the demo's own generated readings for the day before the device's
 * clock. The report therefore always agrees with the chart, the targets and
 * the DLI history on the same page, and changes a little from day to day.
 *
 * Left out, because the demo cannot produce them: sensor-fault findings and
 * coverage gaps (the generated history has neither), weekly reports, the
 * night-heating note (the cucumber crop has no night humidity band to judge)
 * and pH (the boards CropWatch ships do not measure it). Japanese only, like
 * the rest of this site.
 *
 * The wording of every table cell, action and "what each value means" line
 * is the engine's own (cw_ai/content/ja.json). The headline and the
 * "AIによる説明" paragraphs are a template in the style of the model's
 * output; like the model, it only restates the engine's numbers.
 */

import { vaporPressureDeficit, type CropTargetDto } from './agronomy/crop-targets';
import { SUNSET_ELEVATION, solarElevation, type Coordinates } from './agronomy/solar';
import { sunCoordinates } from './demo-crops';
import type { DemoRow } from './demo-data';
import { deviceNow, readingAt } from './demo-history';
import { dailyDli, previousDays } from './soil-readings';

// ---- The app's DTOs (api.dtos.ts), Japanese text only -------------------------

export type AiReportPeriod = 'all' | 'day' | 'night';

/** A finding's text, laid out by the card as a table row and an action. */
export interface AiFindingTextDto {
	what: string;
	/** The low or high end (p10/p90), or the day total for DLI. */
	value: string | null;
	average: string | null;
	target: string | null;
	action_title: string;
	action: string;
	/** Set when another action covers this finding. */
	note: string | null;
	/** Weekly reports: on how many days it was off. */
	days_off: string | null;
}

export interface AiFindingDisplayDto {
	/** low_end_below / peak_above: the low or high end is off while the average is on target. */
	status: 'below' | 'above' | 'low_end_below' | 'peak_above' | 'invalid';
	/** Which end `value` is, when an average is shown. */
	kind: 'low' | 'high' | null;
	ja: AiFindingTextDto;
}

/** Something to act on; every number comes from the rules, never from the model. */
export interface AiRecommendationFindingDto {
	metric: string;
	period: AiReportPeriod;
	/** 2 needs attention, 3 outside safe limits. */
	severity: number;
	kind: 'target' | 'sensor';
	action: string;
	value: number;
	mean: number;
	direction: 'low' | 'high';
	display: AiFindingDisplayDto;
}

export interface AiRecommendationDetailDto {
	metric: string;
	period: AiReportPeriod;
	/** 0 ok, 1 close to target, 2 needs attention, 3 outside safe limits; null when not judged. */
	severity: number | null;
	what_ja: string;
	ja: string;
}

export interface AiRecommendationDto {
	dev_eui: string;
	report_type: 'daily';
	/** The local day covered, YYYY-MM-DD. */
	period_start: string;
	period_end: string;
	status: 'good' | 'action' | 'insufficient_data';
	/** 0 ok, 1 close to target, 2 needs attention, 3 outside safe limits. */
	max_severity: number;
	headline_ja: string;
	/** One paragraph per line. */
	body_ja: string;
	findings: AiRecommendationFindingDto[];
	details: AiRecommendationDetailDto[];
	/** The app's reports say `llm` when the local model phrased them; the demo's are templated. */
	text_source: 'llm' | 'template';
}

// ---- What the engine knows about each metric (models/metrics.py) --------------

interface MetricSpec {
	key: string;
	/** cw_soil_data column; null for the derived metrics. */
	column: string | null;
	unit: string;
	/** In report order: night before day. */
	periods: AiReportPeriod[];
	/** "Very close" tolerance beyond the optimal band. */
	nearMargin: number;
	/** Judged only against a per-device band, which the demo sensor does not have. */
	requiresOverride?: boolean;
	/** False: shown with its statistics, never given a verdict. */
	judged?: boolean;
	decimals: number;
}

/** In the engine's display and finding order: temperature > humidity/VPD > light > root zone > CO₂. */
const METRICS: MetricSpec[] = [
	{
		key: 'air_temperature',
		column: 'air_temperature_c',
		unit: '°C',
		periods: ['night', 'day'],
		nearMargin: 1,
		decimals: 1
	},
	{
		key: 'air_humidity',
		column: 'air_humidity',
		unit: '%',
		periods: ['night', 'day'],
		nearMargin: 5,
		decimals: 0
	},
	{ key: 'vpd', column: null, unit: 'kPa', periods: ['day'], nearMargin: 0.1, decimals: 2 },
	{ key: 'dli', column: null, unit: 'mol/m²/day', periods: ['all'], nearMargin: 2, decimals: 1 },
	// Light is judged through DLI; instantaneous PPFD is shown only.
	{
		key: 'ppfd',
		column: 'ppfd',
		unit: 'µmol/m²/s',
		periods: ['day'],
		nearMargin: 0,
		judged: false,
		decimals: 0
	},
	{
		key: 'soil_temperature',
		column: 'temperature_c',
		unit: '°C',
		periods: ['all'],
		nearMargin: 1,
		decimals: 1
	},
	// Crop moisture bands assume loam, and no bulk-probe EC target exists.
	{
		key: 'soil_moisture',
		column: 'moisture',
		unit: '%',
		periods: ['all'],
		nearMargin: 2,
		requiresOverride: true,
		decimals: 1
	},
	{
		key: 'soil_ec',
		column: 'ec',
		unit: 'mS/cm',
		periods: ['all'],
		nearMargin: 0.2,
		requiresOverride: true,
		decimals: 2
	},
	{ key: 'co2', column: 'co2', unit: 'ppm', periods: ['day'], nearMargin: 50, decimals: 0 }
];

const OK = 0;
const NEAR = 1;
const ATTENTION = 2;
const CRITICAL = 3;

/** Share of samples inside the optimal band that counts as on target. */
const IN_BAND_OK = 0.9;
/** A stress limit crossed for this long in total is "outside safe limits". */
const STRESS_MINUTES = 60;
/** A greenhouse takes about an hour to warm after sunrise: that ramp belongs to the night. */
const DAY_START_LAG_MS = 60 * 60 * 1000;
/** Day window when the location has no coordinates (local hours). */
const FALLBACK_SUNRISE_HOUR = 6;
const FALLBACK_SUNSET_HOUR = 18;

/** `${metric}:${period}:${direction}` -> action key. */
const ACTIONS: Record<string, string> = {
	'air_temperature:night:low': 'raise_night_temp',
	'air_temperature:night:high': 'lower_night_temp',
	'air_temperature:day:low': 'raise_day_temp',
	'air_temperature:day:high': 'lower_day_temp',
	'air_humidity:night:high': 'lower_night_humidity',
	'air_humidity:night:low': 'raise_night_humidity',
	'air_humidity:day:high': 'lower_day_humidity',
	'air_humidity:day:low': 'raise_day_humidity',
	'vpd:day:low': 'raise_vpd',
	'vpd:day:high': 'lower_vpd',
	'dli:all:low': 'increase_light',
	'dli:all:high': 'reduce_light',
	'soil_temperature:all:low': 'warm_root_zone',
	'soil_temperature:all:high': 'cool_root_zone',
	'co2:day:low': 'co2_low',
	'co2:day:high': 'co2_high'
};

// ---- The engine's Japanese wording (content/ja.json) ----------------------------

const METRIC_TEXT: Record<string, { name: string; meaning: string }> = {
	air_temperature: {
		name: '気温',
		meaning: '株のまわりの空気の温度です。夜温は開花や着果に、日中の温度は生育や着色に影響します。'
	},
	air_humidity: {
		name: '湿度',
		meaning:
			'空気がどれだけ水蒸気で満たされているかを示します。多湿が続くと灰色かび病などが出やすく、乾燥しすぎると株にストレスがかかります。'
	},
	vpd: {
		name: 'VPD（蒸気圧不足）',
		meaning:
			'温度と湿度から求める、空気が葉から水分を引き出す強さです。低いと湿りすぎて蒸散が鈍り、高いと葉から水分が急速に失われます。'
	},
	dli: {
		name: '日積算光量（DLI）',
		meaning: '1日に株が受け取った利用可能な光の合計です。光合成量、ひいては収量の上限を決めます。'
	},
	ppfd: {
		name: '光量子束密度（PPFD）',
		meaning:
			'その時点でセンサーに届いている利用可能な光の強さです。参考として表示し、光の評価は日積算光量（DLI）で行います。'
	},
	soil_temperature: {
		name: '地温',
		meaning:
			'根のまわりの温度です。根の活動と養分吸収を左右し、地温が低いとリン酸の吸収や生育が鈍ります。'
	},
	soil_moisture: {
		name: '土壌水分',
		meaning:
			'土の体積に占める水の割合です。適正範囲は土質で変わるため、この圃場用に設定した範囲がある場合のみ評価します。'
	},
	soil_ec: {
		name: '土壌EC',
		meaning:
			'センサー周辺の土の電気伝導度で、溶けている肥料成分（塩類）のおおまかな目安です。土中センサーの値は土壌分析の値と比べられないため、この圃場用に設定した範囲がある場合のみ評価します。'
	},
	co2: {
		name: 'CO₂濃度',
		meaning:
			'光合成の原料となる空気中の二酸化炭素です。閉め切ったハウスでは、日中に株が吸収して外気より低くなることがあります。'
	}
};

const PERIOD_TEXT: Record<AiReportPeriod, string> = { all: '', day: '日中の', night: '夜間の' };

const SEVERITY_TEXT = ['適正範囲内', '適正範囲に近い', '要注意', '安全範囲外'];

const REASON_TEXT = {
	no_target: '参考表示：この値には信頼できる目標値がありません。',
	needs_override: '未評価：この圃場の土質に合わせた目標範囲の設定が必要です。',
	shown_only: '参考表示です。'
};

const ACTION_TEXT: Record<string, { title: string; steps: string }> = {
	raise_night_temp: {
		title: '夜間の保温',
		steps:
			'暖房を使うか、夕方早めにサイド換気を閉めて保温カーテンを閉じ、夜間のハウスを暖かく保ってください。'
	},
	lower_night_temp: {
		title: '夜温を下げる',
		steps: '夕方の換気を長めにするか暖房の設定温度を下げて、高すぎる夜温を下げてください。'
	},
	raise_day_temp: {
		title: '日中の昇温',
		steps: '換気の開始を遅らせ、換気窓の開度を小さくして、日中のハウス内温度を上げてください。'
	},
	lower_day_temp: {
		title: '日中の高温対策',
		steps: '換気を早めに大きく開け、遮光や細霧冷房も検討して、日中の高温を抑えてください。'
	},
	lower_night_humidity: {
		title: '夜間の除湿',
		steps:
			'日没前後に短時間換気する、暖房で空気を乾かす、循環扇を回すなどして、夜間の多湿を減らしてください。'
	},
	raise_night_humidity: {
		title: '夜間の乾燥対策',
		steps: '夜間の換気を控えめにして、夜間の乾燥しすぎを防いでください。'
	},
	lower_day_humidity: {
		title: '日中の除湿',
		steps: '換気と循環扇で湿った空気を外に出し、日中の多湿を減らしてください。'
	},
	raise_day_humidity: {
		title: '日中の乾燥対策',
		steps: '換気を控えめにし、細霧や遮光も検討して、日中の乾燥しすぎを防いでください。'
	},
	raise_vpd: {
		title: 'VPDを上げる（多湿対策）',
		steps: '換気、暖房による除湿、循環扇の運転を検討して、湿りすぎで鈍った蒸散を促してください。'
	},
	lower_vpd: {
		title: 'VPDを下げる（乾燥対策）',
		steps:
			'暑い時間帯は細霧や遮光を使うか換気を控えめにして、葉の水分が急速に奪われるのを防いでください。'
	},
	increase_light: {
		title: '光量を増やす',
		steps:
			'被覆資材の汚れを落とし、不要な遮光を外し、補光設備があれば活用して、光不足を補ってください。'
	},
	reduce_light: {
		title: '強光対策',
		steps: '日中のピーク時の遮光を検討して、強すぎる光を和らげてください。'
	},
	warm_root_zone: {
		title: '地温を上げる',
		steps:
			'マルチを使う、朝の冷たい水での灌水を避ける、夜間の保温を強めるなどして、地温を上げてください。'
	},
	cool_root_zone: {
		title: '地温を下げる',
		steps: 'うね面の遮光、反射マルチや敷きわら、日中の灌水を検討して、地温を下げてください。'
	},
	co2_low: {
		title: '日中のCO₂を増やす',
		steps:
			'外気より低くなるときは換気で外気を取り入れ、CO₂施用設備があれば換気前の時間帯に使ってください。'
	},
	co2_high: {
		title: 'CO₂を下げる',
		steps: '施用量を減らすか換気して、CO₂濃度を下げてください。'
	}
};

const GOOD_HEADLINE = '良好です：管理の変更は不要です';

// ---- Statistics (services/aggregation.py) --------------------------------------

interface MetricStats {
	spec: MetricSpec;
	period: AiReportPeriod;
	values: number[];
	min: number;
	p10: number;
	mean: number;
	p90: number;
	max: number;
}

/** Python's statistics.quantiles(method="inclusive"): linear between the two nearest samples. */
function quantile(sorted: number[], q: number): number {
	const position = (sorted.length - 1) * q;
	const below = Math.floor(position);
	const above = Math.min(sorted.length - 1, below + 1);
	return sorted[below] + (sorted[above] - sorted[below]) * (position - below);
}

function statsOf(spec: MetricSpec, period: AiReportPeriod, values: number[]): MetricStats | null {
	if (values.length === 0) return null;
	const sorted = [...values].sort((a, b) => a - b);
	return {
		spec,
		period,
		values,
		min: sorted[0],
		p10: quantile(sorted, 0.1),
		mean: values.reduce((sum, v) => sum + v, 0) / values.length,
		p90: quantile(sorted, 0.9),
		max: sorted[sorted.length - 1]
	};
}

/**
 * Whether `t` counts as daytime: from an hour after sunrise until sunset
 * (services/windows.py). The sun being up now and an hour ago is the same
 * test without solving for sunrise.
 */
function isDayPeriod(t: number, coordinates: Coordinates | null): boolean {
	if (!coordinates) {
		const at = new Date(t);
		const hour = at.getHours() + at.getMinutes() / 60;
		return hour >= FALLBACK_SUNRISE_HOUR + 1 && hour < FALLBACK_SUNSET_HOUR;
	}
	const up = (at: number) => solarElevation(new Date(at), coordinates) > SUNSET_ELEVATION;
	return up(t) && up(t - DAY_START_LAG_MS);
}

// ---- Verdicts (services/assessment.py) -----------------------------------------

type UnjudgedReason = keyof typeof REASON_TEXT;

interface MetricResult {
	stats: MetricStats;
	band: CropTargetDto | null;
	/** Why there is no verdict; null when judged. */
	reason: UnjudgedReason | null;
	severity: number;
	direction: 'low' | 'high' | null;
}

/**
 * One metric in one period against its band. Severity uses p10/p90, so brief
 * spikes do not count: 3 a stress limit crossed for an hour in total, 0 at
 * least 90 % of samples in the optimal band, 1 the worst excursion within
 * the metric's near margin, 2 otherwise.
 */
function judge(stats: MetricStats, band: CropTargetDto | null, intervalMin: number): MetricResult {
	const { spec, values } = stats;
	const unjudged = (reason: UnjudgedReason): MetricResult => ({
		stats,
		band,
		reason,
		severity: OK,
		direction: null
	});
	if (spec.judged === false) return unjudged('shown_only');
	if (!band || (band.optimal_min === null && band.optimal_max === null))
		return unjudged('no_target');
	if (spec.requiresOverride) return unjudged('needs_override');

	const lo = band.optimal_min;
	const hi = band.optimal_max;
	const count = (test: (v: number) => boolean) => values.filter(test).length;
	const below = count((v) => lo !== null && v < lo);
	const above = count((v) => hi !== null && v > hi);
	const inBand = 1 - (below + above) / values.length;
	// Direction is the side the metric spent more time on; magnitude uses p10/p90.
	let direction: 'low' | 'high' | null =
		below === 0 && above === 0 ? null : below >= above ? 'low' : 'high';
	const lowBy = lo !== null ? lo - stats.p10 : 0;
	const highBy = hi !== null ? stats.p90 - hi : 0;
	const under = count((v) => band.min_value !== null && v < band.min_value);
	const over = count((v) => band.max_value !== null && v > band.max_value);

	let severity: number;
	// DLI is one value for the day, so it has no minutes outside a limit.
	if (spec.key !== 'dli' && Math.max(under, over) * intervalMin >= STRESS_MINUTES) {
		severity = CRITICAL;
		direction = under >= over ? 'low' : 'high';
	} else if (inBand >= IN_BAND_OK) {
		severity = OK;
		direction = null;
	} else if (Math.max(lowBy, highBy) <= spec.nearMargin) {
		severity = NEAR;
	} else {
		severity = ATTENTION;
	}
	return { stats, band, reason: null, severity, direction };
}

// ---- Words (services/narrative.py) ---------------------------------------------

/** Fixed decimals, trailing zeros trimmed: 20.0 -> "20", 0.42 -> "0.42". */
function formatNumber(value: number, decimals: number): string {
	const text = value.toFixed(decimals);
	return text.includes('.') ? text.replace(/0+$/, '').replace(/\.$/, '') : text;
}

function formatValue(value: number, spec: MetricSpec): string {
	return `${formatNumber(value, spec.decimals)}${spec.unit}`;
}

function formatTarget(band: CropTargetDto | null, spec: MetricSpec): string {
	const lo = band?.optimal_min ?? null;
	const hi = band?.optimal_max ?? null;
	if (lo !== null && hi !== null)
		return `${formatNumber(lo, spec.decimals)}〜${formatNumber(hi, spec.decimals)}${spec.unit}`;
	if (lo !== null) return `${formatValue(lo, spec)}以上`;
	if (hi !== null) return `${formatValue(hi, spec)}以下`;
	return '-';
}

function whatOf(stats: MetricStats): string {
	return PERIOD_TEXT[stats.period] + METRIC_TEXT[stats.spec.key].name;
}

/** A finding in the making: the result that raised it, and the statistic that breached. */
interface Finding {
	result: MetricResult;
	direction: 'low' | 'high';
	/** p10 when low, p90 when high, the day's total for DLI. */
	value: number;
}

/**
 * p10/p90 is the reading's low or high end, not its level, so the average
 * goes beside it. DLI is a single daily value, and a flat reading's ends
 * equal its average.
 */
function showsAverage({ result, value }: Finding): boolean {
	const { spec, mean } = result.stats;
	return (
		spec.key !== 'dli' && formatNumber(value, spec.decimals) !== formatNumber(mean, spec.decimals)
	);
}

function displayStatus(finding: Finding): AiFindingDisplayDto['status'] {
	const { band, stats } = finding.result;
	if (showsAverage(finding)) {
		const lo = band?.optimal_min ?? null;
		const hi = band?.optimal_max ?? null;
		if (finding.direction === 'low' && lo !== null && stats.mean >= lo) return 'low_end_below';
		if (finding.direction === 'high' && hi !== null && stats.mean <= hi) return 'peak_above';
	}
	return finding.direction === 'low' ? 'below' : 'above';
}

function toFindingDto(finding: Finding): AiRecommendationFindingDto {
	const { stats, band, severity } = finding.result;
	const { spec, period } = stats;
	const action = ACTIONS[`${spec.key}:${period}:${finding.direction}`];
	const withAverage = showsAverage(finding);
	return {
		metric: spec.key,
		period,
		severity,
		kind: 'target',
		action,
		value: finding.value,
		mean: stats.mean,
		direction: finding.direction,
		display: {
			status: displayStatus(finding),
			kind: withAverage ? finding.direction : null,
			ja: {
				what: whatOf(stats),
				value: formatValue(finding.value, spec),
				average: withAverage ? formatValue(stats.mean, spec) : null,
				target: formatTarget(band, spec),
				action_title: ACTION_TEXT[action].title,
				action: ACTION_TEXT[action].steps,
				note: null,
				days_off: null
			}
		}
	};
}

/** The "what each value means" line of one metric. */
function detailLine(result: MetricResult): string {
	const { stats, band, reason, severity } = result;
	const { spec } = stats;
	const what = whatOf(stats);
	const meaning = METRIC_TEXT[spec.key].meaning;
	const mean = formatValue(stats.mean, spec);
	// One value (the day's DLI, or a flat reading): no range to show.
	const single = formatNumber(stats.min, spec.decimals) === formatNumber(stats.max, spec.decimals);
	if (reason) {
		return single
			? `${what}：${mean}。${REASON_TEXT[reason]}${meaning}`
			: `${what}：平均${mean}。${REASON_TEXT[reason]}${meaning}`;
	}
	const target = formatTarget(band, spec);
	return single
		? `${what}：${mean}、目標${target}。${SEVERITY_TEXT[severity]}。${meaning}`
		: `${what}：平均${mean}（最低${formatValue(stats.min, spec)}〜最高${formatValue(stats.max, spec)}）、目標${target}。${SEVERITY_TEXT[severity]}。${meaning}`;
}

/** One finding as a paragraph, in the style of the model's output. */
function findingParagraph({ display }: AiRecommendationFindingDto): string {
	const { ja: text, status, kind } = display;
	const direction = status === 'below' || status === 'low_end_below' ? '低め' : '高め';
	if (status === 'low_end_below')
		return `${text.what}は平均${text.average}で目標の${text.target}に入っていますが、低い時間帯は${text.value}まで下がりました。${text.action}`;
	if (status === 'peak_above')
		return `${text.what}は平均${text.average}で目標の${text.target}に入っていますが、高い時間帯は${text.value}まで上がりました。${text.action}`;
	const recorded = kind
		? `${kind === 'low' ? '低い時間帯' : '高い時間帯'}で${text.value}（平均${text.average}）`
		: `${text.value}`;
	return `${text.what}は${recorded}と、目標の${text.target}より${direction}でした。${text.action}`;
}

// ---- The report ----------------------------------------------------------------

/** A local calendar day as YYYY-MM-DD. */
function dateKey(day: Date): string {
	const month = String(day.getMonth() + 1).padStart(2, '0');
	const date = String(day.getDate()).padStart(2, '0');
	return `${day.getFullYear()}-${month}-${date}`;
}

/**
 * The daily report the worker would have written this morning: the complete
 * local day before the device's clock, judged against the device's crop.
 * Null for a device without a crop (the app shows no card either).
 */
export function buildAiReport(device: DemoRow, now: number): AiRecommendationDto | null {
	const crop = device.crop;
	if (!crop) return null;

	const { start, end } = previousDays(new Date(deviceNow(device, now)), 1);
	const coordinates = sunCoordinates(device.location?.coordinates, new Date(now));
	const stepMs =
		(device.upload_interval ?? device.device_type.default_upload_interval ?? 10) * 60_000;

	// The day's readings per metric and period.
	const series = new Map<string, number[]>();
	const push = (metric: string, period: AiReportPeriod, value: number | null | undefined) => {
		if (value === null || value === undefined || !Number.isFinite(value)) return;
		const key = `${metric}:${period}`;
		const values = series.get(key);
		if (values) values.push(value);
		else series.set(key, [value]);
	};
	const ppfdPoints: { t: number; v: number }[] = [];
	for (let t = start.getTime(); t < end.getTime(); t += stepMs) {
		const reading = readingAt(device, t);
		const period: AiReportPeriod = isDayPeriod(t, coordinates) ? 'day' : 'night';
		for (const spec of METRICS) {
			const value =
				spec.key === 'vpd'
					? vaporPressureDeficit(reading.air_temperature_c, reading.air_humidity)
					: spec.column
						? reading[spec.column]
						: null;
			// A day-only metric (VPD, PPFD, CO₂) has no use for a night sample.
			if (spec.periods.includes(period)) push(spec.key, period, value);
			else if (spec.periods.includes('all')) push(spec.key, 'all', value);
		}
		if (typeof reading.ppfd === 'number') ppfdPoints.push({ t, v: reading.ppfd });
	}
	// The day's light, integrated exactly as the DLI card's history does.
	const dli = dailyDli(ppfdPoints, start, end)[0]?.value;
	if (dli !== undefined) series.set('dli:all', [dli]);

	const results: MetricResult[] = [];
	for (const spec of METRICS) {
		for (const period of spec.periods) {
			const stats = statsOf(spec, period, series.get(`${spec.key}:${period}`) ?? []);
			if (!stats) continue;
			// The period's own row before the all-day one.
			const rows = crop.targets.filter((target) => target.metric === spec.key);
			const band =
				rows.find((target) => target.period === period) ??
				rows.find((target) => target.period === 'all') ??
				null;
			results.push(judge(stats, band, stepMs / 60_000));
		}
	}

	let raised: Finding[] = results
		.filter(
			(result): result is MetricResult & { direction: 'low' | 'high' } =>
				result.reason === null && result.severity >= ATTENTION && result.direction !== null
		)
		.map((result) => ({
			result,
			direction: result.direction,
			value:
				result.stats.spec.key === 'dli'
					? result.stats.mean
					: result.direction === 'low'
						? result.stats.p10
						: result.stats.p90
		}));
	// Daytime humidity advice follows VPD, which is derived from the same RH
	// plus temperature and is closer to what the plant feels. The two bands can
	// disagree, so a humidity finding that contradicts VPD is dropped rather
	// than shown next to opposite advice.
	const key = (finding: Finding) =>
		`${finding.result.stats.spec.key}:${finding.result.stats.period}`;
	const vpdDay = raised.find((finding) => key(finding) === 'vpd:day');
	const humidityDay = raised.find((finding) => key(finding) === 'air_humidity:day');
	if (vpdDay && humidityDay && (humidityDay.direction === 'high') !== (vpdDay.direction === 'low'))
		raised = raised.filter((finding) => finding !== humidityDay);
	// Worst first; within a severity the metrics keep their report order.
	raised.sort((a, b) => b.result.severity - a.result.severity);

	const findings = raised.map(toFindingDto);
	const judged = results.filter((result) => result.reason === null);
	const status: AiRecommendationDto['status'] =
		findings.length > 0 ? 'action' : judged.length === 0 ? 'insufficient_data' : 'good';
	const onTarget = judged.filter((result) => result.severity <= NEAR).map((r) => whatOf(r.stats));

	const paragraphs =
		status === 'action'
			? findings.map(findingParagraph)
			: [
					`${crop.name_ja}の測定値はすべて目標範囲内、または目標に近い値でした。今のところ管理を変える必要はありません。`
				];
	if (status === 'action' && onTarget.length > 0)
		paragraphs.push(`${onTarget.join('、')}は目標どおりでした。`);

	const day = dateKey(start);
	return {
		dev_eui: device.dev_eui,
		report_type: 'daily',
		period_start: day,
		period_end: day,
		status,
		max_severity: Math.max(OK, ...judged.map((result) => result.severity)),
		headline_ja:
			status === 'action'
				? `${crop.name_ja}の栽培環境：${findings.length}項目が目標から外れています`
				: GOOD_HEADLINE,
		body_ja: paragraphs.join('\n'),
		findings,
		details: results.map((result) => ({
			metric: result.stats.spec.key,
			period: result.stats.period,
			severity: result.reason === null ? result.severity : null,
			what_ja: whatOf(result.stats),
			ja: detailLine(result)
		})),
		text_source: 'template'
	};
}
