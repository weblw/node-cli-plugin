const { merge } = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const proConfig = require('./webpack.prod.js')

function appConfig (path) {
  return {}
}

module.exports = function (path) {
  return type => {
    if (type === 'start') {
      return merge(appConfig(path), devConfig(path))
    } else {
      return merge(appConfig(path), proConfig(path))
    }
  }
}
