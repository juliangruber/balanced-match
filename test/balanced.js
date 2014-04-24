var test = require('tape');
var balanced = require('..');

test('balanced', function(t) {
  t.deepEqual(balanced('{', '}', 'pre{in{nest}}post'), {
    start: 3,
    end: 12,
    pre: 'pre',
    body: 'in{nest}',
    post: 'post'
  });
  t.deepEqual(balanced('{', '}', 'pre}{in{nest}}post'), {
    start: 4,
    end: 13,
    pre: 'pre}',
    body: 'in{nest}',
    post: 'post'
  });
  t.deepEqual(balanced('{', '}', 'pre{body}between{body2}post'), {
    start: 3,
    end: 8,
    pre: 'pre',
    body: 'body',
    post: 'between{body2}post'
  });
  t.notOk(balanced('{', '}', 'nope'), 'should be notOk');
  t.end();
});
