<script lang="ts">
	const regionalOffices = [
		{
			region: 'North America',
			phone: '+1 (813) 555-0123',
			address: '410 Harbor Exchange, Suite 400, Tampa, FL 33602',
			email: 'na-sales@cropwatch.io'
		},
		{
			region: 'Asia Pacific',
			phone: '+81 3-1234-5678',
			address: 'Eitai 2-36-2, Koto-ku, Tokyo 135-0034, Japan',
			email: 'apac@cropwatch.io'
		},
		{
			region: 'Europe',
			phone: '+44 20 7946 0630',
			address: '90 High Holborn, London WC1V 6LJ, United Kingdom',
			email: 'eu@cropwatch.io'
		}
	];

	const engagementHighlights = [
		{
			title: 'Rapid deployment blueprint',
			description: 'Site survey, RF modeling, and rollout plan delivered inside two weeks.'
		},
		{
			title: 'Operational success team',
			description: 'Dedicated specialists oversee installs, onboarding, and quarterly ROI reviews.'
		},
		{
			title: 'Always-on support',
			description: '24/7 network monitoring, automatic firmware updates, and guaranteed replacements.'
		}
	];
</script>

<svelte:head>
	<title>Contact CropWatch | Talk to an IoT Specialist</title>
	<meta
		name="description"
		content="Schedule a walk-through or connect with CropWatch specialists to design your rugged industrial IoT deployment."
	/>
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]" aria-hidden="true"></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold uppercase tracking-[0.32em] text-[#f2a516]">Let's connect</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					Book a strategy session with our industrial IoT team
				</h1>
				<p class="text-base text-white/80">
					Share your facility goals and we will build a tailored business case, from LoRaWAN coverage and sensor selection to analytics rollout and compliance-ready reporting.
				</p>
				<ul class="space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Site walk-throughs, live demos, and proof-of-value pilots.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Design guidance for cold storage, manufacturing, hospitality, and more.</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>Executive-ready ROI modeling to accelerate stakeholder sign-off.</span>
					</li>
				</ul>
			</div>
			<div class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur">
				<h2 class="text-lg font-semibold text-white">Start the conversation</h2>
				<p class="mt-2 text-sm text-white/70">Complete the form and we'll respond within one business day.</p>
				<form class="mt-6 space-y-5 text-sm" method="post">
					<div class="grid gap-4 md:grid-cols-2">
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white">First name</span>
							<input
								name="firstName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder="Jordan"
							/>
						</label>
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white">Last name</span>
							<input
								name="lastName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder="Morgan"
							/>
						</label>
					</div>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">Work email</span>
						<input
							name="email"
							type="email"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="you@company.com"
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">Company</span>
						<input
							name="company"
							type="text"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="Acme Foods"
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">How can we help?</span>
						<textarea
							name="message"
							rows={4}
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="Tell us about your facilities, challenges, and timelines."
						></textarea>
					</label>
					<label class="flex items-center gap-2 text-white/70">
						<input type="checkbox" name="subscribe" class="h-4 w-4 rounded border-white/30 bg-white/10 text-[#f2a516] focus:ring-[#f2a516]" />
						<span>Keep me updated on product releases and industry insights.</span>
					</label>
					<button
						type="submit"
						class="w-full rounded-full bg-[#f2a516] px-4 py-3 text-sm font-semibold text-[#11213c] transition hover:bg-[#ffbb34] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
					>
						Submit inquiry
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
