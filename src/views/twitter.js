const Helper = require('../utils/helper')
const { tweets } = require('../constants')

function generateTweets() {
  const tweetText = encodeURI(`${tweets[Helper.getRandomIntInclusive(0, tweets.length - 1)]}`)
  const els = [].slice.call(document.querySelectorAll('.twitter-share-button'), 0)
  els.forEach(a => {
    a.href = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=toronto,BBYOS`
  })
}

generateTweets()

const script = document.createElement('script')
script.src = '//platform.twitter.com/widgets.js'
script.async = true

document.body.appendChild(script)