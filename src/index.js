/* globals ENV */

require('./vendor/analytics')
require('./style.css')

const windowManager = require('./utils/window.js')
require('./utils/twitter.js')

if (ENV === 'debug') {
  require('./grid')
}

const { Drake, Map, Person, SoundManager } = require('./types')

const Helper = require('./utils/helper')
const constants = require('./constants')
const { max } = constants.person
const winModal = document.getElementById('winModal')

let drake
let persons
let personCount = 0

var game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  const personPath = require('../assets/person.png')
  const moneyPath = require('../assets/money.png')
  game.load.image('person', personPath)
  game.load.image('money', moneyPath)

  Map.init()
  drake = new Drake()
  persons = []
  // SoundManager.init()
}

function create () {
  windowManager.fadeIn()
  Map.create()
  game.paused = true
  // if (ENV !== 'debug') SoundManager.create()
}

function start () {
  initPersons()
  drake.create()
  game.paused = false
}

function update () {
  Map.update()
  // SoundManager.update()
  drake.update()
  const drakeTile = drake.getTile()
  if (personCount === max && Map.isInHouse(drake.sprite.x, drake.sprite.y)) {
    showWinMessage()
  }
  persons.forEach(person => {
    person.update()
    if (drake.isMoving() && person.active && person.isOnTile(drakeTile)) {
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

function showWinMessage () {
  document.getElementById('winModal').style.display = 'block'
}

// show starting modal
require('./views/startModal')(start)
