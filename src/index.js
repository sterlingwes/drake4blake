const Drake = require('./Drake')
const Map = require('./Map')

let drake
let map

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  map = new Map()
  drake = new Drake()
}

function create () {
  map.create()
  drake.create(map)
}

function update () {
  map.update()
  drake.update()
}