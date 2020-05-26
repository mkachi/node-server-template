import config from './configs'
import logger from './common/utils/logger'
import express from 'express'
import loader from './common/loaders'

const server = express()

loader(server)
  .then(() => {
    server.use((req, res, next) => {
      const error = new Error('Not Found')
      error['status'] = 404
      next(error)
    })

    server.use((err, req, res, next) => {
      const code = err.status || 500
      res.status(code)
      logger.error(err.message)
      res.json({
        type: 'error',
        header: `${code}`,
        value: err.message
      })
    })

    server.listen(config.server.port, err => {
      if (err) {
        logger.error(err)
        process.exit(1)
        return
      }
      logger.info(`✔️  Server start on ${config.server.port}`)
    })
  })
  .catch(except => logger.error('❌  Server start failed - ', except))
