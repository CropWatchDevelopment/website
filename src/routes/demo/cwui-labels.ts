/**
 * Japanese labels for the CWUI components the demo uses.
 *
 * Port of the subset of CropWatch/src/lib/i18n/cwuiLabels.ts that the demo
 * needs, with the strings taken verbatim from that app's messages/ja.json.
 * The dashboard resolves them through Paraglide; this site is Japanese-only, so
 * they are plain constants.
 */

import type {
	CwDataTableLabels,
	CwHeatmapLabels,
	CwResponsiveLineChartLabels,
	CwStatCardLabels
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
