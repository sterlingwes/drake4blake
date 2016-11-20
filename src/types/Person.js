/* globals game */
const Map = require('./Map')
const shuffle = require('lodash/shuffle')
const without = require('lodash/without')
const debounce = require('lodash/debounce')
const constants = require('../constants')
const { debug } = require('../utils/helper')
const { speed, size, debounceMilli } = constants.person
const { tileSize } = constants.map

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
    this.sprite = game.add.sprite(size, size, 'person')
    this.sprite.scale.setTo(0.5)
    this.setPosition()
  }

  move (x, y) {
    this.sprite.x += x || 0
    this.sprite.y += y || 0
  }

  /*
   * - getDirection (shuffled with current direction prioritized and opposite of that last)
   * - checkDirection to see if movable in that direction (nextTile exists & is road)
   * - set direction
   * - move in that direction with predefined speed and reset current tile
   */
  _update () {
    if (!this.active) return
    
    debug('-- update')
    debug(`current: ${this.tile.x},${this.tile.y} (${this.sprite.x},${this.sprite.y})`)
    this.getDirection()
    if (this.direction) {
      this.move()
    }
  }

  update () {
    if (!debounceMilli) return this._update()
    if (!this.debouncedUpdate) {
      this.debouncedUpdate = debounce(this._update.bind(this), debounceMilli, { maxWait: debounceMilli })
    }
    this.debouncedUpdate()
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
    this.sprite.x = this.tile.worldX
    this.sprite.y = this.tile.worldY
  }

  move () {
    switch (this.direction) {
      case 'up':
        this.sprite.y -= speed; break
      case 'down':
        this.sprite.y += speed; break
      case 'left':
        this.sprite.x -= speed; break
      case 'right':
        this.sprite.x += speed;
    }

    this.tile = Map.getTileFromPixels(this.sprite.x, this.sprite.y)
    debug(`moved: ${this.tile.x},${this.tile.y} (${this.sprite.x},${this.sprite.y})`)
  }

  remove () {
    this.active = false
    this.sprite.destroy()
  }

  isOnTile (tile) {
    return this.tile.x === tile.x && this.tile.y === tile.y
  }

  comparePosition (other) {
    let result = false
    if (other) {
      result = this.sprite.x == other.sprite.x && this.sprite.y == other.sprite.y
    }
    return result
  }
}

module.exports = Person