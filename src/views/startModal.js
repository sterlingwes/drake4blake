const fadeSeconds = 1
const fadeMilli = fadeSeconds * 1000
const startModal = document.getElementById('startModal')


module.exports = function (start) {
  startModal.style.transition = `opacity, ${fadeSeconds}s`
  startModal.style.display = 'block'

  setTimeout(() => {
    startModal.style.opacity = 1
    const startBtn = document.getElementById('start')
    startBtn.onclick = () => {
      startBtn.onclick = null
      startModal.style.opacity = 0
      setTimeout(() => {
        startModal.style.display = 'none'
        start()
      }, fadeMilli)
    }
  }, fadeMilli)
}
