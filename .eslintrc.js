module.exports = {
  extends: ['standard', 'plugin:@typescript-eslint/recommended', 'plugin:vue/recommended'],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: [0],
    'comma-dangle': ['error', 'always-multiline'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
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
  },
};
