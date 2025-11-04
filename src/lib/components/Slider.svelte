<script lang="ts">
    import gatewayImage from '$lib/images/slider-images/gateway_header-1280.webp'
    import referImage from '$lib/images/slider-images/refer_header-1280.webp';
    import liveStockImage from '$lib/images/slider-images/livestock_header-1024.webp';
    type TextSide = 'left' | 'right';

    type Slide = {
        id?: string;
        badge?: string;
        title: string;
        body: string;
        cta?: { label: string; href: string };
        image: { src: string; alt: string };
        textSide?: TextSide;
    };

    const DEFAULT_SLIDES = [
        {
            id: 'industry-ready',
            badge: '🏭 Industry-Ready IoT',
            title: 'Industrial IoT That Pays For Itself',
            body: 'Deploy rugged gateways and sensors that stream real-time diagnostics across every processing line while keeping maintenance downtime to an absolute minimum.',
            cta: { label: 'Talk To An IoT Specialist', href: '/contact' },
            image: {
                src: gatewayImage,
                alt: 'Gateway monitoring hardware inside a processing facility'
            },
            textSide: 'left'
        },
        {
            id: 'battery-life',
            badge: '🔋 Battery Life',
            title: '10+ Years On A Single Battery',
            body: 'Sleep-cycle optimised firmware keeps your data flowing every 10 minutes without the surprise downtime. Field replaceable sensor modules extend your ROI even further.',
            cta: { label: 'See Power Charts', href: '/downloads/power-charts' },
            image: {
                src: referImage,
                alt: 'CropWatch sensor hardware close-up'
            },
            textSide: 'right'
        },
        {
            id: 'wireless-signal',
            badge: '📡 Strong Wireless Signal',
            title: 'LoRaWAN Built To Penetrate Tough Sites',
            body: 'From cold storage to concrete basements, our LoRaWAN® stack delivers long-range, low-power connectivity with on-device buffering for when backhaul goes dark.',
            cta: { label: 'Learn About LoRaWAN®', href: '/technology/lorawan' },
            image: {
                src: liveStockImage,
                alt: 'Technician configuring a LoRaWAN gateway'
            },
            textSide: 'left'
        }
    ] satisfies Slide[];

type Props = {
        slides?: Slide[];
        autoplay?: boolean;
        interval?: number;
        loop?: boolean;
    };

    let {
        slides = DEFAULT_SLIDES,
        autoplay = true,
        interval = 8000,
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
            aria-label="CropWatch highlights"
        >
            {#if activeSlide}
                <div class="relative overflow-hidden rounded-b-3xl shadow-2xl">
                    <img
                        src={activeSlide.image.src}
                        alt={activeSlide.image.alt}
                        class="absolute inset-0 h-full w-full object-cover"
                    />
                    <div class="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,33,60,0.75)_0%,rgba(17,33,60,0.25)_45%,rgba(17,33,60,0.65)_100%)]"></div>
                    <div class={`relative flex min-h-[320px] flex-col justify-center gap-6 p-6 md:min-h-[420px] md:p-14 ${activeSlide.textSide === 'right' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
                        {#if hasMultipleSlides}
                            <button
                                type="button"
                                class="absolute left-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                                onclick={previousSlide}
                                onkeydown={handleArrowKey}
                                aria-label="Previous slide"
                            >
                                ‹
                            </button>
                            <button
                                type="button"
                                class="absolute right-4 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/10 text-lg text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:flex"
                                onclick={nextSlide}
                                onkeydown={handleArrowKey}
                                aria-label="Next slide"
                            >
                                ›
                            </button>
                        {/if}
                        <div class={`relative max-w-xl rounded-3xl bg-[#0c2b52]/85 px-6 py-6 text-left text-white shadow-xl backdrop-blur ${activeSlide.textSide === 'right' ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'}`}>
                            {#if activeSlide.badge}
                                <p class="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white/80">
                                    <span>{activeSlide.badge}</span>
                                </p>
                            {/if}
                            <h2 class="text-3xl font-bold tracking-tight md:text-4xl">
                                {activeSlide.title}
                            </h2>
                            <p class="mt-3 text-base text-white/85 md:text-lg">
                                {activeSlide.body}
                            </p>
                            {#if activeSlide.cta}
                                <a
                                    href={activeSlide.cta.href}
                                    class="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-5 py-2 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    {activeSlide.cta.label}
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>
            {:else}
                <p class="text-center text-white/70">No slides configured.</p>
            {/if}
        </div>
    </div>
</section>

