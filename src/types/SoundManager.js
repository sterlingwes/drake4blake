/* globals game */
const shuffle = require('lodash/shuffle')

const musicDrake = require('../../assets/music-drake-loop.mp3')
const voiceAlright = require('../../assets/voice-drake-alright.mp3')
const voiceYeah = require('../../assets/voice-drake-yeah.mp3')
const voiceUh = require('../../assets/voice-drake-uh.mp3')
const voiceYeahYuh = require('../../assets/voice-drake-yeahyuh.mp3')

const { topOffsetPx } = require('../constants').stats

class SoundManager {
  constructor () {}

  init () {
    game.load.audio('music', musicDrake)
    game.load.audio('voiceAlright', voiceAlright)
    game.load.audio('voiceYeah', voiceYeah)
    game.load.audio('voiceUh', voiceUh)
    game.load.audio('voiceYeahYuh', voiceYeahYuh)

    const volumeOnIcon = require('../../assets/volume-on.png')
    const volumeOffIcon = require('../../assets/volume-off.png')
    game.load.image('volumeOn', volumeOnIcon)
    game.load.image('volumeOff', volumeOffIcon)
  }

  create () {
    // setup bg music
    this.music = game.add.audio('music', 0.3)
    this.sounds = [this.music]
    game.sound.setDecodedCallback(this.sounds, this.start, this)
    
    // setup vocals
    this.drake = {}
    this.speakVocals = ['alright', 'yeah', 'uh']
    const vocalVolume = 0.6
    this.drake.alright = game.add.audio('voiceAlright', vocalVolume)
    this.drake.yeah = game.add.audio('voiceYeah', vocalVolume)
    this.drake.uh = game.add.audio('voiceUh', vocalVolume)
    this.drake.yeahyuh = game.add.audio('voiceYeahYuh', vocalVolume)

    // add mute toggle
    this.volumeIcon = game.add.image(game.width - 150, topOffsetPx - 2, 'volumeOn')
    this.volumeIcon.scale.setTo(0.8)
    this.volumeIcon.inputEnabled = true
    this.volumeIcon.events.onInputDown.add(this.toggleMute, this)
  }

  start () {
    this.music.loopFull()
  }

  drakeSay (phraseOverride) {
    const phrase = phraseOverride || shuffle(this.speakVocals).shift()
    this.drake[phrase].play()
  }

  toggleMute () {
    game.sound.mute = !game.sound.mute
    if (game.sound.mute) this.volumeIcon.loadTexture('volumeOff')
    else this.volumeIcon.loadTexture('volumeOn')
  }
}

module.exports = new SoundManager()
