import path from 'path'
import devConfig from './development'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, './database.env') })

export default devConfig
