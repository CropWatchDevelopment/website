<!--
  /demo/locations — port of the CropWatch locations list
  (CropWatch/src/routes/locations/+page.svelte): every location, grouped,
  searchable, each opening its location page. The add button is shown
  disabled: the demo has no location setup flow.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets, resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import {
		CwButton,
		CwCard,
		CwDataTable,
		type CwColumnDef,
		type CwTableQuery,
		type CwTableResult
	} from '@cropwatchdevelopment/cwui';
	import AppPage from '../AppPage.svelte';
	import DemoIcon from '../DemoIcon.svelte';
	import { cwDataTableLabels } from '../cwui-labels';
	import { createDemoGroups, type DemoLocation } from '../demo-data';
	import { isDemoSignedIn } from '../demo-session';
	import { sortByColumn } from '../table-loader';

	const ICON = (name: string) => `${assets}/demo/icons/${name}.svg`;

	const locations: DemoLocation[] = createDemoGroups().map((group) => group.location);

	const columns: CwColumnDef<DemoLocation>[] = [
		{ key: 'location_id', header: 'ID', hideBelow: 'md' },
		{ key: 'name', header: 'ロケーション', sortable: true }
	];

	async function loadData(query: CwTableQuery): Promise<CwTableResult<DemoLocation>> {
		const search = query.search?.trim().toLowerCase() || '';
		let rows = search
			? locations.filter((location) => location.name.toLowerCase().includes(search))
			: locations;
		if (query.sort) rows = sortByColumn(rows, query.sort.column, query.sort.direction);
		const skip = (query.page - 1) * query.pageSize;
		return { rows: rows.slice(skip, skip + query.pageSize), total: rows.length };
	}

	onMount(() => {
		if (!isDemoSignedIn()) goto(resolve('/demo/login'), { replaceState: true });
	});
</script>

<svelte:head>
	<title>ロケーション - CropWatch デモ</title>
</svelte:head>

<AppPage>
	<div>
		<CwButton
			id="locations-back-button"
			variant="secondary"
			size="sm"
			onclick={() => goto(resolve('/demo'))}
		>
			&larr; ダッシュボードに戻る
		</CwButton>
	</div>

	<CwCard title="すべてのロケーション" elevated>
		<CwDataTable
			id="locations-table"
			labels={cwDataTableLabels()}
			{columns}
			{loadData}
			rowKey="location_id"
			groupBy="group"
			searchable
			pageSize={10}
			rowActionsHeader="操作"
		>
			{#snippet toolbarActions()}
				<CwButton id="locations-add-button" variant="primary" disabled>
					<DemoIcon src={ICON('add')} alt="ロケーションを作成" />
				</CwButton>
			{/snippet}

			{#snippet rowActions(row: DemoLocation)}
				<CwButton
					id={`locations-row-${row.location_id}-view-button`}
					size="md"
					variant="info"
					onclick={() =>
						goto(resolve(`/demo/locations/${row.location_id}?backTo=/demo/locations` as '/demo'))}
				>
					<DemoIcon src={ICON('eye')} alt="表示" />
				</CwButton>
			{/snippet}
		</CwDataTable>
	</CwCard>
</AppPage>
