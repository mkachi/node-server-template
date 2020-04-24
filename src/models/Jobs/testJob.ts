import schedule from 'node-schedule'
import Logger from '../../utils/logger'

const job = schedule.scheduleJob('50 * * * * *', () => {
  Logger.debug('50초 입니다!')
})

export default job
