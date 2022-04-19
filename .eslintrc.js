module.exports = {
  extends: [ 'standard' ],
  rules: {
    semi: ['error', 'always'],
    eqeqeq: [0],
    'comma-dangle': ['error', 'always-multiline'],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0,
  },
  env: {
    browser: true,
    node: true,
    jasmine: true,
  }
};
