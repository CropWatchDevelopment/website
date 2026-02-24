<script lang="ts">
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import { _ } from 'svelte-i18n';
</script>

<div class="mx-auto w-full max-w-6xl px-4">
	<div class="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
		<div>
			<p class="text-xs font-semibold tracking-[0.28em] text-[#2f5387] uppercase">
				{$_('home.pricing.eyebrow')}
			</p>
			<h2 class="mt-3 text-3xl font-semibold text-[#0b1730]">
				{$_('home.pricing.headline')}
			</h2>
			<p class="mt-3 max-w-2xl text-base text-[#1c2d52]/80">
				{$_('home.pricing.intro')}
			</p>
		</div>
		<a
			href="/contact"
			class="inline-flex items-center gap-2 rounded-full border border-[#d7e0f5] px-5 py-3 text-sm font-semibold text-[#2f5387] transition hover:border-[#2f5387] hover:text-[#2f5387]"
		>
			<MaterialIcon name="concierge" collection="symbols" variant="outlined" />
			{$_('home.pricing.cta')}
		</a>
	</div>
	<div class="grid gap-6 md:grid-cols-3">
		<div
			class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5"
		>
			<h3 class="text-lg font-semibold text-[#0b1730]">IoTモニタリング</h3>
			<p class="mt-3 text-sm text-[#1c2d52]/75">
				測定品質を保ちながら、無駄のないコスト運用を実現します。
			</p>
			<hr class="my-5 border-[#d7e0f5]" />
			<ul class="space-y-4 text-sm text-[#1c2d52]">
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">基本料金（10台分込み）</span>
					<span class="text-[#2f5387]">¥16,500/月</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">追加デバイス（11台目〜）</span>
					<span class="text-[#2f5387]">¥880/台/月</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">1,000+ 台</span>
					<a class="text-[#2f5387] underline" href="/contact">お問い合わせください</a>
				</li>
			</ul>
		</div>
		<div
			class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5"
		>
			<h3 class="text-lg font-semibold text-[#0b1730]">デバイス &amp; ゲートウェイ</h3>
			<p class="mt-3 text-sm text-[#1c2d52]/75">LoRaWAN®ネットワーク対応機器</p>
			<hr class="my-5 border-[#d7e0f5]" />
			<ul class="space-y-4 text-sm text-[#1c2d52]">
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">温度・湿度センサー</span>
					<span class="text-[#2f5387]">¥32,780</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">オートメーションリレーモジュール</span>
					<span class="text-[#2f5387]">¥13,357</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">屋内用ゲートウェイ</span>
					<span class="text-[#2f5387]">¥111,123</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">屋外用ゲートウェイ</span>
					<span class="text-[#2f5387]">¥284,674</span>
				</li>
			</ul>
		</div>
		<div
			class="flex h-full flex-col rounded-3xl border border-[#d7e0f5] bg-[#f9fbff] p-7 shadow-sm shadow-[#0b1730]/5"
		>
			<h3 class="text-lg font-semibold text-[#0b1730]">ソフトウェア &amp; ダッシュボード</h3>
			<p class="mt-3 text-sm text-[#1c2d52]/75">
				運用を止めないためのダッシュボードとサポートで、日々の業務を支えます。
			</p>
			<hr class="my-5 border-[#d7e0f5]" />
			<ul class="space-y-4 text-sm text-[#1c2d52]">
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">データ保存期間</span>
					<span class="text-[#2f5387]">直近２年間</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">ユーザーライセンス</span>
					<span class="text-[#2f5387]">無制限</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">アラート通知</span>
					<span class="text-[#2f5387]">メール送信</span>
				</li>
				<li class="flex items-start justify-between gap-4">
					<span class="font-medium">レポート</span>
					<span class="text-[#2f5387]">メール送信</span>
				</li>
			</ul>
		</div>
	</div>
</div>
