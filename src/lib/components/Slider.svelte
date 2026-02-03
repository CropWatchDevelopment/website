<script lang="ts">
    import { _ } from 'svelte-i18n';
    import gatewayImage from '$lib/images/slider-images/gateway_header-1280.webp'
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
            badgeKey: 'slider.slides.industry_ready.badge',
            titleKey: 'slider.slides.industry_ready.title',
            bodyKey: 'slider.slides.industry_ready.body',
            cta: { labelKey: 'slider.slides.industry_ready.cta', href: '/contact' },
            image: {
                src: gatewayImage,
                altKey: 'slider.slides.industry_ready.image_alt'
            },
            textSide: 'right'
        },
        {
            id: 'battery-life',
            badgeKey: 'slider.slides.battery_life.badge',
            titleKey: 'slider.slides.battery_life.title',
            bodyKey: 'slider.slides.battery_life.body',
            cta: { labelKey: 'slider.slides.battery_life.cta', href: '/downloads/power-charts' },
            image: {
                src: greenhouseImage,
                altKey: 'slider.slides.battery_life.image_alt'
            },
            textSide: 'right'
        },
        {
            id: 'wireless-signal',
            badgeKey: 'slider.slides.wireless_signal.badge',
            titleKey: 'slider.slides.wireless_signal.title',
            bodyKey: 'slider.slides.wireless_signal.body',
            cta: { labelKey: 'slider.slides.wireless_signal.cta', href: '/technology/lorawan' },
            image: {
                src: liveStockImage,
                altKey: 'slider.slides.wireless_signal.image_alt'
            },
            textSide: 'left'
        },
        {
            id: 'survive-the-cold',
            badgeKey: 'slider.slides.survive_the_cold.badge',
            titleKey: 'slider.slides.survive_the_cold.title',
            bodyKey: 'slider.slides.survive_the_cold.body',
            cta: { labelKey: 'slider.slides.survive_the_cold.cta', href: '/technology/lorawan' },
            image: {
                src: insideFreezerImage,
                altKey: 'slider.slides.survive_the_cold.image_alt'
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

    let {
        slides = DEFAULT_SLIDES,
        autoplay = false,
        interval = 9000,
        loop = true
    } = $props<Props>();

    let activeIndex = $state(0);

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
        if (!autoplay || !hasMultipleSlides || typeof window === 'undefined') return;
        const handle = window.setInterval(() => {
            nextSlide();
        }, Math.max(2000, interval));
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

<section
    class="relative overflow-hidden text-white"
    aria-live="polite"
>
    <div class="absolute inset-0" aria-hidden="true"></div>

    <div class="relative mx-auto w-full">
        <div
            class="flex flex-col"
            role="group"
            aria-roledescription="carousel"
            aria-label={$_('slider.aria.group_label')}
        >
            {#if activeSlide}
                <div class="relative overflow-hidden shadow-2xl">
                    <img
                        src={activeSlide.image.src}
                        alt={activeSlide.image.altKey ? $_(activeSlide.image.altKey) : activeSlide.image.alt}
                        class="absolute inset-0 h-full w-full object-cover"
                        fetchpriority="high"
                    />
                    <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,33,60,0.75)_0%,rgba(17,33,60,0.25)_25%,rgba(17,33,60,0.65)_100%)]"></div>
                    <div class={`relative flex min-h-[320px] flex-col justify-center gap-6 p-6 md:min-h-[420px] md:px-16 md:py-14 ${activeSlide.textSide === 'right' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                        {#if hasMultipleSlides}
                            <button
                                type="button"
                                class="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                                onclick={previousSlide}
                                onkeydown={handleArrowKey}
                                aria-label={$_('slider.controls.previous')}
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                class="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                                onclick={nextSlide}
                                onkeydown={handleArrowKey}
                                aria-label={$_('slider.controls.next')}
                            >
                                ›
                            </button>
                        {/if}
                        <div class={`relative max-w-xl rounded-3xl bg-[#0c2b52]/85 px-7 py-7 text-left text-white shadow-xl backdrop-blur ${activeSlide.textSide === 'right' ? 'md:ml-auto md:mr-16 md:text-right' : 'md:ml-16 md:mr-auto md:text-left'}`}>
                            {#if activeSlide.badgeKey || activeSlide.badge}
                                <p class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
                                    <span>
                                        {#if activeSlide.badgeKey}
                                            {$_(activeSlide.badgeKey)}
                                        {:else if activeSlide.badge}
                                            {activeSlide.badge}
                                        {/if}
                                    </span>
                                </p>
                            {/if}
                            <h2 class="text-3xl font-bold tracking-tight md:text-4xl">
                                {#if activeSlide.titleKey}
                                    {$_(activeSlide.titleKey)}
                                {:else}
                                    {activeSlide.title}
                                {/if}
                            </h2>
                            <p class="mt-3 text-base text-white/85 md:text-lg">
                                {#if activeSlide.bodyKey}
                                    {$_(activeSlide.bodyKey)}
                                {:else}
                                    {activeSlide.body}
                                {/if}
                            </p>
                            {#if activeSlide.cta}
                                <div class={`mt-8 flex justify-start ${activeSlide.textSide === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
                                    <a
                                        href={activeSlide.cta.href}
                                        class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-8 py-3 text-sm font-semibold text-[#11213c] shadow-md transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                    >
                                        {#if activeSlide.cta.labelKey}
                                            {$_(activeSlide.cta.labelKey)}
                                        {:else}
                                            {activeSlide.cta.label}
                                        {/if}
                                    </a>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {:else}
                <p class="text-center text-white/70">{$_('slider.fallback.no_slides')}</p>
            {/if}
        </div>
    </div>
</section>

