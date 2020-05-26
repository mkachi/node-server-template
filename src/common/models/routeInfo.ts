import { RestType } from '../decorator'

export interface IRouteInfo {
  routeType: RestType
  routePath: string
  routeFunc: any
}
