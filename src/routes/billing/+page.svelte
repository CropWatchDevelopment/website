<script lang="ts">
	import { onMount } from 'svelte';

	type SubscriptionStatus =
		| 'active'
		| 'trialing'
		| 'past_due'
		| 'unpaid'
		| 'canceled'
		| 'incomplete'
		| 'incomplete_expired'
		| 'paused'
		| string;

	type PolarSubscription = {
		id: string;
		status: SubscriptionStatus;
		amount: number;
		currency: string;
		recurring_interval: string | null;
		recurring_interval_count: number | null;
		current_period_start: string | null;
		current_period_end: string | null;
		cancel_at_period_end: boolean;
		canceled_at: string | null;
		started_at: string | null;
		ended_at: string | null;
		product?: {
			name?: string | null;
		};
	};

	type SubscriptionsResponse = {
		items?: PolarSubscription[];
		pagination?: {
			total_count?: number;
			max_page?: number;
		};
	};

	const ACTIVE_STATUSES = new Set<SubscriptionStatus>(['active', 'trialing']);

	let isLoading = $state(true);
	let errorMessage = $state<string | null>(null);
	let subscriptions = $state<PolarSubscription[]>([]);

	const activeSubscriptions = $derived(
		subscriptions.filter((subscription) => ACTIVE_STATUSES.has(subscription.status))
	);
	const inactiveSubscriptions = $derived(
		subscriptions.filter((subscription) => !ACTIVE_STATUSES.has(subscription.status))
	);

	const statusBadgeClass = (status: SubscriptionStatus) => {
		if (ACTIVE_STATUSES.has(status)) {
			return 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30';
		}
		return 'bg-slate-400/15 text-slate-200 ring-1 ring-slate-300/25';
	};

	const formatStatus = (status: SubscriptionStatus) =>
		status
			.replaceAll('_', ' ')
			.toLowerCase()
			.replace(/\b\w/g, (match) => match.toUpperCase());

	const formatDate = (value: string | null) => {
		if (!value) return 'N/A';
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return 'N/A';
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const formatPrice = (amount: number, currency: string) => {
		try {
			return new Intl.NumberFormat(undefined, {
				style: 'currency',
				currency: currency.toUpperCase(),
				minimumFractionDigits: 2
			}).format(amount / 100);
		} catch {
			return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
		}
	};

	const formatInterval = (interval: string | null, count: number | null) => {
		if (!interval || !count) return 'N/A';
		if (count === 1) return `Every ${interval}`;
		return `Every ${count} ${interval}s`;
	};

	const getPlanName = (subscription: PolarSubscription) =>
		subscription.product?.name || 'Subscription Plan';

	const fetchSubscriptions = async () => {
		isLoading = true;
		errorMessage = null;

		try {
			const response = await fetch('/payments/subscriptions', {
				method: 'GET',
				credentials: 'include',
				headers: {
					Accept: 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`Request failed with status ${response.status}`);
			}

			const payload = (await response.json()) as SubscriptionsResponse;
			subscriptions = Array.isArray(payload.items) ? payload.items : [];
		} catch (error) {
			console.error('Unable to load subscriptions', error);
			errorMessage =
				'Subscriptions could not be loaded right now. Please refresh or try again in a moment.';
			subscriptions = [];
		} finally {
			isLoading = false;
		}
	};

	onMount(async () => {
		await fetchSubscriptions();
	});
</script>

<svelte:head>
	<title>Billing — CropWatch</title>
	<meta
		name="description"
		content="Review your active and inactive CropWatch subscriptions and billing periods."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#0b1730] py-16 text-white md:py-20">
	<div
		class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(47,83,135,0.4),_transparent_55%)]"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="mb-10 flex flex-wrap items-end justify-between gap-4">
			<div>
				<p class="text-xs font-semibold tracking-[0.3em] text-[#f2a516] uppercase">Billing</p>
				<h1 class="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Subscriptions</h1>
				<p class="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
					Track your active plans, cancelled subscriptions, and upcoming billing windows.
				</p>
			</div>

			<div
				class="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-right shadow-lg shadow-black/20"
			>
				<p class="text-xs font-semibold tracking-[0.22em] text-white/60 uppercase">Total Plans</p>
				<p class="mt-1 text-3xl font-semibold">{subscriptions.length}</p>
			</div>
		</div>

		{#if isLoading}
			<div class="grid gap-6 md:grid-cols-2">
				{#each Array.from({ length: 2 }, (_, index) => index) as index (index)}
					<div class="animate-pulse rounded-3xl border border-white/15 bg-white/5 p-6">
						<div class="h-5 w-32 rounded bg-white/20"></div>
						<div class="mt-5 h-10 w-44 rounded bg-white/15"></div>
						<div class="mt-6 space-y-3">
							<div class="h-4 w-full rounded bg-white/10"></div>
							<div class="h-4 w-5/6 rounded bg-white/10"></div>
							<div class="h-4 w-2/3 rounded bg-white/10"></div>
						</div>
					</div>
				{/each}
			</div>
		{:else if errorMessage}
			<div class="rounded-3xl border border-rose-300/30 bg-rose-500/10 p-6 text-rose-100">
				<p class="text-lg font-semibold">Unable to load subscriptions</p>
				<p class="mt-2 text-sm text-rose-100/90">{errorMessage}</p>
				<button
					type="button"
					onclick={fetchSubscriptions}
					class="mt-5 inline-flex items-center rounded-xl bg-[#f2a516] px-4 py-2 text-sm font-semibold text-[#0b1730] transition hover:bg-[#ffbb34]"
				>
					Try Again
				</button>
			</div>
		{:else if subscriptions.length === 0}
			<div class="rounded-3xl border border-white/15 bg-white/5 p-8 text-center">
				<p class="text-2xl font-semibold text-white">No subscriptions yet</p>
				<p class="mt-2 text-sm text-white/70">
					When a subscription is created, it will show up here with its billing status.
				</p>
			</div>
		{:else}
			<div class="grid gap-8 lg:grid-cols-2">
				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Active</h2>
						<span
							class="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-emerald-200 uppercase"
						>
							{activeSubscriptions.length}
						</span>
					</div>

					{#if activeSubscriptions.length === 0}
						<div class="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/70">
							No active subscriptions.
						</div>
					{:else}
						{#each activeSubscriptions as subscription (subscription.id)}
							<article
								class="rounded-3xl border border-emerald-300/25 bg-emerald-500/10 p-6 shadow-lg shadow-black/20"
							>
								<div class="flex flex-wrap items-start justify-between gap-4">
									<div>
										<p class="text-sm font-semibold tracking-[0.2em] text-emerald-200 uppercase">
											{getPlanName(subscription)}
										</p>
										<p class="mt-3 text-3xl font-semibold text-white">
											{formatPrice(subscription.amount, subscription.currency)}
										</p>
										<p class="mt-1 text-sm text-white/75">
											{formatInterval(
												subscription.recurring_interval,
												subscription.recurring_interval_count
											)}
										</p>
									</div>

									<span
										class={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase ${statusBadgeClass(subscription.status)}`}
									>
										{formatStatus(subscription.status)}
									</span>
								</div>

								<div class="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
									<div class="rounded-xl border border-white/15 bg-white/5 p-3">
										<p class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
											Current Period Start
										</p>
										<p class="mt-1 font-medium text-white">
											{formatDate(subscription.current_period_start)}
										</p>
									</div>
									<div class="rounded-xl border border-white/15 bg-white/5 p-3">
										<p class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
											Current Period End
										</p>
										<p class="mt-1 font-medium text-white">
											{formatDate(subscription.current_period_end)}
										</p>
									</div>
								</div>

								{#if subscription.cancel_at_period_end}
									<p
										class="mt-4 rounded-xl border border-amber-300/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
									>
										This subscription is set to cancel on {formatDate(
											subscription.current_period_end
										)}.
									</p>
								{/if}
							</article>
						{/each}
					{/if}
				</div>

				<div class="space-y-4">
					<div class="flex items-center justify-between">
						<h2 class="text-xl font-semibold">Inactive</h2>
						<span
							class="rounded-full bg-slate-400/20 px-3 py-1 text-xs font-semibold tracking-[0.14em] text-slate-200 uppercase"
						>
							{inactiveSubscriptions.length}
						</span>
					</div>

					{#if inactiveSubscriptions.length === 0}
						<div class="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm text-white/70">
							No inactive subscriptions.
						</div>
					{:else}
						{#each inactiveSubscriptions as subscription (subscription.id)}
							<article
								class="rounded-3xl border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/20"
							>
								<div class="flex flex-wrap items-start justify-between gap-4">
									<div>
										<p class="text-sm font-semibold tracking-[0.2em] text-white/75 uppercase">
											{getPlanName(subscription)}
										</p>
										<p class="mt-3 text-3xl font-semibold text-white">
											{formatPrice(subscription.amount, subscription.currency)}
										</p>
										<p class="mt-1 text-sm text-white/65">
											{formatInterval(
												subscription.recurring_interval,
												subscription.recurring_interval_count
											)}
										</p>
									</div>

									<span
										class={`rounded-full px-3 py-1 text-xs font-semibold tracking-[0.14em] uppercase ${statusBadgeClass(subscription.status)}`}
									>
										{formatStatus(subscription.status)}
									</span>
								</div>

								<div class="mt-6 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
									<div class="rounded-xl border border-white/15 bg-white/5 p-3">
										<p class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
											Started
										</p>
										<p class="mt-1 font-medium text-white">{formatDate(subscription.started_at)}</p>
									</div>
									<div class="rounded-xl border border-white/15 bg-white/5 p-3">
										<p class="text-xs font-semibold tracking-[0.2em] text-white/60 uppercase">
											Ended
										</p>
										<p class="mt-1 font-medium text-white">
											{formatDate(subscription.ended_at || subscription.canceled_at)}
										</p>
									</div>
								</div>
							</article>
						{/each}
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>
