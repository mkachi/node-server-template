import { Dialect } from 'sequelize/types'

export interface IConfig {
  timezone: string
  logs: {
    dir: string
    keep: string
  }
  server: {
    port: number
    controller: string[]
  }
  models: {
    dao?: string[]
    schedule?: string[]
  }
  database: {
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
