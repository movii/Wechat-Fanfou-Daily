module.exports = function (msg) {
  let rtn = msg.replace(/#?@?<a([^>]*?)href\s*=\s*(['"])([^\2]*?)\2\1*>(.+?)<\/a>#?/ig, function (a, b, c, d, e) {

    if (/@/igm.test(a)) {
      var d1 = a.replace(
        /@<a href="http:\/\/fanfou.com\/(.+?)" class=".+?">(.+?)<\/a>/, 
        decodeURIComponent(' @$2')
      )
      return d1
    }

    if (/#/.test(a)) {
      return e;
    }

    if (!/#/.test(a) || !/@/.test(a)) {
      var d2 = d.replace(/(^https?:\/\/(.+?))".+/, '$1')
      return d2
    }
  })
  // console.log(rtn)
  return rtn
}