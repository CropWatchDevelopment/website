<script lang="ts">
	import { browser } from '$app/environment';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import { onDestroy } from 'svelte';

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

	const recaptchaSiteKey = PUBLIC_RECAPTCHA_SITE_KEY;
	const recaptchaRequired = Boolean(recaptchaSiteKey);
	const recaptchaAction = 'contact_form';
	type RecaptchaError = 'security_unavailable' | 'verification_failed' | null;
	let recaptchaReady = $state(!recaptchaRequired);
	let recaptchaBusy = $state(false);
	let recaptchaError = $state<RecaptchaError>(null);
	let recaptchaWatchTimer: ReturnType<typeof setTimeout> | null = null;

	if (browser && recaptchaRequired) {
		const watchForRecaptcha = () => {
			const recaptcha = getRecaptchaClient();
			if (recaptcha) {
				recaptcha.ready(() => {
					recaptchaReady = true;
				});
			} else {
				recaptchaWatchTimer = setTimeout(watchForRecaptcha, 250);
			}
		};
		watchForRecaptcha();
	}

	const handleSubmit = async (event: SubmitEvent) => {
		if (!browser || !recaptchaRequired) {
			return;
		}

		event.preventDefault();
		recaptchaError = null;
		const target = event.currentTarget as HTMLFormElement | null;
		if (!target) return;
		const recaptcha = getRecaptchaClient();
		if (!recaptcha) {
			recaptchaError = 'security_unavailable';
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
			recaptchaError = 'verification_failed';
		} finally {
			recaptchaBusy = false;
		}
	};

	onDestroy(() => {
		if (recaptchaWatchTimer) {
			clearTimeout(recaptchaWatchTimer);
		}
	});
</script>

<svelte:head>
	<title>CropWatch へお問い合わせ | IoT スペシャリストに相談</title>
	<meta name="description" content="施設ウォークスルーの予約や、堅牢な産業用 IoT 展開の設計について CropWatch のスペシャリストにご相談ください。" />
	{#if recaptchaSiteKey}
		<script
			src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
			async
			defer
		></script>
	{/if}
</svelte:head>

<section class="relative overflow-hidden bg-[#11213c] py-20 text-white">
	<div
		class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(47,83,135,0.25),_transparent_60%)]"
		aria-hidden="true"
	></div>
	<div class="relative mx-auto w-full max-w-6xl px-4">
		<div class="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-center">
			<div class="space-y-6">
				<p class="text-xs font-semibold tracking-[0.32em] text-[#f2a516] uppercase">
					お問い合わせ
				</p>
				<h1 class="text-4xl font-semibold tracking-tight md:text-5xl">
					産業用 IoT チームとの戦略セッションを予約
				</h1>
				<p class="text-base text-white/80">施設の目標や課題を共有いただければ、LoRaWAN カバレッジ設計からセンサー選定、分析導入、コンプライアンス対応までを含むビジネスケースをカスタムでご提案します。</p>
				<ul class="space-y-4 text-sm text-white/80">
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>現地ウォークスルー、ライブデモ、PoV パイロットを実施。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>冷凍倉庫、製造、ホスピタリティなど各業界向けの設計ガイダンス。</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 h-2 w-2 rounded-full bg-[#f2a516]"></span>
						<span>経営層の承認を加速させる ROI モデリングをご提供。</span>
					</li>
				</ul>
			</div>
			<div
				class="rounded-3xl border border-white/20 bg-[#0b1730]/80 p-8 shadow-xl shadow-black/30 backdrop-blur"
			>
				<h2 class="text-lg font-semibold text-white">まずはご相談ください</h2>
				<p class="mt-2 text-sm text-white/70">フォームにご入力いただければ、1 営業日以内にご連絡します。</p>
				<form class="mt-6 space-y-5 text-sm" method="post" action="?" onsubmit={handleSubmit}>
					<div class="grid gap-4 md:grid-cols-2">
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white"
								>名</span
							>
							<input
								name="firstName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder="太郎"
							/>
						</label>
						<label class="flex flex-col gap-2">
							<span class="font-medium text-white">姓</span
							>
							<input
								name="lastName"
								type="text"
								required
								class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
								placeholder="山田"
							/>
						</label>
					</div>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">業務用メールアドレス</span>
						<input
							name="email"
							type="email"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="you@company.com"
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">会社名</span>
						<input
							name="company"
							type="text"
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="Acme Foods"
						/>
					</label>
					<label class="flex flex-col gap-2">
						<span class="font-medium text-white">ご相談内容</span>
						<textarea
							name="message"
							rows={4}
							required
							class="rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-[#f2a516] focus:outline-none"
							placeholder="施設情報や課題、希望スケジュールをご記入ください。"
						></textarea>
					</label>
					<input type="hidden" name="g-recaptcha-response" value="" aria-hidden="true" />
					{#if recaptchaRequired}
						<div class="space-y-2">
							<p
								class="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs text-white/80"
								aria-live="polite"
							>
								{#if recaptchaError === 'security_unavailable'}
									セキュリティチェックを利用できません。ページを再読み込みしてからお試しください。
								{:else if recaptchaError === 'verification_failed'}
									検証に失敗しました。もう一度お試しください。
								{:else}
									Google reCAPTCHA (v3) によって保護されています。
								{/if}
							</p>
							<p class="text-[11px] leading-relaxed text-white/65">
								このサイトは reCAPTCHA によって保護されており、Google の
								{' '}
								<a
									class="underline transition hover:text-white"
									href="https://policies.google.com/privacy"
									target="_blank"
									rel="noreferrer"
								>
									プライバシーポリシー
								</a>
								{' '}
								と
								{' '}
								<a
									class="underline transition hover:text-white"
									href="https://policies.google.com/terms"
									target="_blank"
									rel="noreferrer"
								>
									利用規約
								</a>
								{' '}
								が適用されます。
							</p>
						</div>
					{:else}
						<p
							class="rounded-xl border border-dashed border-white/30 bg-white/5 px-3 py-2 text-xs text-white/80"
						>
							CAPTCHA を有効にするには <code>PUBLIC_RECAPTCHA_SITE_KEY</code>
							を設定してください。
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
						送信する
					</button>
				</form>
			</div>
		</div>
	</div>
</section>
