import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		languageOptions: {
			globals: globals.browser,
		},
	},
	pluginJs.configs.recommended,
	{
		plugins: ['prettier'],
		extends: ['plugin:prettier/recommended'],
		rules: {
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
		},
	},
];
