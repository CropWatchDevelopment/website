<script lang="ts">
	import gatewayImage from '$lib/images/slider-images/gateway_header-1280.webp';
	import greenhouseImage from '$lib/images/slider-images/greenhouse.webp';
	import liveStockImage from '$lib/images/slider-images/livestock_header-1024.webp';
	import insideFreezerImage from '$lib/images/slider-images/survive_the_cold.webp';
	type TextSide = 'left' | 'right';

	type SlideText = {
		badgeKey?: string;
		badge?: string;
		titleKey?: string;
		title?: string;
		bodyKey?: string;
		body?: string;
	};

	type SlideCTA = {
		labelKey?: string;
		label?: string;
		href: string;
	};

	type SlideImage = {
		src: string;
		altKey?: string;
		alt?: string;
	};

	type Slide = SlideText & {
		id?: string;
		cta?: SlideCTA;
		image: SlideImage;
		textSide?: TextSide;
	};

	const DEFAULT_SLIDES: Slide[] = [
		{
			id: 'industry-ready',
			badge: '🏭 産業用グレードIoT',
			title: '壊れない 狂わない 止まらない',
			body: '高湿度・振動・埃の中でも正確に動作する産業グレード設計。信頼の品質で、どんな現場にも安心を。',
			cta: { label: 'IoT スペシャリストに相談する', href: '/contact' },
			image: {
				src: gatewayImage,
				alt: '加工施設内で稼働するゲートウェイ監視ハードウェア'
			},
			textSide: 'right'
		},
		{
			id: 'battery-life',
			badge: '🔋 長寿命バッテリー',
			title: '省電力設計で長期運用を実現',
			body: '10分間隔の送信で、冷凍庫でも屋外でも最大10年稼働。現場で交換可能な設計により、保守コストを最小限に抑えます。',
			cta: { label: '電源チャートを見る', href: '/downloads/power-charts' },
			image: {
				src: greenhouseImage,
				alt: 'CropWatch センサー機器のクローズアップ'
			},
			textSide: 'right'
		},
		{
			id: 'wireless-signal',
			badge: '📡 強力な無線信号',
			title: '届かない場所をつなぐ技術',
			body: 'LoRaWAN® の高い浸透力で、従来の無線が届かなかった環境でも安定した通信を実現。人の移動や巡回を必要としない、効率的で信頼性の高い運用を実現します。',
			cta: { label: 'LoRaWAN® について学ぶ', href: '/technology/lorawan' },
			image: {
				src: liveStockImage,
				alt: '技術者が LoRaWAN ゲートウェイを設定している様子'
			},
			textSide: 'left'
		},
		{
			id: 'survive-the-cold',
			badge: '❄️ 凍てつく環境を生き抜く',
			title: '極低温対応設計',
			body: '過酷な冷蔵・冷凍環境での動作を前提に設計。-40℃の温度帯でも高い信頼性でデータを取得し、安定したモニタリングを実現します。',
			cta: { label: '事例を確認する', href: '/technology/lorawan' },
			image: {
				src: insideFreezerImage,
				alt: 'CropWatch sensor installed inside a freezer'
			},
			textSide: 'left'
		}
	];

	type Props = {
		slides?: Slide[];
		autoplay?: boolean;
		interval?: number;
		loop?: boolean;
	};

	let { slides = DEFAULT_SLIDES, autoplay = true, interval = 35000, loop = true }: Props = $props();

	let activeIndex = $state(0);
	let isPaused = $state(false);

	const totalSlides = $derived(slides.length);
	const hasMultipleSlides = $derived(totalSlides > 1);
	const activeSlide = $derived(slides[activeIndex] ?? slides[0]);

	function normaliseIndex(index: number) {
		if (!totalSlides) return 0;
		const mod = ((index % totalSlides) + totalSlides) % totalSlides;
		return mod;
	}

	function showSlide(index: number) {
		if (!totalSlides) return;
		if (!loop) {
			const clamped = Math.max(0, Math.min(index, totalSlides - 1));
			activeIndex = clamped;
			return;
		}
		activeIndex = normaliseIndex(index);
	}

	function nextSlide() {
		if (!totalSlides) return;
		showSlide(activeIndex + 1);
	}

	function previousSlide() {
		if (!totalSlides) return;
		showSlide(activeIndex - 1);
	}

	function toggleAutoplay() {
		if (!hasMultipleSlides) return;
		isPaused = !isPaused;
	}

	$effect(() => {
		if (!totalSlides) {
			activeIndex = 0;
			return;
		}
		if (activeIndex > totalSlides - 1) {
			activeIndex = loop ? 0 : totalSlides - 1;
		}
	});

	$effect(() => {
		if (!autoplay) {
			isPaused = true;
		}
	});

	$effect(() => {
		if (!autoplay || isPaused || !hasMultipleSlides || typeof window === 'undefined') return;
		const handle = window.setInterval(
			() => {
				nextSlide();
			},
			Math.max(2000, interval)
		);
		return () => window.clearInterval(handle);
	});

	function handleArrowKey(event: KeyboardEvent) {
		if (!hasMultipleSlides) return;
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			previousSlide();
		}
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			nextSlide();
		}
	}
