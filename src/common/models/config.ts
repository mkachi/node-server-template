import { Dialect } from 'sequelize/types'

export interface IConfig {
  timezone?: string
  logs: {
    path: string
    keep?: string
  }
  server: {
    port: number
  }
  models?: {
    schedule?: string[]
    dao?: string[]
    controller?: string[]
    service?: string[]
  }
  database?: {
    host: string
    port: number
    type: Dialect
    username: string
    password: string
    database: string
    timestamp: {
      createAt: string
      updateAt: string
    }
  }
}
