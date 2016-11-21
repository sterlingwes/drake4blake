const constants = require('../constants')
const { max } = constants.person
const { topOffsetPx } = constants.stats
const fontPx = 25

class Stats {
  constructor() {}

  create () {
    this.startTimer()
    this.addPersonCount()
  }

  update () {
    this.updateTime()
  }

  addPersonCount () {
    this.personIcon = game.add.image(150, topOffsetPx, 'person')
    this.personIcon.anchor.setTo(0.5, 0.5)
    this.personIcon.scale.setTo(0.4)

    this.personCounter = game.add.text(150, topOffsetPx + 35, 0, {
      font: `${fontPx}px Arial`,
      fill: '#FFF',
      align: 'center'
    })
    this.personCounter.anchor.setTo(0.5, 0.5)
    this.caught = 0
    this.setPersonCount()
  }

  setPersonCount () {
    this.personCounter.text = `${this.caught} / ${max}`
  }

  addPerson () {
    this.caught++
    this.setPersonCount()
  }

  hasFinished () {
    return this.caught === max
  }

  startTimer () {
    this.startSeconds = game.time.totalElapsedSeconds()
    this.addTimer()
  }

  stopTimer () {
    this.stopSeconds = this.getTimeElapsed()
  }

  gameOver () {
    return this.stopSeconds
  }

  addTimer () {
    this.timerIcon = game.add.image(game.width / 2, topOffsetPx, 'timer')
    this.timerIcon.anchor.setTo(0.5, 0.5)
    this.timerIcon.scale.setTo(0.5)

    this.timeCounter = game.add.text(game.width / 2, topOffsetPx + 35, 0, {
      font: `${fontPx}px Arial`,
      fill: '#FFF',
      align: 'center'
    })
    this.timeCounter.anchor.setTo(0.5, 0.5)
  }

  getTime () {
    const digits = 100
    const seconds = this.stopSeconds * digits
    return Math.ceil(seconds) / digits
  }

  getTimeElapsed () {
    return game.time.totalElapsedSeconds() - this.startSeconds
  }

  updateTime () {
    if (this.gameOver()) return

    const seconds = this.getTimeElapsed()
    if (seconds !== this.lastTimeVal) {
      this.lastTimeVal = seconds
      this.timeCounter.text = Math.ceil(seconds)
    }
  }
}

module.exports = new Stats()