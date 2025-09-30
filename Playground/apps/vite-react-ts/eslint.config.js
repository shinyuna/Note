import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactPlugin.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      import: importPlugin,
    },
    rules: {      
      curly: 1, // 중괄호 필수 적용
      'arrow-body-style': ['error', 'as-needed'], // 화살표 함수에서 바로 return 이 가능한 경우 함수 body 생략
      'padding-line-between-statements': [
        // 특정 코드 사이에 줄바꿈 추가
        'error',
        { blankLine: 'always', prev: '*', next: 'return' }, // return 블럭 전에
        { blankLine: 'always', prev: '*', next: 'block' }, // 블럭 코드 전에
        { blankLine: 'always', prev: '*', next: 'block-like' }, // 유사 블럭 코드 전에
      ],

      'react/react-in-jsx-scope': 0, // jsx 를 사용하는 곳에 필수적으로 React 를 가져오지 않아도 됨
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // css 속성 사용 가능

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable',
          leadingUnderscore: 'allow',
        },
        { format: ['camelCase', 'PascalCase'], selector: 'function' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', ['parent', 'sibling'], 'index', 'object', 'type'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true, // 대소문자 구분
          },
          'newlines-between': 'always', // 구문 마다 공백 추가
        },
      ],
      'import/no-duplicates': 'error', // 중복 import 방지
      'import/newline-after-import': ['error', { count: 1 }], // import 구문 뒤에 공백
      "no-restricted-imports": [
        "error",
        {
          "paths": [
            {
              "name": "react",
              "importNames": ["default"],
              "message": "import React from 'react' makes bundle size larger."
            }
          ]
        }
      ],

      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'anywhere',
        },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
    }
  },
])
