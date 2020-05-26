import config from '../../configs'
import loader from '../utils/loader'
import { Router } from 'express'
import { IRouteInfo } from '../models/routeInfo'

const createControllerRouter = (ControllerType: any) => {
  const router = Router()
  const instance = new ControllerType()

  const ctrlPath = Reflect.getMetadata('__routePath', ControllerType)
  const routerInfos = Reflect.getMetadata('__routers', ControllerType) as IRouteInfo[]
  routerInfos.forEach((value: IRouteInfo) => {
    const routePath = ctrlPath + value.routePath

    router[value.routeType](routePath, (req, res) => {
      instance[value.routeFunc](req, res)
    })
  })
  return router
}

const moduleLoader = async (router: Router) => {
  await loader('Schedule', config.models.schedule)
  await loader('Controller', config.models.controller, ControllerType => {
    router.use(createControllerRouter(ControllerType))
  })
}

export default moduleLoader
