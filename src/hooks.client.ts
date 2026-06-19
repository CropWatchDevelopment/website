import { initBotId } from 'botid/client/core';

// Vercel BotID — register the contact form POST so the client attaches the
// bot-detection challenge token to that request. The token is verified
// server-side in src/routes/contact/+page.server.ts. The proxy rewrites that
// make this work live in vercel.json (required for non-Next frameworks).
export function init() {
	initBotId({
		protect: [{ path: '/contact', method: 'POST' }]
	});
}
