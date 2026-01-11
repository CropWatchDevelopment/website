
<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import { onDestroy } from 'svelte';
	import { _ } from 'svelte-i18n';

	type RecaptchaClient = {
		ready: (cb: () => void) => void;
		execute: (
			siteKey: string,
			config: {
				action: string;
			}
		) => Promise<string>;
	};

	type RecaptchaWindow = Window & {
		grecaptcha?: RecaptchaClient;
	};

	const getRecaptchaClient = () => (window as RecaptchaWindow).grecaptcha;

	const heroBulletKeys = [
		'contact.hero.bullets.0',
		'contact.hero.bullets.1',
		'contact.hero.bullets.2'
	] as const;

	const recaptchaSiteKey = PUBLIC_RECAPTCHA_SITE_KEY;
	const recaptchaRequired = Boolean(recaptchaSiteKey);
	const recaptchaAction = 'contact_form';
	let recaptchaReady = $state(!recaptchaRequired);
	let recaptchaBusy = $state(false);
	let recaptchaErrorKey = $state<string | null>(null);

	if (browser && recaptchaRequired) {
		const watchForRecaptcha = () => {
			const recaptcha = getRecaptchaClient();
			if (recaptcha) {
				recaptcha.ready(() => {
					recaptchaReady = true;
				});
			} else {
				setTimeout(watchForRecaptcha, 250);
			}
		};
		watchForRecaptcha();
	}

	const handleSubmit = async (event: SubmitEvent) => {
		if (!browser || !recaptchaRequired) {
			return;
		}

		event.preventDefault();
		recaptchaErrorKey = null;
		const target = event.currentTarget as HTMLFormElement | null;
		if (!target) return;
		const recaptcha = getRecaptchaClient();
		if (!recaptcha) {
			recaptchaErrorKey = 'contact.errors.security_unavailable';
			return;
		}

		recaptchaBusy = true;
		try {
			const token = await recaptcha.execute(recaptchaSiteKey, { action: recaptchaAction });
			let tokenInput = target.querySelector<HTMLInputElement>('input[name="g-recaptcha-response"]');
			if (!tokenInput) {
				tokenInput = document.createElement('input');
				tokenInput.type = 'hidden';
				tokenInput.name = 'g-recaptcha-response';
				target.appendChild(tokenInput);
			}
			tokenInput.value = token;
			target.submit();
		} catch (error) {
			console.error('reCAPTCHA execution error', error);
			recaptchaErrorKey = 'contact.errors.verification_failed';
		} finally {
			recaptchaBusy = false;
		}
	};

	onDestroy(() => {
		// 
	});
</script>

<svelte:head>
	<title>{$_('contact.meta.title')}</title>
	<meta name="description" content={$_('contact.meta.description')} />
	{#if recaptchaSiteKey}
		<script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} async defer></script>
	{/if}
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">{$_('contact.hero.eyebrow')}</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">{$_('contact.hero.headline')}</h1>
				<p class="text-base text-white/80">{$_('contact.hero.body')}</p>
				<ul class="space-y-4 text-sm text-white/80">
					{#each heroBulletKeys as bulletKey (bulletKey)}
						<li class="flex items-start gap-3">
							<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
							<span>{$_(bulletKey)}</span>
						</li>
					{/each}
				</ul>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">{$_('contact.form.title')}</h2>
				<p class="mt-2 text-sm text-white/70">{$_('contact.form.subtitle')}</p>
				<form class="mt-6 space-y-5 text-sm" method="post" onsubmit={handleSubmit}>
					<div class="grid gap-4 md:grid-cols-2">
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white">{$_('contact.form.fields.first_name.label')}</span>
							<input
								name="firstName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder={$_('contact.form.fields.first_name.placeholder')}
							/>
						</label>
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white">{$_('contact.form.fields.last_name.label')}</span>
							<input
								name="lastName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder={$_('contact.form.fields.last_name.placeholder')}
							/>
						</label>
					</div>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">{$_('contact.form.fields.email.label')}</span>
						<input
							name="email"
							type="email"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder={$_('contact.form.fields.email.placeholder')}
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">{$_('contact.form.fields.company.label')}</span>
						<input
							name="company"
							type="text"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder={$_('contact.form.fields.company.placeholder')}
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">{$_('contact.form.fields.message.label')}</span>
						<textarea
							name="message"
							rows={4}
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder={$_('contact.form.fields.message.placeholder')}
						></textarea>
					</label>
					<input type="hidden" name="g-recaptcha-response" value="" aria-hidden="true" />
					{#if recaptchaRequired}
						<p class="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/80" aria-live="polite">
							{#if recaptchaErrorKey}
								{$_(recaptchaErrorKey)}
							{:else}
								{$_('contact.recaptcha.protected')}
							{/if}
						</p>
					{:else}
						<p class="rounded-xl border border-dashed border-white/30 bg-white/5 px-3 py-2 text-xs text-white/80">
							{$_('contact.recaptcha.missing_key_prefix')} <code>PUBLIC_RECAPTCHA_SITE_KEY</code> {$_('contact.recaptcha.missing_key_suffix')}
						</p>
					{/if}
					<!-- <label class="flex items-center gap-2 text-white/70">
						<input type="checkbox" name="subscribe" class="h-4 w-4 rounded border-white/30 bg-white/10 text-[#f2a516] focus:ring-[#f2a516]" />
						<span>Keep me updated on product releases and industry insights.</span>
					</label> -->
					<button
						type="submit"
						class="w-full rounded-full bg-[#f2a516] px-4 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-60"
						disabled={recaptchaRequired && (!recaptchaReady || recaptchaBusy)}
						aria-disabled={recaptchaRequired && (!recaptchaReady || recaptchaBusy)}
					>
						{$_('contact.form.submit')}
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
