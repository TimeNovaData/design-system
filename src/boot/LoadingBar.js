import { LoadingBar } from 'quasar'

function logURLS(url) {
  const index = url.indexOf('/api/') + 5
  const method = window._url_method
  const key = `${method.toUpperCase()} ` + url.slice(index)

  const color = {
    patch: '_silver',
    get: '_green',
    post: '_yellow',
  }

  const type = color[method] ? color[method] : '_logsimple'

  window[type](key) // window._green
}

LoadingBar.setDefaults({
  // return a Boolean which has the meaning of
  // "should this URL trigger LoadingBar?"
  size: '6px',
  hijackFilter(url) {
    logURLS(url)
    const list = [/no_loading/].filter((i) => i.test(url))
    const verif = Boolean(list.length)
    const deveAcionar = !verif
    return deveAcionar
  },
})
