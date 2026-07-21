<script lang="ts">
	import { browser } from '$app/environment';
	import { applyAction, deserialize } from '$app/forms';
	import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
	import { onDestroy } from 'svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const title =
		'お問い合わせ・無料デモのご予約｜温度監視・スマート農業・スマート畜産｜CropWatch 日本';
	const description =
		'CropWatch（クロップウォッチ）へのお問い合わせ・無料デモのご予約はこちら。冷蔵庫・鶏舎・ハウス・畑など、見守りたい場所をお聞かせください。最適なセンサー・受信機・通知の設定をご提案します。';

	let { form } = $props();

	type RecaptchaClient = {
		ready: (cb: () => void) => void;
		execute: (siteKey: string, config: { action: string }) => Promise<string>;
	};
	type RecaptchaWindow = Window & { grecaptcha?: RecaptchaClient };

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
		const target = event.currentTarget as HTMLFormElement | null;
		if (!target) return;

		// Native validation first (required fields, email format, consent).
		if (!target.checkValidity()) {
			event.preventDefault();
			target.reportValidity();
			return;
		}

		// 送信は必ずfetchで行う。Vercel BotIDはfetch/XHRにしか分類シグナルを
		// 付与できないため、ネイティブのフォーム送信（form.submit()）だと
		// サーバー側の checkBotId が全員をボット扱いして403になる。
		event.preventDefault();
		if (!browser) return;
		// 二重送信ガード（disabled反映前のEnter連打などに備える）
		if (recaptchaBusy) return;

		recaptchaError = null;
		recaptchaBusy = true;
		try {
			const formData = new FormData(target);
			if (recaptchaRequired) {
				const recaptcha = getRecaptchaClient();
				if (!recaptcha) {
					recaptchaError = 'security_unavailable';
					return;
				}
				const token = await recaptcha.execute(recaptchaSiteKey, { action: recaptchaAction });
				formData.set('g-recaptcha-response', token);
			}
			const response = await fetch(target.action, {
				method: 'POST',
				body: formData,
				headers: { 'x-sveltekit-action': 'true' }
			});
			const result = deserialize(await response.text());
			await applyAction(result);
		} catch (error) {
			console.error('contact form submission error', error);
			recaptchaError = 'verification_failed';
		} finally {
			recaptchaBusy = false;
		}
	};

	onDestroy(() => {
		if (recaptchaWatchTimer) clearTimeout(recaptchaWatchTimer);
	});
</script>

<Seo {title} {description} />

