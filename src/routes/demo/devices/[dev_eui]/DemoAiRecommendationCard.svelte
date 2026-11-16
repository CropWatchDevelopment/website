<!--
  Port of CropWatch's AiRecommendationCard
  (CropWatch/src/lib/components/displays/SoilDisplay/AiRecommendationCard.svelte):
  the 栽培アドバイス card a soil sensor with a crop shows above its history.

  Same layout and the same rules for what is shown: the findings as a table,
  one bullet per action, the metrics that are on target, the model's text and
  the meaning of every value behind expand panels, and a print button that
  prints only this card. Japanese only (this site has no language switch), so
  the app's message keys are written out here.

  The report itself comes from demo-ai-report.ts instead of the API.
-->
<script lang="ts">
	import { assets } from '$app/paths';
	import { CwButton, CwCard, CwChip, CwExpandPanel, type CwTone } from '@cropwatchdevelopment/cwui';
	import DemoIcon from '../../DemoIcon.svelte';
	import type {
		AiFindingDisplayDto,
		AiFindingTextDto,
		AiRecommendationDto
	} from '../../demo-ai-report';
	import { printElement } from './print-element';

	interface Props {
		/** The sensor's newest daily report. */
		report: AiRecommendationDto;
	}

	let { report }: Props = $props();

	const TITLE = '栽培アドバイス';
	const ICON = (name: string) => `${assets}/demo/icons/${name}.svg`;

	let root: HTMLElement | undefined = $state();
	let printing = $state(false);

	type Row = {
		severity: number;
		action: string;
		display: AiFindingDisplayDto;
		text: AiFindingTextDto;
		/** "低い時間帯 " / "高い時間帯 " before the value when it is the low or high end; empty otherwise. */
		valuePrefix: string;
		statusLabel: string;
	};

	const STATUS_LABELS: Record<AiFindingDisplayDto['status'], string> = {
		below: '目標より低い',
		above: '目標より高い',
		low_end_below: '低い時間帯が目標未満（平均は目標内）',
		peak_above: 'ピークが目標超え（平均は目標内）',
		invalid: '値が異常です'
	};

	let headline = $derived(report.headline_ja);
	// The model's text, one finding per line.
	let points = $derived(
		report.body_ja
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean)
	);
	let rows = $derived.by((): Row[] =>
		report.findings.map((f) => {
			const text = f.display.ja;
			const kindLabel =
				f.display.kind === 'low' ? '低い時間帯' : f.display.kind === 'high' ? '高い時間帯' : '';
			const status = STATUS_LABELS[f.display.status] ?? STATUS_LABELS.below;
			return {
				severity: f.severity,
				action: f.action,
				display: f.display,
				text,
				valuePrefix: kindLabel ? `${kindLabel} ` : '',
				statusLabel: text.days_off ? `${status} (${text.days_off})` : status
			};
		})
	);
	// One bullet per action: a finding that another action covers shows how
	// that action helps it.
	let actionItems = $derived.by(() => {
		const seen: string[] = [];
		const list: { title: string; text: string }[] = [];
		for (const row of rows) {
			const key = row.text.note ? `note:${row.text.what}` : row.action;
			if (seen.includes(key)) continue;
			seen.push(key);
			list.push({ title: row.text.action_title, text: row.text.note ?? row.text.action });
		}
		return list;
	});
	let onTarget = $derived(
		report.details.filter((d) => d.severity === 0 || d.severity === 1).map((d) => d.what_ja)
	);
	// period_start is the sensor's local calendar day: show that day whatever the viewer's zone.
	let periodLabel = $derived(
		new Intl.DateTimeFormat('ja-JP', {
			month: 'long',
			day: 'numeric',
			weekday: 'short',
			timeZone: 'UTC'
		}).format(new Date(`${report.period_start}T00:00:00Z`))
	);
	let status = $derived.by((): { tone: CwTone; label: string } => {
		if (report.status === 'good') return { tone: 'success', label: '良好' };
		if (report.status === 'insufficient_data') return { tone: 'secondary', label: 'データ不足' };
		return report.max_severity >= 3
			? { tone: 'danger', label: '安全範囲外' }
			: { tone: 'warning', label: '要注意' };
	});

	/** Prints just this card, with both panels open and without the print button. */
	async function printCard() {
		if (!root || printing) return;
		printing = true;
		try {
			await printElement(root, {
				title: `${TITLE} ${periodLabel}`,
				prepare: (copy) => {
					copy
						.querySelectorAll('.cw-expand')
						.forEach((panel) => panel.classList.add('cw-expand--open'));
					copy.querySelectorAll('[inert]').forEach((el) => el.removeAttribute('inert'));
					copy
						.querySelectorAll('.cw-expand__chevron, .ai-report__print')
						.forEach((el) => el.remove());
				}
			});
		} finally {
			printing = false;
		}
	}
