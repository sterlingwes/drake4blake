/* globals game */
const Map = require('./Map')
const shuffle = require('lodash/shuffle')
const without = require('lodash/without')
const constants = require('./constants')
const { debug } = require('./Helper')
const { speed } = constants.person

const directions = ['up', 'down', 'left', 'right']
const opposite = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left'
}

class Person {
  constructor () {
    this.active = true
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

  /*
   * - getDirection (shuffled with current direction prioritized and opposite of that last)
   * - checkDirection to see if movable in that direction (nextTile exists & is road)
   * - set direction
   * - move in that direction with predefined speed and reset current tile
   */
  update () {
    if (!this.active) return
    
    debug('-- update')
    debug(`current: ${this.tile.x},${this.tile.y} (${this.graphics.x},${this.graphics.y})`)
    this.getDirection()
    if (this.direction) {
      this.move()
    }
  }

  getDirection () {
    let options = shuffle(directions)
    if (this.direction) {
      const oppositeDirection = opposite[this.direction]
      options = without(
        options,
        this.direction, oppositeDirection
      )
      .concat([this.direction, oppositeDirection])
    }
    let direction = null
    while (!direction && options.length) {
      const testDirection = options.shift()
      if (this.checkDirection(testDirection)) {
        direction = testDirection
      }
    }
    debug(`direction: ${direction}`)
    this.direction = direction
  }

  checkDirection (direction) {
    const next = this.getNextTile(direction)
    if (next && next.layer.name == 'Roads') {
      debug(`next: ${next.x},${next.y}`)
      return true
    }
  }

  getNextTile (direction) {
    if (!direction) direction = this.direction
    const { x, y } = this.tile
    let nextX = x
    let nextY = y
    switch (direction) {
      case 'up':
        nextY -= 1; break
      case 'down':
        nextY += 1; break
      case 'left':
        nextX -= 1; break
      case 'right':
        nextX += 1;
    }
    return Map.getTile(nextX, nextY)
  }

  setPosition (tile) {
    this.tile = tile || Map.getRandomTile()
    this.tileId = `${this.tile.x}-${this.tile.y}`
    this.graphics.x = this.tile.worldX
    this.graphics.y = this.tile.worldY
  }

  move () {
    switch (this.direction) {
      case 'up':
        this.graphics.y -= speed; break
      case 'down':
        this.graphics.y += speed; break
      case 'left':
        this.graphics.x -= speed; break
      case 'right':
        this.graphics.x += speed;
    }
    this.tile = Map.getTileFromPixels(this.graphics.x, this.graphics.y)
    debug(`moved: ${this.tile.x},${this.tile.y} (${this.graphics.x},${this.graphics.y})`)
  }

  remove () {
    this.active = false
    this.graphics.destroy()
  }

  isOnTile (tile) {
    return this.tile.x === tile.x && this.tile.y === tile.y
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