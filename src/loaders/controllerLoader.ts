import config from '../configs'
import Logger from '../utils/logger'
import fs from 'fs'
import util from 'util'
import { Router } from 'express'

const readdir = util.promisify(fs.readdir)

export default async () => {
  try {
    const paths: string[] = config.server.controller
    if (paths === null || paths === undefined) {
      return
    }

    const router = Router()
    for (let i = 0; i < paths.length; ++i) {
      const files: string[] = await readdir(paths[i])
      for (let j = 0; j < files.length; ++j) {
        const modulePath = paths[i] + '/' + files[j].replace('.ts', '')
        const controller = require(modulePath).default
        controller(router)
      }
    }
    Logger.info('✔️  Controller load success')

    return router
  } catch (except) {
    Logger.error('❌  Controller load failed - ', except)
  }
}
