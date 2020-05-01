import logger from '../utils/logger'
import fs from 'fs'
import util from 'util'

const readdir = util.promisify(fs.readdir)

export default async (name: string, paths: string[], loaded = (module: any) => {}) => {
  try {
    if (paths === undefined || paths === null || paths.length <= 0) {
      return
    }

    for (let i = 0; i < paths.length; ++i) {
      const files: string[] = await readdir(paths[i])
      for (let j = 0; j < files.length; ++j) {
        const modulePath = paths[i] + '/' + files[j]
        loaded(require(modulePath).default)
      }
    }
    logger.info(`✔️  ${name} load success`)
  } catch (except) {
    logger.error(`❌  ${name} load failed - `, except)
  }
}
