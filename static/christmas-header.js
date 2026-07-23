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
				color: rgba(255, 255, 255, 0.95);
				text-shadow: 0 0 6px rgba(255, 255, 255, 0.45);
				animation-name: cw-christmas-fall;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
				will-change: transform;
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
			const opacity = 0.4 + Math.random() * 0.55;

			flake.style.left = `${left}vw`;
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

		if (source) source.srcset = '/cropwatch_icons/christmas_cropwatch.svg';
		if (img) img.src = '/cropwatch_icons/christmas_cropwatch.svg';
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
