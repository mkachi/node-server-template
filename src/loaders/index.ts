import expressLoader from './expressLoader'
import scheduleLoader from './scheduleLoader'
import daoLoader from './daoLoader'
import routeLoader from './routeLoader'

import Logger from '../utils/logger'

export default async () => {
  try {
    await daoLoader()
    await scheduleLoader()
    await routeLoader()

    const server = await expressLoader()
    Logger.info('✔️  Load complete')
    return server
  } catch (except) {
    Logger.error('❌  Load failed - ', except)
  }
  return null
}
