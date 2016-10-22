const Drake = require('./Drake')
const Person = require('./Person')
const Map = require('./Map')

let drake

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  Map.init()
  drake = new Drake()
  person = new Person()
}

function create () {
  Map.create()
  drake.create()
  person.create()
}

function update () {
  Map.update()
  drake.update()
  person.update()
}