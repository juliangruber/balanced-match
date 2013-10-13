module.exports = function(a, b, str) {
  var bal = 0;
  var m = {};

  for (var i = 0; i < str.length; i++) {
    if (str[i] == a) {
      if (!('start' in m)) m.start = i;
      bal++;
    }
    else if (str[i] == b) {
      bal--;
      if (!bal) {
        m.end = i;
        m.pre = str.substr(0, m.start);
        m.body = (m.end - m.start > 1)
          ? str.substring(m.start + 1, m.end)
          : '';
        m.post = str.slice(m.end + 1);
        return m;
      }
    }
  }
};

