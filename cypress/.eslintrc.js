module.exports = {
  extends: ['../.eslintrc.json'],
  plugins: ['cypress', 'jest'],
  ignorePatterns: ['!**/*'],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  overrides: [
    {
      files: ['**/*.ts', '*.js'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {},
    },
    {
      files: ['**/*.spec.ts'],
      extends: ['plugin:cypress/recommended'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      rules: {
        'jest/no-focused-tests': 2,
        'jest/expect-expect': [
          'error',
          {
            assertFunctionNames: [
              'expect',
              'm.expect',
              'http.verify',
              '**.should',
            ],
          },
        ],
      },
    },
    {
      files: ['src/plugins/index.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        'no-undef': 'off',
      },
    },
  ],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname, // important option
  },
};
