/* globals game */
const Map = require('./Map')
const Helper = require('./Helper')

class Person {
  constructor () {
  }

  create () {
    this.graphics = game.add.graphics(0, 0)
    this.graphics.beginFill(0xff0000)
    this.graphics.drawRect(0, 0, 32, 32)
    this.graphics.endFill()
    this.setPosition()
  }

  move (x, y) {
    this.graphics.x += x || 0
    this.graphics.y += y || 0
  }

  update () {
  }

  setPosition() {
    const tile = Map.getRandomTile()
    this.graphics.x = tile.worldX
    this.graphics.y = tile.worldY
  }

  comparePosition (other) {
    let result = false
    if (other) {
      result = this.graphics.x == other.graphics.x && this.graphics.y == other.graphics.y
    }
    return result
  }
}

module.exports = Person