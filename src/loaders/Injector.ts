import { Container } from 'typedi'
import Logger from '../utils/logger'

export default () => {
  try {
    Container.set('logger', Logger)
    Logger.info('✔️ Dependency Injector loaded')
  } catch (except) {
    Logger.error('❌ Dependency Injector load failed', except)
  }
}
