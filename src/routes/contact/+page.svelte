<script lang="ts">
	import { tick } from 'svelte';
	import { deserialize } from '$app/forms';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

	// Demo-request form. Native validation gates the submit, then we fetch a
	// reCAPTCHA Enterprise token and POST to the `default` action in
	// +page.server.ts (nodemailer -> kevin@cropwatch.io). The POST is always a
	// fetch (never a native form submission): Vercel BotID can only attach its
	// human/bot signals to fetch/XHR, so a native POST gets 403'd as a bot. On
	// success we swap in the confirmation card; on failure we surface the reason
	// and keep what the visitor typed so nothing is lost.
	let submitted = $state(false);
	let sending = $state(false);
	let errorMsg = $state('');
	let successEl: HTMLDivElement | undefined = $state();

	const FALLBACK_ERROR =
		'Something went wrong. Please try again, or email kevin@cropwatch.io directly.';

	type RecaptchaClient = {
		ready: (cb: () => void) => void;
		execute: (siteKey: string, config: { action: string }) => Promise<string>;
	};
	const getRecaptcha = () => (window as Window & { grecaptcha?: RecaptchaClient }).grecaptcha;

	const handleSubmit = async (event: SubmitEvent) => {
		const form = event.currentTarget as HTMLFormElement | null;
		if (!form) return;

		if (!form.checkValidity()) {
			event.preventDefault();
			form.reportValidity();
			return;
		}

		event.preventDefault();
		if (sending) return; // guard against double submits
		sending = true;
		errorMsg = '';
		try {
			const formData = new FormData(form);
			if (PUBLIC_RECAPTCHA_SITE_KEY) {
				const recaptcha = getRecaptcha();
				if (!recaptcha) throw new Error('reCAPTCHA client not loaded');
				const token = await recaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, {
					action: 'contact_form'
				});
				formData.set('g-recaptcha-response', token);
			}
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData,
				headers: { 'x-sveltekit-action': 'true' }
			});
			const result = deserialize(await response.text());
			if (result.type === 'success') {
				submitted = true;
				await tick();
				successEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			} else if (result.type === 'failure') {
				errorMsg = (result.data?.error as string) ?? FALLBACK_ERROR;
			} else {
				errorMsg = FALLBACK_ERROR;
			}
		} catch (err) {
			console.error('[contact] submission failed', err);
			errorMsg = FALLBACK_ERROR;
		} finally {
			sending = false;
		}
	};
</script>

<svelte:head>
	{#if PUBLIC_RECAPTCHA_SITE_KEY}
		<script
			src={`https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_SITE_KEY}`}
			async
			defer
		></script>
	{/if}
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
				<form class="form-card" method="POST" onsubmit={handleSubmit}>
					<h2 style="font-size:var(--cw-text-2xl);margin-bottom:6px">Let's chat!</h2>
					<p style="color:var(--web-muted);font-size:14px;margin:0 0 24px">Send us a message, and we will get back to you ASAP.</p>
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
					{#if errorMsg}
						<p role="alert" style="margin:18px 0 0;padding:12px 14px;border-radius:10px;background:#fdecec;border:1px solid #f5b5b5;color:#9b1c1c;font-size:14px">{errorMsg}</p>
					{/if}
					<button type="submit" disabled={sending} aria-busy={sending} class="cta-pill cta-pill--lg" style="width:100%;justify-content:center;margin-top:22px;border:none;cursor:pointer;font-family:inherit">
						{#if sending}
							<span class="btn-spinner" aria-hidden="true"></span> Sending...
						{:else}
							Send request <span class="material-symbols-rounded">arrow_forward</span>
						{/if}
					</button>
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
					<a href="mailto:sayaka@cropwatch.io">sayaka@cropwatch.io</a>
				</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">support_agent</span> Support</h3>
				<p>
					Already running CropWatch?<br />
					<a href="mailto:kevin@cropwatch.io">kevin@cropwatch.io</a>
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
					Need service in Japan? See our Japanese site:<br />
					<a href="https://cropwatch.co.jp">www.cropwatch.co.jp (日本語)</a>
				</p>
			</div>
		</aside>
	</div>
	<p style="text-align:center;margin-top:32px">
		<a href="/home" class="cta-ghost cta-pill--lg"><span class="material-symbols-rounded">arrow_back</span> <span>Back to home</span></a>
	</p>
</section>
