var drakeTexturePath = require('../assets/drakebling.png')
var drakeTextureSpec = require('../assets/drakebling.json')

const Drake = require('./Drake')

var graphics

var currentCol = 0
var currentRow = 1
var unit = 100
var grid = [
  [0,0,0,0,1,0,0,0],
  [1,1,1,1,1,1,1,1],
  [0,1,0,0,1,0,0,0],
  [0,1,0,0,1,0,0,0],
  [0,1,1,1,1,0,0,0],
  [0,1,0,0,0,0,0,0]
]

var game = window.game = new Phaser.Game(800, 600, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  game.load.atlasJSONHash('bot', drakeTexturePath, null, drakeTextureSpec)
}

function create () {
  drawMap()

  drake = new Drake()
}

function drawMap () {
  graphics = game.add.graphics()
  grid.forEach(function (row, rowIndex) {
    row.forEach(function (col, colIndex) {
      if (!col) return
      graphics.beginFill(0xa03894, 0.5)
      graphics.drawRect(colIndex * unit, rowIndex * unit, unit, unit)
      graphics.endFill()
    })
  })
}

function update () {
  drake.update()
}