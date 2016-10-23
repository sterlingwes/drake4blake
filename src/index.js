require('./style.css')

const Drake = require('./Drake')
const Person = require('./Person')
const Map = require('./Map')

const MAX_NB_PERSONS = 10

let drake
let persons

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  Map.init()
  drake = new Drake()
  persons = []
}

function create () {
  Map.create()
  initPersons()
  drake.create()
}

function update () {
  Map.update()
  persons.forEach(person => { person.update() })
  drake.update()
}

function initPersons() {
  const tiles = Map.tiles
  for (let i = 0; i < MAX_NB_PERSONS; i++) {
    const personTemp = new Person()
    personTemp.create()
    while (persons.findIndex(person => person.comparePosition(personTemp)) > -1) {
      personTemp.setPosition()
    }
    persons.push(personTemp)
  }
}