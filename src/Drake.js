/* globals game */

const speed = 4
const frameRate = 5

class Drake {
  constructor () {
    this.animation = null

    this.sprite = game.add.sprite(125, 150, 'bot')
    this.sprite.x = 100
    this.sprite.y = 150
    this.sprite.scale.setTo(0.5)
    this.sprite.anchor.setTo(0.5, 1)
    this.sprite.animations.add('run')
  }

  move (x, y) {
    if (!this.animation) {
      this.animation = this.sprite.animations.play('run', frameRate, true)
    }

    this.sprite.x += x || 0
    this.sprite.y += y || 0

    if (this.animation.isPaused) this.animation.play(frameRate, true)
  }

  update () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.move(-speed)
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.move(speed)
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.move(0, -speed)
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.move(0, speed)
    } else {
      if (this.animation) this.animation.paused = true
    }
  }
}

module.exports = Drake