// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const DEFAULT_LOGO = '/cropwatch_icons/cropwatch.svg';
const CHRISTMAS_LOGO = '/cropwatch_icons/christmas_cropwatch.svg';
const SNOW_LAYER_ID = 'cw-christmas-snow';
const STYLE_ID = 'cw-christmas-style';

function setReadyState(state: DocumentReadyState) {
	Object.defineProperty(document, 'readyState', {
		configurable: true,
		get: () => state
	});
}

function setMatchMedia(matches: boolean) {
	const matchMedia = vi.fn().mockImplementation((query: string) => ({
		addEventListener: vi.fn(),
		addListener: vi.fn(),
		dispatchEvent: vi.fn(),
		media: query,
		matches,
		onchange: null,
		removeEventListener: vi.fn(),
		removeListener: vi.fn()
	}));

	Object.defineProperty(window, 'matchMedia', {
		configurable: true,
		value: matchMedia,
		writable: true
	});
}

function renderHeaderLogo() {
	document.body.innerHTML = `
		<picture>
			<source srcset="${DEFAULT_LOGO}" type="image/svg+xml" />
			<img id="header-logo" src="${DEFAULT_LOGO}" alt="CropWatch" />
		</picture>
	`;
}

async function runChristmasHeaderScript() {
	vi.resetModules();
	await import('../../static/christmas-header.js');
}

describe('static/christmas-header.js', () => {
	beforeEach(() => {
		document.head.innerHTML = '';
		document.body.innerHTML = '';
		Reflect.deleteProperty(document, 'readyState');
		vi.restoreAllMocks();
		vi.useFakeTimers();
		vi.spyOn(Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		document.head.innerHTML = '';
		document.body.innerHTML = '';
		Reflect.deleteProperty(document, 'readyState');
		Reflect.deleteProperty(window, 'matchMedia');
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it.each([
		['before the season starts', new Date(2026, 10, 24, 23, 59, 59, 999)],
		['after the season ends', new Date(2026, 11, 31, 0, 0, 0, 0)]
	])('does nothing %s', async (_label, now) => {
		setReadyState('loading');
		setMatchMedia(false);
		renderHeaderLogo();
		vi.setSystemTime(now);

		const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

		await expect(runChristmasHeaderScript()).resolves.toBeUndefined();

		expect(addEventListenerSpy).not.toHaveBeenCalled();
		expect(document.getElementById(STYLE_ID)).toBeNull();
		expect(document.getElementById(SNOW_LAYER_ID)).toBeNull();
		expect(document.querySelector('source')?.getAttribute('srcset')).toBe(DEFAULT_LOGO);
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(DEFAULT_LOGO);
	});

	it('injects the desktop decorations at the inclusive season start', async () => {
		setReadyState('complete');
		setMatchMedia(false);
		renderHeaderLogo();
		vi.setSystemTime(new Date(2026, 10, 25, 0, 0, 0, 0));

		await expect(runChristmasHeaderScript()).resolves.toBeUndefined();

		const style = document.getElementById(STYLE_ID);
		const snowLayer = document.getElementById(SNOW_LAYER_ID);
		const snowflakes = snowLayer?.querySelectorAll<HTMLSpanElement>('.cw-christmas-snowflake');
		const firstSnowflake = snowflakes?.[0];

		expect(style?.textContent).toContain('#cw-christmas-snow');
		expect(snowLayer?.getAttribute('aria-hidden')).toBe('true');
		expect(snowflakes).toHaveLength(32);
		expect(firstSnowflake?.textContent).toBe('❄');
		expect(firstSnowflake?.style.left).toBe('50vw');
		expect(firstSnowflake?.style.fontSize).toBe('0.875rem');
		expect(firstSnowflake?.style.opacity).toBe('0.675');
		expect(firstSnowflake?.style.animationDuration).toBe('11.5s');
		expect(firstSnowflake?.style.animationDelay).toBe('-5.75s');
		expect(firstSnowflake?.style.getPropertyValue('--drift')).toBe('0px');
		expect(document.querySelector('source')?.getAttribute('srcset')).toBe(CHRISTMAS_LOGO);
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(CHRISTMAS_LOGO);
	});

	it('waits for DOMContentLoaded and uses the mobile snow count at the inclusive season end', async () => {
		setReadyState('loading');
		setMatchMedia(true);
		renderHeaderLogo();
		vi.setSystemTime(new Date(2026, 11, 30, 23, 59, 59, 999));

		const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

		await expect(runChristmasHeaderScript()).resolves.toBeUndefined();

		expect(addEventListenerSpy).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function), {
			once: true
		});
		expect(document.getElementById(STYLE_ID)).toBeNull();
		expect(document.getElementById(SNOW_LAYER_ID)).toBeNull();

		document.dispatchEvent(new Event('DOMContentLoaded'));

		expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
		expect(document.querySelectorAll(`#${SNOW_LAYER_ID}`)).toHaveLength(1);
		expect(document.querySelectorAll(`#${SNOW_LAYER_ID} .cw-christmas-snowflake`)).toHaveLength(20);
		expect(document.querySelector('source')?.getAttribute('srcset')).toBe(CHRISTMAS_LOGO);
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(CHRISTMAS_LOGO);

		document.dispatchEvent(new Event('DOMContentLoaded'));

		expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
		expect(document.querySelectorAll(`#${SNOW_LAYER_ID}`)).toHaveLength(1);
	});

	it('reuses existing decorations and stays safe when the header logo markup is missing', async () => {
		setReadyState('complete');
		setMatchMedia(false);
		vi.setSystemTime(new Date(2026, 11, 10, 12, 0, 0, 0));
		document.head.innerHTML = `<style id="${STYLE_ID}">existing-style</style>`;
		document.body.innerHTML = `
			<main id="content">Site content</main>
			<div id="${SNOW_LAYER_ID}" aria-hidden="true">
				<span class="existing-snowflake">existing</span>
			</div>
		`;

		await expect(runChristmasHeaderScript()).resolves.toBeUndefined();

		expect(document.querySelectorAll(`#${STYLE_ID}`)).toHaveLength(1);
		expect(document.querySelector(`#${STYLE_ID}`)?.textContent).toBe('existing-style');
		expect(document.querySelectorAll(`#${SNOW_LAYER_ID}`)).toHaveLength(1);
		expect(document.querySelectorAll(`#${SNOW_LAYER_ID} .existing-snowflake`)).toHaveLength(1);
		expect(document.querySelector('#content')?.textContent).toBe('Site content');
	});
});
