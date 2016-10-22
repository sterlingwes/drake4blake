/* globals game */

const drakeTexturePath = require('../assets/drakebling.png')
const drakeTextureSpec = require('../assets/drakebling.json')

const speed = 6
const frameRate = 5
const units = 32
const width = 125
const height = 150
const borderAllowance = 20

class Drake {
  constructor () {
    this.animation = null
    game.load.atlasJSONHash('drake', drakeTexturePath, null, drakeTextureSpec)
  }

  create (map) {
    this.map = map
    this.sprite = game.add.sprite(width, height, 'drake')
    this.sprite.x = game.width / 2
    this.sprite.y = game.height / 2
    this.sprite.scale.setTo(0.5)
    this.sprite.anchor.setTo(0.5, 1)
    this.sprite.animations.add('run')
  }

  move (x, y) {
    if (!this.animation) {
      this.animation = this.sprite.animations.play('run', frameRate, true)
    }

    if (!this.inBounds(x, y)) return this.animation.paused = true

    this.sprite.x += x || 0
    this.sprite.y += y || 0

    // allow for looping horizontally
    if (this.sprite.x > (game.width - borderAllowance)) this.sprite.x = borderAllowance + 1
    if (this.sprite.x < borderAllowance) this.sprite.x = game.width - borderAllowance - 1

    // allow for looping vertically
    if (this.sprite.y > (game.height - borderAllowance)) this.sprite.y = borderAllowance + 1
    if (this.sprite.y < borderAllowance) this.sprite.y = game.height - borderAllowance - 1

    if (this.animation.isPaused) this.animation.play(frameRate, true)
  }

  getTileCoords (offsetX, offsetY) {
    return [
      Math.floor((this.sprite.x + offsetX) / units),
      Math.floor((this.sprite.y + offsetY) / units)
    ]
  }

  inBounds (x, y) {
    const coords = this.getTileCoords(x || 0, y || 0)
    return this.map.isRoad.apply(this.map, coords)
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