'use strict';
module.exports = balanced;
function balanced(a, b, str) {
  if (a instanceof RegExp) a = maybeMatch(a, str);
  if (b instanceof RegExp) b = maybeMatch(b, str);

  if (!a || !b) {
    return;
  }

  var r = range(a, b, str);

  if (r) {
    return {
      start: r[0],
      end: r[1],
      pre: str.substring(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.substring(r[1] + b.length)
    }
  }
}

function maybeMatch(reg, str) {
  var m = str.match(reg);
  return m ? m[0] : null;
}

balanced.range = range;
function range(a, b, str) {
  var ais = [];
  var bis = [];

  for (var i = 0; i < str.length; i++) {
    if (str.substring(i, i + a.length) === a) {
      if ((bis.length && i < bis[bis.length]) || !bis.length) {
        ais.push(i);
      } else {
        break;
      }
    }

    if (str.substring(i, i + b.length) === b && i > ais[0] && bis.length < ais.length) {
      bis.push(i);
    }
  }

  if (!ais.length) {
    return;
  }

  return [ais[ais.length - bis.length], bis[bis.length - 1]];
}
