const tileSpec = require('../assets/level.json')
const roadTexturePath = require('../assets/road.png')

class Map {
  constructor () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.load.tilemap('roads', null, tileSpec, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', roadTexturePath)
  }

  create () {
    this.map = game.add.tilemap('roads')
    this.map.addTilesetImage('Level', 'tiles')

    this.backgroundLayer = this.map.createLayer('Background')
    this.layer = this.map.createLayer('Roads')
  }

  update() {}
}

module.exports = Map
