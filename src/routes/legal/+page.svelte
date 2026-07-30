<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '$lib/styles/legal.css';

	const title = '法的情報｜CropWatch 日本';
	const description =
		'合同会社クロップウォッチの法的情報の一覧。プライバシーポリシー、サービス利用規約（EULA）、クッキーポリシーをご案内します。';

	const docs = [
		{
			href: '/legal/privacy-policy',
			label: 'プライバシーポリシー',
			note: '個人情報の取扱い、利用目的、管理・保護についてのご案内'
		},
		{
			href: '/legal/EULA',
			label: 'サービス利用規約（EULA）',
			note: '当社サービスのご利用条件についてのご案内'
		},
		{
			href: '/legal/terms-of-service',
			label: 'クッキーポリシー',
			note: 'クッキー等の利用目的と管理方法についてのご案内'
		}
	];
</script>

<Seo {title} {description} />

<Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: '法的情報' }]} />

<article class="legal-doc">
	<h1>法的情報</h1>
	<p>合同会社クロップウォッチの各種規約・ポリシーは以下よりご確認いただけます。</p>

	<hr />

	<ul>
		{#each docs as doc}
			<li>
				<a href={doc.href}>{doc.label}</a> - {doc.note}
			</li>
		{/each}
	</ul>
</article>