<svelte:head>
	{#if recaptchaSiteKey}
		<script
			src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
			async
			defer
		></script>
	{/if}
</svelte:head>

<Breadcrumbs items={[{ label: 'ホーム', href: '/' }, { label: 'お問い合わせ' }]} />

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">mail</span> お問い合わせ</p>
		<h1>監視したい場所や課題をお聞かせください。</h1>
		<p class="hero__kicker">導入前のご相談も、電話・メールでお気軽に。</p>
		<p>
			現場に合わせたセンサー構成、ゲートウェイ設置、通知方法をご提案し、導入後もデータが安定して届くようサポートします。
		</p>
	</div>
</section>

<section class="section section--tight">
	<div class="wrap contact-grid">
		<!-- フォーム -->
		<div data-reveal>
			{#if form?.success}
				<div class="form-card" style="text-align:center">
					<span class="material-symbols-rounded" style="font-size:56px;color:var(--web-accent)"
						>mark_email_read</span
					>
					<h2 style="font-size:22px;margin:12px 0 8px">送信ありがとうございました。</h2>
				</div>
			{:else}
				<form class="form-card" id="demoForm" method="post" action="?" onsubmit={handleSubmit}>
					<h2 style="font-size:22px;margin-bottom:6px">お問い合わせ</h2>

					{#if form?.message}
						<p class="form-error" role="alert">{form.message}</p>
					{/if}

					<div class="frow">
						<div class="ffield">
							<label for="lastName">姓 <span class="req">*</span></label><input
								id="lastName"
								class="finput"
								name="lastName"
								required
							/>
						</div>
						<div class="ffield">
							<label for="firstName">名 <span class="req">*</span></label><input
								id="firstName"
								class="finput"
								name="firstName"
								required
							/>
						</div>
					</div>
					<div class="frow">
						<div class="ffield">
							<label for="company">会社・店舗名 <span class="req">*</span></label><input
								id="company"
								class="finput"
								name="company"
								required
							/>
						</div>
						<div class="ffield">
							<label for="email">メールアドレス <span class="req">*</span></label><input
								id="email"
								class="finput"
								type="email"
								name="email"
								required
							/>
						</div>
					</div>
					<div class="frow">
						<div class="ffield">
							<label for="phone">電話番号</label><input
								id="phone"
								class="finput"
								type="tel"
								name="phone"
							/>
						</div>
						<div class="ffield">
							<label for="industry">業種</label>
							<select id="industry" class="finput" name="industry">
								<option value="">選択してください…</option>
								<option>飲食店・フードサービス</option>
								<option>ホテル・宿泊</option>
								<option>学校・給食施設</option>
								<option>工場</option>
								<option>スーパー・小売</option>
								<option>冷蔵倉庫・物流</option>
								<option>食品工場</option>
								<option>農業・ハウス栽培</option>
								<option>畜産・養鶏</option>
								<option>その他</option>
							</select>
						</div>
					</div>
					<div class="ffield">
						<label for="sites">監視したい場所の数</label>
						<select id="sites" class="finput" name="sites">
							<option value="">選択してください…</option>
							<option>1か所</option>
							<option>2〜5か所</option>
							<option>6〜20か所</option>
							<option>20か所以上</option>
						</select>
					</div>
					<div class="ffield">
						<label for="message">ご相談内容 <span class="req">*</span></label><textarea
							id="message"
							class="finput"
							name="message"
							required
							placeholder="見守りたい場所や台数など、お気軽にご記入ください。"
						></textarea>
					</div>
					<label class="fcheck"
						><input type="checkbox" name="consent" required />
						<span
							>CropWatch からの監視サービスに関するご連絡を希望します。いつでも配信を停止できます。</span
						></label
					>

					<input type="hidden" name="g-recaptcha-response" value="" aria-hidden="true" />
					{#if recaptchaRequired}
						<p class="form-note" aria-live="polite">
							{#if recaptchaError === 'security_unavailable'}
								セキュリティチェックを利用できません。ページを再読み込みしてからお試しください。
							{:else if recaptchaError === 'verification_failed'}
								検証に失敗しました。もう一度お試しください。
							{:else}
								Google reCAPTCHA (v3) によって保護されています。
							{/if}
						</p>
					{/if}

					<button
						type="submit"
						class="btn btn--accent btn--lg"
						style="width:100%;margin-top:22px"
						disabled={recaptchaBusy || (recaptchaRequired && !recaptchaReady)}
						aria-disabled={recaptchaBusy || (recaptchaRequired && !recaptchaReady)}
						aria-busy={recaptchaBusy}
					>
						{#if recaptchaBusy}
							<span class="btn-spinner" aria-hidden="true"></span> 送信しています…
						{:else}
							送信する <span class="material-symbols-rounded">arrow_forward</span>
						{/if}
					</button>
					<!-- <p class="form-note">メールでのご連絡は <a href="mailto:info@cropwatch.co.jp" style="color:var(--web-primary);font-weight:600">info@cropwatch.co.jp</a> まで</p> -->
				</form>
			{/if}
		</div>

		<!-- 連絡先 -->
		<aside class="cinfo" data-reveal>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">call</span> お電話</h3>
				<p>
					<a class="mono" href="tel:080-4284-3390">080-4284-3390</a><br /><a
						href="mailto:sayaka@cropwatch.io">sayaka@cropwatch.io</a
					>
				</p>
			</div>
			<!-- <div class="cinfo__card">
				<h3><span class="material-symbols-rounded">support_agent</span> サポート</h3>
				<p>すでにご利用中のお客さまは <a href="mailto:sayaka@cropwatch.io">sayaka@cropwatch.io</a> へ。</p>
			</div> -->
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">schedule</span> 受付時間</h3>
				<p>土〜火: 10 AM - 4:00 PM</p>
				<p>水〜金: 10 AM - 9:00 PM</p>
				<p>祝日: N/A</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">location_on</span> 所在地</h3>
				<p>〒881-0027<br />宮崎県西都市南方806-5</p>
			</div>
		</aside>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center">
			<span class="material-symbols-rounded">lightbulb</span> まだ迷っている方へ
		</p>
		<h2>導入から運用サポートまで</h2>
		<p>
			設置前の通信確認から運用サポートまで一貫して対応。現場で安心して使い続けられる環境づくりを支えます。
		</p>
		<div class="closing__ctas">
			<a href="/technology" class="btn btn--accent btn--lg">止まらない仕組みを見る</a>
			<a href="/testimonials" class="btn btn--outline-light btn--lg">お客様の声を見る</a>
		</div>
	</div>
</section>

<style>
	.contact-grid {
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 36px;
		align-items: start;
	}
	.form-card {
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 24px;
		padding: 38px;
		box-shadow: var(--web-shadow-card);
	}
	.frow {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.ffield {
		margin-bottom: 16px;
		display: flex;
		flex-direction: column;
	}
	.ffield label {
		font-size: 14px;
		font-weight: 700;
		color: var(--web-heading);
		margin-bottom: 7px;
	}
	.ffield .req {
		color: var(--cw-danger-500);
	}
	.finput {
		font-family: inherit;
		font-size: 15px;
		padding: 12px 14px;
		border: 1px solid var(--web-border-strong);
		border-radius: 12px;
		background: #fff;
		color: var(--web-text);
		width: 100%;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}
	.finput:focus {
		outline: none;
		border-color: var(--web-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--web-primary) 18%, transparent);
	}
	textarea.finput {
		min-height: 110px;
		resize: vertical;
	}
	.fcheck {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13.5px;
		color: var(--web-muted);
		line-height: 1.7;
		margin-top: 6px;
	}
	.fcheck input {
		margin-top: 4px;
	}
	.form-note {
		font-size: 13.5px;
		color: var(--web-muted);
		margin: 16px 0 0;
		text-align: center;
	}
	.form-error {
		font-size: 14px;
		color: var(--cw-danger-600);
		background: #fdeef0;
		border: 1px solid #fbe0e2;
		border-radius: 12px;
		padding: 12px 14px;
		margin: 0 0 18px;
	}
	.cinfo {
		display: grid;
		gap: 16px;
	}
	.cinfo__card {
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 18px;
		padding: 24px 26px;
		box-shadow: var(--web-shadow-card);
	}
	.cinfo__card h3 {
		display: flex;
		align-items: center;
		gap: 9px;
		font-size: 16px;
		margin-bottom: 10px;
	}
	.cinfo__card h3 .material-symbols-rounded {
		color: var(--web-primary);
		font-size: 22px;
	}
	.cinfo__card p {
		font-size: 14.5px;
		color: var(--web-muted);
		line-height: 1.9;
		margin: 0;
	}
	.cinfo__card a {
		color: var(--web-primary);
		font-weight: 600;
	}
	.cinfo__card .mono {
		font-family: var(--cw-font-mono);
		font-size: 16px;
	}
	@media (max-width: 880px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}
		.frow {
			grid-template-columns: 1fr;
		}
		.form-card {
			padding: 28px;
		}
	}

	/* 送信中ボタンのスピナー */
	.btn-spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: #fff;
		border-radius: 50%;
		animation: btn-spin 0.7s linear infinite;
		vertical-align: -3px;
	}
	@keyframes btn-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.btn-spinner {
			animation-duration: 1.6s;
		}
	}
</style>
