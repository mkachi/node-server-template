import path from 'path'
import { IConfig } from '../utils/interface'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, './database.env') })

const config: IConfig = {
  timezone: 'Asia/Seoul',
  logs: {
    dir: 'logs',
    keep: '14d',
  },
  models: {
    schedule: [ path.resolve(__dirname, '../models/schedules') ],
    dao: [ path.resolve(__dirname, '../models/DAO/') ],
  },
  server: {
    port: 3000,
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
