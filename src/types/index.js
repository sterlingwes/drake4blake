module.exports = [
  'Drake',
  'Map',
  'Person',
  'SoundManager'
].reduce((m, type) => {
  m[type] = require(`./${type}`)
  return m
}, {})
