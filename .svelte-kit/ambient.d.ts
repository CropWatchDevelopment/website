
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const PRIVATE_EMAIL_USERNAME: string;
	export const PRIVATE_EMAIL_PASSWORD: string;
	export const PRIVATE_EMAIL_HOST: string;
	export const PRIVATE_EMAIL_PORT: string;
	export const PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY: string;
	export const LESSOPEN: string;
	export const npm_package_devDependencies__eslint_compat: string;
	export const npm_package_devDependencies__sveltejs_adapter_vercel: string;
	export const npm_package_devDependencies_vitest: string;
	export const LANGUAGE: string;
	export const USER: string;
	export const npm_config_user_agent: string;
	export const XDG_SEAT: string;
	export const XDG_SESSION_TYPE: string;
	export const GIT_ASKPASS: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_devDependencies_vite: string;
	export const npm_node_execpath: string;
	export const SHLVL: string;
	export const HOME: string;
	export const CHROME_DESKTOP: string;
	export const OLDPWD: string;
	export const npm_package_devDependencies__eslint_js: string;
	export const TERM_PROGRAM_VERSION: string;
	export const DESKTOP_SESSION: string;
	export const NVM_BIN: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const NVM_INC: string;
	export const GTK_MODULES: string;
	export const XDG_SEAT_PATH: string;
	export const VSCODE_GIT_ASKPASS_MAIN: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const LC_MONETARY: string;
	export const VSCODE_GIT_ASKPASS_NODE: string;
	export const npm_package_scripts_check: string;
	export const npm_package_devDependencies__fontsource_fira_mono: string;
	export const npm_package_devDependencies__types_nodemailer: string;
	export const CINNAMON_VERSION: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const npm_config_engine_strict: string;
	export const COLORTERM: string;
	export const npm_package_devDependencies__tailwindcss_forms: string;
	export const npm_package_devDependencies_tailwindcss: string;
	export const npm_package_devDependencies_typescript: string;
	export const npm_package_dependencies_recaptcha_v3: string;
	export const INSIDE_NEMO_PYTHON: string;
	export const NVM_DIR: string;
	export const npm_package_dependencies__inlang_paraglide_sveltekit: string;
	export const QT_QPA_PLATFORMTHEME: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_devDependencies_prettier: string;
	export const GTK_IM_MODULE: string;
	export const LOGNAME: string;
	export const npm_package_type: string;
	export const _: string;
	export const npm_package_private: string;
	export const npm_package_scripts_check_watch: string;
	export const npm_package_devDependencies_autoprefixer: string;
	export const XDG_SESSION_CLASS: string;
	export const npm_package_scripts_lint: string;
	export const npm_config_registry: string;
	export const STM32_PRG_PATH: string;
	export const TERM: string;
	export const XDG_SESSION_ID: string;
	export const GNOME_DESKTOP_SESSION_ID: string;
	export const npm_package_devDependencies_prettier_plugin_tailwindcss: string;
	export const PATH: string;
	export const SESSION_MANAGER: string;
	export const GDM_LANG: string;
	export const GTK3_MODULES: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies_typescript_eslint: string;
	export const npm_package_dependencies_nodemailer: string;
	export const NODE: string;
	export const XDG_SESSION_PATH: string;
	export const LC_ADDRESS: string;
	export const GNOME_TERMINAL_SCREEN: string;
	export const XDG_RUNTIME_DIR: string;
	export const GDK_BACKEND: string;
	export const npm_package_scripts_test_e2e: string;
	export const npm_config_frozen_lockfile: string;
	export const DISPLAY: string;
	export const npm_package_scripts_test_unit: string;
	export const LANG: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const LC_TELEPHONE: string;
	export const npm_package_devDependencies_eslint: string;
	export const XMODIFIERS: string;
	export const XDG_SESSION_DESKTOP: string;
	export const XAUTHORITY: string;
	export const LS_COLORS: string;
	export const VSCODE_GIT_IPC_HANDLE: string;
	export const GNOME_TERMINAL_SERVICE: string;
	export const TERM_PROGRAM: string;
	export const npm_lifecycle_script: string;
	export const SSH_AUTH_SOCK: string;
	export const XDG_GREETER_DATA_DIR: string;
	export const ORIGINAL_XDG_CURRENT_DESKTOP: string;
	export const npm_package_scripts_test: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_package_devDependencies__tailwindcss_typography: string;
	export const SHELL: string;
	export const LC_NAME: string;
	export const NODE_PATH: string;
	export const npm_package_version: string;
	export const npm_lifecycle_event: string;
	export const QT_ACCESSIBILITY: string;
	export const NO_AT_BRIDGE: string;
	export const GDMSESSION: string;
	export const npm_package_scripts_build: string;
	export const npm_package_devDependencies_svelte: string;
	export const LESSCLOSE: string;
	export const LC_MEASUREMENT: string;
	export const GPG_AGENT_INFO: string;
	export const LC_IDENTIFICATION: string;
	export const npm_package_devDependencies_globals: string;
	export const VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
	export const QT_IM_MODULE: string;
	export const XDG_VTNR: string;
	export const npm_package_scripts_format: string;
	export const PWD: string;
	export const npm_execpath: string;
	export const XDG_CONFIG_DIRS: string;
	export const CLUTTER_IM_MODULE: string;
	export const NVM_CD_FLAGS: string;
	export const XDG_DATA_DIRS: string;
	export const LC_NUMERIC: string;
	export const npm_package_devDependencies__neoconfetti_svelte: string;
	export const npm_command: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const LC_PAPER: string;
	export const npm_package_scripts_preview: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const PNPM_HOME: string;
	export const VTE_VERSION: string;
	export const npm_package_devDependencies__tailwindcss_container_queries: string;
	export const INIT_CWD: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	export const PUBLIC_RECAPTCHA_SITE_KEY: string;
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		PRIVATE_EMAIL_USERNAME: string;
		PRIVATE_EMAIL_PASSWORD: string;
		PRIVATE_EMAIL_HOST: string;
		PRIVATE_EMAIL_PORT: string;
		PRIVATE_GOOGLE_RECAPTCHA_SECRET_KEY: string;
		LESSOPEN: string;
		npm_package_devDependencies__eslint_compat: string;
		npm_package_devDependencies__sveltejs_adapter_vercel: string;
		npm_package_devDependencies_vitest: string;
		LANGUAGE: string;
		USER: string;
		npm_config_user_agent: string;
		XDG_SEAT: string;
		XDG_SESSION_TYPE: string;
		GIT_ASKPASS: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_devDependencies_vite: string;
		npm_node_execpath: string;
		SHLVL: string;
		HOME: string;
		CHROME_DESKTOP: string;
		OLDPWD: string;
		npm_package_devDependencies__eslint_js: string;
		TERM_PROGRAM_VERSION: string;
		DESKTOP_SESSION: string;
		NVM_BIN: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		NVM_INC: string;
		GTK_MODULES: string;
		XDG_SEAT_PATH: string;
		VSCODE_GIT_ASKPASS_MAIN: string;
		npm_package_devDependencies_svelte_check: string;
		LC_MONETARY: string;
		VSCODE_GIT_ASKPASS_NODE: string;
		npm_package_scripts_check: string;
		npm_package_devDependencies__fontsource_fira_mono: string;
		npm_package_devDependencies__types_nodemailer: string;
		CINNAMON_VERSION: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		npm_config_engine_strict: string;
		COLORTERM: string;
		npm_package_devDependencies__tailwindcss_forms: string;
		npm_package_devDependencies_tailwindcss: string;
		npm_package_devDependencies_typescript: string;
		npm_package_dependencies_recaptcha_v3: string;
		INSIDE_NEMO_PYTHON: string;
		NVM_DIR: string;
		npm_package_dependencies__inlang_paraglide_sveltekit: string;
		QT_QPA_PLATFORMTHEME: string;
		npm_package_scripts_dev: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_devDependencies_prettier: string;
		GTK_IM_MODULE: string;
		LOGNAME: string;
		npm_package_type: string;
		_: string;
		npm_package_private: string;
		npm_package_scripts_check_watch: string;
		npm_package_devDependencies_autoprefixer: string;
		XDG_SESSION_CLASS: string;
		npm_package_scripts_lint: string;
		npm_config_registry: string;
		STM32_PRG_PATH: string;
		TERM: string;
		XDG_SESSION_ID: string;
		GNOME_DESKTOP_SESSION_ID: string;
		npm_package_devDependencies_prettier_plugin_tailwindcss: string;
		PATH: string;
		SESSION_MANAGER: string;
		GDM_LANG: string;
		GTK3_MODULES: string;
		npm_package_name: string;
		npm_package_devDependencies_typescript_eslint: string;
		npm_package_dependencies_nodemailer: string;
		NODE: string;
		XDG_SESSION_PATH: string;
		LC_ADDRESS: string;
		GNOME_TERMINAL_SCREEN: string;
		XDG_RUNTIME_DIR: string;
		GDK_BACKEND: string;
		npm_package_scripts_test_e2e: string;
		npm_config_frozen_lockfile: string;
		DISPLAY: string;
		npm_package_scripts_test_unit: string;
		LANG: string;
		XDG_CURRENT_DESKTOP: string;
		LC_TELEPHONE: string;
		npm_package_devDependencies_eslint: string;
		XMODIFIERS: string;
		XDG_SESSION_DESKTOP: string;
		XAUTHORITY: string;
		LS_COLORS: string;
		VSCODE_GIT_IPC_HANDLE: string;
		GNOME_TERMINAL_SERVICE: string;
		TERM_PROGRAM: string;
		npm_lifecycle_script: string;
		SSH_AUTH_SOCK: string;
		XDG_GREETER_DATA_DIR: string;
		ORIGINAL_XDG_CURRENT_DESKTOP: string;
		npm_package_scripts_test: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_package_devDependencies__tailwindcss_typography: string;
		SHELL: string;
		LC_NAME: string;
		NODE_PATH: string;
		npm_package_version: string;
		npm_lifecycle_event: string;
		QT_ACCESSIBILITY: string;
		NO_AT_BRIDGE: string;
		GDMSESSION: string;
		npm_package_scripts_build: string;
		npm_package_devDependencies_svelte: string;
		LESSCLOSE: string;
		LC_MEASUREMENT: string;
		GPG_AGENT_INFO: string;
		LC_IDENTIFICATION: string;
		npm_package_devDependencies_globals: string;
		VSCODE_GIT_ASKPASS_EXTRA_ARGS: string;
		QT_IM_MODULE: string;
		XDG_VTNR: string;
		npm_package_scripts_format: string;
		PWD: string;
		npm_execpath: string;
		XDG_CONFIG_DIRS: string;
		CLUTTER_IM_MODULE: string;
		NVM_CD_FLAGS: string;
		XDG_DATA_DIRS: string;
		LC_NUMERIC: string;
		npm_package_devDependencies__neoconfetti_svelte: string;
		npm_command: string;
		PNPM_SCRIPT_SRC_DIR: string;
		LC_PAPER: string;
		npm_package_scripts_preview: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		PNPM_HOME: string;
		VTE_VERSION: string;
		npm_package_devDependencies__tailwindcss_container_queries: string;
		INIT_CWD: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		PUBLIC_RECAPTCHA_SITE_KEY: string;
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
