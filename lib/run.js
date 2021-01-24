const merge = require('./merge')
const webpack = require('webpack')
const runMergeGetConfig = require('../config/webpack.base')

export default class RunningWebpack {
  listen({ type, cwdPath }) {
    this.path = cwdPath
    this.type = type
    this.config = merge.call(this, runMergeGetConfig(cwdPath)(type))
    return new Promise((resolve, reject) => {
      this.emit('running', type)
      this.once('error', reject)
      this.once('end', resolve)
    })
  }
}
