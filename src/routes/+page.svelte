<script lang="ts">
	import PricingJa from '$lib/components/pricing/PricingJa.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import StandardsBanner from '$lib/components/StandardsBanner.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import { videoObjectSchema } from '$lib/seo/schema';

	// Home-page product video. VideoObject only emits once a real uploadDate is
	// set (Google requires it) - left blank to avoid shipping an invalid date.
	const HOME_VIDEO = {
		name: 'CropWatch 産業用グレードIoT 環境モニタリング',
		description:
			'コールドチェーン、製造、ホスピタリティ向けの堅牢な産業用IoT。長距離センサー、LoRaWAN ゲートウェイ、アナリティクスの紹介動画。',
		uploadDate: '', // TODO(confirm): 'YYYY-MM-DD' publish date of youtu.be/iiGCBuoFF20
		embedUrl: 'https://www.youtube.com/embed/iiGCBuoFF20',
		thumbnailUrl: 'https://i.ytimg.com/vi/iiGCBuoFF20/maxresdefault.jpg'
	};
	const videoLd = HOME_VIDEO.uploadDate ? videoObjectSchema(HOME_VIDEO) : null;
</script>

<svelte:head>
	<title>CropWatch® | 投資対効果に直結する産業用グレードIoT</title>
	<meta
		name="description"
		content="コールドチェーン、製造、ホスピタリティ向けの堅牢な産業用 IoT。オペレーションのリーダーが信頼する長距離センサー、LoRaWAN ゲートウェイ、アナリティクスを展開しましょう。"
	/>
	<meta property="og:image" content="https://cropwatch.io/favicon.svg" />
	<meta property="og:site_name" content="CropWatch" />
	<meta property="og:type" content="website.home" />
	<meta property="og:title" content="CropWatch" />
	<meta property="og:description" content="Quality Temperature Monitoring Devices" />
	<meta property="og:url" content="https://www.cropwatch.com/" />
</svelte:head>

