/* global bench */
'use strict'

const indexOf = require('../dist/balanced-match.js')
const looping = require('./looping.js')

bench('indexOf', function () {
  indexOf('{', '}', 'pre{in{nest}}post')
  indexOf('{', '}', '{{{{{{{{{in}post')
  indexOf('{', '}', 'pre{body{in}post')
  indexOf('{', '}', 'pre}{in{nest}}post')
  indexOf('{', '}', 'pre{body}between{body2}post')
  indexOf('{', '}', 'nope')
  indexOf('<b>', '</b>', 'pre<b>in<b>nest</b></b>post')
  indexOf('<b>', '</b>', 'pre</b><b>in<b>nest</b></b>post')
  indexOf('{{', '}}', 'pre{{{in}}}post')
  indexOf('{{{', '}}', 'pre{{{in}}}post')
  indexOf('{', '}', 'pre{{first}in{second}post')
  indexOf('<?', '?>', 'pre<?>post')
  indexOf(/\{/, /\}/, 'nope')
  indexOf(/\s+\{\s+/, /\s+\}\s+/, 'pre  {   in{nest}   }  post')
})

bench('looping', function () {
  looping('{', '}', 'pre{in{nest}}post')
  looping('{', '}', '{{{{{{{{{in}post')
  looping('{', '}', 'pre{body{in}post')
  looping('{', '}', 'pre}{in{nest}}post')
  looping('{', '}', 'pre{body}between{body2}post')
  looping('{', '}', 'nope')
  looping('<b>', '</b>', 'pre<b>in<b>nest</b></b>post')
  looping('<b>', '</b>', 'pre</b><b>in<b>nest</b></b>post')
  looping('{{', '}}', 'pre{{{in}}}post')
  looping('{{{', '}}', 'pre{{{in}}}post')
  looping('{', '}', 'pre{{first}in{second}post')
  looping('<?', '?>', 'pre<?>post')
  looping(/\{/, /\}/, 'nope')
  looping(/\s+\{\s+/, /\s+\}\s+/, 'pre  {   in{nest}   }  post')
})
