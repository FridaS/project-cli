module.exports = {
  extends: 'standard',
  rules: {
    semi: ['error', 'always'],
    eqeqeq: [0],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint'
  }
};
