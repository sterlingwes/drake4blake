/* globals game */
const tileSpec = require('../assets/level.json')
const roadTexturePath = require('../assets/road.png')
const degrassiDrake = require('../assets/degrassidrake.png')
const house = require('../assets/house.png')

const constants = require('./constants')
const { streets, tileSize, fontPadding, fontSize } = constants.map

class Map {
  constructor () {}

  init () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.load.tilemap('roads', null, tileSpec, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', roadTexturePath)
    game.load.image('degrassi', degrassiDrake)
    game.load.image('house', house)
  }

  create () {
    game.stage.backgroundColor = 0x2E2E2E

    this.map = game.add.tilemap('roads')
    this.map.addTilesetImage('Road', 'tiles')

    this.backgroundLayer = this.map.createLayer('Background')
    this.layer = this.map.createLayer('Roads')

    this.renderStreetNames()

    this.tiles = []
    this.generateTilesArray()

    const degrassiCoords = this.getPixelCoord(7, 16).concat('degrassi')
    this.degrassi = game.add.sprite.apply(game.add, degrassiCoords)
    this.degrassi.scale.setTo(0.6)
    this.degrassi.x += 5

    const houseCoords = this.getPixelCoord(13, 7).concat('house')
    this.house = game.add.sprite.apply(game.add, houseCoords)
    this.house.scale.setTo(0.6)
    this.house.y += 5
  }

  renderStreetNames () {
    streets.forEach(street => {
      const { vertical, location, x, y } = street
      const coords = this.getFontPixelCoord.apply(this, location)
      const textOptions = [
        street.text,
        { font: `${street.fontSize || fontSize}px Arial`, fill: '#FFF' }
      ]
      const text = game.add.text.apply(game.add, coords.concat(textOptions))
      if (vertical) text.angle = -270
      if (x) text.x += x
      if (y) text.y += y
    })
  }

  getFontPixelCoord (tileX, tileY) {
    return [
      tileX * tileSize - fontPadding,
      tileY * tileSize + fontPadding
    ]
  }

  getPixelCoord (tileX, tileY) {
    return [tileX * tileSize, tileY * tileSize]
  }

  generateTilesArray () {
    for (let i = 0; i < this.map.tileHeight; i++) {
      for (let j = 0; j < this.map.tileWidth; j++) {
        const tile = this.map.getTile(i, j)
        if (tile) {
          this.tiles.push(tile)
        }
      }
    }
  }

  update () {}

  isRoad (x, y) {
    const tile = this.map.getTile(x, y, this.layer)
    if (!tile) return false
    return tile.layer.name === 'Roads'
  }

  getRandomTile () {
    return this.tiles[this.getRandomIntInclusive(0, this.tiles.length - 1)]
  }

  getRandomIntInclusive (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}

module.exports = new Map()
