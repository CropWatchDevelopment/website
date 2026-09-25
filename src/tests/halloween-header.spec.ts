// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { isHalloweenSeason } from '$lib/halloween';

const DEFAULT_LOGO = '/cropwatch_icons/cropwatch.svg';
const HALLOWEEN_LOGO_WEBP = '/cropwatch_icons/halloween_cropwatch.webp';
const HALLOWEEN_LOGO_PNG = '/cropwatch_icons/halloween_cropwatch.png';

function setReadyState(state: DocumentReadyState) {
	Object.defineProperty(document, 'readyState', {
		configurable: true,
		get: () => state
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

async function runHalloweenHeaderScript() {
	vi.resetModules();
	// @ts-expect-error - plain IIFE browser script, imported for its side effects
	await import('../../static/halloween-header.js');
}

const BEFORE = new Date(2026, 9, 14, 23, 59, 59, 999);
const START = new Date(2026, 9, 15, 0, 0, 0, 0);
const LAST_MOMENT = new Date(2026, 9, 31, 23, 59, 59, 999);
const AFTER = new Date(2026, 10, 1, 0, 0, 0, 0);

describe('isHalloweenSeason', () => {
	it.each([
		['the day before', BEFORE, false],
		['the inclusive start', START, true],
		['the last moment of Oct 31', LAST_MOMENT, true],
		['the start of Nov 1', AFTER, false]
	])('is correct at %s', (_label, now, expected) => {
		expect(isHalloweenSeason(now)).toBe(expected);
	});
});

describe('static/halloween-header.js', () => {
	beforeEach(() => {
		document.head.innerHTML = '';
		document.body.innerHTML = '';
		Reflect.deleteProperty(document, 'readyState');
		vi.restoreAllMocks();
		vi.useFakeTimers();
	});

	afterEach(() => {
		document.body.innerHTML = '';
		Reflect.deleteProperty(document, 'readyState');
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it.each([
		['before the season starts', BEFORE],
		['once November 1 begins', AFTER]
	])('does nothing %s', async (_label, now) => {
		setReadyState('loading');
		renderHeaderLogo();
		vi.setSystemTime(now);

		const addEventListenerSpy = vi.spyOn(document, 'addEventListener');

		await runHalloweenHeaderScript();

		expect(addEventListenerSpy).not.toHaveBeenCalled();
		expect(document.querySelector('source')?.getAttribute('srcset')).toBe(DEFAULT_LOGO);
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(DEFAULT_LOGO);
	});

	it('swaps in the Halloween logo at the inclusive season start', async () => {
		setReadyState('complete');
		renderHeaderLogo();
		vi.setSystemTime(START);

		await runHalloweenHeaderScript();

		expect(document.querySelector('source')?.getAttribute('srcset')).toBe(HALLOWEEN_LOGO_WEBP);
		expect(document.querySelector('source')?.getAttribute('type')).toBe('image/webp');
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(HALLOWEEN_LOGO_PNG);
	});

	it('waits for DOMContentLoaded on the last moment of Oct 31', async () => {
		setReadyState('loading');
		renderHeaderLogo();
		vi.setSystemTime(LAST_MOMENT);

		await runHalloweenHeaderScript();

		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(DEFAULT_LOGO);
		document.dispatchEvent(new Event('DOMContentLoaded'));
		expect(document.querySelector('#header-logo')?.getAttribute('src')).toBe(HALLOWEEN_LOGO_PNG);
	});

	it('stays safe when the header logo markup is missing', async () => {
		setReadyState('complete');
		vi.setSystemTime(START);
		document.body.innerHTML = '<main>Site content</main>';

		await expect(runHalloweenHeaderScript()).resolves.toBeUndefined();
		expect(document.body.innerHTML).toBe('<main>Site content</main>');
	});
});
