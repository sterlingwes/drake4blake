/* globals game */
const tileSpec = require('../assets/level.json')
const roadTexturePath = require('../assets/road.png')

class Map {
  constructor () {
  }

  init () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.load.tilemap('roads', null, tileSpec, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', roadTexturePath)
  }

  create () {
    this.map = game.add.tilemap('roads')
    this.map.addTilesetImage('Road', 'tiles')

    this.backgroundLayer = this.map.createLayer('Background')
    this.layer = this.map.createLayer('Roads')

    this.tiles = []
    this.generateTilesArray()
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