{#if videoLd}
	<JsonLd data={videoLd} />
{/if}

<section id="slider" class="bg-[#11213c]">
	<Slider />
	<StandardsBanner />
</section>

<section class="relative overflow-hidden bg-white py-10">
	<div
		class="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-[#11213c]/10 to-transparent"
		aria-hidden="true"
	></div>
	<div class="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4">
		<div class="grid gap-12 md:grid-cols-[1.35fr_1fr] md:items-start">
			<div class="flex h-full flex-col gap-6">
				<p class="text-sm font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
					投資対効果に直結する産業用 IoT
				</p>
				<h1 class="text-4xl font-semibold tracking-tight text-[#0b1730] md:text-5xl">
					CropWatch<sup><small>®</small></sup> が選ばれる理由
				</h1>
				<p class="text-lg leading-relaxed md:text-xl text-[#15284a]/80">
					CropWatch<sup><small>®</small></sup> は、温湿度管理に特化した堅牢なセンサーとLoRaWAN<sup><small>®</small></sup> を統合し、-40°C〜+80°Cの過酷な環境でも一貫したデバイス信頼性とデータ精度を提供します。他のシステムでは困難な場所での計測を可能にし、巡回作業の削減、監査の高速化、長寿命かつメンテナンス不要な設計により運用コストを大幅に削減します。
				</p>
				<div
					class="grid gap-3 rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-6 text-md text-[#1c2d52] md:grid-cols-2"
				>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>巡回作業やデータの記録に、余計な人件費や工数がかかっていませんか？</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>通信が届かず、いまだに計測できない場所は残っていませんか？</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>故障するたびに新品の機器を購入し、運用コストが上がっていませんか？</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>現在のセンサーは、バッテリーのみで数年間動き続けますか？</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>機器のメンテナンスに時間をかけていませんか？</p>
					</div>
					<div class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<p>コンプライアンス対応や監査のとき、必要なデータをすぐに提出できますか？</p>
					</div>
				</div>

				<!--VIDEO EXAMPLES SECTION-->
				<div>
					<iframe
						class="w-full rounded-2xl border border-[#d7e0f5] shadow-lg shadow-[#0b1730]/5"
						height="400"
						src="https://www.youtube.com/embed/iiGCBuoFF20?si=ZgLpXY30PN0RTVqn"
						title="YouTube video player"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						referrerpolicy="strict-origin-when-cross-origin"
						allowfullscreen
					></iframe>
				</div>

				<div class="mt-auto flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						ライブデモを予約
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-6 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f5387]"
					>
						お客様の成果を見る
					</a>
				</div>
			</div>
			<div
				class="h-full rounded-3xl border border-[#d7e0f5] bg-white p-8 shadow-lg shadow-[#0b1730]/5"
			>
				<h2 class="text-2xl text-center font-semibold text-[#0b1730]">巡回・記録・管理作業を全て自動化</h2>
				<hr class="my-4 border-[#d7e0f5]" />
				<div class="space-y-6 text-sm text-[#1c2d52]">
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
							<p class="text-lg font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								データ収集
							</p>
							<ul class="mt-4 text-md space-y-3 text-[#1c2d52]/80">
								<li>10分間隔でデータを収集。トラブルや機器故障に気付かない空白時間をゼロにし、異常検知時は即座にアラートを発信します。</li>
								<li> </li>
								<li> </li>
							</ul>
						</div>
						<div class="rounded-2xl border border-transparent bg-[#0b1730] p-5 text-white">
							<p class="text-lg font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
								データ管理
							</p>
							<ul class="mt-4 space-y-3 text-white/80">
								<li>全てのデータは自動で保存され、直近2年分はCSV形式でダウンロード可能。記録の付け忘れや転記作業をゼロにします。</li>
								<li> </li>
								<li> </li>
							</ul>
						</div>
					</div>
					<div class="grid gap-4 sm:grid-cols-2">
						<div class="rounded-2xl border border-[#d7e0f5] bg-white p-5">
							<p class="text-lg font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								レポート作成
							</p>
							<p class="mt-2 text-2xl font-semibold text-[#0b1730]">

							</p>
							<p class="mt-2 text-[#1c2d52]/70">
								レポートを自動で作成し、指定先に送信します。日常の管理がより楽になるとともに、データ確認や監査対応もスムーズに行えます。
							</p>
						</div>
						<div class="rounded-2xl border border-[#d7e0f5] bg-white p-5">
							<p class="text-lg font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
								アクセス権限
							</p>
							<p class="mt-2 text-2xl font-semibold text-[#0b1730]">

							</p>
							<p class="mt-2 text-[#1c2d52]/70">
								ユーザー数に制限はなく、管理者・ユーザー・閲覧者の3段階の権限に対応。組織内の役割に応じて、安全かつ柔軟に設定できます。
							</p>
						</div>
					</div>
					<div class="rounded-2xl border border-[#d7e0f5] bg-[#f5f7fb] p-5">
						<p class="text-lg font-semibold tracking-[0.22em] text-[#2f5387] uppercase">
							管理業務を一元化
						</p>
						<ul class="mt-3 space-y-3 text-[#1c2d52]/80">
							<li>データ収集・保存・レポート作成・権限管理までをすべて自動化。現場の温湿度データを一元管理し、巡回記録やデータ整理の手間を削減します。ユーザー数に制限なく利用でき、巡回作業の削減、監査対応の高速化、運用コスト削減といった効果を導入初日から定量的に把握できます。</li>
							<li> </li>
							<li> </li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div>
			<h2 class="py-4 text-center text-3xl font-semibold text-[#0b1730]">
				CropWatch センサーの特長
			</h2>
			<section
				class="grid gap-8 rounded-3xl border border-[#d7e0f5] bg-[#0b1730] px-6 py-10 md:grid-cols-3 md:px-10"
			>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						高い耐久性
					</p>
					<h3 class="text-xl font-semibold text-white">
						過酷な環境でも動き続ける堅牢設計
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>「現場で壊れない」を前提に、温度・湿度・衝撃に強い部品だけを採用</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>基板全面に防湿コーティングを施し、結露・高湿度・腐食環境でも長期間安定した動作を維持</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>低温環境に対応した食品安全仕様の筐体で、冷蔵・冷凍環境でも安心して使用可能</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						データの信頼性
					</p>
					<h3 class="text-xl font-semibold text-white">
						長期安定精度を実現するデュアルセンサー方式
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>2つの独立したセンサーが健全性を照合し、信頼性が確認された場合のみ測定値を送信</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>内部メモリの校正データに基づき自動補正を行うため、再校正は不要</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>各デバイスに対し、ISO17025認証取得の3点温度個別校正証明書を提供</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
				<article class="flex flex-col space-y-4 text-white/90">
					<p class="text-xs font-semibold tracking-[0.22em] text-[#f2a516] uppercase">
						必要なパーツだけを更新
					</p>
					<h3 class="text-xl font-semibold text-white">
						運用コストを下げる構造設計
					</h3>
					<ul class="space-y-3 text-sm leading-relaxed">
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>超低消費電力設計により、頻繁な電池交換は不要。電池は現場で交換可能</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>センサー故障時は必要な部品だけを交換でき、本体の買い替えは不要</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 h-2 w-2 rounded-full bg-white/60"></span>
							<span>ゲートウェイ1台で多数センサーの同時接続に対応</span>
						</li>
					</ul>
					<span class="flex-grow"></span>
				</article>
			</section>
		</div>
	</div>
