<div class="sensor-card">
	<header class="sensor-card__header">
		<span class="status-indicator" aria-hidden="true">
			<svg viewBox="0 0 24 24" role="presentation">
				<path
					fill="currentColor"
					d="M9.55 17.05 5.5 13l1.41-1.41 2.64 2.63 7.55-7.54L18.5 8.1l-8.95 8.95Z"
				></path>
			</svg>
		</span>
		<div class="sensor-card__title">Matsuki house1</div>
		<button class="header-action" type="button" aria-label="View device">
			<svg viewBox="0 0 24 24" role="presentation">
				<path
					fill="currentColor"
					d="M10 6v12l6-6-6-6Z"
				></path>
			</svg>
		</button>
	</header>

	<section class="sensor-card__body">
		<div class="sensor-card__slot">
			<div class="sensor-card__content">
				<span class="sensor-card__label">soil sensor</span>
				<button class="sensor-card__collapse" type="button" aria-label="Collapse row">
					<svg viewBox="0 0 24 24" role="presentation">
						<path
							fill="currentColor"
							d="M7 10l5 5 5-5H7Z"
						></path>
					</svg>
				</button>
			</div>

			<div class="sensor-card__stats">
				<div class="sensor-stat">
					<span class="sensor-stat__icon sensor-stat__icon--temp" aria-hidden="true">
						<svg viewBox="0 0 24 24" role="presentation">
							<path
								fill="currentColor"
								d="M14 14.76V5a2 2 0 0 0-4 0v9.76a3.5 3.5 0 1 0 4 0ZM12 3a2 2 0 0 1 2 2v9.73l.21.12a2.5 2.5 0 1 1-4.42 0l.21-.12V5a2 2 0 0 1 2-2Zm0 9.5a1 1 0 0 0 1-1V7h-2v4.5a1 1 0 0 0 1 1Z"
							></path>
						</svg>
					</span>
					<span class="sensor-stat__value">21.67</span>
					<span class="sensor-stat__unit">°C</span>
				</div>

				<div class="sensor-stat">
					<span class="sensor-stat__icon sensor-stat__icon--humidity" aria-hidden="true">
						<svg viewBox="0 0 24 24" role="presentation">
							<path
								fill="currentColor"
								d="m12 3.1 4.95 6.17a6 6 0 1 1-9.9 0L12 3.1Zm0 1.52-3.9 4.86a5 5 0 1 0 7.8 0L12 4.62Z"
							></path>
						</svg>
					</span>
					<span class="sensor-stat__value">64.7</span>
					<span class="sensor-stat__unit">%</span>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.sensor-card {
		position: relative;
		width: min(280px, 100%);
		border-radius: 18px;
		background: #1d2029;
		border: 1px solid #161b25;
		box-shadow: 0 12px 24px rgba(8, 10, 15, 0.55);
		color: #f7f9ff;
		overflow: hidden;
		font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
	}

	.sensor-card__header {
		display: flex;
		align-items: center;
		padding: 0.85rem 1rem;
		gap: 0.8rem;
		background: #242a39;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.status-indicator {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: rgba(14, 20, 31, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: #20d16a;
	}

	.status-indicator svg,
	.header-action svg,
	.sensor-card__collapse svg {
		width: 18px;
		height: 18px;
	}

	.sensor-card__title {
		font-weight: 700;
		color: #ffd740;
		font-size: 1rem;
		flex: 1;
	}

	.header-action {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: rgba(34, 45, 66, 0.65);
		border: 1px solid rgba(111, 141, 199, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #7fa5ff;
		cursor: pointer;
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.header-action:hover {
		transform: translateX(1px);
		background: rgba(111, 141, 199, 0.25);
	}

	.sensor-card__body {
		background: #2f374c;
		padding: 1rem;
	}

	.sensor-card__slot {
		position: relative;
		padding: 0.75rem 0.9rem 0.9rem 2.4rem;
		border-radius: 14px;
		background: #343f58;
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
	}

	.sensor-card__slot::before {
		content: '';
		position: absolute;
		left: 12px;
		top: 12px;
		bottom: 12px;
		width: 5px;
		border-radius: 999px;
		background: linear-gradient(180deg, #53ff8a, #1ab552);
		box-shadow: 0 0 8px rgba(37, 214, 114, 0.75);
	}

	.sensor-card__content {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sensor-card__label {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.85);
		font-weight: 600;
		text-transform: lowercase;
		letter-spacing: 0.05em;
	}

	.sensor-card__collapse {
		border: 0;
		background: transparent;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		padding: 0.1rem;
		transition: transform 0.2s ease;
	}

	.sensor-card__collapse:hover {
		transform: translateY(1px);
		color: #bfc9ff;
	}

	.sensor-card__stats {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: 1.25rem;
		margin-top: 0.65rem;
	}

	.sensor-stat {
		display: inline-flex;
		align-items: baseline;
		gap: 0.35rem;
		font-weight: 700;
		font-size: 1.1rem;
		color: #f6f7fb;
	}

	.sensor-stat__icon {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.08);
	}

	.sensor-stat__icon--temp {
		color: #f36d5b;
	}

	.sensor-stat__icon--humidity {
		color: #71c5ff;
	}

	.sensor-stat__value {
		line-height: 1;
	}

	.sensor-stat__unit {
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		margin-left: 0.1rem;
		font-weight: 500;
	}
</style>
