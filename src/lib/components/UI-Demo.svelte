<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	type Status = 'online' | 'offline' | 'loading' | 'partialError';
	type DetailRow = {
		id: string;
		label: string;
		value: string | number;
		unit?: string;
		icon?: 'drop' | 'thermo' | 'timer';
	};

	type CardStatePatch = {
		expanded?: boolean;
		status?: Status;
		primaryValue?: number;
		secondaryValue?: number;
	};

	const dispatch = createEventDispatcher<{ stateChange: CardStatePatch }>();

	const props = $props<{
		title?: string;
		deviceLabel?: string;
		expanded?: boolean;
		status?: Status;
		primaryValue?: number;
		primaryUnit?: string;
		secondaryValue?: number;
		secondaryUnit?: string;
		lastUpdate?: string;
		detailRows?: DetailRow[];
	}>();

	let localExpanded = $state(props.expanded ?? true);
	let localStatus = $state<Status>(props.status ?? 'loading');
	let localPrimaryValue = $state(props.primaryValue ?? -22.93);
	let localSecondaryValue = $state(props.secondaryValue ?? 79.61);

	const expanded = $derived(props.expanded ?? localExpanded);
	const status = $derived(props.status ?? localStatus);
	const primaryValue = $derived(props.primaryValue ?? localPrimaryValue);
	const secondaryValue = $derived(props.secondaryValue ?? localSecondaryValue);

	const title = $derived(props.title ?? '冷凍');
	const deviceLabel = $derived(props.deviceLabel ?? '冷凍コ');
	const primaryUnit = $derived(props.primaryUnit ?? '°C');
	const secondaryUnit = $derived(props.secondaryUnit ?? '%');
	const lastUpdate = $derived(props.lastUpdate ?? '8m 17s 前');
	const detailRowsProp = $derived(props.detailRows ?? []);

	const statusStyles: Record<Status, { color: string; glow: string; label: string }> = {
		loading: { color: '#f2a516', glow: 'rgba(242,165,22,0.5)', label: 'Loading' },
		online: { color: '#20d16a', glow: 'rgba(32,209,106,0.5)', label: 'Online' },
		partialError: { color: '#ff784f', glow: 'rgba(255,120,79,0.45)', label: 'Partial Error' },
		offline: { color: '#f25555', glow: 'rgba(242,85,85,0.45)', label: 'Offline' }
	};

	const statusSequence: Status[] = ['loading', 'online', 'partialError', 'offline'];
	const temperatureSamples = [-22.93, -18.25, -12.5];
	const humiditySamples = [79.61, 72.4, 55.4];

	function emitState(patch: CardStatePatch) {
		dispatch('stateChange', patch);
	}

	function toggleDetails() {
		const next = !expanded;
		if (props.expanded === undefined) {
			localExpanded = next;
		}
		emitState({ expanded: next });
	}

	function cycleStatus() {
		const idx = statusSequence.indexOf(status);
		const next = statusSequence[(idx + 1) % statusSequence.length];
		if (!props.status) {
			localStatus = next;
		}
		emitState({ status: next });
	}

	function cycleStat(type: 'temperature' | 'humidity') {
		if (type === 'temperature') {
			const next = nextSample(temperatureSamples, primaryValue);
			if (props.primaryValue === undefined) {
				localPrimaryValue = next;
			}
			emitState({ primaryValue: next });
		} else {
			const next = nextSample(humiditySamples, secondaryValue);
			if (props.secondaryValue === undefined) {
				localSecondaryValue = next;
			}
			emitState({ secondaryValue: next });
		}
	}

	function nextSample(samples: number[], current: number) {
		const roundedCurrent = Number(current.toFixed(2));
		const index = samples.findIndex((value) => Number(value.toFixed(2)) === roundedCurrent);
		const nextIndex = index === -1 ? 0 : (index + 1) % samples.length;
		return Number(samples[nextIndex].toFixed(2));
	}

	const statusStyle = $derived(statusStyles[status] || statusStyles.loading);

	const computedDetailRows = $derived(
		detailRowsProp.length > 0
			? detailRowsProp
			: [
					{
						id: 'humidity',
						label: '湿度',
						value: secondaryValue.toFixed(2),
						unit: secondaryUnit,
						icon: 'drop'
					},
					{
						id: 'temperature',
						label: '温度',
						value: primaryValue.toFixed(2),
						unit: primaryUnit,
						icon: 'thermo'
					},
					{ id: 'updated', label: '最終更新', value: lastUpdate, unit: '', icon: 'timer' }
			  ]
	);
