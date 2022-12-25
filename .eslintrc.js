const eslintRules = {
  'arrow-parens': ['error', 'always'],
  'arrow-spacing': ['error', { before: true, after: true }],
  'brace-style': ['error'],
  'comma-dangle': ['error', 'never'],
  'comma-spacing': ['error', { before: false, after: true }],
  curly: ['error', 'all'],
  'dot-notation': ['error'],
  'eol-last': ['error'],
  indent: ['error', 2, { SwitchCase: 1 }],
  'key-spacing': ['error', { mode: 'strict' }],
  'keyword-spacing': ['error', { overrides: { catch: { after: true } } }],
  'lines-between-class-members': 'off',
  'no-await-in-loop': 'off',
  'no-console': ['error'],
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 1 }],
  'no-trailing-spaces': ['error'],
  'no-unused-vars': ['error', { args: 'none' }],
  'object-curly-spacing': ['error', 'always'],
  'object-shorthand': ['error', 'properties'],
  'one-var': ['error', 'never'],
  'padded-blocks': ['error', 'never'],
  'padding-line-between-statements': 'off',
  'prefer-destructuring': ['error', { AssignmentExpression: { array: false, object: false }, VariableDeclarator: { array: false, object: true } }], // array suggests pointlessly replacing foo[0],
  'prefer-rest-params': 'off',
  'prefer-template': ['error'],
  'quote-props': ['error', 'as-needed'],
  quotes: ['error', 'single', { avoidEscape: true }],
  semi: ['error', 'always'],
  'space-before-function-paren': ['error', { anonymous: 'never', asyncArrow: 'always', named: 'never' }],
  'space-in-parens': ['error'],
  'space-unary-ops': ['error'],
  'template-curly-spacing': ['error', 'never'],
  'vue/multi-word-component-names': ['off', {
    ignores: []
  }]
};

module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    ...eslintRules
  }
};
