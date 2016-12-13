function setupClickHandlers (handler) {
  ['up', 'down', 'left', 'right'].forEach(dir => {
    const el = document.getElementById(`gamepad-${dir}`)
    el.addEventListener('touchstart', () => handler(dir) )
    el.addEventListener('touchend', () => handler())
  })
}

const fadeDelay = 400
const showDelay = 700
const fullOpacity = 0.5

function fade (direction) {
  ['up', 'right', 'down', 'left'].forEach((dir, i) => {
    setTimeout(() => {
      const el = document.getElementById(`gamepad-${dir}`)
      el.style.opacity = direction === 'in' ? fullOpacity : 0
    }, fadeDelay * (i + 1))
  })
}

module.exports = function (handler) {
  setupClickHandlers(handler)
  fade('in')
  const outInterval = showDelay + fadeDelay * 4
  setTimeout(() => fade('out'), outInterval)
}
