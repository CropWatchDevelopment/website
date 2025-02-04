
import root from '../root.js';
import { set_building, set_prerendering } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_manifest, set_read_implementation } from '__sveltekit/server';
import { set_private_env, set_public_env, set_safe_public_env } from '../../../node_modules/.pnpm/@sveltejs+kit@2.16.0_@sveltejs+vite-plugin-svelte@4.0.4_svelte@5.18.0_vite@5.4.11_@types+node_h3ra3g5zo4by2lhjyeoauarc6q/node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_dir: "_app",
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	env_private_prefix: '',
	hash_routing: false,
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!doctype html>\n<html lang=\"%paraglide.lang%\" dir=\"%paraglide.textDirection%\">\n\n<head>\n\t<meta charset=\"utf-8\" />\n\t<link rel=\"icon\" href=\"" + assets + "/favicon.svg\" />\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\n\t<meta charset=\"utf-8\" />\n\t<link rel=\"icon\" href=\"" + assets + "/favicon.svg\" />\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\n\t<!-- Primary Meta Tags -->\n\t<title>CropWatch - IoT Monitoring</title>\n\t<meta name=\"title\" content=\"Your Site Title\" />\n\t<meta name=\"description\"\n\t\tcontent=\"CropWatch the best IoT device for remote monitoring for your farm, factory, building or city.\" />\n\t<meta name=\"keywords\" content=\"IoT Monitoring, Cold Chain Management, Full service IoT\" />\n\t<meta name=\"author\" content=\"Your Company or Author Name\" />\n\n\t<!-- Open Graph / Facebook -->\n\t<meta property=\"og:type\" content=\"website\" />\n\t<meta property=\"og:url\" content=\"https://CropWatch.io/\" />\n\t<meta property=\"og:title\" content=\"CropWatch - IoT Monitoring\" />\n\t<meta property=\"og:description\"\n\t\tcontent=\"CropWatch the best IoT device for remote monitoring for your farm, factory, building or city.\" />\n\t<!-- <meta property=\"og:image\" content=\"" + assets + "/og-image.jpg\" /> -->\n\t<meta property=\"og:locale\" content=\"%paraglide.lang%\" />\n\n\t<!-- Twitter -->\n\t<meta name=\"twitter:card\" content=\"summary_large_image\" />\n\t<meta name=\"twitter:url\" content=\"https://CropWatch.io/\" />\n\t<meta name=\"twitter:title\" content=\"Your Site Title\" />\n\t<meta name=\"twitter:description\"\n\t\tcontent=\"CropWatch the best IoT device for remote monitoring for your farm, factory, building or city.\" />\n\t<!-- <meta name=\"twitter:image\" content=\"" + assets + "/twitter-image.jpg\" /> -->\n\n\t<!-- Google tag (gtag.js) -->\n\t<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-V65DJ4TTV1\"></script>\n\t<script>\n\t\twindow.dataLayer = window.dataLayer || [];\n\t\tfunction gtag() {\n\t\t\tdataLayer.push(arguments);\n\t\t}\n\t\tgtag('js', new Date());\n\t\tgtag('config', 'G-V65DJ4TTV1');\n\t</script>\n\n\t<!-- Canonical URL -->\n\t<link rel=\"canonical\" href=\"https://CropWatch.io/\" />\n\t" + head + "\n</head>\n\n<body data-sveltekit-preload-data=\"hover\" class=\"bg-gray-50 text-gray-800\">\n\t<div style=\"display: contents\">" + body + "</div>\n</body>\n\n</html>",
		error: ({ status, message }) => "<!doctype html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family:\n\t\t\t\t\tsystem-ui,\n\t\t\t\t\t-apple-system,\n\t\t\t\t\tBlinkMacSystemFont,\n\t\t\t\t\t'Segoe UI',\n\t\t\t\t\tRoboto,\n\t\t\t\t\tOxygen,\n\t\t\t\t\tUbuntu,\n\t\t\t\t\tCantarell,\n\t\t\t\t\t'Open Sans',\n\t\t\t\t\t'Helvetica Neue',\n\t\t\t\t\tsans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "eln2t6"
};

export async function get_hooks() {
	let handle;
	let handleFetch;
	let handleError;
	let init;
	({ handle, handleFetch, handleError, init } = await import("../../../src/hooks.server.ts"));

	let reroute;
	let transport;
	({ reroute, transport } = await import("../../../src/hooks.ts"));

	return {
		handle,
		handleFetch,
		handleError,
		init,
		reroute,
		transport
	};
}

export { set_assets, set_building, set_manifest, set_prerendering, set_private_env, set_public_env, set_read_implementation, set_safe_public_env };
