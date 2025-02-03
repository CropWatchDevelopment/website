<script>
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
		debugger;
		current_state = ReCaptchaState.requesting;
		doRecaptcha();
	}

	function doRecaptcha() {
		grecaptcha.ready(function () {
			grecaptcha.execute(PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }).then(function (t) {
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
				debugger;
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

	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_RECAPTCHA_SITE_KEY}"
		nonce="%sveltekit.nonce%"
	></script>
</svelte:head>

<!-- Contact Us Section -->
<section class="bg-blue-600 py-16 text-white">
	<div class="container mx-auto text-center">
		<h1 class="text-4xl font-bold">Contact Us</h1>
		<p class="mt-4">
			We would love to hear from you! Reach out to us through any of the methods below or fill out
			the contact form.
		</p>
	</div>
</section>

<section class="py-16">
	{#if !messageSent}
	<div class="container mx-auto grid grid-cols-1 gap-12 md:grid-cols-2">
		<!-- Contact Info -->
		<div>
			<h2 class="mb-6 text-2xl font-bold">Our Contact Details</h2>
			<p class="mb-4">
				<span class="font-bold">Address:</span> 123 CropWatch Lane, AgriCity, AG 45678
			</p>
			<p class="mb-4"><span class="font-bold">Phone:</span> +1 (123) 456-7890</p>
			<p class="mb-4"><span class="font-bold">Email:</span> contact@cropwatch.com</p>
			<p class="mb-4"><span class="font-bold">Business Hours:</span> Mon - Fri, 9 AM - 5 PM</p>
		</div>

		<!-- Contact Form -->
		<div>
			<h2 class="mb-6 text-2xl font-bold">Send Us a Message</h2>
			<form class="space-y-4" method="POST">
				<input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response" value={token} />
				<div>
					<label for="name" class="block font-bold text-gray-700">Your Name</label>
					<input
						bind:value={name}
						type="text"
						id="name"
						name="name"
						class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
				</div>
				<div>
					<label for="email" class="block font-bold text-gray-700">Your Email</label>
					<input
						bind:value={email}
						type="email"
						id="email"
						name="email"
						class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
				</div>
				<div>
					<label for="subject" class="block font-bold text-gray-700">Subject</label>
					<input
						bind:value={subject}
						type="text"
						id="subject"
						name="subject"
						class="w-full rounded border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
					/>
				</div>
				<div>
					<label for="message" class="block font-bold text-gray-700">Message</label>
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
					>Send Message</button
				>
			</form>
		</div>
	</div>
	{:else}
		<div class="container mx-auto text-center">
			<h2 class="text-2xl font-bold">Thank you for contacting us!</h2>
			<p class="mt-4">
				We have received your message and will get back to you as soon as possible.
			</p>
		</div>
	{/if}
</section>
