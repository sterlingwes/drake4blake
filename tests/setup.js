global.ENV = 'test'

class XY {
  constructor () {
    this.scale = {
      setTo () {}
    }
  }
}

global.game = {
  add: {
    sprite (w, h, name) {
      return new XY()
    }
  }
}
