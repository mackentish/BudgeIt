module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 120,
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};
