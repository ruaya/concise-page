export function debounbce(fn, delay = 300) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn && fn.apply(this, args)
    }, delay)
  }
}