import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: [
			'build/',
			'.svelte-kit/',
			'.vercel/',
			'test-results/',
			'dist/',
			'.DS_Store',
			'src/lib/components/common/Analytics.svelte',
			'src/lib/i18n/'
		]
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/no-at-html-tags': 'off',
			'@typescript-eslint/no-unused-vars': 'off'
		}
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort
		},
		rules: {
			'simple-import-sort/imports': [
				'error',
				{
					groups: [
						// Packages `svelte` related packages come first.
						['^svelte', '^@?\\w'],
						// Packages `sveltekit` related packages come first.
						['^sveltekit', '^@?\\w'],
						// Packages that starts with $../.. come first.
						['^\\$', '^@?\\w'],
						// Side effect imports.
						['^\\u0000'],
						// Parent imports. Put `..` last.
						['^\\.\\.(?!/?$)', '^\\.\\./?$'],
						// Other relative imports. Put same-folder imports and `.` last.
						['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
						// Style imports.
						['^.+\\.?(css)$']
					]
				}
			],
			'simple-import-sort/exports': 'error'
		}
	}
];