</script>

<div class="ai-report" bind:this={root}>
	<CwCard elevated>
		{#snippet header()}
			<div class="ai-report__titles">
				<div class="ai-report__title-row">
					<DemoIcon src={ICON('lightbulb')} class="ai-report__bulb" />
					<h3 class="ai-report__title">{TITLE}</h3>
				</div>
				<p class="ai-report__subtitle">{periodLabel}のAI日報</p>
			</div>
		{/snippet}

		{#snippet actions()}
			<CwChip label={status.label} tone={status.tone} size="sm" />
			<CwButton
				id="ai-report-print-button"
				class="ai-report__print"
				type="button"
				variant="secondary"
				size="sm"
				loading={printing}
				onclick={printCard}
			>
				<DemoIcon src={ICON('print')} class="ai-report__print-icon" />
				印刷
			</CwButton>
		{/snippet}

		<div class="ai-report__content">
			<p class="ai-report__headline">{headline}</p>

			{#if rows.length > 0}
				<table class="ai-report__table">
					<thead>
						<tr>
							<th scope="col">測定項目</th>
							<th scope="col">記録値</th>
							<th scope="col">目標</th>
							<th scope="col">状態</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as row, index (index)}
							<tr>
								<th scope="row" class="ai-report__what">{row.text.what}</th>
								<td data-label="記録値">
									<span class="ai-report__recorded">
										{#if row.text.value}
											{row.valuePrefix}<strong>{row.text.value}</strong>{#if row.text.average}、平均 <strong
													>{row.text.average}</strong
												>{/if}
										{:else}
											-
										{/if}
									</span>
								</td>
								<td data-label="目標">{row.text.target ?? '-'}</td>
								<td data-label="状態">
									<span
										class="ai-report__status"
										class:ai-report__status--critical={row.severity >= 3}
										class:ai-report__status--attention={row.severity < 3}
									>
										{row.statusLabel}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				<section class="ai-report__section">
					<h4 class="ai-report__subheading">推奨される対策</h4>
					<ul class="ai-report__actions">
						{#each actionItems as action, index (index)}
							<li><strong>{action.title}：</strong> {action.text}</li>
						{/each}
					</ul>
				</section>

				{#if onTarget.length > 0}
					<p class="ai-report__on-target">
						<strong>目標どおり：{onTarget.join('、')}</strong>
					</p>
				{/if}

				{#if points.length > 0}
					<CwExpandPanel title="AIによる説明">
						<div class="ai-report__ai-text">
							{#each points as point, index (index)}
								<p>{point}</p>
							{/each}
						</div>
					</CwExpandPanel>
				{/if}
			{:else}
				<ul class="ai-report__points">
					{#each points as point, index (index)}
						<li class="ai-report__point">{point}</li>
					{/each}
				</ul>
			{/if}

			{#if report.details.length > 0}
				<CwExpandPanel title="各測定値の意味">
					<ul class="ai-report__details">
						{#each report.details as detail (`${detail.metric}:${detail.period}`)}
							<li>{detail.ja}</li>
						{/each}
					</ul>
				</CwExpandPanel>
			{/if}

			<p class="ai-report__note">
				このセンサーのデータをもとにCropWatch
				AIが作成しました。数値はすべてAIではなくルールで計算しています。ご自身の確認とあわせてご活用ください。
			</p>
		</div>
	</CwCard>
</div>

<style>
	.ai-report {
		min-width: 0;
	}

	.ai-report__titles {
		flex: 1;
		min-width: 0;
	}

	.ai-report__title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.ai-report__title-row :global(.ai-report__bulb) {
		inline-size: 1.375rem;
		block-size: 1.375rem;
		color: var(--cw-warning-500, #f79009);
	}

	.ai-report :global(.ai-report__print-icon) {
		inline-size: 1rem;
		block-size: 1rem;
	}

	.ai-report__title {
		margin: 0;
		font-size: var(--cw-text-lg, 1.125rem);
		font-weight: var(--cw-font-semibold, 600);
		line-height: var(--cw-leading-tight, 1.25);
		color: var(--cw-text-primary, #101828);
		overflow-wrap: anywhere;
	}

	.ai-report__subtitle {
		margin: var(--cw-space-1, 0.25rem) 0 0;
		font-size: var(--cw-text-sm, 0.875rem);
		color: var(--cw-text-muted, #475467);
	}

	.ai-report__content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-width: 0;
		color: var(--cw-text-primary, #101828);
	}

	.ai-report__headline {
		margin: 0;
		font-size: var(--cw-text-lg, 1.125rem);
		font-weight: 600;
		line-height: 1.4;
	}

	.ai-report__table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--cw-text-sm, 0.875rem);
		line-height: 1.5;
	}

	.ai-report__table th,
	.ai-report__table td {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--cw-border-muted, #e4e7ec);
		text-align: left;
		vertical-align: top;
	}

	.ai-report__table thead th {
		font-size: var(--cw-text-xs, 0.75rem);
		font-weight: 600;
		letter-spacing: 0.03em;
		color: var(--cw-text-muted, #475467);
		background: var(--cw-bg-subtle, #f8fafc);
	}

	.ai-report__what {
		font-weight: 600;
	}

	.ai-report__status {
		font-weight: 600;
	}

	.ai-report__status--critical {
		color: var(--cw-danger-500, #d92d20);
	}

	.ai-report__status--attention {
		color: var(--cw-warning-500, #b54708);
	}

	.ai-report__section {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	/* Colour and weight are set here, not inherited: printed on its own the
	   card sits outside the demo shell, where the marketing site's heading
	   rules would otherwise apply. */
	.ai-report__subheading {
		margin: 0;
		font-size: var(--cw-text-base, 1rem);
		font-weight: 600;
		color: var(--cw-text-primary, #101828);
	}

	.ai-report__actions {
		margin: 0;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		line-height: 1.6;
	}

	.ai-report__on-target {
		margin: 0;
	}

	.ai-report__ai-text p {
		margin: 0 0 0.5rem;
		line-height: 1.6;
	}

	.ai-report__points {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.ai-report__point {
		padding: 0.625rem 0.875rem;
		border-left: 3px solid var(--cw-primary-500, #2563eb);
		border-radius: 0 0.5rem 0.5rem 0;
		background: var(--cw-bg-subtle, #f8fafc);
		line-height: 1.6;
		overflow-wrap: anywhere;
	}

	.ai-report__details {
		margin: 0;
		padding-left: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		font-size: var(--cw-text-sm, 0.875rem);
		line-height: 1.5;
	}

	.ai-report__note {
		margin: 0;
		font-size: var(--cw-text-xs, 0.75rem);
		color: var(--cw-text-muted, #475467);
	}

	/* Phones: each finding becomes a small block, the column name beside each value. */
	@media (max-width: 640px) {
		.ai-report__table thead {
			display: none;
		}

		.ai-report__table tr {
			display: block;
			padding: 0.5rem 0;
			border-bottom: 1px solid var(--cw-border-muted, #e4e7ec);
		}

		.ai-report__table th,
		.ai-report__table td {
			display: flex;
			gap: 0.75rem;
			justify-content: space-between;
			padding: 0.25rem 0;
			border-bottom: none;
		}

		.ai-report__table td::before {
			content: attr(data-label);
			flex-shrink: 0;
			color: var(--cw-text-muted, #475467);
		}

		.ai-report__table td {
			text-align: right;
		}
	}
</style>
