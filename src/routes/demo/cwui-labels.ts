/**
 * Japanese labels for the CWUI components the demo uses.
 *
 * Port of the subset of CropWatch/src/lib/i18n/cwuiLabels.ts that the demo
 * needs, with the strings taken verbatim from that app's messages/ja.json.
 * The dashboard resolves them through Paraglide; this site is Japanese-only, so
 * they are plain constants.
 */

import type { ComponentProps } from 'svelte';
import { CW_EMPTY_VALUE } from '@cropwatchdevelopment/cwui';
import type {
	CwSensorCard,
	CwAboveBelowChartLabels,
	CwCopyLabels,
	CwDataTableLabels,
	CwHeatmapLabels,
	CwPPFDChartLabels,
	CwResponsiveLineChartLabels,
	CwSensorStatusLabels,
	CwStatCardLabels,
	CwVPDChartLabels
} from '@cropwatchdevelopment/cwui';

export function cwStatCardLabels(): CwStatCardLabels {
	return {
		min: '最小',
		avg: '平均',
		max: '最大',
		count: '件数',
		median: '中央値',
		stdDev: '標準偏差',
		range: '範囲',
		aboveAvg: '平均以上',
		belowAvg: '平均以下',
		atAvg: '平均',
		clickToExpand: '展開',
		clickToCollapse: '折りたたむ'
	};
}

export function cwDataTableLabels(): CwDataTableLabels {
	return {
		searchPlaceholder: '検索...',
		loading: '読み込み中...',
		loadingMore: 'さらに読み込み中...',
		noSort: '並べ替えなし',
		sortAscOption: (header) => `${header}（昇順）`,
		sortDescOption: (header) => `${header}（降順）`,
		pageSizeOption: (n) => `${n} 行`,
		pageSizeBatchOption: (n) => `${n} 行/バッチ`,
		toolbarMenu: 'テーブルオプションを開く',
		columnsSettings: '列の設定',
		refresh: '更新',
		actions: '操作',
		errorPrefix: (message) => `エラー: ${message}`,
		retry: '再試行',
		empty: 'データがありません',
		genericError: 'エラーが発生しました',
		loadMoreError: '追加の行を読み込めません',
		groupCount: (count) => `${count} 件`,
		paginationRange: (from, to, total) => `${from}–${to} / ${total}`,
		virtualRange: (from, to, total) => `${from}–${to} / ${total}`,
		virtualRangeLoaded: (from, to) => `${from}–${to} 読み込み済み`,
		loadInterrupted: '読み込みが中断されました',
		scrollToLoadMore: 'スクロールしてさらに読み込む',
		allRowsLoaded: (total) => `全 ${total} 行を読み込みました`,
		allLoadedVisible: '読み込んだ行をすべて表示中',
		previousPage: '前のページ',
		nextPage: '次のページ',
		pageOf: (page, totalPages) => `${page} / ${totalPages} ページ`,
		columnSettingsCopy: 'このグリッドに表示する列を選択してください。',
		visibleColumns: '表示する列',
		selectAtLeastOne: '保存する前に少なくとも 1 つの列を選択してください。',
		close: '閉じる',
		resetToDefault: 'デフォルトに戻す',
		save: '保存'
	};
}

export function cwResponsiveLineChartLabels(): CwResponsiveLineChartLabels {
	return {
		range1h: '1時間',
		range24h: '24時間',
		range7d: '7日',
		rangeGroupAria: '期間',
		toggleThemeAria: 'テーマを切り替え',
		sensorsOnOf: (on, total) => `センサー · ${total} 個中 ${on} 個表示`,
		anomaly: '異常',
		dataGap: 'データ欠損',
		noSignal: '信号なし',
		zoomHint: 'Ctrl + スクロールでズーム',
		lastSensorTitle: () => '少なくとも 1 つのセンサーを表示する必要があります',
		hideSeries: (label) => `${label} を非表示`,
		showSeries: (label) => `${label} を表示`
	};
}

export function cwHeatmapLabels(): CwHeatmapLabels {
	return {
		title: '温度ヒートマップ',
		noData: 'データなし'
	};
}

