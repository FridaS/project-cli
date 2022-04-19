module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: [0],
    'comma-dangle': ['error', 'always-multiline'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'prefer-promise-reject-errors': 0,
    'space-before-function-paren': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'promise/catch-or-return': 1,
    'promise/always-return': 1,
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
};
