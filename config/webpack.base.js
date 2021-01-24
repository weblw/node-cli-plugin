const merge = require('webpack-merge')

module.exports = function (path) {
  return type => {
    if (type === 'start') {
      return merge(appConfig(path), devConfig(path))
    } else {
      return merge(appConfig(path), proConfig(path))
    }
  }
}
