import { describe, expect, it } from 'vitest';
import { detectAiSource } from './ai-referrer';

describe('detectAiSource', () => {
	it('detects ChatGPT from utm_source alone (referrer stripped by the app)', () => {
		expect(detectAiSource('chatgpt.com', '')).toBe('chatgpt');
	});

	it('detects AI assistants from the referrer alone', () => {
		expect(detectAiSource(null, 'https://chatgpt.com/')).toBe('chatgpt');
		expect(detectAiSource(null, 'https://www.perplexity.ai/search?q=x')).toBe('perplexity');
		expect(detectAiSource(null, 'https://gemini.google.com/app')).toBe('gemini');
		expect(detectAiSource(null, 'https://claude.ai/chat/abc')).toBe('claude');
		expect(detectAiSource(null, 'https://copilot.microsoft.com/')).toBe('copilot');
	});

	it('prefers utm_source over the referrer', () => {
		expect(detectAiSource('perplexity', 'https://chatgpt.com/')).toBe('perplexity');
	});

	it('falls back to the referrer when utm_source is not an AI source', () => {
		expect(detectAiSource('newsletter', 'https://chatgpt.com/')).toBe('chatgpt');
	});

	it('ignores ordinary search and social traffic', () => {
		expect(detectAiSource(null, 'https://www.google.com/')).toBeNull();
		expect(detectAiSource('google', 'https://www.google.co.jp/')).toBeNull();
		expect(detectAiSource(null, 'https://notchatgpt.com/')).toBeNull();
		expect(detectAiSource(null, null)).toBeNull();
	});

	it('tolerates malformed referrers', () => {
		expect(detectAiSource(null, 'not a url')).toBeNull();
	});
});
