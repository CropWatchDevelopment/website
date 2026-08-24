<script lang="ts">
	import { resolve } from '$app/paths';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '$lib/styles/legal.css';

	const documents = [
		{
			href: '/legal/privacy-policy',
			label: 'Privacy Policy',
			description: 'How CropWatch collects, uses, manages, and protects personal information.'
		},
		{
			href: '/legal/EULA',
			label: 'Service Terms of Use (EULA)',
			description: 'The terms that govern access to and use of CropWatch services.'
		},
		{
			href: '/legal/terms-of-service',
			label: 'Cookie Policy',
			description: 'Why CropWatch uses cookies and how users can manage them.'
		}
	] as const;
</script>

<svelte:head>
	<title>Legal Information | CropWatch</title>
	<meta
		name="description"
		content="CropWatch legal documents, including our Privacy Policy, Service Terms of Use, and Cookie Policy."
	/>
	<link rel="canonical" href="https://cropwatch.io/legal" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'Legal Information' }]} />

<article class="legal-doc">
	<h1>Legal Information</h1>
	<p>Review CropWatch's policies and service terms below.</p>

	<hr />

	<ul>
		{#each documents as document (document.href)}
			<li>
				<a href={resolve(document.href)}>{document.label}</a>: {document.description}
			</li>
		{/each}
	</ul>
</article>
