/* globals game */
const Map = require('./Map')

class Person {
  constructor () {
  }

  create () {
	const tile = Map.getRandomTile()
	this.graphics = game.add.graphics(tile.worldX, tile.worldY);
	this.graphics.beginFill(0xff0000);
	this.graphics.drawRect(0, 0, 32, 32);
	this.graphics.endFill();
  }

  move (x, y) {
    this.graphics.x += x || 0
    this.graphics.y += y || 0
  }

  update () {
    
  }
}

module.exports = Person