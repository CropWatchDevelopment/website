<!--
  /demo/login — port of CropWatch/src/routes/auth/login/+page.svelte, wrapped in
  the app's animated auth scene (CropWatch/src/routes/auth/+layout.svelte).

  Nothing here authenticates anything. There is no reCAPTCHA, no form action and
  no request: the credentials are the literal strings "demo" / "demo", printed
  on the card, and a match just flips a sessionStorage flag and moves on to the
  demo dashboard. The account-creation and password-reset links from the real
  screen are shown disabled — they belong to the live app, not the demo.
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import { CwButton, CwCard, CwInput } from '@cropwatchdevelopment/cwui';
	import DemoIcon from '../DemoIcon.svelte';
	import { DEMO_PASSWORD, DEMO_USERNAME, signInDemo } from '../demo-session';
	import './style.css';

	const KEY_ICON = `${assets}/demo/icons/key.svg`;
	const CROPWATCH_LOGO = `${assets}/cropwatch_icons/cropwatch_static.svg`;

	type ParticleSize = 'sm' | 'md' | 'lg';

	interface SceneParticle {
		id: string;
		sizeClass: string;
		style: string;
	}

	const PARTICLE_COUNT = 28;

	function createSeededRandom(seed: number): () => number {
		let state = seed >>> 0;

		return () => {
			state = (state * 1664525 + 1013904223) >>> 0;
			return state / 0x100000000;
		};
	}

	function resolveParticleSize(value: number): ParticleSize {
		if (value > 0.78) return 'lg';
		if (value > 0.38) return 'md';
		return 'sm';
	}

	function createSceneParticles(count: number): SceneParticle[] {
		const random = createSeededRandom(0xc0ffee);

		return Array.from({ length: count }, (_, index) => {
			const size = resolveParticleSize(random());
			const left = 4 + random() * 92;
			const driftX = (random() - 0.5) * 18;
			const duration = 18 + random() * 18;
			const delay = -random() * duration;
			const shimmerDuration = 4.5 + random() * 3.5;
			const shimmerDelay = -random() * shimmerDuration;
			const opacity = 0.24 + random() * 0.48;

			return {
				id: `particle-${index}`,
				sizeClass: `bg-dot--${size}`,
				style: [
					`left:${left.toFixed(2)}%`,
					`--bg-dot-rise-x:${driftX.toFixed(2)}vw`,
					`--bg-dot-duration:${duration.toFixed(2)}s`,
					`--bg-dot-delay:${delay.toFixed(2)}s`,
					`--bg-dot-shimmer-duration:${shimmerDuration.toFixed(2)}s`,
					`--bg-dot-shimmer-delay:${shimmerDelay.toFixed(2)}s`,
					`--bg-dot-opacity:${opacity.toFixed(2)}`,
					'animation-name:bg-rise,bg-shimmer !important',
					`animation-duration:${duration.toFixed(2)}s,${shimmerDuration.toFixed(2)}s !important`,
					'animation-timing-function:linear,ease-in-out !important',
					'animation-iteration-count:infinite,infinite !important',
					`animation-delay:${delay.toFixed(2)}s,${shimmerDelay.toFixed(2)}s !important`
				].join(';')
			};
		});
	}

	const particles = createSceneParticles(PARTICLE_COUNT);

	let { form } = $props();

	let loggingIn = $state(false);
	let username = $state(DEMO_USERNAME);
	let password = $state(DEMO_PASSWORD);
	let clientError = $state('');

	const error = $derived(clientError || (form?.error ?? ''));

	// The form posts to the action in +page.server.ts if this never runs (JS off,
	// or a click that beats hydration). Normally it does run, and the whole
	// "sign-in" is a sessionStorage flag plus a client-side navigation.
	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (loggingIn) return;

		if (username.trim() !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
			clientError = `デモ用のユーザー名とパスワードはどちらも「${DEMO_USERNAME}」です。`;
			return;
		}

		clientError = '';
		loggingIn = true;
		signInDemo();
		goto('/demo');
	}
</script>

<svelte:head>
	<title>デモにログイン - CropWatch</title>
	<meta
		name="description"
		content="CropWatch ダッシュボードのデモにログインします。ユーザー名とパスワードはどちらも demo です。"
	/>
</svelte:head>

