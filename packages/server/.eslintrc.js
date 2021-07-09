module.exports = {
  extends: ['@shared/eslint-config'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    'func-names': 'off',
  }
};
