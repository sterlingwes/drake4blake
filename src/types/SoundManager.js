/* globals game */
const Helper = require('../utils/helper')

const musicDrake = require('../../assets/music-drake.mp3')
const musicSynth = require('../../assets/music-synth.mp3')

class SoundManager {
  constructor () {

  }

  init () {
    game.load.audio('music', musicDrake);
  }

  create () {
    this.music = game.add.audio('music')
    this.sounds = [this.music]
    game.sound.setDecodedCallback(this.sounds, this.start, this)
  }

  start () {
    this.music.loopFull(0.3)
  }

  update () {

  }
}

module.exports = new SoundManager()
