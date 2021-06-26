module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    node: true,
    es6: true,
    jasmine: true,
    browser: true
  },
  plugins: ['@typescript-eslint', 'prettier'],
  globals: {
    module: true,
    inject: true,
    Promise: true
  },
  rules: {
    'callback-return': ['error'],
    curly: ['error'],
    'newline-before-return': ['error'],
    'no-else-return': ['error'],
    'no-shadow': [
      'error',
      {
        allow: ['done', 'cb', 'err']
      }
    ],
    'no-throw-literal': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-var': ['error'],
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'always',
        bracketSpacing: true,
        printWidth: 80,
        proseWrap: 'preserve',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'none',
        useTabs: false
      }
    ],
    'no-prototype-builtins': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
};
