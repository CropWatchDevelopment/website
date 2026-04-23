import type { Reroute } from '@sveltejs/kit';

const LANG_PREFIX = /^\/(en|es|it)(\/.*)?$/;

export const reroute: Reroute = ({ url }) => {
	const match = url.pathname.match(LANG_PREFIX);
	if (!match) return;
	return match[2] || '/';
};
