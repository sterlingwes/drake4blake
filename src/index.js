/* globals ENV */

require('./vendor/analytics')
require('./style.css')

const windowManager = require('./views/window.js')
require('./views/twitter.js')

if (ENV === 'debug') {
  require('./grid')
}

const { Drake, Map, Person, SoundManager, Stats } = require('./types')
const constants = require('./constants')
const { max } = constants.person

let drake
let persons

const game = window.game = new Phaser.Game(960, 800, Phaser.AUTO, 'app', {
  preload: preload,
  create: create,
  update: update
})

function preload () {
  const personPath = require('../assets/person.png')
  const moneyPath = require('../assets/money.png')
  const timerIcon = require('../assets/timer.png')

  game.load.onLoadComplete.add(function () {
    // show starting modal
    require('./views/startModal')(start)
  })
  
  game.load.image('person', personPath)
  game.load.image('money', moneyPath)
  game.load.image('timer', timerIcon)


  Map.init()
  drake = new Drake()
  persons = []
  SoundManager.init()
}

function create () {
  windowManager.fadeIn()
  Map.create()
  game.paused = true
  SoundManager.create()
}

function start () {
  initPersons()
  Stats.create()
  drake.create()
  game.paused = false
}

function update () {
  if (Stats.gameOver()) return

  Map.update()
  Stats.update()
  drake.update()
  const drakeTile = drake.getTile()
  if (Stats.hasFinished() && Map.isInHouse(drake.sprite.x, drake.sprite.y)) {
    Stats.stopTimer()
    SoundManager.drakeSay('yeahyuh')
    showWinMessage()
  }
  persons.forEach(person => {
    person.update()
    if (drake.isMoving() && person.active && person.isOnTile(drakeTile)) {
      person.remove()
      Stats.addPerson()
      SoundManager.drakeSay()
    }
  })
}

function initPersons() {
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
  const time = Stats.getTime()
  document.getElementById('winResult').innerHTML = `You got everyone to Blake Boultbee in <b>${time} seconds</b>!`
  document.getElementById('winModal').style.display = 'block'
}
