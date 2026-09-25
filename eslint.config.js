import prettier from 'eslint-config-prettier';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';

// Resolve against the working directory, not this file's location: qlty copies
// this config into its tool sandbox, where sibling files don't exist.
const gitignorePath = path.join(process.cwd(), '.gitignore');

export default defineConfig(
	...(existsSync(gitignorePath) ? [includeIgnoreFile(gitignorePath)] : []),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			// typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
			// see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
			'no-undef': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
				// svelteConfig is omitted: svelte-eslint-parser statically reads
				// ./svelte.config.js from the workspace itself, which also works
				// inside qlty's sandbox where importing it here would crash.
			}
		}
	}
);
