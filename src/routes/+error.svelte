<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';
	import MaterialIcon from '$lib/components/MaterialIcon.svelte';

	const pageStatus = $derived(page.status);
	const pageError = $derived(page.error as App.Error | undefined);

	type ScenarioAction = {
		label: string;
		href?: string;
		action?: 'back' | 'reload' | 'copy';
	};

	type Scenario = {
		category: 'Server' | 'Authentication' | 'User input' | 'Missing content' | 'Unexpected';
		severity: 'info' | 'warning' | 'danger';
		headline: string;
		description: string;
		badge: string;
		icon: string;
		iconVariant?: 'filled' | 'outlined' | 'round' | 'sharp' | 'two-tone';
		steps: string[];
		primaryAction: ScenarioAction;
		secondaryAction?: ScenarioAction;
	};

	function normalizeStatus(code: number) {
		if (Number.isFinite(code) && code > 0) return code;
		return 520;
	}

	function resolveScenario(code: number): Scenario {
		const normalized = normalizeStatus(code);

		if (normalized === 404) {
			return {
				category: 'Missing content',
				severity: 'info',
				headline: 'We could not find that page.',
				description:
					'The link may be outdated or the page has moved. Let us help you get to the right place.',
				badge: '404 Not Found',
				icon: 'travel_explore',
				iconVariant: 'outlined',
				steps: [
					'Check the URL for typos or update bookmarks with the latest paths.',
					'Return to the homepage to explore products, case studies, or resources.',
					'Use the sitemap to navigate to the correct destination.'
				],
				primaryAction: { label: 'Go to homepage', href: '/' },
				secondaryAction: { label: 'Open sitemap', href: '/sitemap' }
			};
		}

		if (normalized === 401 || normalized === 403) {
			return {
				category: 'Authentication',
				severity: 'warning',
				headline:
					normalized === 401
						? 'Please sign in to continue.'
						: 'You do not have access to this page.',
				description:
					normalized === 401
						? 'Your session may have expired or you are not signed in yet. Authenticate and try again.'
						: 'Your account may not have permission to view this resource. Contact support if you think this is a mistake.',
				badge: normalized === 401 ? '401 Unauthorized' : '403 Forbidden',
				icon: 'lock',
				iconVariant: 'outlined',
				steps: [
					'Sign in to CropWatch, then retry the page you were visiting.',
					'If you were logged in already, refresh your session and try again.',
					'If access should be granted, contact support and include the reference details below.'
				],
				primaryAction: { label: 'Sign in', href: 'https://app.cropwatch.io/login' },
				secondaryAction: { label: 'Contact support', href: '/contact' }
			};
		}

		if (normalized === 400 || normalized === 422) {
			return {
				category: 'User input',
				severity: 'warning',
				headline: 'We could not process that request.',
				description:
					normalized === 422
						? 'Some information looks incomplete or invalid. Please review and try again.'
						: 'Some required information may be missing or malformed. Please review and try again.',
				badge: normalized === 422 ? '422 Unprocessable' : '400 Bad Request',
				icon: 'rule_folder',
				iconVariant: 'outlined',
				steps: [
					'Double-check required fields and formatting (email, dates, IDs, etc.).',
					'If you used a bookmark or external link, revisit the page and try again.',
					'If it keeps happening, contact support and include the reference details below.'
				],
				primaryAction: { label: 'Go back', action: 'back' },
				secondaryAction: { label: 'Contact support', href: '/contact' }
			};
		}

		if (normalized >= 500) {
			return {
				category: 'Server',
				severity: 'danger',
				headline: 'Something went wrong on our side.',
				description:
					'Our engineers are already alerted. Try again in a moment or reach out so we can assist immediately.',
				badge: `${normalized} Server Error`,
				icon: 'engineering',
				iconVariant: 'outlined',
				steps: [
					'Retry your last action or refresh the page to see if the issue resolves.',
					'Return to the homepage and try again from a stable starting point.',
					'Contact support with the reference ID below for rapid troubleshooting.'
				],
				primaryAction: { label: 'Reload page', action: 'reload' },
				secondaryAction: { label: 'Contact support', href: '/contact' }
			};
		}

		if (normalized >= 400) {
			return {
				category: 'Unexpected',
				severity: 'warning',
				headline: 'Something prevented this page from loading.',
				description:
					'There may be a connectivity issue, a temporary glitch, or an expired session. Try again and reach out if it persists.',
				badge: `${normalized} Error`,
				icon: 'error',
				iconVariant: 'outlined',
				steps: [
					'Retry your last action or refresh the page.',
					'If you are signed in, confirm your session is still active.',
					'Contact support if you need help completing your request.'
				],
				primaryAction: { label: 'Go back', action: 'back' },
				secondaryAction: { label: 'Open support request', href: '/contact' }
			};
		}

		return {
			category: 'Unexpected',
			severity: 'warning',
			headline: 'An unexpected error occurred.',
			description:
				'We will investigate the issue right away. Use the options below to keep moving forward.',
			badge: `${normalized} Error`,
			icon: 'help_center',
			iconVariant: 'outlined',
			steps: [
				'Refresh the page or try your request again in a few moments.',
				'Try again from the homepage or navigate via the sitemap.',
				'Contact our team with the details below so we can assist.'
			],
			primaryAction: { label: 'Return home', href: '/' },
			secondaryAction: { label: 'Contact support', href: '/contact' }
		};
	}

	const scenario = $derived(resolveScenario(pageStatus));

	const supportChannels = [
		{
			title: 'Customer portal',
			description: 'Submit a ticket or start a live chat with operations support.',
			link: { href: 'https://app.cropwatch.io/login', label: 'Open App' }
		},
		{
			title: '24/7 hotline',
			description:
				'For critical incidents call +1 (813) 555-0123 and reference the status code above.',
			link: { href: 'tel:+18135550123', label: 'Call support' }
		},
		{
			title: 'Email the team',
			description: 'Send logs, screenshots, or questions to support@cropwatch.io for follow-up.',
			link: { href: 'mailto:support@cropwatch.io', label: 'Email support' }
		}
	];

	const helpLinks = [
		{
			title: 'Knowledge base',
			description: 'Troubleshooting guides and answers to common questions.',
			icon: 'library_books',
			cta: { label: 'Browse FAQ', href: '/faq' }
		},
		{
			title: 'Sitemap',
			description: 'A full list of available pages and resources.',
			icon: 'map',
			cta: { label: 'Open sitemap', href: '/sitemap' }
		}
	];

	function runScenarioAction(action: ScenarioAction | undefined) {
		if (!action?.action) return;
		if (action.action === 'back' && typeof history !== 'undefined') {
			history.back();
			return;
		}
		if (action.action === 'reload' && typeof location !== 'undefined') {
			location.reload();
			return;
		}
		if (action.action === 'copy' && typeof navigator !== 'undefined') {
			void navigator.clipboard?.writeText(buildReferenceSummary());
		}
	}

	function safeMessage(value: unknown) {
		const message = typeof value === 'string' ? value.trim() : '';
		if (!message) return '';
		return message.length > 280 ? `${message.slice(0, 280)}…` : message;
	}

	function buildReferenceSummary() {
		const message = safeMessage(pageError?.message);
		return [
			`Status: ${normalizeStatus(pageStatus)} (${scenario.category})`,
			message ? `Message: ${message}` : undefined
		]
			.filter(Boolean)
			.join('\n');
	}

	const sanitizedMessage = $derived(safeMessage(pageError?.message));
	const showDetails = $derived(dev || normalizeStatus(pageStatus) < 500);
