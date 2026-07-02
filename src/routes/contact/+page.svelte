<script lang="ts">
import { browser } from '$app/environment';
import { PUBLIC_RECAPTCHA_SITE_KEY } from '$env/static/public';
import { onDestroy } from 'svelte';

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

	if (!browser || !recaptchaRequired) {
		return; // no reCAPTCHA configured → submit natively
	}

	event.preventDefault();
	recaptchaError = null;
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
	if (recaptchaWatchTimer) clearTimeout(recaptchaWatchTimer);
});
</script>

<svelte:head>
	<title>お問い合わせ・無料デモのご予約｜CropWatch 日本</title>
	<meta
		name="description"
		content="CropWatch（クロップウォッチ）へのお問い合わせ・無料デモのご予約はこちら。冷蔵庫・鶏舎・ハウス・畑など、見守りたい場所をお聞かせください。最適なセンサー・受信機・通知の設定をご提案します。"
	/>
	{#if recaptchaSiteKey}
		<script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} async defer></script>
	{/if}
</svelte:head>

<section class="pagehero">
	<div class="wrap pagehero__in" data-reveal>
		<p class="eyebrow"><span class="material-symbols-rounded">mail</span> お問い合わせ</p>
		<h1>見守りたい場所を、お聞かせください。</h1>
		<p class="hero__kicker">初めての方でも、安心。<span class="u">電話でもメールでも、お気軽に。</span></p>
		<p>冷蔵庫・鶏舎・ハウス・畑など、監視したい場所をお知らせください。<b>必要なセンサー・受信機・通知の設定をご提案</b>し、どんな記録が残るのかをご覧いただけます。デモは20分ほどです。</p>
		<p class="pagehero__note"><span class="material-symbols-rounded">check_circle</span> ご相談・お見積もりは無料です。無理な勧誘はいたしません。</p>
	</div>
</section>

