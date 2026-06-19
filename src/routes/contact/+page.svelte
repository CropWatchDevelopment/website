<script lang="ts">
	import { tick } from 'svelte';

	// Demo-request form ported from the design. Submission is client-side only for
	// now: native validation gates the submit, then we swap in the success card -
	// matching the design's behaviour. Wire `payload` to a real endpoint when the
	// inbound API is ready.
	let submitted = $state(false);
	let formEl: HTMLFormElement | undefined = $state();
	let successEl: HTMLDivElement | undefined = $state();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!formEl || !formEl.checkValidity()) {
			formEl?.reportValidity();
			return;
		}
		// const payload = Object.fromEntries(new FormData(formEl));  // -> send to API
		submitted = true;
		await tick();
		successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<svelte:head>
	<title>Contact &amp; Book a Demo | CropWatch</title>
	<meta
		name="description"
		content="Book a CropWatch demo or talk to sales and support. We'll map the sensors, gateways and alerts for your coolers, barns, greenhouses or cold storage and show you the audit trail it produces."
	/>
	<link rel="canonical" href="https://cropwatch.io/contact" />
</svelte:head>

<section class="pagehero">
	<div class="wrap">
		<p class="eyebrow">Contact</p>
		<h1>Ready for better monitoring?</h1>
		<p>
			Tell us what you need to keep in range. We'll map the sensors, gateways and alerts - and show
			you the audit trail it produces. We can also connect you to a distributor or integrator partner if you prefer.
		</p>
	</div>
</section>

<section class="section section--tight">
	<div class="wrap contact-grid">
		<!-- form -->
		<div data-reveal>
			{#if !submitted}
				<form class="form-card" bind:this={formEl} onsubmit={handleSubmit} novalidate>
					<h2 style="font-size:var(--cw-text-2xl);margin-bottom:6px">Book a demo or request a quote</h2>
					<p style="color:var(--web-muted);font-size:14px;margin:0 0 24px">We'll reply within one business day.</p>
					<div class="frow">
						<div class="ffield"><label for="first">First name <span class="req">*</span></label><input id="first" class="finput" name="first" required /></div>
						<div class="ffield"><label for="last">Last name <span class="req">*</span></label><input id="last" class="finput" name="last" required /></div>
					</div>
					<div class="frow">
						<div class="ffield"><label for="email">Work email <span class="req">*</span></label><input id="email" class="finput" type="email" name="email" required /></div>
						<div class="ffield"><label for="phone">Phone</label><input id="phone" class="finput" type="tel" name="phone" /></div>
					</div>
					<div class="frow">
						<div class="ffield"><label for="company">Company <span class="req">*</span></label><input id="company" class="finput" name="company" required /></div>
						<div class="ffield"><label for="role">Role</label><input id="role" class="finput" name="role" placeholder="e.g. QA Manager" /></div>
					</div>
					<div class="frow">
						<div class="ffield"><label for="industry">Industry</label>
							<select id="industry" class="finput" name="industry">
								<option value="">Select...</option>
								<option>Restaurant / food service</option>
								<option>Hotel / hospitality</option>
								<option>School / university</option>
								<option>Hospital / pharmacy</option>
								<option>Grocery / retail</option>
								<option>Cold storage / warehousing</option>
								<option>Food manufacturing</option>
								<option>Farming / greenhouse</option>
								<option>Poultry / livestock</option>
								<option>Other</option>
							</select>
						</div>
						<div class="ffield"><label for="sites">Locations to monitor</label>
							<select id="sites" class="finput" name="sites">
								<option value="">Select...</option>
								<option>1 site</option>
								<option>2-5 sites</option>
								<option>6-20 sites</option>
								<option>20+ sites</option>
							</select>
						</div>
					</div>
					<div class="ffield"><label for="message">How can we help?</label><textarea id="message" class="finput" name="message" placeholder="What do you need to keep in range? How many coolers, houses or fields?"></textarea></div>
					<label class="fcheck"><input type="checkbox" name="consent" required /> <span>I'd like CropWatch to contact me about monitoring for my organization. I can unsubscribe at any time.</span></label>
					<button type="submit" class="cta-pill cta-pill--lg" style="width:100%;justify-content:center;margin-top:22px;border:none;cursor:pointer;font-family:inherit">Send request <span class="material-symbols-rounded">arrow_forward</span></button>
					<p class="form-note">Prefer email? Reach us at <a href="mailto:sales@cropwatch.io" style="color:var(--web-primary);font-weight:600">sales@cropwatch.io</a></p>
				</form>
			{:else}
				<div class="form-card" bind:this={successEl} style="text-align:center">
					<span class="material-symbols-rounded" style="font-size:56px;color:var(--web-accent)">mark_email_read</span>
					<h2 style="font-size:var(--cw-text-2xl);margin:12px 0 8px">Thanks - request received.</h2>
					<p style="color:var(--web-muted);max-width:42ch;margin:0 auto">A CropWatch specialist will reach out within one business day to schedule your demo. In the meantime, explore the <a href="/cold-chain" style="color:var(--web-primary);font-weight:600">products</a>.</p>
				</div>
			{/if}
		</div>

		<!-- info -->
		<aside class="cinfo" data-reveal>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">call</span> Sales</h3>
				<p>
					Book a demo or get a quote.<br />
					<a href="tel:+19783813105" class="mono">+1 (978) 381-3105</a><br />
					<a href="mailto:sales@cropwatch.io">sales@cropwatch.io</a>
				</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">support_agent</span> Support</h3>
				<p>
					Already running CropWatch?<br />
					<a href="mailto:support@cropwatch.io">support@cropwatch.io</a>
				</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">apps</span> App &amp; API</h3>
				<p>
					<a href="https://app.cropwatch.io">app.cropwatch.io</a> · <a href="https://api.cropwatch.io">api.cropwatch.io</a><br />
					Unlimited users, rules, API and reports - included.
				</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">language</span> Japan</h3>
				<p>
					Based in Japan?
					<a href="https://cropwatch.co.jp">www.cropwatch.co.jp (日本語)</a>
				</p>
			</div>
		</aside>
	</div>
	<p style="text-align:center;margin-top:32px">
		<a href="/home" class="cta-ghost cta-pill--lg"><span class="material-symbols-rounded">arrow_back</span> <span>Back to home</span></a>
	</p>
</section>
