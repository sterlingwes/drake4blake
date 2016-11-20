/* globals game */

const drakeTexturePath = require('../../assets/drakebling.png')
const drakeTextureSpec = require('../../assets/drakebling.json')

const Map = require('./Map')

const constants = require('../constants')
const { speed, frameRate, width, height, scale } = constants.drake
const { tileSize, borderAllowance } = constants.map

class Drake {
  constructor () {
    this.animation = null
    game.load.atlasJSONHash('drake', drakeTexturePath, null, drakeTextureSpec)
  }

  create () {
    this.sprite = game.add.sprite(width, height, 'drake')
    this.sprite.x = 580
    this.sprite.y = 390
    this.sprite.scale.setTo(scale)
    this.sprite.anchor.setTo(0.5, 1)
    this.sprite.animations.add('run')
  }

  move (x, y) {
    if (!this.animation) {
      this.animation = this.sprite.animations.play('run', frameRate, true)
    }

    this.moving = true

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
      Math.floor((this.sprite.x + offsetX) / tileSize),
      Math.floor((this.sprite.y + offsetY) / tileSize)
    ]
  }

  inBounds (x, y) {
    const coords = this.getTileCoords(x || 0, y || 0)
    return Map.isRoad.apply(Map, coords)
  }

  isMoving () {
    return this.moving
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
      this.moving = false
    }
  }

  getTile () {
    return Map.getTileFromPixels(this.sprite.x, this.sprite.y)
  }
}

module.exports = Drake