import dependencyLoader from './dependency'
import moduleLoader from './module'
import express, { Router } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import logger from '../utils/logger'

export default async (server: express.Express) => {
  try {
    await dependencyLoader()

    const router = Router()
    await moduleLoader(router)

    const morganStream = {
      write: (text: string) => {
        logger.route(text.replace('\n', ''))
      }
    }

    server.use(morgan('combined', { stream: morganStream }))
    server.use(router)
    server.use(cors())

    logger.info('✔️  Load success')
  } catch (except) {
    logger.error('❌  Load failed - ', except)
  }
}
