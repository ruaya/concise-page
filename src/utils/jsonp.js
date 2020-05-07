export function jsonp({url = '', data = {}, cb = 'cb'}) {

  return new Promise((resolve) => {
    if (!url) return 
    const cbFn = `jsonp_${Date.now()}`
    data[cb] = cbFn

    const oHead = document.querySelector('body')
    const oScript = document.createElement('script')

    const src = `${url}?${data2Url(data)}`
    oScript.src = src

    oHead.appendChild(oScript)

    window[cbFn] = function(res) {
      resolve(res)
      oHead.removeChild(oScript)
      window[cbFn] = null
    }
  })
}

function data2Url(data) {
  return Object.keys(data).reduce((arr, key) => {
    arr.push(`${key}=${data[key]}`)
    return arr
  }, []).join('&')
}

  /* jsonp({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    data: { wd: this.value },
    cb: 'cb'
  }) */
