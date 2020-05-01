import dependencyLoader from './dependency'
import moduleLoader from './module'
import express, { Router } from 'express'
import cors from 'cors'
import logger from '../utils/logger'

export default async (server: express.Express) => {
  try {
    await dependencyLoader()

    const router = Router()
    await moduleLoader(router)

    server.use(router)
    server.use(cors())

    logger.info('✔️  Load success')
  } catch (except) {
    logger.error('❌  Load failed - ', except)
  }
}
