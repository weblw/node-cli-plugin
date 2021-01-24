const fs = require('fs')
const merge = require('webpack-merge')

function configMerge(pconf, config) {
  const {
    dev = Object.create(null),
    pro = Object.create(null),
    base = Object.create(null)
  } = pconf
  if (this.type === 'start') {
    return merge(config, base, dev)
  } else {
    return merge(config, base, pro)
  }
}

function mergeConfig(config) {
  const targetPath = this.path + '/mycli.config.js'
  const isExi = fs.existsSync(targetPath)
  if (isExi) {
    // 获取开发者自定义配置
    const perconfig = require(targetPath)
    const mergeConfigResult = configMerge.call(this, perconfig, config)
    return mergeConfigResult
  }
  return config
}

module.exports = mergeConfig
