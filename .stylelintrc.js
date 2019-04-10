module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-scss'],
  rules: {
    'value-list-comma-newline-after': 'always',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'at-root',
          'content',
          'debug',
          'each',
          'else',
          'else if',
          'error',
          'extend',
          'for',
          'function',
          'if',
          'import',
          'include',
          'media',
          'mixin',
          'return',
          'warn',
          'while'
        ]
      }
    ]
  }
}
