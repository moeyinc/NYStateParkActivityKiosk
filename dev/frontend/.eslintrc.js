// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue
    // #priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended`
    // or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard',
    'google', // https://github.com/google/eslint-config-google
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'switch-colon-spacing': 0,
  },
};
