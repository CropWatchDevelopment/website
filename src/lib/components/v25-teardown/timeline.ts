// Captions and chapters for the V25 animation. Kept apart from scene.ts so the component can
// render them without pulling three.js into the page bundle.
// Ported from the cropwatch.io /home teardown (develop) and translated into Japanese.
// The step times below are "story" seconds and must stay identical to the .io copy: scene.ts
// keys every motion off them.
//
// Story vs player time: the labelled look inside (step 22.0, "V25の内部") was too short to read,
// so the player clock runs HOLD.extra seconds longer than the story and crawls through the
// camera move HOLD.from..HOLD.to (both camera keys, so the eased orbit just runs slower with no
// jolt). scene.ts evaluates motion in story time via toStory(); the clock, the captions and the
// chapter bar use player time, which is what STEPS / CHAPTERS / DURATION export.

const HOLD = { from: 22.1, to: 25.7, extra: 4 };

/** length of the story (scene.ts keyframes), in story seconds */
export const STORY_DURATION = 79;
/** length of one loop on the player clock */
export const DURATION = STORY_DURATION + HOLD.extra;

const slow = (HOLD.to - HOLD.from) / (HOLD.to - HOLD.from + HOLD.extra);

/** player seconds -> story seconds */
export function toStory(t: number): number {
	if (t <= HOLD.from) return t;
	if (t >= HOLD.to + HOLD.extra) return t - HOLD.extra;
	return HOLD.from + (t - HOLD.from) * slow;
}

/** story seconds -> player seconds */
function toPlayer(s: number): number {
	if (s <= HOLD.from) return s;
	if (s >= HOLD.to) return s + HOLD.extra;
	return HOLD.from + (s - HOLD.from) / slow;
}

/** captions, one per step (written in story time, exported in player time) */
const STORY_STEPS: { t: number; title: string; note: string }[] = [
	{ t: 0, title: 'V25 本体', note: 'カバーは2枚、脱落防止ネジは8本' },
	{ t: 2.0, title: 'センサーカバーを外す', note: '3本の脱落防止ネジは緩めてもカバーに残ります' },
	{ t: 8.0, title: 'センサーのケーブルを外す', note: 'QWIICケーブルはケース内に残ります' },
	{ t: 11.0, title: 'センサーを取り出す', note: '' },
	{ t: 14.0, title: '本体カバーを外す', note: '5本の脱落防止ネジはカバーに残ります' },
	{ t: 19.6, title: 'ポッティングしたメイン基板', note: '基板をエポキシ樹脂で封止し、湿気や水分から電子回路を保護' },
	{ t: 21.0, title: 'エポキシ樹脂の内部構造', note: '内部の基板をご覧ください' },
	{ t: 22.0, title: 'V25の内部', note: 'メイン基板、LoRaWAN無線、バッテリー' },
	{
		t: 26.0,
		title: 'エポキシ樹脂を流し込む',
		note: '樹脂を流し込み、実際の状態を再現します。'
	},
	{
		t: 28.0,
		title: '',
		note: ''
	},
	{
		t: 30.2,
		title: 'ケーブルの通り道の手前で止める',
		note: 'コネクタはケーブルを挿せるよう露出させます'
	},
	{ t: 32.5, title: '古いバッテリーを取り出す', note: '' },
	{ t: 36.0, title: '新しいバッテリーを入れる', note: '' },
	{ t: 39.2, title: '電源オン', note: 'ステータスLEDが1回点滅して、正常な起動を知らせます' },
	{ t: 40.8, title: '先に本体カバーを取り付ける', note: '脱落防止ネジ5本' },
	{ t: 45.4, title: 'センサーを戻す', note: 'ケーブルを差し直します' },
	{ t: 49.4, title: 'センサーカバーを取り付ける', note: '脱落防止ネジ3本' },
	{ t: 54.0, title: 'プレハブ冷蔵庫', note: '4つのマグネットで壁面に固定' },
	{ t: 66.0, title: 'ポールへの取り付け', note: '背面の樹脂ブラケットとバンドクランプでポールに固定' }
];

/** the chapter bar under the stage (written in story time, exported in player time) */
const STORY_CHAPTERS: { t: number; label: string }[] = [
	{ t: 0, label: 'センサーカバー' },
	{ t: 8.0, label: 'センサー' },
	{ t: 14.0, label: '本体カバー' },
	{ t: 19.6, label: 'メイン基板' },
	{ t: 32.5, label: '電池交換' },
	{ t: 40.8, label: '組み立て' },
	{ t: 54.0, label: '冷蔵庫の壁' },
	{ t: 66.0, label: 'ポール' }
];

export const STEPS = STORY_STEPS.map((s) => ({ ...s, t: toPlayer(s.t) }));
export const CHAPTERS = STORY_CHAPTERS.map((c) => ({ ...c, t: toPlayer(c.t) }));
