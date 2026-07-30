<!--
  Port of CropWatch's DeviceDashboardHeader.svelte.

  Same back button, header card, "last updated" duration, Dev-EUI + copy control
  and range picker. Dropped: the CSV export / notes dialogs and the settings
  button, which are permission-gated actions against a real account.
-->
<script lang="ts">
	import { CwButton, CwCard, CwCopy, CwDuration } from '@cropwatchdevelopment/cwui';
	import type { RangeSelection, TimeRangeOption } from '../../demo-history';

	interface Props {
		activeRange: RangeSelection | null;
		devEui: string;
		lastUpdatedAt: string | null;
		locationName: string;
		onBack: () => void;
		onSelectRange: (selection: RangeSelection) => unknown;
		rangeOptions: TimeRangeOption[];
		titleName: string;
	}

	let {
		activeRange,
		devEui,
		lastUpdatedAt,
		locationName,
		onBack,
		onSelectRange,
		rangeOptions,
		titleName
	}: Props = $props();
</script>

<!--
  Demo-only deviation: AppPage's shell is a plain flex column, so a bare
  CwButton child stretches to the full page width — which is what the app's
  back button currently does. It reads as a mistake rather than a control, so
  the demo pins it to its natural size. Worth fixing upstream in CropWatch.
-->
<div class="device-header__back">
	<CwButton id="device-header-back-button" variant="secondary" size="sm" onclick={onBack}>
		&larr; 戻る
	</CwButton>
</div>

<div class="device-header__card">
	<CwCard
		title={`${titleName} のダッシュボード`}
		subtitle={`ロケーション: ${locationName}`}
		elevated
	>
		<div class="device-header">
			<div class="device-header__ranges">
				{#each rangeOptions as range (range.value)}
					<CwButton
						id={`device-header-range-${range.value}-button`}
						variant={activeRange === range.value ? 'primary' : 'secondary'}
						size="sm"
						onclick={() => onSelectRange(range.value)}
					>
						{range.label}
					</CwButton>
				{/each}
			</div>

			<!-- Device meta sits under the range pickers rather than in the card's
			     actions slot. 最終更新 is deliberately last: it is the line that
			     changes, so it reads as the footer of the card. -->
			<div class="device-header__meta">
				<p>
					Dev-Eui: {devEui}
					<CwCopy value={devEui} />
				</p>
				<p>
					最終更新:
					{#if lastUpdatedAt}
						<CwDuration from={lastUpdatedAt} />
					{:else}
						<span>-</span>
					{/if}
				</p>
			</div>
		</div>
	</CwCard>
</div>

<style>
	.device-header__back {
		display: flex;
	}

	/* Ranges first, device meta beneath them. */
	.device-header {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: var(--cw-space-3);
		align-items: flex-start;
	}

	.device-header__ranges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cw-space-2);
	}

	.device-header__meta {
		display: flex;
		flex-direction: column;
		gap: var(--cw-space-1);
		width: 100%;
	}

	.device-header__meta p {
		display: flex;
		align-items: center;
		gap: var(--cw-space-1);
		margin: 0;
		font-size: var(--cw-text-sm);
		color: var(--cw-text-muted);
	}

	/* With the meta moved into the body there is no actions slot competing for
	   the header row, so the title gets its full width back. Keep it to one line
	   regardless — a longer device name would otherwise wrap on a phone. */
	.device-header__card :global(.cw-card__title) {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
