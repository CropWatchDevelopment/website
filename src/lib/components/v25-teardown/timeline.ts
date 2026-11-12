// Captions and chapters for the V25 animation. Kept apart from scene.ts so the component can
// render them without pulling three.js into the page bundle.
// Ported from the cropwatch.io /home teardown (develop) and translated into Japanese.
// The step times below are "story" seconds and must stay identical to the .io copy: scene.ts
// keys every motion off them.
//
// Story vs player time: several captions flashed past too fast to read, so the player clock
// runs longer than the story. Each HOLDS entry plays the story span from..to over
// (to - from + extra) player seconds: a span between two camera keys crawls (the eased orbit
// just runs slower, no jolt); from === to freezes the frame at a moment where nothing is moving.
// Every caption with text gets at least MIN_CAPTION player seconds (src/tests/v25-timeline.spec.ts).
// scene.ts evaluates motion in story time via toStory(); the clock, the captions and the
// chapter bar use player time, which is what STEPS / CHAPTERS / DURATION export.

/** shortest time any caption stays on screen, in player seconds */
export const MIN_CAPTION = 3.5;

/** sorted, non-overlapping; story seconds, extra in player seconds */
const HOLDS: { from: number; to: number; extra: number }[] = [
	{ from: 0, to: 2.0, extra: 1.5 }, // ケース本体: the opening camera move (keys 0 / 2.0)
	{ from: 8.4, to: 10.8, extra: 0.5 }, // ケーブルを外す: camera keys around the plug pull
	{ from: 13.8, to: 13.8, extra: 0.5 }, // センサーを取り出す: sensor parked, camera at rest
	{ from: 19.6, to: 20.8, extra: 1.6 }, // ポッティングしたメイン基板: cover parked, camera keys
	{ from: 20.8, to: 22.1, extra: 3.25 }, // エポキシ樹脂の内部構造: the epoxy fade, 3.5x slower
	{ from: 22.1, to: 25.7, extra: 4 }, // 内部全体像: the labelled orbit round the board
	{ from: 30.7, to: 30.7, extra: 1.2 }, // 充填範囲: pour finished, camera at rest
	{ from: 36.0, to: 36.0, extra: 0.3 }, // 新しいバッテリー: cells parked, camera at rest
	{ from: 40.6, to: 40.6, extra: 1.9 } // 電源オン: after the LED flash, camera all but still
];

/** length of the story (scene.ts keyframes), in story seconds: the sensor cover is back on at
 * 53.5, a last look at the closed case, then the white dip (scene.ts FADES) before the loop */
export const STORY_DURATION = 55;
/** length of one loop on the player clock */
export const DURATION = STORY_DURATION + HOLDS.reduce((sum, h) => sum + h.extra, 0);

/** player seconds -> story seconds */
export function toStory(t: number): number {
	let shift = 0; // player - story, accumulated over the holds already passed
	for (const h of HOLDS) {
		const a = h.from + shift; // player time the hold starts
		if (t < a) break;
		const span = h.to - h.from;
		if (t <= a + span + h.extra) return h.from + ((t - a) * span) / (span + h.extra);
		shift += h.extra;
	}
	return t - shift;
}

/** story seconds -> player seconds (a frozen moment maps to its first frame) */
export function toPlayer(s: number): number {
	let shift = 0;
	for (const h of HOLDS) {
		if (s <= h.from) break;
		const span = h.to - h.from;
		if (s < h.to) return h.from + shift + ((s - h.from) * (span + h.extra)) / span;
		shift += h.extra;
	}
	return s + shift;
}

/** captions, one per step (written in story time, exported in player time) */
const STORY_STEPS: { t: number; title: string; note: string }[] = [
	{ t: 0, title: 'クロップウォッチケース本体', note: 'カバーは2枚、脱落防止ネジは8本' },
	{ t: 2.0, title: 'センサーカバーを外す', note: '3本の脱落防止ネジは緩めてもカバーに残ります' },
	{ t: 8.0, title: 'センサーのケーブルを外す', note: 'QWIICケーブルはケース内に残ります' },
	{ t: 11.0, title: 'センサーを取り出す', note: 'センサーだけを交換し、本体はそのまま使えます' },
	{ t: 14.0, title: '本体カバーを外す', note: '5本の脱落防止ネジはカバーに残ります' },
	{
		t: 19.6,
		title: 'ポッティングしたメイン基板',
		note: '基板をエポキシ樹脂で封止し、湿気や水分から電子回路を保護'
	},
	{ t: 21.0, title: 'エポキシ樹脂の内部構造', note: '樹脂封止された基板内部' },
	{
		t: 22.0,
		title: 'クロップウォッチケースの内部全体像',
		note: 'メイン基板、LoRaWAN無線、バッテリー'
	},
	{
		t: 26.0,
		title: 'エポキシ樹脂を流し込む',
		note: '樹脂を流し込み、実際の状態を再現します。'
	},
	{
		t: 30.2,
		title: 'エポキシ樹脂の充填範囲',
		note: 'コネクタ部分を残して樹脂を流し込みます。'
	},
	{
		t: 32.5,
		title: '古いバッテリーを取り出す',
		note: 'バッテリーだけを交換し、基板はそのまま使えます'
	},
	{ t: 36.0, title: '新しいバッテリーを入れる', note: 'バッテリーを交換します' },
	{ t: 39.2, title: '電源オン', note: 'ステータスLEDが1回点滅して、正常な起動を知らせます' },
	{ t: 40.8, title: '先に本体カバーを取り付ける', note: '脱落防止ネジ5本' },
	{ t: 45.4, title: '新しいセンサーに取り替える', note: 'ケーブルを差し直します' },
	{ t: 49.4, title: 'センサーカバーを取り付ける', note: '脱落防止ネジ3本' }
];

/** the chapter bar under the stage (written in story time, exported in player time) */
const STORY_CHAPTERS: { t: number; label: string }[] = [
	{ t: 0, label: 'センサーカバー' },
	{ t: 8.0, label: 'センサー' },
	{ t: 14.0, label: '本体カバー' },
	{ t: 19.6, label: 'メイン基板' },
	{ t: 32.5, label: '電池交換' },
	{ t: 40.8, label: '組み立て' }
];

export const STEPS = STORY_STEPS.map((s) => ({ ...s, t: toPlayer(s.t) }));
export const CHAPTERS = STORY_CHAPTERS.map((c) => ({ ...c, t: toPlayer(c.t) }));
