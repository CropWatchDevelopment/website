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

<CwCard title={`${titleName} のダッシュボード`} subtitle={`ロケーション: ${locationName}`} elevated>
	{#snippet actions()}
		<div>
			<p class="text-md text-right" style="color: var(--cw-text-muted)">
				最終更新:
				{#if lastUpdatedAt}
					<CwDuration from={lastUpdatedAt} />
				{:else}
					<span>-</span>
				{/if}
			</p>
			<p class="text-md text-right" style="color: var(--cw-text-muted)">
				Dev-Eui: {devEui}
				<CwCopy value={devEui} />
			</p>
		</div>
	{/snippet}

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
	</div>
</CwCard>

<style>
	.device-header__back {
		display: flex;
	}

	.device-header {
		display: flex;
		width: 100%;
		gap: var(--cw-space-3);
		align-items: flex-start;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.device-header__ranges {
		display: flex;
		flex-wrap: wrap;
		gap: var(--cw-space-2);
	}
</style>
