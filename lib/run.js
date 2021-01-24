const EventEmmitter = require('events').EventEmitter
const Server = require('webpack-dev-server/lib/Server')
const processOptions = require('webpack-dev-server/lib/utils/processOptions')
const yargs = require('yargs')

const merge = require('./merge')
const webpack = require('webpack')
const runMergeGetConfig = require('../config/webpack.base')

class RunningWebpack extends EventEmmitter {
  constructor(options) {
    super()
    this._options = options
    this.path = null
    this.config = null
    this.on('running', (type, ...arg) => {
      this[type] && this[type](...arg)
    })
  }
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
  build () {
    try {
      webpack(this.config, err => {
        if (err) {
          this.emit('error')
        } else {
          this.emit('end')
        }          
      })
    } catch(e) {
      this.emit('error')
    }
  }
  start () {
    const _this = this
    processOptions(this.config, yargs.argv, (config, options) => {
      const compiler = webpack(config)
      const server = new Server(compiler, options)
      server.listen(options.port || 3000, options.host || '127.0.0.1', err => {
        if (err) {
          _this.emit('error')
          throw err
        }
      })
    })
  }
}

module.exports = RunningWebpack
