import expressLoader from './expressLoader'
import scheduleLoader from './scheduleLoader'
import daoLoader from './daoLoader'
import controller from './controllerLoader'

import Logger from '../utils/logger'

export default async () => {
  try {
    await daoLoader()
    await scheduleLoader()
    const router = await controller()
    const server = await expressLoader(router)
    Logger.info('✔️  Load complete')
    return server
  } catch (except) {
    Logger.error('❌  Load failed - ', except)
  }
  return null
}
