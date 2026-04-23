export type Metric = { v: string; unit: string; l: string };
export type Readout = { k: string; v: string; cls: '' | 'warn' | 'neutral' };
export type Quote = { text: string; who: string };
export type CaseStudy = {
	id: string;
	sector: 'cold' | 'hosp' | 'ag' | 'live';
	bc: string[];
	status: string;
	company: string;
	logoTxt: string;
	clientMeta: string;
	headline: string;
	problem: string;
	solution: string;
	quote: Quote;
	metrics: Metric[];
	tags: string[];
	readout: Readout[];
};

export const CS_DATA: Record<'en' | 'ja', CaseStudy[]> = {
	en: [
		{
			id: '01',
			sector: 'cold',
			bc: ['Cold Chain', 'Reefer Logistics'],
			status: 'Live · 312 sensors',
			company: 'Hinode Reefer Lines',
			logoTxt: 'HR',
			clientMeta: 'Kobe · 90 vehicles · 4 distribution centres',
			headline: 'Compressor failures caught in <em>minutes</em>, not overnight.',
			problem:
				'Frozen-seafood distributor was losing up to two pallets per month to silent compressor failures discovered the next morning. Staff paper-logging temperatures four times a shift.',
			solution:
				'CW-AIR-TH sensors inside every trailer + walk-in freezer, LINE alerts to duty managers, automatic HACCP audit trail.',
			quote: {
				text: '"We recovered the first pallet within six weeks. The alert came at 02:17; the repair tech was on-site by 04:00. Nothing thawed."',
				who: 'Operations Director, Hinode Reefer Lines'
			},
			metrics: [
				{ v: '¥4.2M', unit: '/yr', l: 'Recovered spoilage' },
				{ v: '¥0', unit: '', l: 'Lost pallets, 11 months' },
				{ v: '−87%', unit: '', l: 'Manual log time' }
			],
			tags: ['CW-AIR-TH', 'CW-GW-OUT', 'LINE alerts', 'HACCP export'],
			readout: [
				{ k: 'Freezer A · -22.1 °C', v: 'OK', cls: '' },
				{ k: 'Freezer B · -18.4 °C', v: 'WARN', cls: 'warn' },
				{ k: 'Freezer C · -23.8 °C', v: 'OK', cls: '' },
				{ k: 'Trailer #47 · -20.9 °C', v: 'OK', cls: '' },
				{ k: 'Uptime (30d)', v: '99.98%', cls: 'neutral' }
			]
		},
		{
			id: '02',
			sector: 'hosp',
			bc: ['Hospitality', 'Ryokan Chain'],
			status: 'Live · 84 sensors',
			company: 'Yutorelo Onsen Group',
			logoTxt: 'YO',
			clientMeta: 'Kyushu · 6 properties · 312 guest rooms',
			headline: 'One dashboard across <em>six onsens</em>, from Kagoshima to Oita.',
			problem:
				'Six ryokans with six different HVAC systems. Housekeeping was the only visibility into guest-room climate; complaints arrived after checkout.',
			solution:
				'Wireless sensors in every guest room + bath area. Housekeeping app shows rooms drifting out of comfort band before guests notice. Manager dashboards roll up all six sites.',
			quote: {
				text: '"We see the problem on the phone before the guest rings the bell. Complaints about room temperature dropped 73% in the first quarter."',
				who: 'GM, Yutorelo Beppu'
			},
			metrics: [
				{ v: '−73%', unit: '', l: 'Climate complaints' },
				{ v: '+0.4', unit: '★', l: 'Average review rating' },
				{ v: '6', unit: 'sites', l: 'Unified dashboard' }
			],
			tags: ['CW-AIR-TH', 'CW-CTH (CO₂)', 'CW-GW-IN', 'Comfort band alerts'],
			readout: [
				{ k: 'Beppu · 312 rooms', v: 'OK', cls: '' },
				{ k: 'Kurokawa · 48 rooms', v: 'OK', cls: '' },
				{ k: 'Yufuin · Room 214', v: '26.8 °C', cls: 'warn' },
				{ k: 'Kagoshima · 96 rooms', v: 'OK', cls: '' },
				{ k: 'Network uptime', v: '99.99%', cls: 'neutral' }
			]
		},
		{
			id: '03',
			sector: 'ag',
			bc: ['Agriculture', 'Greenhouse Tomato'],
			status: 'Live · 147 sensors',
			company: 'Midori Farm Co-op',
			logoTxt: 'MF',
			clientMeta: 'Miyazaki · 14 growers · 18 ha under glass',
			headline: 'Yields up <em>11%</em>, energy cost down <em>18%</em>.',
			problem:
				'Fourteen independent growers, each tuning their greenhouse by gut feel. No way to benchmark one house against another or share what was working.',
			solution:
				'Climate + CO₂ sensors in every house, shared benchmarking dashboard. Growers see anonymised neighbour data, compare strategies, and tune boilers based on real CO₂ uptake.',
			quote: {
				text: '"I could see my neighbour\'s CO₂ curve without seeing his name. I changed my boiler schedule, and my February harvest was 11% bigger."',
				who: 'Tomato grower, Miyazaki'
			},
			metrics: [
				{ v: '+11%', unit: '', l: 'Yield (Feb harvest)' },
				{ v: '−18%', unit: '', l: 'Energy per kg fruit' },
				{ v: '14', unit: 'farms', l: 'Shared benchmark' }
			],
			tags: ['CW-CTH (CO₂)', 'CW-AIR-TH', 'CW-GW-OUT', 'Cross-farm benchmarking'],
			readout: [
				{ k: 'House 03 · CO₂', v: '842 ppm', cls: '' },
				{ k: 'House 03 · Temp', v: '23.1 °C', cls: '' },
				{ k: 'House 07 · Humidity', v: '78 %RH', cls: 'warn' },
				{ k: 'Frost alerts (30d)', v: '4 caught', cls: 'neutral' }
			]
		},
		{
			id: '04',
			sector: 'live',
			bc: ['Livestock', 'Poultry Barn'],
			status: 'Live · 56 sensors',
			company: 'Sakura Poultry',
			logoTxt: 'SP',
			clientMeta: 'Kagoshima · 4 barns · 180,000 birds',
			headline: 'Heat-stress mortality cut by <em>4.2×</em>.',
			problem:
				'Summer heat-stress events were causing mass mortality during afternoon peaks. Ventilation was thermostat-driven — responding after the barn was already too hot.',
			solution:
				'THI (Temperature-Humidity Index) sensors at bird height. Alerts fire 30 minutes before a threshold is crossed, giving staff time to pre-cool before the peak.',
			quote: {
				text: '"The old thermostat was reactive. The new system is predictive. Last summer we lost 170 birds. The summer before, on worse weather, we lost 720."',
				who: 'Farm manager, Sakura Poultry'
			},
			metrics: [
				{ v: '−76%', unit: '', l: 'Heat-stress mortality' },
				{ v: '30 min', unit: '', l: 'Pre-emptive lead time' },
				{ v: '−12%', unit: '', l: 'Ventilation energy' }
			],
			tags: ['CW-AIR-TH', 'THI calculation', 'Predictive alerts', 'Barn-level rollup'],
			readout: [
				{ k: 'Barn 1 · THI', v: '72.1', cls: '' },
				{ k: 'Barn 2 · THI', v: '78.4', cls: 'warn' },
				{ k: 'Barn 3 · Ventilation', v: 'ON', cls: 'neutral' },
				{ k: 'Next peak', v: '14:30 JST', cls: 'neutral' }
			]
		},
		{
			id: '05',
			sector: 'cold',
			bc: ['Cold Chain', 'Pharma'],
			status: 'Live · 42 sensors',
			company: 'Tsurugaoka Pharmacy Group',
			logoTxt: 'TP',
			clientMeta: 'Tokyo · 18 branches · GMP-regulated cold storage',
			headline: '<em>100%</em> audit compliance. Zero spreadsheets.',
			problem:
				'Eighteen pharmacies, each keeping paper logs of vaccine fridges twice daily. Audits took a day of spreadsheet work per site. Occasional missed entries were forcing costly stock destruction.',
			solution:
				'High-accuracy CW-TTH sensors (±0.1 °C) in every fridge. Tamper-proof cloud log. One-click audit PDF per fridge, per month.',
			quote: {
				text: '"Our last GMP inspection took 20 minutes. The inspector said it was the cleanest log trail she had seen in a decade."',
				who: 'Quality Lead, Tsurugaoka Pharmacy'
			},
			metrics: [
				{ v: '100%', unit: '', l: 'Audit pass rate' },
				{ v: '−96%', unit: '', l: 'Audit-prep time' },
				{ v: '0', unit: '', l: 'Stock destroyed (12mo)' }
			],
			tags: ['CW-TTH (±0.1°C)', 'Tamper-proof log', 'GMP audit export', 'CW-GW-IN'],
			readout: [
				{ k: 'Shibuya · Fridge 1', v: '4.1 °C', cls: '' },
				{ k: 'Shibuya · Fridge 2', v: '3.8 °C', cls: '' },
				{ k: 'Ueno · Freezer', v: '−21.0 °C', cls: '' },
				{ k: 'GMP log chain', v: 'VERIFIED', cls: 'neutral' }
			]
		}
	],
	ja: [
		{
			id: '01',
			sector: 'cold',
			bc: ['コールドチェーン', '冷凍物流'],
			status: '稼働中・センサー312台',
			company: '日の出冷凍ライン',
			logoTxt: '日',
			clientMeta: '神戸・車両90台・物流拠点4',
			headline: 'コンプレッサー故障を<em>数分</em>で検知。翌朝まで放置なし。',
			problem:
				'冷凍海産物の物流業者。コンプレッサーの無音故障により、月に最大2パレットを廃棄していた。スタッフは1シフトに4回、紙で温度を記録。',
			solution:
				'全トレーラーと冷凍庫にCW-AIR-THを設置。LINEで当直マネージャーへアラート送信、HACCP監査証跡を自動生成。',
			quote: {
				text: '「導入6週間で最初の1パレットを救えました。深夜2時17分にアラートが鳴り、4時には修理技術者が到着。解凍はゼロでした。」',
				who: '日の出冷凍ライン 運営ディレクター'
			},
			metrics: [
				{ v: '¥420万', unit: '/年', l: '回収した廃棄損失' },
				{ v: '¥0', unit: '', l: '損失パレット（11ヶ月間）' },
				{ v: '−87%', unit: '', l: '手動記録時間' }
			],
			tags: ['CW-AIR-TH', 'CW-GW-OUT', 'LINEアラート', 'HACCP出力'],
			readout: [
				{ k: '冷凍庫A・-22.1 ℃', v: 'OK', cls: '' },
				{ k: '冷凍庫B・-18.4 ℃', v: 'WARN', cls: 'warn' },
				{ k: '冷凍庫C・-23.8 ℃', v: 'OK', cls: '' },
				{ k: 'トレーラー#47・-20.9 ℃', v: 'OK', cls: '' },
				{ k: '稼働率（30日）', v: '99.98%', cls: 'neutral' }
			]
		},
		{
			id: '02',
			sector: 'hosp',
			bc: ['ホスピタリティ', '温泉旅館チェーン'],
			status: '稼働中・センサー84台',
			company: 'ゆとれろ温泉グループ',
			logoTxt: 'ゆ',
			clientMeta: '九州・6施設・客室312室',
			headline: '<em>6つの温泉宿</em>を鹿児島から大分まで1つのダッシュボードで。',
			problem:
				'6つの旅館で、6種類のHVAC。客室環境を把握できるのは客室清掃スタッフだけで、苦情はチェックアウト後に届く状態。',
			solution:
				'全客室と浴場にワイヤレスセンサーを設置。客室清掃アプリが快適域を外れた部屋をゲストより先に表示。支配人ダッシュボードで6施設を統合管理。',
			quote: {
				text: '「お客様が呼び鈴を鳴らす前に、スマホで問題が見えます。室温に関する苦情は第1四半期で73%減りました。」',
				who: 'ゆとれろ別府 総支配人'
			},
			metrics: [
				{ v: '−73%', unit: '', l: '室温苦情' },
				{ v: '+0.4', unit: '★', l: '平均レビュー評価' },
				{ v: '6', unit: '拠点', l: '統合ダッシュボード' }
			],
			tags: ['CW-AIR-TH', 'CW-CTH (CO₂)', 'CW-GW-IN', '快適域アラート'],
			readout: [
				{ k: '別府・312室', v: 'OK', cls: '' },
				{ k: '黒川・48室', v: 'OK', cls: '' },
				{ k: '由布院・214号室', v: '26.8 ℃', cls: 'warn' },
				{ k: '鹿児島・96室', v: 'OK', cls: '' },
				{ k: 'ネットワーク稼働率', v: '99.99%', cls: 'neutral' }
			]
		},
		{
			id: '03',
			sector: 'ag',
			bc: ['農業', '施設トマト栽培'],
			status: '稼働中・センサー147台',
			company: 'みどりファーム共同組合',
			logoTxt: 'み',
			clientMeta: '宮崎・生産者14戸・施設18ha',
			headline: '収量<em>+11%</em>、エネルギーコスト<em>−18%</em>。',
			problem: '14戸の独立農家が、それぞれ経験と勘でハウスを管理。比較データも共有データもなし。',
			solution:
				'各ハウスに気候+CO₂センサーを設置。匿名化された隣接農家データをダッシュボードで共有。CO₂吸収に基づくボイラー制御の最適化。',
			quote: {
				text: '「名前を伏せた隣のCO₂カーブが見えました。ボイラーのスケジュールを変えたら、2月の収穫が11%増えました。」',
				who: '宮崎県・トマト生産者'
			},
			metrics: [
				{ v: '+11%', unit: '', l: '収量（2月出荷）' },
				{ v: '−18%', unit: '', l: '1kgあたりエネルギー' },
				{ v: '14', unit: '戸', l: '共通ベンチマーク' }
			],
			tags: ['CW-CTH (CO₂)', 'CW-AIR-TH', 'CW-GW-OUT', '農家間ベンチマーク'],
			readout: [
				{ k: 'ハウス03・CO₂', v: '842 ppm', cls: '' },
				{ k: 'ハウス03・温度', v: '23.1 ℃', cls: '' },
				{ k: 'ハウス07・湿度', v: '78 %RH', cls: 'warn' },
				{ k: '霜害警報（30日）', v: '4件検知', cls: 'neutral' }
			]
		},
		{
			id: '04',
			sector: 'live',
			bc: ['畜産', '養鶏'],
			status: '稼働中・センサー56台',
			company: 'さくらポートリー',
			logoTxt: 'さ',
			clientMeta: '鹿児島・鶏舎4棟・18万羽',
			headline: '暑熱ストレスによる斃死を<em>4.2倍</em>削減。',
			problem:
				'夏の午後ピークに暑熱ストレスで大量斃死。サーモスタット式換気では、鶏舎が熱くなってから反応する状態。',
			solution:
				'THI（温湿度指数）センサーを鳥の頭上に設置。しきい値到達の30分前にアラート発報、ピーク前の予冷が可能に。',
			quote: {
				text: '「従来のサーモは反応型、新システムは予測型。昨夏の斃死は170羽。一昨年はもっと暑くないのに720羽失いました。」',
				who: 'さくらポートリー 農場長'
			},
			metrics: [
				{ v: '−76%', unit: '', l: '暑熱ストレス斃死' },
				{ v: '30分', unit: '', l: '事前対応時間' },
				{ v: '−12%', unit: '', l: '換気エネルギー' }
			],
			tags: ['CW-AIR-TH', 'THI計算', '予測アラート', '鶏舎単位集計'],
			readout: [
				{ k: '鶏舎1・THI', v: '72.1', cls: '' },
				{ k: '鶏舎2・THI', v: '78.4', cls: 'warn' },
				{ k: '鶏舎3・換気', v: 'ON', cls: 'neutral' },
				{ k: '次ピーク', v: '14:30 JST', cls: 'neutral' }
			]
		},
		{
			id: '05',
			sector: 'cold',
			bc: ['コールドチェーン', '医薬品'],
			status: '稼働中・センサー42台',
			company: '鶴ヶ岡薬局グループ',
			logoTxt: '鶴',
			clientMeta: '東京・18店舗・GMP対応冷蔵保管',
			headline: '監査適合<em>100%</em>。スプレッドシートはゼロ。',
			problem:
				'18店舗で、ワクチン冷蔵庫の紙ログを1日2回記録。監査準備にはサイトごとに1日分のスプレッドシート作業。記録漏れで在庫廃棄も発生。',
			solution:
				'全冷蔵庫に高精度CW-TTH（±0.1 ℃）を設置。改ざん不能なクラウドログ。冷蔵庫・月単位のPDF監査書をワンクリック生成。',
			quote: {
				text: '「直近のGMP査察は20分で終わりました。査察官は「10年間で最もクリーンなログだ」と。」',
				who: '鶴ヶ岡薬局 品質責任者'
			},
			metrics: [
				{ v: '100%', unit: '', l: '監査合格率' },
				{ v: '−96%', unit: '', l: '監査準備時間' },
				{ v: '0', unit: '', l: '廃棄在庫（12ヶ月）' }
			],
			tags: ['CW-TTH (±0.1℃)', '改ざん不能ログ', 'GMP監査出力', 'CW-GW-IN'],
			readout: [
				{ k: '渋谷・冷蔵庫1', v: '4.1 ℃', cls: '' },
				{ k: '渋谷・冷蔵庫2', v: '3.8 ℃', cls: '' },
				{ k: '上野・冷凍庫', v: '−21.0 ℃', cls: '' },
				{ k: 'GMPログ連鎖', v: 'VERIFIED', cls: 'neutral' }
			]
		}
	]
};
