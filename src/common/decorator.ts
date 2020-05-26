import 'reflect-metadata'
import { IRouteInfo } from './models/routeInfo'

export enum RestType {
  CONNECT = 'connect',
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  OPTIONS = 'options',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
  TRACE = 'trace'
}

export const Controller = (routePath: string = '', routeType: RestType = RestType.GET): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata('__routePath', routePath, target)
    if (!Reflect.hasMetadata('__routers', target)) {
      Reflect.defineMetadata('__routers', [], target)
    }
  }
}

export const RestRoute = (routePath: string, routeType: RestType = RestType.GET): MethodDecorator => {
  return (target: any, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata('__routers', target.constructor)) {
      Reflect.defineMetadata('__routers', [], target.constructor)
    }

    const routers = Reflect.getMetadata('__routers', target.constructor) as IRouteInfo[]
    routers.push({
      routePath: routePath,
      routeType: routeType,
      routeFunc: propertyKey
    })
    Reflect.defineMetadata('__routers', routers, target.constructor)
  }
}
