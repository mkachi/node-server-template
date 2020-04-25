import loader from './loaders'
import config from './configs'
import Logger from './utils/logger'
import { Router } from 'express'

loader()
  .then((server) => {
    if (server === null || server === undefined) {
      return
    }

    server.listen(config.server.port, (error) => {
      if (error) {
        Logger.error(error)
        process.exit(1)
        return
      }
      Logger.info(`Server start on ${config.server.port}`)
    })
  })
  .catch((except) => {
    Logger.error('Server start failed - ', except)
  })
