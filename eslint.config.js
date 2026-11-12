import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

/*
 * Module boundaries (modular monolith):
 *   app      → pages, features, shared
 *   pages    → features, shared
 *   features → shared (and other features only via their public API: @/features/<name>)
 *   shared   → nothing above it
 * Inside a module use relative imports; across modules use the @/ alias.
 */
const MAX_DEPTH = 5

const forbid = (group, message) => ({ group, message })

const LAYER_RULES = {
  'src/app': [
    forbid(['@/features/*/**'], 'Import features through their public API: @/features/<name>'),
  ],
  'src/pages': [
    forbid(['@/app', '@/app/**'], 'pages must not depend on app'),
    forbid(['@/features/*/**'], 'Import features through their public API: @/features/<name>'),
  ],
  'src/features/*': [
    forbid(['@/app', '@/app/**', '@/pages', '@/pages/**'], 'features must not depend on app or pages'),
    forbid(['@/features/*/**'], 'Import other features through their public API: @/features/<name>'),
  ],
  'src/shared': [
    forbid(
      ['@/app', '@/app/**', '@/pages', '@/pages/**', '@/features', '@/features/**'],
      'shared must not depend on app, pages or features',
    ),
  ],
}

// A file `depth` folders below its module root may climb at most `depth` levels with "../".
const noRelativeEscape = (depth) => ({
  regex: `^(\\.\\./){${depth + 1},}`,
  message: 'Relative imports must stay inside the current module; use the @/ alias',
})

const boundaryConfigs = Object.entries(LAYER_RULES).flatMap(([root, patterns]) =>
  Array.from({ length: MAX_DEPTH }, (_, depth) => ({
    files: [`${root}/${'*/'.repeat(depth)}*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': ['error', { patterns: [...patterns, noRelativeEscape(depth)] }],
    },
  })),
)

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  ...boundaryConfigs,
])
