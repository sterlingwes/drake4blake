module.exports = {
  drake: {
    speed: 6,
    frameRate: 5,
    width: 100,
    height: 120,
    scale: 1
  },
  person: {
    speed: 6,
    max: 1,
    size: 32
  },
  map: {
    width: 30,
    height: 25,
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
  tweets: [
    'Help @Drake support Blake Boultbee Youth Outreach Services',
    '@Drake - how many people can you get to Blake Boultbee Youth Outreach',
    '@Drake for Blake: a fun game supporting Toronto’s Blake Boultbee Youth Outreach Services'
  ]
}