<section class="auth-scene p-0 md:p-8">
	<div class="scene-gradient"></div>
	<div class="scene-vignette"></div>
	<div class="particle-layer" aria-hidden="true">
		{#each particles as particle (particle.id)}
			<span class={`bg-dot ${particle.sizeClass}`} style={particle.style}></span>
		{/each}
	</div>

	<div class="auth-content relative z-2 w-full md:max-w-md">
		<CwCard padded={false} class="auth-card">
			<div class="auth-shell">
				<div class="logo-frame">
					<img src={CROPWATCH_LOGO} alt="CropWatch" class="logo-image" />
				</div>

				<h1 class="auth-title">CropWatch へようこそ！</h1>
				<p class="auth-subtitle">デモ環境にサインインしてダッシュボードをご覧ください</p>

				<p class="demo-hint">
					ユーザー名・パスワードともに <code>demo</code> です（入力済み）。
				</p>

				<form id="login-form" class="auth-form" method="POST" onsubmit={handleSubmit}>
					{#if error}
						<p class="auth-alert" role="alert">{error}</p>
					{/if}

					<label class="field-block">
						<span class="field-label">ユーザー名</span>
						<CwInput
							id="login-email-input"
							bind:value={username}
							class="auth-input"
							name="username"
							type="text"
							required
							placeholder="demo"
							autocomplete="off"
						/>
					</label>

					<label class="field-block">
						<span class="field-label">パスワード</span>
						<CwInput
							id="login-password-input"
							bind:value={password}
							class="auth-input"
							name="password"
							type="password"
							required
							placeholder="demo"
							autocomplete="off"
						/>
					</label>
					<span class="flex flex-row"></span>
					<CwButton
						id="login-submit-button"
						class="auth-primary"
						type="submit"
						variant="primary"
						loading={loggingIn}
						disabled={loggingIn || !username || !password}
						size="md"
						fullWidth={true}
					>
						<DemoIcon src={KEY_ICON} alt="サインイン" class="h-4 w-4" />
						{loggingIn ? 'サインイン中...' : 'サインイン'}
					</CwButton>

					<div class="action-grid">
						<span class="auth-button-link auth-button-link--secondary is-disabled">
							アカウントを作成
						</span>

						<span class="auth-button-link auth-button-link--secondary is-disabled">
							<span class="text-sm">パスワードをお忘れですか？</span>
						</span>
					</div>
				</form>

				<p class="security-copy">これは CropWatch のデモ画面です（サンプルデータ）</p>
				<p class="security-copy">
					<a class="demo-exit" href="/">← CropWatch のサイトに戻る</a>
				</p>
			</div>
		</CwCard>
	</div>
</section>

<style>
	.auth-scene {
		position: relative;
		display: flex;
		min-height: 100vh;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #0a1331;
	}

	.scene-gradient,
	.scene-vignette {
		pointer-events: none;
		position: absolute;
		inset: 0;
	}

	.scene-gradient {
		background:
			radial-gradient(85% 75% at 12% 90%, rgb(26 134 153 / 44%) 0%, transparent 58%),
			radial-gradient(75% 72% at 86% 4%, rgb(106 90 202 / 36%) 0%, transparent 56%),
			radial-gradient(60% 52% at 50% 56%, rgb(65 116 196 / 24%) 0%, transparent 62%),
			linear-gradient(158deg, #1a2a57 0%, #0d1a42 40%, #0a1331 100%);
	}

	.scene-vignette {
		background: radial-gradient(ellipse at center, rgb(11 20 48 / 0%) 36%, rgb(7 12 28 / 70%) 100%);
	}

	.particle-layer {
		pointer-events: none;
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: 1;
	}

	.bg-dot {
		position: absolute;
		display: block;
		bottom: -12vh;
		height: 0.28rem;
		width: 0.28rem;
		border-radius: 9999px;
		transform-origin: center;
		will-change: transform, opacity;
		background: radial-gradient(
			circle at 35% 35%,
			rgb(255 255 255 / 98%) 0%,
			rgb(236 244 255 / 88%) 38%,
			rgb(255 255 255 / 0%) 100%
		);
		box-shadow:
			0 0 10px rgb(255 255 255 / 28%),
			0 0 20px rgb(112 189 255 / 16%);
		opacity: var(--bg-dot-opacity, 0.6);
	}

	.bg-dot--sm {
		height: 0.18rem;
		width: 0.18rem;
	}

	.bg-dot--md {
		height: 0.28rem;
		width: 0.28rem;
	}

	.bg-dot--lg {
		height: 0.42rem;
		width: 0.42rem;
	}

	.auth-content {
		position: relative;
		z-index: 2;
		width: min(100%, 35rem);
	}

	/* Demo-only: the credential hint, and the two live-app links held inert. */
	.demo-hint {
		margin: 0 0 1rem;
		border: 1px solid rgb(0 212 170 / 35%);
		border-radius: 0.75rem;
		background: rgb(0 212 170 / 10%);
		padding: 0.6rem 0.8rem;
		text-align: center;
		font-size: 0.88rem;
		color: rgb(198 240 229);
	}

	.demo-hint code {
		font-family: var(--cw-font-mono);
		font-weight: 600;
		color: rgb(226 252 245);
	}

	.is-disabled {
		cursor: not-allowed;
		opacity: 0.45;
	}

	.demo-exit {
		color: rgb(158 176 205);
		text-decoration: none;
	}

	.demo-exit:hover {
		color: rgb(214 228 248);
		text-decoration: underline;
	}

	@keyframes -global-bg-rise {
		0% {
			transform: translate3d(0, 0, 0) scale(0.35);
			opacity: 0;
		}
		12% {
			opacity: var(--bg-dot-opacity, 0.6);
		}
		55% {
			transform: translate3d(calc(var(--bg-dot-rise-x, 0vw) * 0.55), -58vh, 0) scale(0.92);
			opacity: calc(var(--bg-dot-opacity, 0.6) * 0.92);
		}
		100% {
			transform: translate3d(var(--bg-dot-rise-x, 0vw), -120vh, 0) scale(1.08);
			opacity: 0;
		}
	}

	@keyframes -global-bg-shimmer {
		0%,
		100% {
			opacity: calc(var(--bg-dot-opacity, 0.6) * 0.72);
		}
		52% {
			opacity: var(--bg-dot-opacity, 0.6);
		}
	}
</style>
