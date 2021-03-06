module.exports = {
  stats: {
    topOffsetPx: 30
  },
  drake: {
    speed: 6,
    frameRate: 5,
    width: 100,
    height: 120,
    scale: 1
  },
  person: {
    speed: 32,
    max: 10,
    size: 32,
    debounceMilli: 100
  },
  map: {
    width: 30,
    height: 25,
    widthPx: 960,
    heightPx: 800,
    tileSize: 32,
    borderAllowance: 20,
    fontPadding: 6,
    fontSize: 16,
    streets: [
      { text: 'BBYOS', location: [13, 9], x: 12, fontSize: 14 },
      { text: 'DANFORTH AVE', location: [2, 3] },
      { text: 'GERRARD ST E', location: [8, 12] },
      { text: 'DUNDAS ST E', location: [14, 15] },
      { text: 'QUEEN ST E', location: [20, 18] },
      { text: 'LAKE SHORE BLVD E', location: [6, 23] },
      { text: 'DON VALLEY PARKWAY', location: [2, 8], vertical: true },
      { text: 'BROADVIEW AVE', location: [5, 10], vertical: true },
      { text: 'DEGRASSI ST', location: [7, 15], y: 4, vertical: true },
      { text: 'CARLAW AVE', location: [10, 16], vertical: true },
      { text: 'PAPE AVE', location: [12, 5], vertical: true },
      { text: 'JONES AVE', location: [16, 10], vertical: true },
      { text: 'GREENWOOD AVE', location: [21, 6], vertical: true },
      { text: 'COXWELL AVE', location: [26, 8], vertical: true },
      { text: 'WOODBINE AVE', location: [29, 10], vertical: true }
    ]
  },
  mobile: {
    map: {
      height: 18,
      heightPx: 576,
      streets: [
        { text: 'BBYOS', location: [13, 7], x: 12, fontSize: 14 },
        { text: 'DANFORTH AVE', location: [2, 3] },
        { text: 'GERRARD ST E', location: [8, 8] },
        { text: 'DUNDAS ST E', location: [14, 10] },
        { text: 'QUEEN ST E', location: [20, 18] },
        { text: 'LAKE SHORE BLVD E', location: [6, 16] },
        { text: 'DON VALLEY PARKWAY', location: [2, 5], vertical: true },
        { text: 'BROADVIEW AVE', location: [5, 8], vertical: true },
        { text: 'DEGRASSI ST', location: [7, 10], y: 4, vertical: true },
        { text: 'CARLAW AVE', location: [10, 11], vertical: true },
        { text: 'PAPE AVE', location: [12, 4], vertical: true },
        { text: 'JONES AVE', location: [16, 13], vertical: true },
        { text: 'GREENWOOD AVE', location: [21, 6], vertical: true },
        { text: 'COXWELL AVE', location: [26, 8], vertical: true },
        { text: 'WOODBINE AVE', location: [29, 10], vertical: true }
      ]
    }
  },
  tweets: [
    'Help @Drake get people to Blake Boultbee Youth Outreach Services',
    '.@Drake for Blake: how many people can you get to Blake Boultbee Youth Outreach Services',
    '.@Drake for Blake: a fun game supporting Toronto’s Blake Boultbee Youth Outreach Services'
  ]
}