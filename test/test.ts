import test from 'node:test'
import assert from 'node:assert'
import { balanced } from '../dist/esm/index.js'

test('balanced', async function () {
  assert.deepStrictEqual(balanced('{', '}', 'pre{in{nest}}post'), {
    start: 3,
    end: 12,
    pre: 'pre',
    body: 'in{nest}',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('{', '}', '{{{{{{{{{in}post'), {
    start: 8,
    end: 11,
    pre: '{{{{{{{{',
    body: 'in',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('{', '}', 'pre{body{in}post'), {
    start: 8,
    end: 11,
    pre: 'pre{body',
    body: 'in',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('{', '}', 'pre{in}po}st'), {
    start: 3,
    end: 6,
    pre: 'pre',
    body: 'in',
    post: 'po}st'
  })
  assert.deepStrictEqual(balanced('{', '}', 'pre}{in{nest}}post'), {
    start: 4,
    end: 13,
    pre: 'pre}',
    body: 'in{nest}',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('{', '}', 'pre{body}between{body2}post'), {
    start: 3,
    end: 8,
    pre: 'pre',
    body: 'body',
    post: 'between{body2}post'
  })
  assert.deepStrictEqual(
    balanced('<b>', '</b>', 'pre<b>in<b>nest</b></b>post'),
    {
      start: 3,
      end: 19,
      pre: 'pre',
      body: 'in<b>nest</b>',
      post: 'post'
    }
  )
  assert.deepStrictEqual(
    balanced('<b>', '</b>', 'pre</b><b>in<b>nest</b></b>post'),
    {
      start: 7,
      end: 23,
      pre: 'pre</b>',
      body: 'in<b>nest</b>',
      post: 'post'
    }
  )
  assert.deepStrictEqual(balanced('{{', '}}', 'pre{{{in}}}post'), {
    start: 3,
    end: 9,
    pre: 'pre',
    body: '{in}',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('{{{', '}}', 'pre{{{in}}}post'), {
    start: 3,
    end: 8,
    pre: 'pre',
    body: 'in',
    post: '}post'
  })
  assert.deepStrictEqual(balanced('{', '}', 'pre{{first}in{second}post'), {
    start: 4,
    end: 10,
    pre: 'pre{',
    body: 'first',
    post: 'in{second}post'
  })
  assert.deepStrictEqual(balanced('<?', '?>', 'pre<?>post'), {
    start: 3,
    end: 4,
    pre: 'pre',
    body: '',
    post: 'post'
  })
  assert.deepStrictEqual(balanced('___', '___', 'PRE ___BODY___ POST'), {
    start: 4,
    end: 11,
    pre: 'PRE ',
    body: 'BODY',
    post: ' POST'
  })
  //@ts-expect-error
  assert(!balanced(null, null, 'nope'), 'should be notOk')
  assert(!balanced('{', '}', 'nope'), 'should be notOk')
  assert(!balanced('{', '}', '{nope'), 'should be notOk')
  assert(!balanced('{', '}', 'nope}'), 'should be notOk')
  assert(!balanced(/\{/, /\}/, 'nope'), 'should be notOk')
  assert.deepStrictEqual(
    balanced(/\s+\{\s+/, /\s+\}\s+/, 'pre  {   in{nest}   }  post'),
    {
      start: 3,
      end: 17,
      pre: 'pre',
      body: 'in{nest}',
      post: 'post'
    }
  )
})
