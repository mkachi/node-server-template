import path from 'path'
import { IConfig } from '../utils/interface'

const config: IConfig = {
  timezone: 'Asia/Seoul',
  logs: {
    path: 'logs',
    keep: '14d',
  },
  server: {
    port: 3000,
  },
  models: {
    schedule: [ path.resolve(__dirname, '../models/schedules') ],
    dao: [ path.resolve(__dirname, '../models/DAO') ],
    controller: [ path.resolve(__dirname, '../controllers') ],
  },
  database: {
    type: 'postgres',
    host: process.env.host,
    port: Number(process.env.port),
    username: process.env.user,
    password: process.env.password,
    database: process.env.database,
    timestamp: {
      createAt: 'createat',
      updateAt: 'updateat',
    },
  },
}

export default config
