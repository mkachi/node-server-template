import { Container } from 'typedi'
import { DAO } from './utils/orm'
import daoLoader from './loaders/daoLoader'
import logger from './utils/logger'
import scheduleLoader from './loaders/scheduleLoader'

scheduleLoader().then(() => {
  logger.debug('Wait...')
})
