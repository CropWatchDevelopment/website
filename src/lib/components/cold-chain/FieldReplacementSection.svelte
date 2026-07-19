<section class="section section--soft scroll-pad" id="field-replacement">
	<div class="wrap field-replacement">
		<div class="field-replacement__intro" data-reveal>
			<p class="eyebrow eyebrow--accent">
				<span class="material-symbols-rounded">cached</span> 現場交換
			</p>
			<h2>検知部のみの交換が可能</h2>
			<p class="field-replacement__lead">
				SHT温湿度センサーは長期安定性にも優れており、温度の年間ドリフトは僅か0.01℃未満です。そのため、通常の使用環境では経年変化による温度測定値への影響はごくわずかですが、必要に応じて検知部のみ交換できる構造を採用しています。
			</p>
			<a class="field-replacement__link" href="/replacement-sensors">
				交換用センサーを見る <span class="material-symbols-rounded">arrow_forward</span>
			</a>
		</div>

		<ol class="field-replacement__facts" data-reveal>
			<li>
				<span class="field-replacement__number">01</span>
				<div>
					<h3>メンテナンス負担を軽減</h3>
					<p>運用中のダウンタイムや保守コストを最小限に抑えます。</p>
				</div>
			</li>
			<li>
				<span class="field-replacement__number">02</span>
				<div>
					<h3>ユーザー側で取り替え可能</h3>
					<p>誰でも簡単に取り替えができます。</p>
				</div>
			</li>
			<li>
				<span class="field-replacement__number">03</span>
				<div>
					<h3>取り付け後はそのまま測定</h3>
					<p>
						新しい検知部を自動で認識し、測定と健全性チェックを再開します。
					</p>
				</div>
			</li>
		</ol>
	</div>
</section>

<style>
	.field-replacement {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: clamp(48px, 8vw, 92px);
		align-items: start;
	}

	.field-replacement__intro h2 {
		font-size: clamp(24px, 3vw, 32px);
		line-height: 1.5;
	}

	.field-replacement__lead {
		margin: 20px 0 0;
		color: var(--web-muted);
		font-size: 16px;
		line-height: 2;
	}

	.field-replacement__link {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin-top: 28px;
		color: var(--web-primary);
		font-size: 15px;
		font-weight: 700;
	}

	.field-replacement__link:hover {
		color: var(--web-primary-hover);
	}

	.field-replacement__link:focus-visible {
		border-radius: 4px;
		outline: 3px solid color-mix(in srgb, var(--web-primary) 35%, transparent);
		outline-offset: 5px;
	}

	.field-replacement__link .material-symbols-rounded {
		font-size: 19px;
	}

	.field-replacement__facts {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.field-replacement__facts li {
		display: grid;
		grid-template-columns: 58px minmax(0, 1fr);
		gap: 18px;
		padding-block: 24px;
		border-top: 1px solid var(--web-border-strong);
	}

	.field-replacement__facts li:first-child {
		padding-top: 0;
		border-top: 0;
	}

	.field-replacement__facts li:last-child {
		padding-bottom: 0;
	}

	.field-replacement__number {
		color: var(--web-primary);
		font-family: var(--cw-font-mono);
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.field-replacement__facts h3 {
		font-size: 18px;
		line-height: 1.5;
	}

	.field-replacement__facts p {
		margin: 7px 0 0;
		color: var(--web-muted);
		font-size: 15px;
		line-height: 1.85;
	}

	@media (max-width: 820px) {
		.field-replacement {
			grid-template-columns: 1fr;
			gap: 42px;
		}

		.field-replacement__intro,
		.field-replacement__facts {
			max-width: 720px;
			margin-inline: auto;
		}
	}

	@media (max-width: 600px) {
		.field-replacement__facts li {
			grid-template-columns: 42px minmax(0, 1fr);
			gap: 12px;
		}
	}
</style>
