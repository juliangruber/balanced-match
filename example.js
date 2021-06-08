const balanced = require('./dist/balanced-match.js')

console.log(balanced('{', '}', 'pre{in{nested}}post'))
console.log(balanced('{', '}', 'pre{first}between{second}post'))
