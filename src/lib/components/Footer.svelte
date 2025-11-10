<script lang="ts">
    import { _ } from 'svelte-i18n';
	import Telephone from './Telephone.svelte';

    type LinkGroup = {
        titleKey: string;
        links: { labelKey: string; href: string }[];
    };

    const linkGroups: LinkGroup[] = [
        {
            titleKey: 'footer.link_groups.solutions.title',
            links: [
                { labelKey: 'footer.link_groups.solutions.links.manufacturing', href: '/solutions/manufacturing' },
                { labelKey: 'footer.link_groups.solutions.links.logistics', href: '/solutions/logistics' },
                { labelKey: 'footer.link_groups.solutions.links.agriculture', href: '/solutions/agriculture' },
                { labelKey: 'footer.link_groups.solutions.links.energy', href: '/solutions/energy' }
            ]
        },
        {
            titleKey: 'footer.link_groups.products.title',
            links: [
                { labelKey: 'footer.link_groups.products.links.sensor_suite', href: '/products/sensors' },
                { labelKey: 'footer.link_groups.products.links.gateways', href: '/products/gateways' },
                { labelKey: 'footer.link_groups.products.links.analytics', href: '/products/analytics' },
                { labelKey: 'footer.link_groups.products.links.integrations', href: '/products/integrations' }
            ]
        },
        {
            titleKey: 'footer.link_groups.connect.title',
            links: [
                { labelKey: 'footer.link_groups.connect.links.contact', href: '/contact' },
                { labelKey: 'footer.link_groups.connect.links.support', href: '/support' },
                { labelKey: 'footer.link_groups.connect.links.case_studies', href: '/usecases' },
                { labelKey: 'footer.link_groups.connect.links.github', href: 'https://github.com/CropWatchDevelopment' },
                { labelKey: 'footer.link_groups.connect.links.faq', href: '/faq' }
            ]
        }
    ];

    const legalLinks = [
        { labelKey: 'footer.legal.links.privacy', href: '/privacy' },
        { labelKey: 'footer.legal.links.terms', href: '/terms' },
        { labelKey: 'footer.legal.links.sitemap', href: '/sitemap' }
    ];

    const aboutContent = {
        headingKey: 'footer.about.heading',
        bodyKey: 'footer.about.body',
        subBodyKey: 'footer.about.sub_body',
        phoneLabelKey: 'footer.about.phone_label',
        phoneNumberKey: 'footer.about.phone_number',
        phoneHref: 'tel:+18135550123',
        ctaKey: 'footer.about.cta'
    } as const;

    const year = new Date().getFullYear();
</script>

<footer class="relative overflow-hidden bg-[#0a1a34] text-white">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent)]" aria-hidden="true"></div>

    <div class="relative mx-auto w-full max-w-6xl px-4 py-16">
        <div class="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
            <section class="space-y-4">
                <h2 class="text-lg font-semibold uppercase tracking-wide text-white/80">{$_(aboutContent.headingKey)}</h2>
                <p class="text-sm leading-relaxed text-white/80">
                    {$_(aboutContent.bodyKey)}
                </p>
                <p class="text-sm leading-relaxed text-white/70">
                    {$_(aboutContent.subBodyKey)}
                </p>
                <!-- <p class="text-sm text-white/60">
                    {$_(aboutContent.phoneLabelKey)}
                    <a href={aboutContent.phoneHref} class="font-semibold text-white transition hover:text-[#f2a516]">
                        {$_(aboutContent.phoneNumberKey)}
                    </a>
                </p> -->
                <Telephone hideIcon={true} />
                <a
                    href="/contact"
                    class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-4 py-2 text-sm font-semibold text-[#0a1a34] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                    {$_(aboutContent.ctaKey)}
                </a>
            </section>

            {#each linkGroups as group (group.titleKey)}
                <nav aria-label={$_(group.titleKey)} class="space-y-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-white/70">{$_(group.titleKey)}</h3>
                    <ul class="space-y-2 text-sm text-white/75">
                        {#each group.links as link (link.href)}
                            <li>
                                <a class="transition hover:text-[#f2a516]" href={link.href}>{$_(link.labelKey)}</a>
                            </li>
                        {/each}
                    </ul>
                </nav>
            {/each}
        </div>
    </div>

    <div class="relative border-t border-white/10 bg-[#071227]">
        <div class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
            <p>{$_('footer.legal.copyright', { values: { year } })}</p>
            <ul class="flex flex-wrap items-center gap-3">
                        {#each legalLinks as link, index (link.href)}
                    <li class="flex items-center gap-3">
                        {#if index > 0}
                            <span aria-hidden="true" class="text-white/40">|</span>
                        {/if}
                                <a class="transition hover:text-[#f2a516]" href={link.href}>{$_(link.labelKey)}</a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</footer>
