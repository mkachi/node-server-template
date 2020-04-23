import config from '../configs'
import { Container } from 'typedi'
import Logger from '../utils/logger'
import fs from 'fs'
import util from 'util'
import { DAO } from '../utils/orm'

const readdir = util.promisify(fs.readdir)

export default async () => {
  try {
    const paths: string[] = config.models.dao
    for (let i = 0; i < paths.length; ++i) {
      const files: string[] = await readdir(paths[i])
      for (let j = 0; j < files.length; ++j) {
        const modulePath = paths[i] + '/' + files[j].replace('.ts', '')
        const dao: DAO = require(modulePath).default
        Container.set(dao.tableName, dao)
      }
    }
    Logger.info('✔️ DAO load success')
  } catch (except) {
    Logger.error('❌ DAO load failed - ', except)
  }
}
