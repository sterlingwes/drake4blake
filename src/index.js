/* globals ENV */

require('./style.css')
require('./window.js')

if (ENV === 'debug') {
  require('./grid')
}

const Drake = require('./Drake')
const Person = require('./Person')
const Map = require('./Map')
const SoundManager = require('./SoundManager')
const constants = require('./constants')
const { max } = constants.person

let drake
let persons
let personCount = 0

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  Map.init()
  drake = new Drake()
  persons = []
  SoundManager.init()
}

function create () {
  Map.create()
  initPersons()
  drake.create()
  SoundManager.create()
}

function update () {
  Map.update()
  SoundManager.update()
  drake.update()
  const drakeTile = drake.getTile()
  persons.forEach(person => {
    person.update()
    if (person.isOnTile(drakeTile)) {
      person.remove()
      personCount++
    }
  })
}

function initPersons() {
  const tiles = Map.tiles
  for (let i = 0; i < max; i++) {
    const personTemp = new Person()
    personTemp.create()
    while (persons.findIndex(person => person.comparePosition(personTemp)) > -1) {
      personTemp.setPosition()
    }
    persons.push(personTemp)
  }
}