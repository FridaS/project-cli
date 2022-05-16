module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
  ],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    eqeqeq: [2],
    curly: 'error',
    indent: ['error', 2],
    'max-len': ['warn', { 'code': 80 }],
    'operator-linebreak': ['error', 'before'],
    'no-console': 1,
    'max-depth': ['error', 3],
    'consistent-this': ['error', 'self'],
    'brace-style': 'error',
    'no-control-regex': 'warn',
    'comma-dangle': ['error', 'always-multiline'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-new-object': 'error',
    'space-before-function-paren': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
    'vue/multi-word-component-names': [0],
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    requireConfigFile: false,
  },
};
