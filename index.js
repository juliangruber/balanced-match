module.exports = function(a, b, str) {
  var bal = 0;
  var m = {};
  var al = a.length;
  var bl = b.length;

  for (var i = 0, n = str.length; i < n; i++) {
    if (a == str.substr(i, al)) {
      if (!('start' in m)) m.start = i;
      bal++;
    }
    else if (b == str.substr(i, bl) && 'start' in m) {
      bal--;
      if (!bal) {
        m.end = i;
        m.pre = str.substr(0, m.start);
        m.body = (m.end - m.start > 1)
          ? str.substring(m.start + al, m.end)
          : '';
        m.post = str.slice(m.end + bl);
        return m;
      }
    }
  }
};