</section>

<section class="bg-[#f5f7fb] py-20">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mb-12 text-center">
			<p class="text-xs font-semibold tracking-[0.32em] text-[#2f5387] uppercase">
				活用分野
			</p>
			<h2 class="mt-4 text-3xl font-semibold text-[#0b1730]">
				屋内・屋外、あらゆる現場に対応
			</h2>
			<p class="mt-3 text-base text-[#1c2d52]/80">
				当社のデータは、厳格な規制や正確な温湿度管理が求められる現場で利用されています。
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-3">
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🧊</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					コールドチェーン
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					厳しい温度帯でも記録を途切れさせない。 冷凍・冷蔵製品の品質とコンプライアンスを守ります。
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🖼️</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					文化施設
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					美術品や資料を最適な環境で保護。温湿度の安定が求められる空間を確実に守ります。
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🐔</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					農畜産業
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					広大な敷地や離れた場所でもリアルタイムに環境を把握し、健康と生産性を守ります。
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🏭</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					製造・加工
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					温湿度が品質を左右する現場で、精密なモニタリングが安全な生産を支えます。
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">📦</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					倉庫・物流
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					輸送時の環境を見える化。製品劣化や証跡管理のトラブルを防ぎ、安心の保管環境を支えます。
				</p>
			</div>
			<div
				class="rounded-3xl border border-[#d7e0f5] bg-white p-6 text-center shadow-sm shadow-[#0b1730]/5 transition hover:-translate-y-1 hover:shadow-md"
			>
				<div class="text-3xl">🧓</div>
				<p class="mt-4 text-base font-semibold text-[#0b1730]">
					教育・介護施設
				</p>
				<p class="mt-2 text-sm text-[#1c2d52]/70">
					急激な変化を早期に検知し、迅速な対応を支援します。
				</p>
			</div>
		</div>
	</div>
</section>

<section class="bg-white py-20">
	<PricingJa />
</section>

<section class="relative overflow-hidden bg-[#0b1730] py-20">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-5xl px-4 text-center text-white">
		<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
			ROIを証明する準備はできましたか？
		</p>
		<h2 class="mt-5 text-3xl font-semibold md:text-4xl">
			数字だけでは測れない“安心”と“信頼”を。CropWatch® が運用の死角を作らない監視構造を提供します。
		</h2>
		<p class="mt-4 text-base text-white/80">
			現場の電波状況を調査し、最適な通信設計を実施。経営判断に役立つ導入プランをご提案します。
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				戦略セッションを予約
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
