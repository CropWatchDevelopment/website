<script lang="ts">
    type LinkGroup = {
        title: string;
        links: { label: string; href: string }[];
    };

    const linkGroups: LinkGroup[] = [
        {
            title: 'Solutions',
            links: [
                { label: 'Manufacturing', href: '/solutions/manufacturing' },
                { label: 'Logistics', href: '/solutions/logistics' },
                { label: 'Agriculture', href: '/solutions/agriculture' },
                { label: 'Energy', href: '/solutions/energy' }
            ]
        },
        {
            title: 'Products',
            links: [
                { label: 'Sensor Suite', href: '/products/sensors' },
                { label: 'Gateways', href: '/products/gateways' },
                { label: 'Analytics', href: '/products/analytics' },
                { label: 'Integrations', href: '/products/integrations' }
            ]
        },
        {
            title: 'Connect',
            links: [
                { label: 'Contact Us', href: '/contact' },
                { label: 'Support', href: '/support' },
                { label: 'Case Studies', href: '/usecases' },
                { label: 'Github', href: 'https://github.com/CropWatchDevelopment' }
            ]
        }
    ];

    const legalLinks = [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Sitemap', href: '/sitemap' }
    ];

    const year = new Date().getFullYear();
</script>

<footer class="relative overflow-hidden bg-[#0a1a34] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent)]" aria-hidden="true"></div>

    <div class="relative mx-auto w-full max-w-6xl px-4 py-16">
        <div class="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
            <section class="space-y-4">
                <h2 class="text-lg font-semibold uppercase tracking-wide text-white/80">About CropWatch</h2>
                <p class="text-sm leading-relaxed text-white/80">
                    Delivering Quality &amp; ROI since 2019. Trusted by leading manufacturers and hospitality, coldchain, and enterprise operations worldwide.
                </p>
                <p class="text-sm text-white/60">
                    Talk to our team: <a href="tel:+18135550123" class="font-semibold text-white transition hover:text-[#f2a516]">+1 (813) 555-0123</a>
                </p>
                <a
                    href="/contact"
                    class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-4 py-2 text-sm font-semibold text-[#0a1a34] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                    Talk to an IoT specialist
                </a>
            </section>

            {#each linkGroups as group (group.title)}
                <nav aria-label={group.title} class="space-y-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">{group.title}</h3>
                    <ul class="space-y-2 text-sm text-white/75">
                        {#each group.links as link (link.href)}
                            <li>
                                <a class="transition hover:text-[#f2a516]" href={link.href}>{link.label}</a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            {/each}
        </div>
    </div>

    <div class="relative border-t border-white/10 bg-[#071227]">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
            <p>&copy; {year} CropWatch LLC. All rights reserved.</p>
            <ul class="flex flex-wrap items-center gap-3">
                {#each legalLinks as link, index (link.href)}
                    <li class="flex items-center gap-3">
                        {#if index > 0}
                            <span aria-hidden="true" class="text-white/40">|</span>
                        {/if}
                        <a class="transition hover:text-[#f2a516]" href={link.href}>{link.label}</a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</footer>
