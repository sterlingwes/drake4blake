const tileSpec = require('../assets/level.json')
const roadTexturePath = require('../assets/levels.png')
const playerTexturePath = require('../assets/player.png')

class Map {
  constructor () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    game.load.tilemap('roads', null, tileSpec, Phaser.Tilemap.TILED_JSON)
    game.load.image('tiles', roadTexturePath)
    game.load.image('player', playerTexturePath)
  }

  create () {
	  game.physics.startSystem(Phaser.Physics.P2JS)

    this.map = game.add.tilemap('roads')
    this.map.addTilesetImage('Level', 'tiles')

    this.backgroundLayer = this.map.createLayer('Background')
    this.backgroundLayer.resizeWorld();
    this.backgroundLayer.debug = true;
    console.log(this.map.setCollision(0, true, this.backgroundLayer));
    console.log(game.physics.p2.convertTilemap(this.map, this.backgroundLayer, true));

    this.layer = this.map.createLayer('Roads').resizeWorld();

    var start = this.map.objects['Start'][0];
    this.player = game.add.sprite(start.x, start.y, 'player');

    game.physics.p2.enable(this.player, true);
    //player.body.collideWorldBounds = true;

    game.physics.p2.setBoundsToWorld(true, true, true, true, false);

    this.cursors = game.input.keyboard.createCursorKeys();
  }

  update() {
    this.player.body.setZeroVelocity();

      if (this.cursors.left.isDown) {
          this.player.body.moveLeft(400);
      } else if (this.cursors.right.isDown) {
          this.player.body.moveRight(400);
      }

      if (this.cursors.up.isDown) {
          this.player.body.moveUp(400);
      } else if (this.cursors.down.isDown) {
          this.player.body.moveDown(400);
      }
  }
}

module.exports = Map
