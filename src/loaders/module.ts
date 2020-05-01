import config from '../configs'
import loader from '../utils/loader'
import { Router } from 'express'

const moduleLoader = async (router: Router) => {
  await loader('Schedule', config.models.schedule)
  await loader('Service', config.models.controller, (controller) => controller(router))
}

export default moduleLoader
