<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';

	let email = $state('');
	let name = $state('');
	let subject = $state('');
	let message = $state('');
	let messageSent = $state(false);

	let ReCaptchaState = {
		idle: 'idle',
		requesting: 'requesting',
		success: 'success'
	};
	let token = $state('');
	let current_state = ReCaptchaState.idle;

	function onSubmit() {
		current_state = ReCaptchaState.requesting;
		doRecaptcha();
	}

	function doRecaptcha() {
		grecaptcha.ready(function () {
			grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then(function (
				t: string
			) {
				current_state = ReCaptchaState.success;
				token = t;
				submitReCaptchaToServerWithEmailForVerification(token);
			});
		});
	}

	function submitReCaptchaToServerWithEmailForVerification(token) {
		const formBody = new URLSearchParams({ token, email, name, subject, message });
		fetch('/contact-us/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formBody.toString() // or simply: body: formBody
		})
			.then((res) => {
				if (res.ok) {
					name = '';
					email = '';
					subject = '';
					message = '';
					messageSent = true;
					return res.json();
				} else {
					throw new Error('Failed to send email');
				}
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta
		name="description"
		content="Contact CropWatch for more information about our products and services."
	/>
	<meta name="keywords" content="CropWatch, Contact Us" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="CropWatch" />

	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}"
		nonce="%sveltekit.nonce%"
	></script>
</svelte:head>

<!-- Contact Us Section -->
<section class="bg-blue-600 py-16 text-white">
	<div class="container mx-auto text-center">
		<h1 class="text-4xl font-bold">{m.contact_us()}</h1>
		<p class="mt-4">
			{m.contact_intro()}
		</p>
	</div>
</section>

<section class="py-16">
	{#if !messageSent}
		<div class="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2">
			<!-- Contact Info -->
			<div>
				<h2 class="mb-6 text-2xl font-bold">{m.contact_details_title()}</h2>
				<p class="mb-4">
					<span class="font-bold">{m.contact_address_label()}</span>
					{m.contact_address_value()}
				</p>
				<span class="flex flex-row">
					<p class="mb-4">{m.contact_japan_phone_label()}</p>
					<img src="/images/japan-phone.png" alt={m.contact_alt_japan_phone()} />
				</span>
				<span class="flex flex-row">
					<p class="mb-4">{m.contact_usa_phone_label()}</p>
					<img src="/images/usa-phone.png" alt={m.contact_alt_usa_phone()} />
				</span>
				<p class="mb-4">
					<span class="font-bold">{m.contact_business_hours_label()}</span>
					{m.contact_business_hours_value()}
				</p>
				<div class="border-t border-gray-300 pt-4">
					<a href="https://discord.gg/tQ5642Cj" target="_blank" rel="noopener">
						<img src="/images/discord-logo-blue.svg" alt="Discord" width="150px" />
					</a>
				</div>
			</div>

			<!-- Contact Form -->
			<div>
				<h2 class="mb-6 text-2xl font-bold">{m.contact_form_title()}</h2>
				<form class="space-y-4" method="POST">
					<input
						type="hidden"
						name="g-recaptcha-response"
						id="g-recaptcha-response"
						value={token}
					/>
					<div>
						<label for="name" class="block font-bold text-gray-700"
							>{m.contact_form_name_label()}</label
						>
						<input
							bind:value={name}
							type="text"
							id="name"
							name="name"
							class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div>
						<label for="email" class="block font-bold text-gray-700"
							>{m.contact_form_email_label()}</label
						>
						<input
							bind:value={email}
							type="email"
							id="email"
							name="email"
							class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div>
						<label for="subject" class="block font-bold text-gray-700"
							>{m.contact_form_subject_label()}</label
						>
						<input
							bind:value={subject}
							type="text"
							id="subject"
							name="subject"
							class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
						/>
					</div>
					<div>
						<label for="message" class="block font-bold text-gray-700"
							>{m.contact_form_message_label()}</label
						>
						<textarea
							bind:value={message}
							id="message"
							name="message"
							rows="5"
							class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
						></textarea>
					</div>

					<button
						type="button"
						onclick={() => onSubmit()}
						data-sitekey="reCAPTCHA_site_key"
						data-callback="onSubmit"
						data-action="submit"
						class="w-full rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
					>
						{m.contact_form_submit_button()}
					</button>
				</form>
			</div>
		</div>
	{:else}
		<div class="container mx-auto text-center">
			<h2 class="text-2xl font-bold">{m.contact_thank_you_title()}</h2>
			<p class="mt-4">
				{m.contact_thank_you_message()}
			</p>
		</div>
	{/if}
</section>
