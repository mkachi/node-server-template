import schedule from 'node-schedule'
import logger from '../../common/utils/logger'

const test = schedule.scheduleJob('50 * * * * *', () => {
  logger.debug('50초 입니다!')
})

export default test
