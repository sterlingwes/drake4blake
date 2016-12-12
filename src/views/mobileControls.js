function setupDom () {
  const container = document.getElementById('container')

  const controls = document.createElement('div')
  controls.className = 'mobileControls'

  const arrows = document.getElementById('mobileArrows').children[0]

  controls.appendChild(arrows)
  container.appendChild(controls)
}

function setupClickHandlers (handler) {
  ['up', 'down', 'left', 'right'].forEach(dir => {
    const el = document.getElementById(`gamepad-${dir}`)
    el.addEventListener('touchstart', () => handler(dir) )
    el.addEventListener('touchend', () => handler())
  })
}

module.exports = function (handler) {
  setupDom()
  setupClickHandlers(handler)
}
