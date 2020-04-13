import { Container } from 'typedi'
import Logger from '../utils/logger'

export default () => {
  try {
    Container.set('logger', Logger)
  } catch (except) {
    Logger.error('Dependency load failed', except)
  }
}
