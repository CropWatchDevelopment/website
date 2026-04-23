<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { enhance } from '$app/forms';
	import Seo from '$lib/components/redesign/Seo.svelte';
	import { loc } from '$lib/i18n/navigation';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let name = $state('');
	let company = $state('');
	let email = $state('');
	let phone = $state('');
	let industry = $state('');
	let message = $state('');

	let errors = $state<Record<string, string>>({});
	let sent = $state(false);
	let submitting = $state(false);

	const industries = ['cold', 'ag', 'food', 'mfg', 'live', 'pub'];

	function validate(): boolean {
		const errs: Record<string, string> = {};
		if (!name.trim()) errs.name = $_('rd.contact.form_err_required');
		if (!email.trim()) errs.email = $_('rd.contact.form_err_required');
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = $_('rd.contact.form_err_email');
		if (!message.trim()) errs.message = $_('rd.contact.form_err_required');
		errors = errs;
		return Object.keys(errs).length === 0;
	}

	function splitName(full: string): { first: string; last: string } {
		const parts = full.trim().split(/\s+/);
		return { first: parts[0] ?? '', last: parts.slice(1).join(' ') || parts[0] || '' };
	}
</script>

<Seo
	title={$_('rd.seo.contact.title')}
	description={$_('rd.seo.contact.description')}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'ContactPage',
		name: $_('rd.seo.contact.title'),
		description: $_('rd.seo.contact.description'),
		url: 'https://www.cropwatch.io' + $loc('/contact')
	}}
/>

<section class="cw-section" style="padding-top:clamp(3rem,5vw,4.5rem);">
	<div class="cw-container-narrow" style="text-align:center; margin-bottom:2.5rem;">
		<span class="cw-eyebrow">{$_('rd.hdr.nav.contact')}</span>
		<h1
			style="margin:0.7rem 0 1rem; font-size:clamp(2rem,4.2vw,3rem); letter-spacing:-0.03em; color:var(--cw-blue-900); line-height:1.15;"
		>
			{$_('rd.contact.title')}
		</h1>
		<p
			style="font-size:1.05rem; color:var(--cw-text-soft); max-width:38rem; margin:0 auto; line-height:1.65;"
		>
			{$_('rd.contact.body')}
		</p>
	</div>

	<div class="cw-container">
		<div class="contact-grid">
			<aside class="contact-info">
				<h3>{$_('rd.contact.info_title')}</h3>
				<div class="contact-info-row">
					<div class="contact-info-label">{$_('rd.contact.info_email')}</div>
					<div class="contact-info-val">
						<a href="mailto:hello@cropwatch.io">hello@cropwatch.io</a>
					</div>
				</div>
				<div class="contact-info-row">
					<div class="contact-info-label">{$_('rd.contact.info_phone')}</div>
					<div class="contact-info-val" style="font-family:var(--cw-mono);">
						+81 (0) 985 000 000
					</div>
				</div>
				<div class="contact-info-row">
					<div class="contact-info-label">{$_('rd.contact.info_hours')}</div>
					<div class="contact-info-val">{$_('rd.contact.info_hours_val')}</div>
				</div>
				<div class="contact-info-row">
					<div class="contact-info-label">{$_('rd.contact.info_address')}</div>
					<div class="contact-info-val">{$_('rd.contact.info_address_val')}</div>
				</div>
			</aside>

			<form
				class="contact-form"
				method="POST"
				novalidate
				use:enhance={({ formData, cancel }) => {
					if (!validate()) {
						cancel();
						return;
					}
					const { first, last } = splitName(name);
					formData.set('firstName', first);
					formData.set('lastName', last);
					submitting = true;
					return async ({ result, update }) => {
						submitting = false;
						if (result.type === 'success') sent = true;
						await update({ reset: false });
					};
				}}
			>
				{#if sent || form?.success}
					<div class="form-success">✓ {$_('rd.contact.form_success')}</div>
				{/if}

				<div class="form-row">
					<div class="form-field" style="margin-bottom:0;">
						<label for="cw-name">
							{$_('rd.contact.form_name')}<span class="req">*</span>
						</label>
						<input id="cw-name" type="text" bind:value={name} />
						{#if errors.name}<span class="err">{errors.name}</span>{/if}
					</div>
					<div class="form-field" style="margin-bottom:0;">
						<label for="cw-company">{$_('rd.contact.form_company')}</label>
						<input id="cw-company" name="company" type="text" bind:value={company} />
					</div>
				</div>

				<div class="form-row">
					<div class="form-field" style="margin-bottom:0;">
						<label for="cw-email">
							{$_('rd.contact.form_email')}<span class="req">*</span>
						</label>
						<input id="cw-email" name="email" type="email" bind:value={email} />
						{#if errors.email}<span class="err">{errors.email}</span>{/if}
					</div>
					<div class="form-field" style="margin-bottom:0;">
						<label for="cw-phone">{$_('rd.contact.form_phone')}</label>
						<input id="cw-phone" name="phone" type="tel" bind:value={phone} />
					</div>
				</div>

				<div class="form-field">
					<label for="cw-industry">{$_('rd.contact.form_industry')}</label>
					<select id="cw-industry" name="industry" bind:value={industry}>
						<option value="">{$_('rd.contact.form_industry_opt')}</option>
						{#each industries as k (k)}
							<option value={k}>{$_(`rd.ind.${k}.title`)}</option>
						{/each}
					</select>
				</div>

				<div class="form-field">
					<label for="cw-message">
						{$_('rd.contact.form_message')}<span class="req">*</span>
					</label>
					<textarea id="cw-message" name="message" rows="5" bind:value={message}></textarea>
					<span class="hint">{$_('rd.contact.form_message_hint')}</span>
					{#if errors.message}<span class="err">{errors.message}</span>{/if}
				</div>

				<button
					type="submit"
					class="cw-btn cw-btn-primary"
					style="width:100%; justify-content:center; padding:1rem 1.4rem;"
					disabled={submitting}
				>
					{submitting ? '…' : $_('rd.contact.form_submit')}
				</button>
			</form>
		</div>
	</div>
</section>
