<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import '$lib/styles/legal.css';
</script>

<svelte:head>
	<title>Cookie Policy | CropWatch</title>
	<meta
		name="description"
		content="CropWatch, LLC's Cookie Policy, covering cookie use in its services, the information collected, and the controls available to users."
	/>
	<link rel="canonical" href="https://cropwatch.io/legal/terms-of-service" />
</svelte:head>

<Breadcrumbs items={[{ label: 'Home', href: '/home' }, { label: 'Cookie Policy' }]} />

<article class="legal-doc">
	<h1>Cookie Policy</h1>
	<p>
		This policy explains the purposes for which Cookies, etc. are used in connection with the
		Services, the information they collect, and the controls available to Users.
	</p>

	<hr />

	<h2>01. Use of Cookies, etc.</h2>
	<p>
		The services (the “Services”) provided by CropWatch, LLC (the “Company”) use cookies, other
		information collection modules, and similar technologies (collectively, “Cookies, etc.”).
		Through Cookies, etc., the Company can obtain information about Users’ access to and browsing of
		the Services. The information obtained through Cookies, etc. (the “Cookie Information”) does not
		include any information that, on its own, can identify a particular User.
	</p>

	<hr />

	<h2>02. How to Manage Cookies, etc.</h2>
	<p>
		Users who do not wish to allow the use of Cookies, etc. on the Services should disable them in
		their browser settings. Disabling Cookies, etc. may make the Services less convenient or limit
		the functions and services the Company can provide.
	</p>

	<hr />

	<h2>03. Main Cookies, etc. Used</h2>
	<p>The main Cookies, etc. used by the Services are described below.</p>

	<div class="legal-table-wrap">
		<table class="cookie-table">
			<thead>
				<tr>
					<th>Cookie Name</th>
					<th>Recipient</th>
					<th>Summary of Information Collected</th>
					<th>Purpose of Use</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Google Analytics</td>
					<td>Google LLC</td>
					<td>
						<p><strong>[Example]</strong></p>
						<ul>
							<li>IP address</li>
							<li>Unique device ID</li>
							<li>User activity, such as clicks and page navigation on the site</li>
							<li>URLs of pages viewed by the User</li>
							<li>Location information</li>
							<li>Time spent on the site and similar information</li>
						</ul>
					</td>
					<td>
						<p><strong>[Example]</strong></p>
						<p>
							To understand how the Services are used, improve the Services, and provide features
							better suited to Users’ interests and needs
						</p>
					</td>
				</tr>
				<tr>
					<td>sb-dpaoqrcfswnzknixwkll-auth-token.X</td>
					<td>Supabase Inc</td>
					<td>The User’s JavaScript Web Token (JWT) and refresh token</td>
					<td>Used for authentication and authorization</td>
				</tr>
			</tbody>
		</table>
	</div>

	<p>
		For details about how Google Analytics handles data, please review
		<a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noopener noreferrer"
			>Google’s Privacy Policy</a
		>.
	</p>

	<hr />

	<p class="legal-meta">Established and effective August 1, 2024</p>
</article>
