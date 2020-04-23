import { Container } from 'typedi'
import { DAO } from './utils/orm'
import daoLoader from './loaders/daoLoader'
import logger from './utils/logger'

daoLoader().then(() => {
  const info: DAO = Container.get('info')
  info.findOne({ where: { id: 1 } }).then(result => {
    logger.debug(result.value)
  })
})
