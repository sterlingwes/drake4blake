/* globals describe, before, it */

const mock = require('mock-require')
const expect = require('expect.js')
const sinon = require('sinon')

const MapMock = {
  getTile (x, y) {
    if (x === 1 && y === 0) return new Tile(1, 0)
  },
  getRandomTile () {},
  getTileFromPixels (x, y) {
    if (x < 32) return new Tile(0, 0)
    if (x === 36) return new Tile(1, 0)
  }
}

function Tile (x, y) {
  this.x = x
  this.y = y
  this.worldX = x * 32
  this.worldY = y * 32
  this.layer = { name: 'Roads' }
}

describe('Person', function () {
  before(() => {
    mock('../src/Map', MapMock)
    this.Person = require('../src/Person')
    MapMock.getRandomTile = sinon.stub().returns(new Tile(0, 0)) // starting spot
  })

  it('should instantiate', () => {
    const p = new this.Person()
    expect(p).to.be.an('object')
  })

  it('should setPosition on create()', () => {
    const p = new this.Person()
    p.create()
    expect(p.sprite.x).to.be(0)
    expect(p.sprite.y).to.be(0)
  })

  it('should follow the road', () => {
    const p = new this.Person()
    p.create()
    p.update()
    expect(p.direction).to.be('right')
    expect(p.sprite.x).to.be(6)
    expect(p.sprite.y).to.be(0)
  })

  it('should continue to travel the road, finding new tiles', () => {
    const p = new this.Person()
    p.create()
    p.update()
    p.update()
    expect(p.direction).to.be('right')
    expect(p.sprite.x).to.be(12)
    expect(p.sprite.y).to.be(0)
    p.update() // x = 18
    p.update() // 24
    p.update() // 30
    expect(p.tile.x).to.be(0)
    expect(p.tile.y).to.be(0)
    p.update() // 36
    expect(p.tile.x).to.be(1)
    expect(p.tile.y).to.be(0)
  })

  it('should be able to go down', () => {
    
  })
})
