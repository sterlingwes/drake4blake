const Drake = require('./Drake')
const Person = require('./Person')
const Map = require('./Map')

const MAX_NB_PERSONS = 10

let drake

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  this.map = Map.init()
  this.drake = new Drake()
  this.persons = []
  for (let i = 0; i < MAX_NB_PERSONS; i++) {
    this.persons.push(new Person())
  }
}

function create () {
  this.map.create()
  this.drake.create()
  this.persons.forEach(person => { person.create() })
}

function update () {
  this.map.update()
  this.drake.update()
  this.persons.forEach(person => { person.update() })
}