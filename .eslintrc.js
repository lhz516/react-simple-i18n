module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    camelcase: [2, { properties: 'never' }],
    curly: [2, 'multi-line'],
    indent: [2, 2, { SwitchCase: 1 }],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    eqeqeq: 2,
    yoda: 2,
    'block-spacing': 2,
    'computed-property-spacing': 2,
    'comma-dangle': [
      2,
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'func-call-spacing': 2,
    'eol-last': 2,
    'no-empty': [2, { allowEmptyCatch: true }],
    'no-undefined': 2,
    'no-use-before-define': [2, 'nofunc'],
    'no-multi-assign': 2,
    'no-useless-concat': 2,
    'no-useless-return': 2,
    'no-shadow-restricted-names': 2,
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-unused-vars': 1,
    'no-console': 1,
    'no-useless-constructor': 1,
    'no-constant-condition': [2, { checkLoops: false }],
    'no-duplicate-imports': [2, { includeExports: true }],
    'no-useless-computed-key': 2,
    'no-useless-rename': 2,
    'no-var': 2,
    'space-before-blocks': 2,
    'space-in-parens': 2,
    'space-infix-ops': 2,
    'space-unary-ops': [2, { words: true, nonwords: false }],
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'template-tag-spacing': 2,
    'max-len': [
      2,
      {
        code: 100,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'object-shorthand': 2,
    'object-curly-spacing': [2, 'always'],
    'prefer-const': 2,
    'prefer-arrow-callback': 2,
    'template-curly-spacing': [2, 'never'],
  },
}
