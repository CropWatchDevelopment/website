// Captions and chapters for the V25 animation. Kept apart from scene.ts so the component can
// render them without pulling three.js into the page bundle.
// Ported from the cropwatch.io /home teardown (develop) and translated into Japanese.
// The timings must stay identical to the .io copy: scene.ts keys every motion off them.

export const DURATION = 79;

/** captions, one per step */
export const STEPS: { t: number; title: string; note: string }[] = [
	{ t: 0, title: 'V25 本体', note: 'カバーは2枚、脱落防止ネジは8本' },
	{ t: 2.0, title: 'センサーカバーを外す', note: '3本の脱落防止ネジは緩めてもカバーに残ります' },
	{ t: 8.0, title: 'センサーのケーブルを外す', note: 'QWIICケーブルはケース内に残ります' },
	{ t: 11.0, title: 'センサーを取り出す', note: '' },
	{ t: 14.0, title: '本体カバーを外す', note: '5本の脱落防止ネジはカバーに残ります' },
	{ t: 19.6, title: 'ポッティングしたメイン基板', note: '基板上の全部品を黒いエポキシ樹脂で封止' },
	{ t: 21.0, title: 'エポキシ樹脂の下をのぞく', note: 'この場面だけ樹脂を非表示にしています' },
	{ t: 22.0, title: 'V25の内部', note: 'メイン基板、LoRaWAN無線、単3電池2本' },
	{
		t: 26.0,
		title: 'エポキシ樹脂を流し込む',
		note: 'ポッティングでメイン基板を湿気や結露から守ります'
	},
	{
		t: 28.0,
		title: '基板の下から、基板の上まで',
		note: 'すべての部品が覆われるまで樹脂を満たします'
	},
	{
		t: 30.2,
		title: 'ケーブルの通り道の手前で止める',
		note: 'I2Cコネクタはケーブルを挿せるよう露出させます'
	},
	{ t: 32.5, title: '古い単3電池を取り出す', note: '' },
	{ t: 36.0, title: '新しい単3電池を入れる', note: '' },
	{ t: 39.2, title: '電源オン', note: 'ステータスLEDが1回点滅して、正常な起動を知らせます' },
	{ t: 40.8, title: '先に本体カバーを取り付ける', note: '脱落防止ネジ5本' },
	{ t: 45.4, title: 'センサーを戻す', note: 'QWIICケーブルを差し直します' },
	{ t: 49.4, title: 'センサーカバーを取り付ける', note: '脱落防止ネジ3本' },
	{ t: 54.0, title: 'プレハブ冷蔵庫', note: '4つのマグネットで壁面に固定' },
	{ t: 66.0, title: 'ポールへの取り付け', note: '背面の樹脂ブラケットとバンドクランプでポールに固定' }
];

/** the chapter bar under the stage */
export const CHAPTERS: { t: number; label: string }[] = [
	{ t: 0, label: 'センサーカバー' },
	{ t: 8.0, label: 'センサー' },
	{ t: 14.0, label: '本体カバー' },
	{ t: 19.6, label: 'メイン基板' },
	{ t: 32.5, label: '電池交換' },
	{ t: 40.8, label: '組み立て' },
	{ t: 54.0, label: '冷蔵庫の壁' },
	{ t: 66.0, label: 'ポール' }
];
