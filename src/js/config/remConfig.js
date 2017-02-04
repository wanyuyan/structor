export default () => {
  let dpr, rem
  const docEl = document.documentElement
  const fontEl = document.createElement('style')
  const metaEl = document.querySelector('meta[name="viewport"]')
  const { clientWidth } = docEl

  dpr = window.devicePixelRatio || 1
  rem = clientWidth / 10 / dpr

  metaEl.setAttribute('content', 'initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no')

  // 设置data-dpr属性，留作的css hack之用
  docEl.setAttribute('data-dpr', dpr)

  // 动态写入样式
  fontEl.innerHTML = 'html{font-size:' + rem + 'px;}'
  docEl.firstElementChild.appendChild(fontEl)
}
