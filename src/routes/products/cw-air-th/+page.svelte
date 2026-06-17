<script lang="ts">
	import ProductOrigin from '$lib/components/product-origin.svelte';
	import deviceSideViewImage from './images/device-side-view.webp';
	import crossValidationDiagram from './images/crossvalidate.webp';
	import flyerDocument from './downloads/温度管理.pdf?url';
	import csvDataSample from './downloads/CSV-Example.csv?url';
</script>

<svelte:head>
	<title>CropWatch CW Air TH | 産業用温湿度センサー</title>
	<meta
		name="description"
		content="CW Air TH センサーを導入して、コールドストレージ、ホスピタリティ、産業環境全体で信頼性の高い温度・湿度監視を実現しましょう。"
	/>
	<meta property="og:image" content="https://cropwatch.io/favicon.svg" />
	<meta property="og:site_name" content="CropWatch" />
	<meta property="og:type" content="website.product" />
	<meta property="og:title" content="CW-AIR-TH Sensor from CropWatch" />
	<meta
		property="og:description"
		content="The highest quality temperature and humidity monitoring sensor on the market today."
	/>
	<meta property="og:url" content="https://www.cropwatch.com/products/cw-air-th" />
	<meta property="og:locale" content="ja_JP" />
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					CW-Air-TH 温度湿度ー
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					信頼できるモニタリングを、もっと確実に
				</h1>
				<p class="text-base text-white/80">CW Air TH センサーは高精度センシング、長寿命電源、LoRaWAN 接続を組み合わせ、コールドストレージやホスピタリティ、産業拠点の状況をリアルタイムに可視化します。</p>
				<p class="text-base text-white/80">CropWatch Command の一部として導入すれば、プロアクティブなアラート、コンプライアンス文書化、そしてすべての施設で予測可能な運用を同時に実現できます。</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						専門家に相談する
					</a>
					<a
						href="/demo"
						class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						プラットフォームのデモを見る
					</a>
				</div>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">
					要求の厳しい現場のため設計
				</h2>
				<picture>
					<source srcset={deviceSideViewImage} type="image/webp" />
					<img
						src={deviceSideViewImage}
						alt="CW Air TH センサーの側面"
						class="mt-4 w-full rounded-lg border border-white/10 shadow-md shadow-black/20"
					/>
				</picture>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>HACCP、FDA、ISO に準拠したプログラムで検証済み。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>CropWatch<sup><small>®</small></sup> ゲートウェイ向けにプリプロビジョニング済みで、手動設定を不要にします。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>CropWatch<sup><small>®</small></sup> Command から予測分析とアラート配信にアクセス。</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			主な特長
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			信頼できるコールドチェーンモニタリング
		</h2>

		<section class="cold-chain-hero" aria-labelledby="cold-chain-heading">
			<p class="mt-4 text-[#0b1730]/80">
				当社のコールドチェーンセンサーは、実環境の中でも特に過酷な条件で行う<strong>徹底したテスト</strong>を経て他社との差別化を実現しています。センサーやデバイスの故障を防ぎ、極限環境でもデータの完全性を守るなど、あらゆる設計判断が信頼性を基準に行われています。
			</p>
			<p class="my-4 mt-4 text-[#0b1730]/80">
				一般的なデバイスとは異なり、当社のシステムには<strong>インテリジェントなクロスバリデーション機構</strong>が備わっており、センサー精度を常に検証し、問題になる前に異常を検知します。つまり、重要な問いである <em>「センサーが正しい値を報告しなくなったらどうなるのか？」</em> に確実に答えます。
			</p>
			<p class="mt-4 text-[#0b1730]/80">
				CropWatch の目的はシンプルです。<strong>業界で最も信頼性が高く正確なコールドチェーンデータを提供すること</strong>。データに裏付けられた確信を持って意思決定できるよう支援します。
			</p>
		</section>

		<div class="mt-12 grid gap-10 text-[#1c2d52]/80 md:grid-cols-[1.05fr_1fr] md:items-center">
			<div class="space-y-4">
				<h3 class="text-2xl font-semibold text-[#0b1730]">
					安全運用を支えるクロスバリデーション & フェイルストップ
				</h3>
				<p>CW-Air-TH は交換可能なセンサー同士を常にクロスチェックし、ダッシュボードに届く前にすべての値を検証します。一次プローブがドリフトしたり許容範囲を外れたりすると、即座に異常としてフラグを立て通知します。</p>
				<ul class="space-y-3 text-sm">
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>デュアルチャネル比較でライブテレメトリを相互検証。</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>自動フェイルストップで、不正確なデータがダッシュボードに届く前に遮断。</span>
					</li>
					<li class="flex gap-3">
						<span class="mt-1 h-2 w-2 flex-none rounded-full bg-[#f2a516]"></span>
						<span>例外イベントはコンプライアンスログへ即同期し、監査に必要な検証記録を提示。</span>
					</li>
				</ul>
			</div>
			<picture class="order-first md:order-none md:justify-self-end">
				<source srcset={crossValidationDiagram} type="image/webp" />
				<img
					src={crossValidationDiagram}
					alt="交換可能なセンサーをクロスバリデーションする CW Air TH の図解"
					class="w-full max-w-md rounded-3xl border border-[#d7e0f5] bg-white p-4 shadow-sm shadow-[#0b1730]/10"
				/>
			</picture>
		</div>

		<div class="mt-10 grid gap-6 text-sm text-[#1c2d52]/80 md:grid-cols-2">
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					産業用堅牢エンクロージャ
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">IP67 の筐体と防湿コーティング済み電子基板で、冷凍庫や荷捌き場、生産フロアでもセンサーが稼働し続けます。</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					高精度モニタリング
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">高精度デジタルセンサーが ±0.2°C の温度、±2% RH の湿度測定を提供し、コンプライアンス対応のレポートを可能にします。</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					マルチイヤーのバッテリー寿命
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">フィールド交換可能なリチウムバッテリーと低消費電力ファームウェアにより、10 年以上の連続テレメトリを実現します。</p>
			</div>
			<div class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 shadow-sm shadow-[#0b1730]/5">
				<p class="text-base font-semibold text-[#0b1730]">
					LoRaWAN 接続
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/80">堅牢な LoRaWAN 接続で、密集した設備や断熱材の厚いコールドストレージでも安定した送信を維持します。</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			技術仕様
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			信頼性を前提に設計
		</h2>
		<div
			class="mt-8 overflow-hidden rounded-3xl border border-[#d7e0f5] bg-white shadow-sm shadow-[#0b1730]/5"
		>
				<table class="w-full text-left text-sm text-[#1c2d52]/80">
					<tbody>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>センサー</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">Sensirion x1 SHT40 & x1 SHT43、True NIST、ISO17025 認証付き</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>温度範囲</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								-40°C 〜 85°C (キャリブレーション済み)
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>湿度範囲</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								0% 〜 100% RH (結露なし)
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>内蔵ヒーター</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">低温環境での結露を防止</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>温度精度</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								-10°C〜50°C で ±0.2°C
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>湿度精度</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								10%〜90% で ±2% RH
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>防水・防塵性能</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">IP67 エンクロージャ</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>無線プロトコル</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">LoRaWAN 1.0.4 クラス A、各地域バンド対応</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>バッテリー</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">Li-SOCl2 (塩化チオニルリチウム)、現場交換可能</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>寸法</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								120 mm × 70 mm × 35 mm
							</td>
						</tr>
						<tr class="border-b border-[#d7e0f5]/80">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>稼働寿命</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								10 分間隔で10 年
							</td>
						</tr>
						<tr class="last:border-none">
							<th
								class="w-1/3 bg-[#f5f7fb] px-6 py-4 text-left text-xs font-semibold tracking-[0.18em] text-[#2f5387] uppercase"
								>認証</th
							>
							<td class="px-6 py-4 text-sm text-[#0b1730]">
								FCC、CE、IC、HACCP 適合素材
							</td>
						</tr>
					</tbody>
				</table>
			</div>
	</div>
</section>

<section class="bg-white py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
					導入キット
				</p>
				<h2 class="text-3xl font-semibold text-[#0b1730]">
					数日で稼働開始できる一式を同梱
				</h2>
				<p class="text-base text-[#1c2d52]/80">
					すべての CW Air TH センサーは事前設定済みで CropWatch<sup><small>®</small></sup> Command に即参加でき、規制対象環境向けに調整した取り付けオプションとドキュメントを同梱しています。
				</p>
			</div>
				<div
					class="rounded-3xl border border-[#d7e0f5] bg-[#f5f7fb] p-8 shadow-sm shadow-[#0b1730]/5"
				>
					<ul class="space-y-4 text-sm text-[#1c2d52]/80">
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>事前設定済みファームウェアを搭載した CW Air TH センサー</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>LoRaWAN アクティベーション認証情報と QR 配備タグ</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>ステンレス製マウンティングブラケット、取付け金具、粘着パッド</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>キャリブレーション証明書と検証ドキュメント</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>設置およびコールドストレージ運用プレイブック</span>
						</li>
					</ul>
				</div>
			</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
			導入方法
		</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
			実績あるロールアウトワークフロー
		</h2>
			<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
				ハイブリッドな導入モデルで工期を短縮しつつ、関係者全員に必要なトレーニング、テレメトリ、レポートを提供します。
			</p>
			<div class="mt-10 grid gap-8 md:grid-cols-4">
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						サイトプランニング
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						CropWatch のスペシャリストが施設ゾーンをマッピングし、ゲートウェイ設置とテレメトリ間隔をコンプライアンス要件に合わせます。
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						迅速な設置
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						技術者が磁石・粘着・ブラケットなどのハードウェアでセンサーを取り付け、生産を止めません。
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						自動バリデーション
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						センサーがベースラインのキャリブレーションチェックを実施し、CropWatch Command に登録して継続監視を開始します。
					</p>
				</div>
				<div class="rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5">
					<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
						インサイト提供
					</p>
					<p class="mt-3 text-sm text-[#1c2d52]/80">
						リアルタイムダッシュボード、アラート、監査対応レポートで、異常をエスカレーション前に解決できます。
					</p>
				</div>
			</div>
		</div>
	</section>

<section id="product-origin">
	<ProductOrigin />
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">Documents</p>
		<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">Downloadable files and resources</h2>
		<p class="mt-4 max-w-3xl text-base text-[#1c2d52]/80">
			Explore our collection of documents, brochures, and technical specifications to learn more
			about CW-Air-TH and its capabilities.
		</p>
		<div class="mt-10 grid gap-3 md:grid-cols-3">
			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					Product Flyer
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					A comprehensive overview of CW-Air-TH features and benefits.
				</p>
				<span class="flex-1"></span>

				<a
					href={flyerDocument}
					download
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Flyer
				</a>
			</div>

			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					Example Report
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					An example report that would be generated by the CropWatch User Interface's Report feature
				</p>
				<span class="flex-1"></span>
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Sample Report
				</a>
			</div>

			<div
				class="flex flex-col rounded-3xl border border-[#d7e0f5] bg-white p-6 shadow-sm shadow-[#0b1730]/5"
			>
				<p class="text-sm font-semibold tracking-[0.18em] text-[#2f5387] uppercase">
					CSV Data Export
				</p>
				<p class="mt-3 mb-2 border-b border-[#d7e0f5] pb-4 text-sm text-[#1c2d52]/80">
					A CSV data export sample from the CropWatch User Interface containing temperature and
					humidity readings.
				</p>
				<span class="flex-1"></span>

				<!--TODO: Download csv file from ./downloads/CSV-Example.csv -->
				<a
					href={csvDataSample}
					download
					class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
				>
					Download Sample Data
				</a>
			</div>
		</div>
	</div>
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			CW Air TH を体験する
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			ウォークスルーを予約するかパイロットを開始
		</h2>
		<p class="mt-4 text-base text-white/80">
			CropWatch<sup><small>®</small></sup> スペシャリストとともに、センサー配置、ゲートウェイ、分析設計を行い、環境のコンプライアンスと効率性を高めましょう。
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				導入計画を相談
			</a>
			<a
				href="/case-studies"
				class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				導入事例を見る
			</a>
		</div>
	</div>
</section>
