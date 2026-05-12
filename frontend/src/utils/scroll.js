const HEADER_HEIGHT  = 72
const SCROLL_DURATION = 900

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function smoothScrollTo(target, callback) {
  const start     = window.scrollY
  const distance  = target - start
  const startTime = performance.now()

  function step(now) {
    const elapsed  = now - startTime
    const progress = Math.min(elapsed / SCROLL_DURATION, 1)
    window.scrollTo(0, start + distance * easeInOutCubic(progress))
    if (progress < 1) requestAnimationFrame(step)
    else callback?.()
  }

  requestAnimationFrame(step)
}

export function navigateTo(href, callbackOrOffset, callback) {
  const extraOffset = typeof callbackOrOffset === 'number' ? callbackOrOffset : 0
  const cb          = typeof callbackOrOffset === 'function' ? callbackOrOffset : callback
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const target = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - extraOffset
  smoothScrollTo(target, cb)
}
