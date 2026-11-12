// Footnote ※1 for every claim that the sensor stores readings while it can't
// reach the gateway. Mark the claim with STORAGE_NOTE_REF and render
// <StorageNote /> once near the bottom of the same page; the marker links to it
// by id.

export const STORAGE_NOTE_ID = 'storage-note';

/** footnote number: the marker in the copy and the label on the note match */
export const STORAGE_NOTE_MARK = '※1';

export const STORAGE_NOTE_TITLE = '通信が途切れたときのデータ保存について';

export const STORAGE_NOTE_LEAD =
	'受信機（ゲートウェイ）と通信できない間も、センサーは測定データを本体のメモリに保存します。';

/** FRAM holds 36 readings: 6 hours at the 10-minute interval (see /technology) */
export const STORAGE_NOTE_CAPACITY =
	'保存できるのは最大6時間分（10分ごとの測定で36回分）までです。';

export const STORAGE_NOTE_CAVEAT =
	'ただし、保存したデータを受信機へ送るのは、センサーと受信機のあいだの電波が十分に強くなってからです。通信が戻っても電波が弱いうちは、保存したデータは送信されません。';

/** Inline marker for {@html} strings (e.g. FAQ answers). Styled by `.fnref` in cropwatch-site.css. */
export const STORAGE_NOTE_REF = `<sup class="fnref"><a href="#${STORAGE_NOTE_ID}" aria-label="注記1: ${STORAGE_NOTE_TITLE}">${STORAGE_NOTE_MARK}</a></sup>`;

/**
 * Plain-text form for JSON-LD: a stray "※1" means nothing to a crawler, so swap
 * the marker for the limits themselves. Call before stripping tags.
 */
export function withStorageCaveat(html: string): string {
	return html.includes(STORAGE_NOTE_REF)
		? `${html.replace(STORAGE_NOTE_REF, '')}${STORAGE_NOTE_CAPACITY}${STORAGE_NOTE_CAVEAT}`
		: html;
}
