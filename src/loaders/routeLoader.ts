import config from '../configs'
import Logger from '../utils/logger'
import fs from 'fs'
import util from 'util'

const readdir = util.promisify(fs.readdir)

export default async () => {
  try {
    const paths: string[] = config.server.router
    if (paths === null || paths === undefined) {
      return
    }
    for (let i = 0; i < paths.length; ++i) {
      const files: string[] = await readdir(paths[i])
      for (let j = 0; j < files.length; ++j) {
        const modulePath = paths[i] + '/' + files[j].replace('.ts', '')
        require(modulePath)
      }
    }

    Logger.info('✔️  Route load success')
  } catch (except) {
    Logger.error('❌  Route load failed - ', except)
  }
}
