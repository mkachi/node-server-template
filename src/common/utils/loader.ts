import logger from './logger'
import fs from 'fs'
import util from 'util'

const readDir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)

const getFiles = async searchPath => {
  const result = []
  const searchFiles = async path => {
    const items = await readDir(path)
    for (let i = 0; i < items.length; ++i) {
      const subPath = path + '/' + items[i]
      const stats = await stat(subPath)
      if (stats.isDirectory()) {
        await searchFiles(subPath)
      } else {
        result.push(subPath)
      }
    }
  }
  await searchFiles(searchPath)
  return result
}

export default async (name: string, paths: string[], loaded = (module: any) => {}) => {
  try {
    if (paths === undefined || paths === null || paths.length <= 0) {
      return
    }

    for (let i = 0; i < paths.length; ++i) {
      const files: string[] = await getFiles(paths[i])
      for (let j = 0; j < files.length; ++j) {
        loaded(require(files[j]).default)
      }
    }
    logger.info(`✔️  ${name} load success`)
  } catch (except) {
    logger.error(`❌  ${name} load failed - `, except)
  }
}
