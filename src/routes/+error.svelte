<script lang="ts">
	import { dev } from '$app/environment';
	import { page } from '$app/state';

	type Copy = { icon: string; heading: string; body: string };

	function normalizeStatus(code: number) {
		return Number.isFinite(code) && code > 0 ? code : 520;
	}

	function resolveCopy(code: number): Copy {
		if (code === 404) {
			return {
				icon: 'travel_explore',
				heading: 'お探しのページが見つかりませんでした。',
				body: 'ページが移動または削除されたか、URL が間違っている可能性があります。下のリンクから、目的の情報をお探しください。'
			};
		}
		if (code >= 500) {
			return {
				icon: 'cloud_off',
				heading: 'サーバー側で問題が発生しました。',
				body: '一時的な問題の可能性があります。しばらく時間をおいてから、再度お試しください。解決しない場合はお問い合わせください。'
			};
		}
		return {
			icon: 'error',
			heading: 'ページを表示できませんでした。',
			body: '一時的な問題が発生した可能性があります。時間をおいて再度お試しいただくか、下のリンクからお進みください。'
		};
	}

	function safeMessage(value: unknown) {
		const message = typeof value === 'string' ? value.trim() : '';
		if (!message) return '';
		return message.length > 280 ? `${message.slice(0, 280)}…` : message;
	}

	const status = $derived(normalizeStatus(page.status));
	const copy = $derived(resolveCopy(status));
	const detail = $derived(safeMessage((page.error as App.Error | undefined)?.message));

	const links = [
		{ icon: 'home', title: 'ホーム', desc: 'トップページへ', href: '/' },
		{ icon: 'category', title: '業種から探す', desc: '農業・畜産・コールドチェーン', href: '/sectors' },
		{ icon: 'memory', title: '技術・製品', desc: 'センサーと仕組み', href: '/technology' },
		{ icon: 'reviews', title: '導入事例', desc: 'お客様の声', href: '/testimonials' },
		{ icon: 'help', title: 'ヘルプ', desc: 'よくある質問', href: '/help' },
		{ icon: 'mail', title: 'お問い合わせ', desc: 'デモ・ご相談', href: '/contact' }
	];

	function goBack() {
		if (typeof history !== 'undefined') history.back();
	}

	function reload() {
		if (typeof location !== 'undefined') location.reload();
	}
</script>

<svelte:head>
	<title>CropWatch 日本｜エラー {status}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="section errpage">
	<div class="wrap errpage__in">
		<span class="errpage__icon">
			<span class="material-symbols-rounded">{copy.icon}</span>
		</span>

		<p class="eyebrow">エラーコード {status}</p>
		<div class="errpage__code">{status}</div>

		<h1>{copy.heading}</h1>
		<p class="errpage__lead">{copy.body}</p>

		<div class="errpage__ctas">
			<a href="/" class="btn btn--accent btn--lg">ホームに戻る</a>
			{#if status >= 500}
				<button type="button" class="btn btn--ghost btn--lg" onclick={reload}>再読み込み</button>
			{/if}
			<button type="button" class="btn btn--ghost btn--lg" onclick={goBack}>前のページへ戻る</button>
		</div>

		<p class="errpage__sub">よく見られているページ</p>
		<div class="errlinks">
			{#each links as l (l.href)}
				<a class="errlink" href={l.href}>
					<span class="errlink__ic"><span class="material-symbols-rounded">{l.icon}</span></span>
					<span class="errlink__txt">
						<b>{l.title}</b>
						<span>{l.desc}</span>
					</span>
				</a>
			{/each}
		</div>

		{#if dev && detail}
			<div class="errdetails">
				<p class="errdetails__label">開発者向け詳細</p>
				<p class="errdetails__msg">{detail}</p>
			</div>
		{/if}
	</div>
</section>

<style>
	.errpage {
		background: var(--web-bg-soft);
		background-image: var(--web-hero-wash);
	}
	.errpage__in {
		max-width: 760px;
		margin-inline: auto;
		text-align: center;
	}

	.errpage__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 72px;
		height: 72px;
		border-radius: 20px;
		background: var(--web-primary-soft);
		color: var(--web-primary);
		margin-bottom: 18px;
	}
	.errpage__icon .material-symbols-rounded {
		font-size: 38px;
	}

	.errpage .eyebrow {
		justify-content: center;
		text-transform: uppercase;
		letter-spacing: 0.18em;
	}

	.errpage__code {
		font-size: clamp(88px, 22vw, 176px);
		font-weight: 800;
		line-height: 0.9;
		letter-spacing: -0.02em;
		margin: 4px 0 10px;
		background: linear-gradient(180deg, var(--cw-sapphire-400), var(--cw-sapphire-700));
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.errpage h1 {
		font-size: clamp(24px, 3.4vw, 34px);
	}
	.errpage__lead {
		font-size: 17px;
		line-height: 1.9;
		color: var(--web-muted);
		margin: 16px auto 0;
		max-width: 620px;
	}

	.errpage__ctas {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 14px;
		margin-top: 32px;
	}

	.errpage__sub {
		margin: 56px 0 16px;
		font-size: 13px;
		font-weight: 700;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--web-muted);
	}

	.errlinks {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 12px;
		text-align: left;
	}
	.errlink {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 15px 16px;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 16px;
		box-shadow: var(--web-shadow-card);
		transition:
			transform 0.2s var(--jp-ease),
			border-color 0.2s var(--jp-ease),
			box-shadow 0.2s var(--jp-ease);
	}
	.errlink:hover {
		transform: translateY(-2px);
		border-color: var(--web-primary);
		box-shadow: var(--web-shadow-raised);
	}
	.errlink__ic {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		flex: none;
		border-radius: 12px;
		background: var(--web-primary-soft);
		color: var(--web-primary);
	}
	.errlink__ic .material-symbols-rounded {
		font-size: 22px;
	}
	.errlink__txt b {
		display: block;
		font-size: 14.5px;
		font-weight: 800;
		color: var(--web-heading);
		line-height: 1.4;
	}
	.errlink__txt span {
		font-size: 12.5px;
		color: var(--web-muted);
	}

	.errdetails {
		margin-top: 40px;
		text-align: left;
		background: #fff;
		border: 1px solid var(--web-border);
		border-radius: 14px;
		padding: 16px 18px;
	}
	.errdetails__label {
		margin: 0 0 6px;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--web-muted);
	}
	.errdetails__msg {
		margin: 0;
		font-family: var(--cw-font-mono);
		font-size: 13px;
		color: var(--web-text);
		word-break: break-word;
	}

	@media (max-width: 820px) {
		.errlinks {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 560px) {
		.errlinks {
			grid-template-columns: 1fr;
		}
	}
</style>