</script>

<div class="sensor-card" data-status={status}>
	<header class="sensor-card__header">
		<button
			class="status-indicator"
			type="button"
			onclick={cycleStatus}
			title={`Current status: ${statusStyle.label}. Click to cycle states.`}
			aria-label={`Cycle status (current ${statusStyle.label})`}
		>
        
			<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
				<path
					fill="currentColor"
					d="M9.55 17.05 5.5 13l1.41-1.41 2.64 2.63 7.55-7.54L18.5 8.1l-8.95 8.95Z"
				></path>
			</svg>
		</button>
		<div class="sensor-card__title-group">
			<div class="sensor-card__title">{title}</div>
			<span class="sensor-card__status-pill" style={`--pill-color:${statusStyle.color}`}>{statusStyle.label}</span>
		</div>
		<button class="header-action" type="button" aria-label="View device">
			<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
				<path fill="currentColor" d="M10 6v12l6-6-6-6Z"></path>
			</svg>
		</button>
	</header>

	<section class="sensor-card__body">
		<div
			class="sensor-card__slot"
			style={`--status-color:${statusStyle.color}; --status-glow:${statusStyle.glow};`}
		>
			<div class="sensor-card__content">
				<div class="sensor-card__device">
					<span class="sensor-card__label">{deviceLabel}</span>
					<div class="sensor-card__stats">
						<button
							type="button"
							class="sensor-stat sensor-stat--action"
							onclick={() => cycleStat('temperature')}
							title="Click to sample another temperature reading"
						>
							<span class="sensor-stat__icon sensor-stat__icon--temp" aria-hidden="true">
								<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
									<path
										fill="currentColor"
										d="M14 14.76V5a2 2 0 0 0-4 0v9.76a3.5 3.5 0 1 0 4 0ZM12 3a2 2 0 0 1 2 2v9.73l.21.12a2.5 2.5 0 1 1-4.42 0l.21-.12V5a2 2 0 0 1 2-2Zm0 9.5a1 1 0 0 0 1-1V7h-2v4.5a1 1 0 0 0 1 1Z"
									></path>
								</svg>
							</span>
							<span class="sensor-stat__value">{primaryValue.toFixed(2)}</span>
							<span class="sensor-stat__unit">{primaryUnit}</span>
						</button>

						<button
							type="button"
							class="sensor-stat sensor-stat--action"
							onclick={() => cycleStat('humidity')}
							title="Click to sample another humidity reading"
						>
							<span class="sensor-stat__icon sensor-stat__icon--humidity" aria-hidden="true">
								<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
									<path
										fill="currentColor"
										d="m12 3.1 4.95 6.17a6 6 0 1 1-9.9 0L12 3.1Zm0 1.52-3.9 4.86a5 5 0 1 0 7.8 0L12 4.62Z"
									></path>
								</svg>
							</span>
							<span class="sensor-stat__value">{secondaryValue.toFixed(2)}</span>
							<span class="sensor-stat__unit">{secondaryUnit}</span>
						</button>
					</div>
				</div>
				<button
					class="sensor-card__collapse"
					type="button"
					aria-label={expanded ? 'Collapse details' : 'Expand details'}
					onclick={toggleDetails}
				>
					<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
						<path fill="currentColor" d={expanded ? 'M7 14l5-5 5 5H7Z' : 'M7 10l5 5 5-5H7Z'}></path>
					</svg>
				</button>
			</div>

			{#if expanded}
				<div class="sensor-card__details" transition:slide={{ duration: 220 }}>
					<h4>詳細</h4>
					<ul>
						{#each computedDetailRows as row (row.id)}
							<li>
								<div class="detail-item">
									<div class="detail-item__info">
										<span class={`detail-item__icon detail-item__icon--${row.icon ?? 'timer'}`} aria-hidden="true">
											{#if row.icon === 'drop'}
												<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
													<path
														fill="currentColor"
														d="M12 3c-.3 0-.6.1-.8.4l-4 5c-.8 1-1.2 2.3-1.2 3.6C6 15.9 8.7 18.5 12 18.5s6-2.6 6-6c0-1.3-.4-2.6-1.2-3.6l-4-5c-.2-.3-.5-.4-.8-.4Z"
													></path>
												</svg>
											{:else if row.icon === 'thermo'}
												<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
													<path
														fill="currentColor"
														d="M14 14.76V5a2 2 0 1 0-4 0v9.76a3.5 3.5 0 1 0 4 0Z"
													></path>
												</svg>
											{:else}
												<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
													<path
														fill="currentColor"
														d="M12 7v5l4.3 2.6-.8 1.3L11 13V7h1Z"
													></path>
												</svg>
											{/if}
										</span>
										<span class="detail-item__label">{row.label}</span>
									</div>
									<div
										class="detail-item__value"
										class:detail-item__value--muted={!row.unit}
									>
										<span class="detail-item__number">{row.value}</span>
										{#if row.unit}
											<span class="detail-item__unit">{row.unit}</span>
										{/if}
									</div>
								</div>
							</li>
						{/each}
					</ul>

					<button class="sensor-card__cta" type="button">
						<span>詳細を見る</span>
						<svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
							<path fill="currentColor" d="M10 6v12l6-6-6-6Z"></path>
						</svg>
					</button>
				</div>
			{/if}
		</div>
		<p class="sensor-card__hint">Tip: Interact with the card to see the walkthrough react.</p>
	</section>
</div>

<style>
	.sensor-card {
		position: relative;
		width: min(370px, 100%);
		border-radius: 18px;
		background: #1d2029;
		border: 1px solid #161b25;
		box-shadow: 0 12px 24px rgba(8, 10, 15, 0.55);
		color: #f7f9ff;
		overflow: hidden;
		font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
	}

	.sensor-card__header {
		display: flex;
		align-items: center;
		padding: 0.85rem 1rem;
		gap: 0.8rem;
		background: #242a39;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.status-indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: #20d16a;
		background: rgba(14, 20, 31, 0.65);
		cursor: pointer;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.status-indicator:hover,
	.status-indicator:focus-visible {
		transform: translateY(-1px);
		box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
	}

	.status-indicator svg,
	.header-action svg,
	.sensor-card__collapse svg {
		width: 18px;
		height: 18px;
	}

	.sensor-card__title-group {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		flex: 1;
	}

	.sensor-card__title {
		font-weight: 700;
		color: #ffd740;
		font-size: 1rem;
	}

	.sensor-card__status-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.8);
		background: rgba(255, 255, 255, 0.1);
		padding: 0.1rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.08);
		position: relative;
	}

	.sensor-card__status-pill::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--pill-color, #20d16a);
		box-shadow: 0 0 6px var(--pill-color, #20d16a);
	}

	.header-action {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(34, 45, 66, 0.65);
		border: 1px solid rgba(111, 141, 199, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #7fa5ff;
		cursor: pointer;
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.header-action:hover {
		transform: translateX(1px);
		background: rgba(111, 141, 199, 0.25);
	}

	.sensor-card__body {
		background: #2f374c;
		padding: 1rem 1rem 1.3rem;
	}

	.sensor-card__slot {
		position: relative;
		padding: 0.75rem 0.9rem 0.9rem 2.4rem;
		border-radius: 14px;
		background: #343f58;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.sensor-card__slot::before {
		content: '';
		position: absolute;
		left: 12px;
		top: 12px;
		bottom: 12px;
		width: 5px;
		border-radius: 999px;
		background: linear-gradient(180deg, var(--status-color, #53ff8a), #1b1f29);
		box-shadow: 0 0 10px var(--status-glow, rgba(37, 214, 114, 0.75));
	}

	.sensor-card__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.sensor-card__device {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		flex: 1;
	}

	.sensor-card__label {
		font-size: 0.95rem;
		color: rgba(255, 255, 255, 0.72);
		font-weight: 600;
		letter-spacing: 0.03em;
	}

	.sensor-card__collapse {
		border: 0;
		background: transparent;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		padding: 0.1rem;
		transition: transform 0.2s ease;
	}

	.sensor-card__collapse:hover {
		transform: translateY(1px);
		color: #bfc9ff;
	}

	.sensor-card__stats {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.sensor-stat {
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		font-weight: 700;
		font-size: 1.1rem;
		color: #f6f7fb;
		background: transparent;
		border: none;
		padding: 0.25rem 0.35rem;
		border-radius: 12px;
	}

	.sensor-stat--action {
		cursor: pointer;
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.sensor-stat--action:hover,
	.sensor-stat--action:focus-visible {
		background: rgba(255, 255, 255, 0.08);
		transform: translateY(-1px);
	}

	.sensor-stat__icon {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
	}

	.sensor-stat__icon svg {
		width: 16px;
		height: 16px;
	}

	.sensor-stat__icon--temp {
		color: #f36d5b;
	}

	.sensor-stat__icon--humidity {
		color: #71c5ff;
	}

	.sensor-stat__value {
		line-height: 1;
	}

	.sensor-stat__unit {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		margin-left: 0.1rem;
		font-weight: 500;
	}

	.sensor-card__details {
		margin-top: 0.85rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.sensor-card__details h4 {
		margin: 0 0 0.4rem;
		font-size: 0.95rem;
		color: #ffd740;
	}

	.sensor-card__details ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.sensor-card__details li + li {
		border-top: 1px solid rgba(255, 255, 255, 0.08);
	}

	.detail-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.45rem 0;
	}

	.detail-item__info {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.9rem;
	}

	.detail-item__icon {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.05);
	}

	.detail-item__icon svg {
		width: 16px;
		height: 16px;
	}

	.detail-item__icon--drop {
		color: #74d5ff;
	}

	.detail-item__icon--thermo {
		color: #ff8b73;
	}

	.detail-item__icon--timer {
		color: #ffc371;
	}

	.detail-item__value {
		display: flex;
		align-items: baseline;
		gap: 0.25rem;
		font-weight: 700;
		color: #f6f7fb;
	}

	.detail-item__number {
		font-size: 1rem;
	}

	.detail-item__unit {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
	}

	.detail-item__value--muted {
		font-weight: 500;
		color: rgba(255, 255, 255, 0.65);
		font-size: 0.85rem;
	}

	.sensor-card__cta {
		width: 100%;
		margin-top: 0.85rem;
		border: 0;
		border-radius: 10px;
		background: linear-gradient(180deg, #3c4357, #2c3244);
		color: #f5f7ff;
		font-weight: 600;
		padding: 0.65rem 0.85rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		cursor: pointer;
		transition: background 0.2s ease, transform 0.2s ease;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.sensor-card__cta:hover {
		background: linear-gradient(180deg, #454c61, #2f3546);
		transform: translateY(-1px);
	}

	.sensor-card__cta svg {
		width: 16px;
		height: 16px;
		color: #9fb2ff;
	}

	.sensor-card__hint {
		margin-top: 0.75rem;
		font-size: 0.7rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.45);
		text-align: center;
	}
</style>
