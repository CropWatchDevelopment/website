/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />

import '$lib/i18n';
import { locale, waitLocale } from 'svelte-i18n';
import { beforeAll } from 'vitest';

beforeAll(async () => {
	locale.set('en');
	await waitLocale();
});
