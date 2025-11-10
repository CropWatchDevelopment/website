<script lang="ts">
	import { dev } from '$app/environment';
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';
	import type { PageError } from './$types';

	export let error: PageError;
	export let status: number;

	type ScenarioAction = {
		label: string;
		href?: string;
		action?: 'back';
	};

	type Scenario = {
		headline: string;
		description: string;
		badge: string;
		icon: string;
		iconVariant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
		steps: string[];
		primaryAction: ScenarioAction;
		secondaryAction?: ScenarioAction;
	};

	function resolveScenario(code: number): Scenario {
		if (code === 404) {
			return {
				headline: 'We could not find that page.',
				description: 'The link may be outdated or the page has moved. Let us help you get to the right place.',
				badge: '404 Not Found',
				icon: 'travel_explore',
				iconVariant: 'outlined',
				steps: [
					'Check the URL for typos or update bookmarks with the latest paths.',
					'Return to the homepage to explore solutions, case studies, or resources.',
					'Chat with our team so we can point you directly to the material you need.'
				],
				primaryAction: { label: 'Go to homepage', href: '/' },
				secondaryAction: { label: 'Browse case studies', href: '/case-studies' }
			};
		}

		if (code >= 500) {
			return {
				headline: 'Something went wrong on our side.',
				description: 'Our engineers are already alerted. Try again in a moment or reach out so we can assist immediately.',
				badge: `${code} Server Error`,
				icon: 'engineering',
				iconVariant: 'outlined',
				steps: [
					'Retry your last action or refresh the page to see if the issue resolves.',
					'Visit the live status page to check for maintenance windows or outages.',
					'Contact support with the reference ID below for rapid troubleshooting.'
				],
				primaryAction: { label: 'View system status', href: '/status' },
				secondaryAction: { label: 'Contact support', href: '/contact' }
			};
		}

		if (code >= 400) {
			return {
				headline: 'We could not process that request.',
				description: 'There might be a missing field, expired session, or permission mismatch. Review the details and try again.',
				badge: `${code} Client Error`,
				icon: 'rule_folder',
				iconVariant: 'outlined',
				steps: [
					'Ensure any required form fields or query parameters are included.',
					'Sign back in if your session may have expired, then retry the action.',
					'Reach out to your CropWatch success lead if you need a hand.'
				],
				primaryAction: { label: 'Retry previous page', action: 'back' },
				secondaryAction: { label: 'Open support request', href: '/contact' }
			};
		}

		return {
			headline: 'An unexpected error occurred.',
			description: 'We will investigate the issue right away. Use the options below to keep moving forward.',
			badge: `${code} Error`,
			icon: 'help_center',
			iconVariant: 'outlined',
			steps: [
				'Refresh the page or try your request again in a few moments.',
				'Check the status dashboard for any active incidents.',
				'Contact our team with the details below so we can assist.'
			],
			primaryAction: { label: 'Return home', href: '/' },
			secondaryAction: { label: 'Contact support', href: '/contact' }
		};
	}

	const scenario = resolveScenario(status);

	const supportChannels = [
		{
			title: 'Customer portal',
			description: 'Submit a ticket or start a live chat with operations support.',
			link: { href: 'https://app.cropwatch.io/login', label: 'Open App' }
		},
		{
			title: '24/7 hotline',
			description: 'For critical incidents call +1 (813) 555-0123 and reference the status code above.',
			link: { href: 'tel:+18135550123', label: 'Call support' }
		},
		{
			title: 'Email the team',
			description: 'Send logs, screenshots, or questions to support@cropwatch.io for follow-up.',
			link: { href: 'mailto:sayaka@cropwatch.io', label: 'Email support' }
		}
	];

	const resourceLinks = [
		{
			title: 'Status dashboard',
			description: 'Real-time uptime, maintenance windows, and incident history.',
			icon: 'monitoring',
			cta: { label: 'View status', href: '/status' }
		},
		{
			title: 'Knowledge base',
			description: 'Troubleshooting guides for sensors, gateways, and analytics.',
			icon: 'library_books',
			cta: { label: 'Browse help center', href: '/faq' }
		},
		{
			title: 'Deployment checklist',
			description: 'Step-by-step runbooks to validate new installations and pilots.',
			icon: 'checklist',
			cta: { label: 'Download checklist', href: '/resources/deployment-checklist' }
		}
	];

	function runScenarioAction(action: ScenarioAction | undefined) {
		if (!action?.action) return;
		if (action.action === 'back' && typeof history !== 'undefined') {
			history.back();
		}
	}

	const sanitizedMessage = error?.message?.trim() ?? 'No additional details were provided.';
	const showDebug = dev || status >= 500;
</script>

<svelte:head>
	<title>CropWatch | {scenario.badge}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if showDebug}
    <div class="bg-[#f2a516] px-4 py-3 text-sm text-[#11213c]">
        <strong class="font-semibold">Debug info:</strong>
        <span>{sanitizedMessage}</span>
    </div>
{/if}

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.2fr_1fr] md:items-center">
			<div class="space-y-8">
				<div class="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#f2a516]">
					<span>Status {status}</span>
					<span class="h-1.5 w-1.5 rounded-full bg-[#f2a516]"></span>
					<span>{scenario.badge}</span>
				</div>
				<div class="flex items-start gap-4">
					<div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b1730]/80">
						<MaterialIcon name={scenario.icon} variant={scenario.iconVariant ?? 'outlined'} size={28} collection="icons" ariaLabel="Error icon" />
					</div>
					<div class="space-y-3">
						<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{scenario.headline}</h1>
						<p class="text-base text-white/80">{scenario.description}</p>
					</div>
				</div>
				<ul class="space-y-3 text-sm text-white/80">
					{#each scenario.steps as step}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{step}</span>
						</li>
					{/each}
				</ul>
				<div class="flex flex-wrap gap-3">
					{#if scenario.primaryAction.action}
						<button
							type="button"
							onclick={() => runScenarioAction(scenario.primaryAction)}
							class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						>
							{scenario.primaryAction.label}
						</button>
					{:else if scenario.primaryAction.href}
						<a
							href={scenario.primaryAction.href}
							class="inline-flex items-center gap-2 rounded-full bg-[#f2a516] px-6 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						>
							{scenario.primaryAction.label}
						</a>
					{/if}
					{#if scenario.secondaryAction}
						<a
							href={scenario.secondaryAction.href}
							class="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
						>
							{scenario.secondaryAction.label}
						</a>
					{/if}
				</div>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Need immediate help?</h2>
				<p class="mt-2 text-sm text-white/70">
					Our operations desk monitors sensors, gateways, and analytics around the clock.
				</p>
				<ul class="mt-6 space-y-4 text-sm text-white/80">
					{#each supportChannels as channel (channel.title)}
						<li class="rounded-2xl border border-white/10 bg-white/5 p-4">
							<p class="text-sm font-semibold text-white">{channel.title}</p>
							<p class="mt-1 text-white/70">{channel.description}</p>
							<a class="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f2a516] transition hover:text-white" href={channel.link.href}>
								{channel.link.label}
								<span aria-hidden="true">&rarr;</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
