<script lang="ts">
	import Telephone from './Telephone.svelte';

	let year = $derived(new Date().getFullYear());
</script>

<footer
	class="relative overflow-hidden bg-gradient-to-b from-[var(--cw-blue-700)] via-[var(--cw-blue-900)] to-[var(--cw-blue-950)] text-white"
>
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_65%)] opacity-70"
		aria-hidden="true"
	></div>
	<div
		class="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[var(--cw-gold-500)] to-transparent opacity-70"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto w-full max-w-6xl px-4 py-16">
		<div class="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
			<section class="space-y-4">
				<h2 class="text-lg font-semibold uppercase tracking-wide text-white/80">CropWatch について</h2>
				<p class="text-sm leading-relaxed text-white/80">
					2019年の創業以来、私たちは「信頼」と「品質」を原点に、世界中の現場を支えています。
				</p>
				<p class="text-sm leading-relaxed text-white/70">
					高品質・堅牢なハードウェアと高信頼な通信技術で、どんな環境でも確実に動作するIoTソリューションを提供します。
				</p>
				<!-- <p class="text-sm text-white/60">
					お電話でのご相談:
					<a href="tel:+18135550123" class="font-semibold text-white transition hover:text-[#f2a516]">
						+1 (813) 555-0123
					</a>
				</p> -->
				<Telephone hideIcon={true} />
				<a
					href="/contact"
					class="inline-flex items-center gap-2 rounded-full bg-[var(--cw-gold-500)] px-4 py-2 text-sm font-semibold text-[var(--cw-blue-950)] transition hover:bg-[var(--cw-gold-400)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cw-gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--cw-blue-900)]"
				>
					IoT スペシャリストに相談する
				</a>
			</section>

			<nav aria-label="ソーシャル" class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">ソーシャル</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://www.linkedin.com/company/cropwatch-system">
							LinkedIn
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://www.youtube.com/@cropwatch4407">
							YouTube
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" target="_blank" href="https://github.com/CropWatchDevelopment">
							GitHub
						</a>
					</li>
				</ul>
			</nav>

			<nav aria-label="製品" class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">製品</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/cw-air-th">
							CW-AIR-TH
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/gateways">
							ゲートウェイ
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/products/coming-soon">
							交換用センサー
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="https://api.cropwatch.io/docs" target="_blank" rel="noopener noreferrer">
							API
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="https://cwui.cropwatch.io/" target="_blank" rel="noopener noreferrer">
							CWUI (UI Components)
						</a>
					</li>
				</ul>
			</nav>

			<nav aria-label="サービス" class="space-y-3">
				<h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">サービス</h3>
				<ul class="space-y-2 text-sm text-white/75">
					<li>
						<a class="transition hover:text-[#f2a516]" href="/contact">
							お問い合わせ
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/case-studies">
							事例紹介
						</a>
					</li>
					<li>
						<a class="transition hover:text-[#f2a516]" href="/faq">
							FAQ
						</a>
					</li>
				</ul>
			</nav>
		</div>
	</div>

	<div class="relative border-t border-white/10 bg-[var(--cw-blue-950)]">
		<div class="flex w-full px-10 flex-col gap-4 px-4 py-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
			<p>{`© ${year} CropWatch LLC. All rights reserved.`}</p>
			<ul class="flex flex-wrap items-center gap-3">
				<li class="flex items-center gap-3">
					<p class="transition hover:text-[#f2a516]">届出電気通信事業者 H-04-01772</p>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/legal/privacy-policy">プライバシーポリシー</a>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/legal/terms-of-service">クッキーポリシー</a>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/legal/EULA">利用規約</a>
				</li>
				<li class="flex items-center gap-3">
					<span aria-hidden="true" class="text-white/40">|</span>
					<a class="transition hover:text-[#f2a516]" href="/sitemap">サイトマップ</a>
				</li>
			</ul>
		</div>
	</div>
</footer>