export function cwVpdChartLabels(): CwVPDChartLabels {
	return {
		caption: '気温と相対湿度による飽差ヒートマップ',
		zones: {
			wet: '過湿',
			humid: '湿潤',
			balanced: 'バランス',
			optimal: '最適',
			firm: 'やや乾燥',
			dry: '乾燥',
			stress: 'ストレス'
		},
		cellAriaLabel: ({ temperatureC, humidity, vpd, unit, zoneLabel, inTarget, isCurrent }) =>
			`${temperatureC}°C、相対湿度 ${humidity}%、${vpd} ${unit}、${zoneLabel} ゾーン` +
			(inTarget ? '、目標範囲内' : '') +
			(isCurrent ? '、現在の室内環境セル' : ''),
		roomVpd: (temperature, humidity) => `室内VPD · ${temperature} / 湿度 ${humidity}`,
		target: '目標',
		onTarget: '目標範囲内',
		offTarget: '目標範囲外 - 調整が必要',
		inTargetBand: '目標範囲',
		now: '現在',
		loading: 'VPDチャートを読み込み中'
	};
}

export function cwPpfdChartLabels(): CwPPFDChartLabels {
	return {
		eyebrow: '光合成光量子束密度',
		heading: 'PPFD レンジゲージ',
		headingWithPlant: (plant) => `${plant} PPFD`,
		currentPpfd: '現在の PPFD',
		current: '現在',
		dliReading: '本日の DLI',
		dliStat: '本日の DLI',
		targetRange: '目標範囲',
		status: 'ステータス',
		tooLow: '低すぎ',
		tooHigh: '高すぎ',
		optimal: '最適',
		insideBand: '目標範囲内',
		deltaBelow: (amount, unit) => `目標まで ${amount} ${unit} 不足`,
		deltaAbove: (amount, unit) => `目標を ${amount} ${unit} 超過`,
		updated: (when) => `更新 ${when}`,
		low: '低',
		optimalZone: '最適',
		high: '高',
		loading: 'PPFDを読み込み中'
	};
}

export function cwCopyLabels(): CwCopyLabels {
	return {
		copy: 'クリップボードにコピー',
		copied: 'コピーしました',
		copiedFeedback: 'コピーしました！',
		failedFeedback: 'コピーに失敗しました'
	};
}

/** CwSensorCard's labels type is not exported, so read it off the component. */
export function cwSensorCardLabels(): ComponentProps<typeof CwSensorCard>['labels'] {
	return {
		error: 'センサーエラー',
		details: '詳細',
		noDetails: '詳細な測定値はまだありません。',
		noValue: CW_EMPTY_VALUE,
		lastSeen: '最終受信',
		ago: '前'
	};
}

export function cwLocationCardLabels(
	name: string
): CwSensorStatusLabels & { viewLocation?: string } {
	return {
		online: 'オンライン',
		offline: 'オフライン',
		warning: '警告',
		loading: '読み込み中',
		viewLocation: `${name}を表示`
	};
}

// CwDliCard needs no labels: since CWUI 0.1.117 it carries its own Japanese
// text, picked from `locale="ja-JP"` (the app relies on the same).

export function cwAboveBelowChartLabels(): CwAboveBelowChartLabels {
	return {
		title: '地上と地中',
		light: '光',
		air: '空気',
		ground: '土壌',
		// New in CWUI 0.1.118 and not yet in the app's messages (it shows the
		// English default); this site is Japanese-only, so they get Japanese text.
		skyLevel: '上空',
		airLevel: '地上',
		groundLevel: '地表',
		ppfdNow: '現在の PPFD',
		ppfdPeak: 'ピーク',
		dliToday: '本日の DLI',
		dliGoal: (crop) => (crop ? `${crop} の目標` : '目標'),
		low: '最小',
		average: '平均',
		high: '最大',
		target: (range) => `目標 ${range}`,
		legend: '凡例',
		legendNow: '現在',
		legendAverage: '平均',
		legendRange: '最小〜最大',
		legendTarget: (crop) => (crop ? `${crop} の目標` : '目標'),
		statusTooLow: '低すぎ',
		statusLow: '低め',
		statusOptimal: '適正',
		statusHigh: '高め',
		statusTooHigh: '高すぎ'
	};
}
