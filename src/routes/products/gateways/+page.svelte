<script lang="ts">
	import ug65Image from './images/ug65-lorawan-gateway.png';
	import ug67Image from './images/Milesight-UG67-gateway.png';
	import konaMicroImage from './images/kona-micro.png';
	import konaEnterpriseImage from './images/Enterprise-ISO2-copy-1.png';
	import konaMacroImage from './images/Macro-ISO2-1-1.png';
	import seeedImage from './images/Seeed-m2.png';
	import ezurioImage from './images/LoRaGateway01.webp';
	import milesightLogo from './images/Milesight.png';
	import tektelicLogo from './images/tektelic.svg';
	import ezurioLogo from './images/ezurio.png';
	import seeedLogo from './images/seeed-studio.webp';
</script>

<svelte:head>
	<title>LoRaWAN ゲートウェイ | CropWatch®</title>
	<meta name="description" content="メーカー情報、屋内外の対応、推奨用途をひと目で確認できる CropWatch のゲートウェイ ラインアップです。" />
</svelte:head>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[var(--cw-blue-950)] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]"></div>
	<div class="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 rounded-full bg-[var(--cw-gold-500)]/20 blur-3xl"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
			<div class="space-y-7">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-400)]">
					ゲートウェイラインナップ
				</p>
				<h1 class="text-4xl font-bold leading-tight md:text-5xl">
					用途別に最適化されたゲートウェイ
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					低温環境や屋外設置、金属・コンクリート構造物内など、電波条件が厳しい現場でも安定稼働するLoRaWAN ゲートウェイのみを採用しています。設置前に通信状況を確認し、最適な位置へ設置することで、安定した通信環境を確保します。
				</p>
				<div class="flex flex-wrap gap-4">
					<a
						href="/contact"
						class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						RF 設計を相談する
					</a>
					<a
						href="#lineup"
						class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						ラインアップを確認
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<section id="lineup" class="bg-[#f5f7fb] py-24">
	<div class="mx-auto w-full max-w-6xl px-4">
		<div class="mx-auto max-w-3xl text-center">
			<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-blue-700)]">
				ゲートウェイ一覧
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[var(--cw-blue-950)] md:text-4xl">
				小型ノードからキャリアグレードまで一括供給
			</h2>
			<p class="mt-4 text-base text-slate-600">
				現場の要件に合わせて最適なゲートウェイを組み合わせることで、過剰な設備投資を抑えつつ、強固なLoRaWANカバレッジを実現します。
			</p>
		</div>
		<div class="mt-14 grid gap-10 lg:grid-cols-2">
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ug65Image}
						alt="作業台に置かれた Milesight UG65 ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Milesight UG65 屋内モデル
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋内・半屋外 (IP65)
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Milesight
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={milesightLogo}
										alt="Milesight logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>冷蔵室・品質管理ラボ・製造オフィス</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>ホテルや飲食のバックヤード監視</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>屋上にアクセスできない倉庫のカバレッジ</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						イーサネットと Wi-Fi、LTEを備えた高性能ゲートウェイ。コンパクトで様々な場所で活用できます。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.milesight-iot.com/iot/lorawan-gateway/ug65/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ug67Image}
						alt="屋外ポールに取り付けられた Milesight UG67 ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Milesight UG67 屋外モデル
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋外 (IP67・ポール取付)
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Milesight
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={milesightLogo}
										alt="Milesight logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>風雨にさらされる食品工場の屋上・ヤード</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>数 km に及ぶ農業・物流ルート</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>LTE + Ethernet 冗長バックホールが必要な施設</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						耐雷サージを備えた 8 チャネルゲートウェイ。屋上やヤード、遠隔境界をカバーします。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.milesight-iot.com/iot/lorawan-gateway/ug67/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaMicroImage}
						alt="デスク上の Tektelic KONA Micro ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Tektelic KONA Micro
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋内 (小型/卓上)
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Tektelic
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>小売店舗・ホスピタリティスイート・テストキッチン</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>期間限定の設置やパイロット導入</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>司令室や保守室でのバックアップカバレッジ</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						PoE で動作するコンパクトなゲートウェイ。臨時カバレッジや冗長マイクロセルに最適です。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-micro/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaEnterpriseImage}
						alt="斜めから見た Tektelic KONA Enterprise ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Tektelic KONA Enterprise
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋外 (ラック/壁面)
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Tektelic
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>ネットワーク部門を持つ病院や大学</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>多層のホテルやコンベンションセンター</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>IT 連携が必須の制御室</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						デュアルコンセントレータと LTE フェイルオーバー、SNMP を備えたエンタープライズ向けゲートウェイ。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-enterprise/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={konaMacroImage}
						alt="屋外に設置された Tektelic KONA Macro ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Tektelic KONA Macro
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-emerald-500)] bg-[var(--cw-emerald-900)] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-emerald-900)]">
							屋外 (キャリアグレード)
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Tektelic
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={tektelicLogo}
										alt="Tektelic logo"
										class="object-contain max-w-[60%] pt-5"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>大規模製造キャンパスや港湾</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>数千エーカー規模の農業オペレーション</span>
								</li>
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>SLA 稼働が求められる自治体・公共インフラ</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						長距離カバレッジと冗長ラジオを備え、高い稼働 SLA に対応するキャリアグレード屋外ゲートウェイです。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://tektelic.com/products/gateways/kona-macro/"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={seeedImage}
						alt="SEEED Studio SenseCAP M2 LoRaWAN ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							SenseCAP M2 LoRaWAN Gateway
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋内
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									SEEED Studio
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={seeedLogo}
										alt="Seeed Studio logo"
										class="object-contain max-w-[60%]"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>Wi‑Fi と Ethernet オプション</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						小規模導入やライトな運用に適したコスト効率の高い屋内向けゲートウェイです。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.seeedstudio.com/SenseCAP-M2-LoRaWAN-Gateway-p-5758.html"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
			<article class="flex flex-col overflow-hidden rounded-[28px] border border-white/40 bg-white shadow-xl shadow-slate-200/70">
				<div class="relative flex w-full items-center justify-center overflow-hidden bg-slate-900/5 aspect-[4/3] sm:aspect-[16/10]">
					<div class="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent"></div>
					<img
						src={ezurioImage}
						alt="Ezurio Sentrius RG1xx 屋内ゲートウェイ"
						loading="lazy"
						class="h-full w-full object-contain p-6 sm:p-8 md:p-10"
					/>
				</div>
				<div class="flex flex-1 flex-col gap-5 p-7">
					<div class="flex flex-wrap items-center justify-between gap-4">
						<h3 class="text-2xl font-semibold text-[var(--cw-blue-950)]">
							Sentrius RG1xx Indoor Gateway
						</h3>
						<span class="inline-flex items-center rounded-full border border-[var(--cw-gold-500)]/50 bg-[var(--cw-gold-500)]/15 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--cw-gold-500)]">
							屋内
						</span>
					</div>
					<div class="grid gap-2 sm:grid-cols-2">
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								メーカー
							</p>
							<div class="mt-2 flex flex-col items-start gap-2">
								<span class="text-base font-medium text-slate-900">
									Ezurio Connectivity
								</span>
								<div class="flex w-full items-center justify-center">
									<img
										src={ezurioLogo}
										alt="Ezurio logo"
										class="object-contain max-w-[60%]"
									/>
								</div>
							</div>
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.32em] text-slate-400">
								推奨用途
							</p>
							<ul class="mt-3 space-y-1 text-sm text-slate-700">
								<li class="flex items-start gap-2">
									<span class="mt-1 inline-flex h-2 w-2 rounded-full bg-[var(--cw-gold-500)]"></span>
									<span>Wi‑Fi と Ethernet オプション（米国のみ LTE オプション）</span>
								</li>
							</ul>
						</div>
					</div>
					<p class="text-sm leading-relaxed text-slate-600">
						Sentrius™ RG1xx は安全性・拡張性・堅牢性に優れた LoRaWAN ゲートウェイです。最大 10 マイルのデータ収集と Wi‑Fi/Ethernet 経由のクラウド同期に対応します。
					</p>
					<div class="mt-auto rounded-2xl bg-slate-50 px-4 py-4">
						<a
							href="https://www.ezurio.com/iot-devices/lorawan-iot-devices/sentrius-rg1xx-lorawan-gateway-wi-fi-ethernet-optional-lte-us-only"
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--cw-blue-900)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--cw-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-500)]"
						>
							メーカーサイトを見る
						</a>
					</div>
				</div>
			</article>
		</div>
	</div>
</section>

<section class="relative isolate overflow-hidden bg-gradient-to-br from-[var(--cw-blue-900)] via-[#0b1730] to-black py-24 text-white">
	<div class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cw-gold-500)] to-transparent"></div>
	<div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_70%)]"></div>
	<div class="mx-auto w-full max-w-5xl px-4 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--cw-gold-500)]">
			ご相談ください
		</p>
		<h2 class="mt-4 text-3xl font-semibold md:text-4xl">
			RF エンジニアが直接サポート
		</h2>
		<p class="mt-4 text-base text-white/80">
			延床面積、建材、監査要件をご共有いただければ、最適なゲートウェイ配置と CropWatch Command 上の設定までまとめてご提案します。
		</p>
		<div class="mt-10 flex flex-wrap justify-center gap-4">
			<a
				href="/contact"
				class="inline-flex items-center justify-center rounded-full bg-[var(--cw-gold-500)] px-7 py-3 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
			>
				設計ワークショップを予約
			</a>
			<a
				href="/contact#details"
				class="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
			>
				図面を送る
			</a>
		</div>
	</div>
</section>
