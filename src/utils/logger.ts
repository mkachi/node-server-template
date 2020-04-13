import fs from 'fs'

import winston, { LogCallback, info } from 'winston'
import winstonDaily from 'winston-daily-rotate-file'

import moment from 'moment'
import 'moment-timezone'

import config from '../configs'
import { format } from 'url'

const logDir = config.logs.dir

moment.tz.setDefault(config.timezone)
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const levelOptions = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    query: 4,
    route: 5,
    debug: 6,
  },
  colors: {
    error: 'bold white redBG',
    warn: 'yellow',
    info: 'white',
    http: 'green',
    query: 'cyan',
    route: 'green',
    debug: 'magenta',
  },
}

const getTimestamp = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS')

const transports = [
  new winstonDaily({
    level: 'debug',
    filename: `${logDir}/%DATE%.log`,
    handleExceptions: true,
    dirname: logDir,
    datePattern: 'YYYY-MM-DD',
    maxFiles: config.logs.keep,
    format: winston.format.printf((info) => `${getTimestamp()} [${info.level.toUpperCase()}] ${info.message}`),
  }),
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({
        message: true,
      }),
      winston.format.printf((info) => `${getTimestamp()} [${info.level.toUpperCase()}] ${info.message}`)
    ),
  }),
]
winston.addColors(levelOptions.colors)

const logger = winston.createLogger({
  levels: levelOptions.levels,
  transports: transports,
  exitOnError: false,
})

export default {
  error: logger.error,
  warn: logger.warn,
  info: logger.info,
  http: logger.http,
  query: (message: string) => logger.log('query', message),
  route: (message: string) => logger.log('route', message),
  debug: logger.debug,
}
