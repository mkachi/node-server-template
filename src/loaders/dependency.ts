import config from '../configs'
import loader from '../utils/loader'
import { Container } from 'typedi'
import { DAO } from 'src/utils/orm'
import { Router } from 'express'

const dependencyLoader = async () => {
  await loader('DAO', config.models.dao, (dao: DAO) => Container.set(dao.tableName, dao))
  // await loader('Service', config.models.service)
}

export default dependencyLoader
