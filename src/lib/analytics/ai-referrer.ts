// Identifies visits that came from an AI assistant (ChatGPT, Perplexity, ...).
//
// GA4's default channel group now has an "AI Assistant" channel, but it only
// sees the referrer. ChatGPT also appends `utm_source=chatgpt.com` to the links
// it cites, and app clicks often arrive with the referrer stripped, so we check
// both and report the result as our own `ai_source` dimension.

// Hostname suffix -> stable source label reported to GA.
const AI_HOSTS: ReadonlyArray<readonly [string, string]> = [
	['chatgpt.com', 'chatgpt'],
	['chat.openai.com', 'chatgpt'],
	['openai.com', 'chatgpt'],
	['perplexity.ai', 'perplexity'],
	['claude.ai', 'claude'],
	['gemini.google.com', 'gemini'],
	['bard.google.com', 'gemini'],
	['copilot.microsoft.com', 'copilot'],
	['grok.com', 'grok'],
	['chat.deepseek.com', 'deepseek'],
	['you.com', 'you'],
	['meta.ai', 'meta-ai'],
	['chat.mistral.ai', 'mistral']
];

function matchHost(host: string): string | null {
	const h = host.trim().toLowerCase().replace(/^www\./, '');
	if (!h) return null;
	for (const [suffix, label] of AI_HOSTS) {
		if (h === suffix || h.endsWith(`.${suffix}`)) return label;
	}
	return null;
}

/**
 * Returns a short label ("chatgpt", "perplexity", ...) when the visit came from
 * an AI assistant, else null. `utmSource` wins over the referrer because it
 * survives app-to-browser handoffs that drop the Referer header.
 */
export function detectAiSource(
	utmSource: string | null | undefined,
	referrer: string | null | undefined
): string | null {
	if (utmSource) {
		// Usually a hostname (`chatgpt.com`), sometimes a bare name (`perplexity`).
		const fromUtm = matchHost(utmSource);
		if (fromUtm) return fromUtm;
		const bare = utmSource.trim().toLowerCase();
		const byName = AI_HOSTS.find(([, label]) => label === bare);
		if (byName) return byName[1];
	}
	if (referrer) {
		try {
			return matchHost(new URL(referrer).hostname);
		} catch {
			return null;
		}
	}
	return null;
}
