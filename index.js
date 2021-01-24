const RunningWebpack = require('./lib/run.js')

const runner = new RunningWebpack()

process.on('message', message => {
  const msg = JSON.parse(message)
  if (msg.type && msg.cwdPath) {
    runner.listen(msg).then(() => {
      process.send(JSON.stringify({ type: 'end' }))
    }, error => {
      process.send(JSON.stringify({ type: 'error', error }))
    })
  }
})