<section class="section section--tight">
	<div class="wrap contact-grid">
		<!-- フォーム -->
		<div data-reveal>
			{#if form?.success}
				<div class="form-card" style="text-align:center">
					<span class="material-symbols-rounded" style="font-size:56px;color:var(--web-accent)">mark_email_read</span>
					<h2 style="font-size:22px;margin:12px 0 8px">送信ありがとうございました。</h2>
					<p style="color:var(--web-muted);max-width:42ch;margin:0 auto">
						担当者より1営業日以内にご連絡いたします。その間に、<a href="/sectors" style="color:var(--web-primary);font-weight:600">製品の一覧</a>もご覧ください。
					</p>
				</div>
			{:else}
				<form class="form-card" id="demoForm" method="post" action="?" onsubmit={handleSubmit}>
					<h2 style="font-size:22px;margin-bottom:6px">無料デモ・お見積もりのご依頼</h2>
					<p style="color:var(--web-muted);font-size:14px;margin:0 0 24px">1営業日以内にご返信します。</p>

					{#if form?.message}
						<p class="form-error" role="alert">{form.message}</p>
					{/if}

					<div class="frow">
						<div class="ffield"><label for="lastName">姓 <span class="req">*</span></label><input id="lastName" class="finput" name="lastName" required /></div>
						<div class="ffield"><label for="firstName">名 <span class="req">*</span></label><input id="firstName" class="finput" name="firstName" required /></div>
					</div>
					<div class="frow">
						<div class="ffield"><label for="company">会社・店舗名 <span class="req">*</span></label><input id="company" class="finput" name="company" required /></div>
						<div class="ffield"><label for="email">メールアドレス <span class="req">*</span></label><input id="email" class="finput" type="email" name="email" required /></div>
					</div>
					<div class="frow">
						<div class="ffield"><label for="phone">電話番号</label><input id="phone" class="finput" type="tel" name="phone" /></div>
						<div class="ffield"><label for="industry">業種</label>
							<select id="industry" class="finput" name="industry">
								<option value="">選択してください…</option>
								<option>飲食店・フードサービス</option>
								<option>ホテル・宿泊</option>
								<option>学校・給食施設</option>
								<option>病院・薬局</option>
								<option>スーパー・小売</option>
								<option>冷蔵倉庫・物流</option>
								<option>食品工場</option>
								<option>農業・ハウス栽培</option>
								<option>畜産・養鶏</option>
								<option>その他</option>
							</select>
						</div>
					</div>
					<div class="ffield"><label for="sites">監視したい場所の数</label>
						<select id="sites" class="finput" name="sites">
							<option value="">選択してください…</option>
							<option>1か所</option>
							<option>2〜5か所</option>
							<option>6〜20か所</option>
							<option>20か所以上</option>
						</select>
					</div>
					<div class="ffield"><label for="message">ご相談内容 <span class="req">*</span></label><textarea id="message" class="finput" name="message" required placeholder="見守りたい場所や台数など、お気軽にご記入ください。"></textarea></div>
					<label class="fcheck"><input type="checkbox" name="consent" required /> <span>CropWatch からの監視サービスに関するご連絡を希望します。いつでも配信を停止できます。</span></label>

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
						disabled={recaptchaRequired && (!recaptchaReady || recaptchaBusy)}
						aria-disabled={recaptchaRequired && (!recaptchaReady || recaptchaBusy)}
					>
						送信する <span class="material-symbols-rounded">arrow_forward</span>
					</button>
					<p class="form-note">メールでのご連絡は <a href="mailto:info@cropwatch.co.jp" style="color:var(--web-primary);font-weight:600">info@cropwatch.co.jp</a> まで</p>
				</form>
			{/if}
		</div>

		<!-- 連絡先 -->
		<aside class="cinfo" data-reveal>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">call</span> お電話</h3>
				<p><a class="mono" href="tel:0120000000">0120-000-000</a><br><a href="mailto:info@cropwatch.co.jp">info@cropwatch.co.jp</a></p>
				<p class="cinfo__note">※ 連絡先は仮の表示です。</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">support_agent</span> サポート</h3>
				<p>すでにご利用中のお客さまは <a href="mailto:support@cropwatch.co.jp">support@cropwatch.co.jp</a> へ。</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">schedule</span> 受付時間</h3>
				<p>平日 9:00〜18:00<br>※ アラートと画面は24時間365日動いています。</p>
			</div>
			<div class="cinfo__card">
				<h3><span class="material-symbols-rounded">location_on</span> 所在地</h3>
				<p>〒100-0001<br>東京都千代田区（仮）</p>
			</div>
		</aside>
	</div>
</section>

<section class="closing">
	<div class="wrap closing__in" data-reveal>
		<p class="eyebrow eyebrow--gold" style="justify-content:center"><span class="material-symbols-rounded">lightbulb</span> まだ迷っている方へ</p>
		<h2>選ばれる理由を、もう一度。</h2>
		<p>自分で交換できるセンサー、校正証明書、二重チェック、そして番犬機能。CropWatch の安心の仕組みをご覧ください。</p>
		<div class="closing__ctas">
			<a href="/technology" class="btn btn--accent btn--lg">止まらない仕組みを見る</a>
			<a href="/testimonials" class="btn btn--outline-light btn--lg">お客様の声を読む</a>
		</div>
	</div>
</section>

<style>
	.contact-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 36px; align-items: start; }
	.form-card { background: #fff; border: 1px solid var(--web-border); border-radius: 24px; padding: 38px; box-shadow: var(--web-shadow-card); }
	.frow { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
	.ffield { margin-bottom: 16px; display: flex; flex-direction: column; }
	.ffield label { font-size: 14px; font-weight: 700; color: var(--web-heading); margin-bottom: 7px; }
	.ffield .req { color: var(--cw-danger-500); }
	.finput { font-family: inherit; font-size: 15px; padding: 12px 14px; border: 1px solid var(--web-border-strong); border-radius: 12px; background: #fff; color: var(--web-text); width: 100%; transition: border-color .15s, box-shadow .15s; }
	.finput:focus { outline: none; border-color: var(--web-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--web-primary) 18%, transparent); }
	textarea.finput { min-height: 110px; resize: vertical; }
	.fcheck { display: flex; align-items: flex-start; gap: 10px; font-size: 13.5px; color: var(--web-muted); line-height: 1.7; margin-top: 6px; }
	.fcheck input { margin-top: 4px; }
	.form-note { font-size: 13.5px; color: var(--web-muted); margin: 16px 0 0; text-align: center; }
	.form-error { font-size: 14px; color: var(--cw-danger-600); background: #fdeef0; border: 1px solid #fbe0e2; border-radius: 12px; padding: 12px 14px; margin: 0 0 18px; }
	.cinfo { display: grid; gap: 16px; }
	.cinfo__card { background: #fff; border: 1px solid var(--web-border); border-radius: 18px; padding: 24px 26px; box-shadow: var(--web-shadow-card); }
	.cinfo__card h3 { display: flex; align-items: center; gap: 9px; font-size: 16px; margin-bottom: 10px; }
	.cinfo__card h3 .material-symbols-rounded { color: var(--web-primary); font-size: 22px; }
	.cinfo__card p { font-size: 14.5px; color: var(--web-muted); line-height: 1.9; margin: 0; }
	.cinfo__card a { color: var(--web-primary); font-weight: 600; }
	.cinfo__card .mono { font-family: var(--cw-font-mono); font-size: 16px; }
	.cinfo__note { font-size: 12px; color: var(--web-muted); margin-top: 8px; }
	@media (max-width:880px){ .contact-grid{grid-template-columns:1fr;} .frow{grid-template-columns:1fr;} .form-card{padding:28px;} }
</style>