</script>

<svelte:head>
	<title>CropWatch | {scenario.badge}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="relative overflow-hidden bg-[#0b1730] py-16 text-white sm:py-20">
	<div
		class="absolute inset-0 bg-[radial-gradient(1200px_circle_at_20%_10%,_rgba(242,165,22,0.18),_transparent_55%),radial-gradient(900px_circle_at_70%_30%,_rgba(47,83,135,0.35),_transparent_55%),radial-gradient(700px_circle_at_60%_110%,_rgba(255,255,255,0.08),_transparent_45%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-10">
			<div class="space-y-8">
				<div class="flex flex-wrap items-center gap-3">
					<span
						class={'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.28em] uppercase ' +
							(scenario.severity === 'danger'
								? 'bg-[#f2a516] text-[#11213c]'
								: 'bg-white/10 text-white')}
					>
						<span>{scenario.category}</span>
						<span class="h-1.5 w-1.5 rounded-full bg-white/40"></span>
						<span>{scenario.badge}</span>
					</span>
				</div>

				<div
					class={'rounded-3xl border border-white/10 bg-[#11213c]/70 p-6 shadow-xl ring-1 shadow-black/30 backdrop-blur sm:p-8 ' +
						(scenario.severity === 'danger' ? 'ring-[#f2a516]/40' : 'ring-white/20')}
				>
					<div class="flex items-start gap-4">
						<div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/5">
							<MaterialIcon
								name={scenario.icon}
								variant={scenario.iconVariant ?? 'outlined'}
								size={45}
								collection="icons"
								ariaLabel="Error icon"
							/>
						</div>
						<div class="min-w-0 space-y-3">
							<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
								{scenario.headline}
							</h1>
							<p class="text-base text-white/80">{scenario.description}</p>
						</div>
					</div>

					<div class="mt-6 grid gap-6 sm:grid-cols-2">
						<div class="space-y-3">
							<h2 class="text-sm font-semibold tracking-[0.22em] text-white/70 uppercase">
								What you can do
							</h2>
							<ul class="space-y-3 text-sm text-white/80">
								{#each scenario.steps as step}
									<li class="flex items-start gap-3">
										<span class="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#f2a516]"></span>
										<span>{step}</span>
									</li>
								{/each}
							</ul>
						</div>

						<div class="space-y-3">
							<h2 class="text-sm font-semibold tracking-[0.22em] text-white/70 uppercase">
								Quick actions
							</h2>
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
										class="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
									>
										{scenario.secondaryAction.label}
									</a>
								{/if}

								<button
									type="button"
									onclick={() => runScenarioAction({ label: 'Copy details', action: 'copy' })}
									class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/0 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/25 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
								>
									Copy details
								</button>
							</div>

							{#if showDetails && sanitizedMessage}
								<div class="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
									<p class="text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">
										Details
									</p>
									<p class="mt-2 text-sm text-white/80">{sanitizedMessage}</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
