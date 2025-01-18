

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)



// export default {
//   overrides: [
//     {
//       files: ['**/*.{ts,tsx}'],
//       languageOptions: {
//         ecmaVersion: 2020,
//         globals: globals.browser,
//       },
//       extends: [
//         js.configs.recommended,
//         'plugin:react/recommended',
//         'plugin:@typescript-eslint/recommended',
//         'plugin:react-hooks/recommended',
//       ],
//       plugins: ['react', 'react-hooks', 'react-refresh'],
//       rules: {
//         'react/prop-types': 'off',
//         '@typescript-eslint/explicit-module-boundary-types': 'off',
//         'react-hooks/rules-of-hooks': 'error',
//         'react-hooks/exhaustive-deps': 'warn',
//         'react-refresh/only-export-components': [
//           'warn',
//           { allowConstantExport: true },
//         ],
//       },
//     },
//   ],
// }