</script>

<section class="relative overflow-hidden text-white" aria-live="polite">
	<div class="absolute inset-0" aria-hidden="true"></div>

	<div class="relative mx-auto w-full">
		<div
			class="flex flex-col"
			role="group"
			aria-roledescription="carousel"
			aria-label="CropWatch ハイライトカルーセル"
		>
			{#if activeSlide}
				<div class="relative overflow-hidden shadow-2xl">
					<img
						src={activeSlide.image.src}
						alt={activeSlide.image.alt}
						class="absolute inset-0 h-full w-full object-cover"
						fetchpriority="high"
					/>
					<div
						class="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,33,60,0.75)_0%,rgba(17,33,60,0.25)_25%,rgba(17,33,60,0.65)_100%)]"
					></div>
					<div
						class={`relative flex min-h-[320px] flex-col justify-center gap-6 p-6 pb-16 md:min-h-[420px] md:px-16 md:py-14 md:pb-20 ${activeSlide.textSide === 'right' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}
					>
						{#if hasMultipleSlides}
							<button
								type="button"
								class="absolute top-1/2 left-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:left-4"
								onclick={previousSlide}
								onkeydown={handleArrowKey}
								aria-label="前のスライド"
							>
								‹
							</button>
							<button
								type="button"
								class="absolute top-1/2 right-3 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:right-4"
								onclick={nextSlide}
								onkeydown={handleArrowKey}
								aria-label="次のスライド"
							>
								›
							</button>
							<button
								type="button"
								class="absolute bottom-4 left-1/2 z-10 inline-flex h-10 -translate-x-1/2 items-center justify-center gap-2 rounded-full border border-white/35 bg-[#0c2b52]/70 px-4 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur transition hover:bg-[#0c2b52]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
								onclick={toggleAutoplay}
								aria-label={isPaused ? '再生' : '一時停止'}
								aria-pressed={!isPaused}
							>
								<span aria-hidden="true" class="font-mono text-sm leading-none"
									>{isPaused ? '>' : '||'}</span
								>
								<span>{isPaused ? '再生' : '一時停止'}</span>
							</button>
						{/if}
						<div
							class={`relative max-w-xl rounded-3xl bg-[#0c2b52]/85 px-7 py-7 text-left text-white shadow-xl backdrop-blur ${activeSlide.textSide === 'right' ? 'md:mr-16 md:ml-auto md:text-right' : 'md:mr-auto md:ml-16 md:text-left'}`}
						>
							{#if activeSlide.badge}
								<p
									class="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/80 uppercase"
								>
									<span>
										{activeSlide.badge}
									</span>
								</p>
							{/if}
							<h2 class="text-3xl font-bold tracking-tight md:text-4xl">
								{activeSlide.title}
							</h2>
							<p class="mt-3 text-base text-white/85 md:text-lg">
								{activeSlide.body}
							</p>
							{#if activeSlide.cta}
								<div
									class={`mt-8 flex justify-start ${activeSlide.textSide === 'right' ? 'md:justify-end' : 'md:justify-start'}`}
								>
									<a
										href={activeSlide.cta.href}
										class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-8 py-3 text-sm font-semibold text-[#11213c] shadow-md transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
									>
										{activeSlide.cta.label}
									</a>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{:else}
				<p class="text-center text-white/70">スライドが設定されていません。</p>
			{/if}
		</div>
	</div>
</section>
