(() => {
	const STYLE_ID = 'cw-christmas-style';
	const SNOW_LAYER_ID = 'cw-christmas-snow';

	function isChristmasSeason() {
		const now = new Date();
		const currentYear = now.getFullYear();
		const startDate = new Date(currentYear, 10, 25, 0, 0, 0, 0); // Nov 25
		const endDate = new Date(currentYear, 11, 30, 23, 59, 59, 999); // Dec 30

		return now >= startDate && now <= endDate;
	}


	function injectStyles() {
		if (document.getElementById(STYLE_ID)) {
			return;
		}

		const style = document.createElement('style');
		style.id = STYLE_ID;
		style.textContent = `
			#${SNOW_LAYER_ID} {
				position: fixed;
				inset: 0;
				pointer-events: none;
				overflow: hidden;
				z-index: 70;
			}

			.cw-christmas-snowflake {
				position: absolute;
				top: -12vh;
				left: 0;
				color: #fff;
				/* Blue rim so the white flakes still read on white page sections
				   (cropwatch.io is mostly white), not only over dark heroes. */
				text-shadow:
					0 0 1px rgba(23, 62, 122, 0.9),
					0 0 3px rgba(44, 108, 183, 0.65),
					0 0 8px rgba(255, 255, 255, 0.6);
				animation-name: cw-christmas-fall;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				will-change: transform;
			}

			/* The site-wide reduced-motion reset shortens every animation to one
			   0.01ms pass, which would leave each flake parked at top:-12vh, off
			   screen. Show still flakes scattered down the viewport instead. */
			@media (prefers-reduced-motion: reduce) {
				.cw-christmas-snowflake {
					animation: none !important;
					top: var(--rest-y, 50vh);
					transform: translateX(var(--drift, 0px));
				}
			}

			@keyframes cw-christmas-fall {
				from {
					transform: translate3d(0, -15vh, 0) rotate(0deg);
				}
				to {
					transform: translate3d(var(--drift, 0px), 110vh, 0) rotate(360deg);
				}
			}
		`;

		document.head.appendChild(style);
	}

	function createSnowLayer() {
		if (document.getElementById(SNOW_LAYER_ID)) {
			return;
		}

		const snowLayer = document.createElement('div');
		snowLayer.id = SNOW_LAYER_ID;
		snowLayer.setAttribute('aria-hidden', 'true');

		const snowflakeCount = window.matchMedia('(max-width: 768px)').matches ? 20 : 32;
		for (let i = 0; i < snowflakeCount; i += 1) {
			const flake = document.createElement('span');
			flake.className = 'cw-christmas-snowflake';
			flake.textContent = '❄';

			const size = 0.55 + Math.random() * 0.65;
			const duration = 7 + Math.random() * 9;
			const delay = -Math.random() * duration;
			const left = Math.random() * 100;
			const drift = -45 + Math.random() * 90;
			const opacity = 0.55 + Math.random() * 0.45;
			const restY = Math.random() * 95;

			flake.style.left = `${left}vw`;
			flake.style.setProperty('--rest-y', `${restY}vh`);
			flake.style.fontSize = `${size}rem`;
			flake.style.opacity = `${opacity}`;
			flake.style.animationDuration = `${duration}s`;
			flake.style.animationDelay = `${delay}s`;
			flake.style.setProperty('--drift', `${drift}px`);

			snowLayer.appendChild(flake);
		}

		document.body.appendChild(snowLayer);
	}

	function addTreeToHeader() {
		const picture = document.querySelector('#header-logo')?.closest('picture');
		const source = picture?.querySelector('source');
		const img = picture?.querySelector('img');

		if (source) {
			source.type = 'image/webp';
			source.srcset = '/cropwatch_icons/christmas_cropwatch.webp';
		}
		if (img) img.src = '/cropwatch_icons/christmas_cropwatch.png';
	}

	function initChristmasDecor() {
		injectStyles();
		createSnowLayer();
		addTreeToHeader();
	}

	if (!isChristmasSeason()) {
		return;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initChristmasDecor, { once: true });
	} else {
		initChristmasDecor();
	}
})();
