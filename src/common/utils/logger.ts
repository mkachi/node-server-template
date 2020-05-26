import fs from 'fs'

import winston from 'winston'
import winstonDaily from 'winston-daily-rotate-file'

import moment from 'moment'
import 'moment-timezone'

import config from '../../configs'

const logPath = config.logs.path

moment.tz.setDefault(config.timezone)
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath)
}

const levelOptions = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    query: 4,
    route: 5,
    debug: 6
  },
  colors: {
    error: 'bold white redBG',
    warn: 'yellow',
    info: 'white',
    http: 'green',
    query: 'cyan',
    route: 'green',
    debug: 'magenta'
  }
}

const getTimestamp = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS')

const transports = [
  new winstonDaily({
    level: 'debug',
    filename: `${logPath}/%DATE%.log`,
    handleExceptions: true,
    dirname: logPath,
    datePattern: 'YYYY-MM-DD',
    maxFiles: config.logs.keep,
    format: winston.format.printf(info => `${getTimestamp()} [${info.level.toUpperCase()}] ${info.message}`)
  }),
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({
        message: true
      }),
      winston.format.printf(info => `${getTimestamp()} [${info.level.toUpperCase()}] ${info.message}`)
    )
  })
]
winston.addColors(levelOptions.colors)

const logger = winston.createLogger({
  levels: levelOptions.levels,
  transports: transports,
  exitOnError: false
})

export default {
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  http: logger.http.bind(logger),
  query: (message: string) => logger.log('query', message),
  route: (message: string) => logger.log('route', message),
  debug: logger.debug.bind(logger)
}
