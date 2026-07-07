<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>交換用センサーキット 近日公開 | CropWatch®</title>
	<meta name="description" content="CropWatch の交換用センサーキットの最新情報をお届けします。利点、展開スケジュール、パイロット参加方法をご確認ください。" />
</svelte:head>

<Breadcrumbs
	items={[
		{ label: 'ホーム', href: '/' },
		{ label: '製品' },
		{ label: '交換用センサー（近日公開）' }
	]}
/>

<section class="relative overflow-hidden bg-[#0b1730] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,83,135,0.25),transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					交換用センサー
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					交換用センサーキットがまもなく登場
				</h1>
				<p class="text-base text-white/80 md:text-lg">
					CW Air TH センサーを工場に戻さずにキャリブレーションを維持できるホットスワップカートリッジを仕上げています。早期パートナーには、必要なツールとドキュメント、サポートを初日からご提供します。
				</p>
				<div class="flex flex-wrap gap-3">
					<a
						href="/contact"
						class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						<MaterialIcon name="calendar_month" collection="symbols" variant="outlined" size={18} />
						早期アクセスを申し込む
					</a>
					<a
						href="/case-studies"
						class="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
					>
						<MaterialIcon name="description" collection="symbols" variant="outlined" size={18} />
						導入事例を見る
					</a>
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">ご提供内容</h2>
				<p class="mt-3 text-sm text-white/70">キャリブレーションとリサイクルを当社が担い、現場の稼働を止めないプログラムです。</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>既存の CW Air TH ハウジングに数分で装着できるドロップインカートリッジ。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>全キットに ISO17025 に対応したシリアル付き校正証明書を同梱。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>使用済みプローブを責任ある方法で返送できる送料前払い封筒付き。</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>
