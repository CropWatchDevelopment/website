<!--
  Red "this is a demo" bar across the top of every /demo screen, login
  included.

  Demo-only (the app has no such bar). Prospects kept asking whether the
  numbers here were a real customer's live data, so this sits outside the
  scrolling area: it is in view on every screen at every scroll position,
  and in every screenshot of the demo. It cannot be dismissed.
-->
<div class="demo-banner" role="note" aria-label="デモ画面のお知らせ">
	<span class="demo-banner__badge">
		<svg class="demo-banner__icon" viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M12 2.5 1.5 21h21L12 2.5Zm0 6.2 1 6.3h-2l1-6.3Zm0 9.8a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z"
			/>
		</svg>
		DEMO
	</span>
	<p class="demo-banner__text demo-banner__text--long">
		<strong>これはデモ画面です。</strong>
		表示されているデータはすべて架空のサンプルデータで、実際のセンサーの計測値ではありません。
	</p>
	<!-- Phones: the same message in two lines instead of three. -->
	<p class="demo-banner__text demo-banner__text--short">
		<strong>デモ画面です。</strong>データはすべてサンプルで、実際の計測値ではありません。
	</p>
</div>

<style>
	.demo-banner {
		flex: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 0.6rem 1rem;
		background: var(--cw-danger-700, #b91c1c);
		border-bottom: 3px solid var(--cw-danger-900, #7f1d1d);
		color: #fff;
		font-size: 0.9375rem;
		line-height: 1.45;
	}

	.demo-banner__badge {
		flex: none;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.2rem 0.6rem;
		border-radius: 0.375rem;
		background: #fff;
		color: var(--cw-danger-700, #b91c1c);
		font-size: 0.9375rem;
		font-weight: 800;
		letter-spacing: 0.12em;
	}

	.demo-banner__icon {
		width: 1.05rem;
		height: 1.05rem;
		fill: currentColor;
	}

	.demo-banner__text {
		margin: 0;
		min-width: 0;
		font-weight: 600;
	}

	.demo-banner__text strong {
		font-weight: 800;
	}

	.demo-banner__text--short {
		display: none;
	}

	@media (max-width: 639px) {
		.demo-banner {
			justify-content: flex-start;
			gap: 0.6rem;
			padding-block: 0.5rem;
			font-size: 0.8125rem;
			line-height: 1.4;
		}

		.demo-banner__badge {
			padding: 0.15rem 0.45rem;
			font-size: 0.8125rem;
			letter-spacing: 0.08em;
		}

		.demo-banner__icon {
			width: 0.9rem;
			height: 0.9rem;
		}

		.demo-banner__text--long {
			display: none;
		}

		.demo-banner__text--short {
			display: block;
		}
	}
</style>
