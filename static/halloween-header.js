(() => {
	function isHalloweenSeason() {
		const now = new Date();
		const currentYear = now.getFullYear();
		const startDate = new Date(currentYear, 9, 15, 0, 0, 0, 0); // Oct 15
		const endDate = new Date(currentYear, 10, 1, 0, 0, 0, 0); // Nov 1 (exclusive)

		return now >= startDate && now < endDate;
	}

	function addPumpkinToHeader() {
		const picture = document.querySelector('#header-logo')?.closest('picture');
		const source = picture?.querySelector('source');
		const img = picture?.querySelector('img');

		if (source) {
			source.type = 'image/webp';
			source.srcset = '/cropwatch_icons/halloween_cropwatch.webp';
		}
		if (img) img.src = '/cropwatch_icons/halloween_cropwatch.png';
	}

	if (!isHalloweenSeason()) {
		return;
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', addPumpkinToHeader, { once: true });
	} else {
		addPumpkinToHeader();
	}
})();
