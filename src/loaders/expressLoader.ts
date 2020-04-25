import express, { Router } from 'express'
import cors from 'cors'
import Logger from '../utils/logger'

export default async (router: Router) => {
  try {
    const server = express()
    server.use(cors())

    server.use(router)

    server.get('/status', (req, res) => {
      res.status(200).end()
    })
    server.head('/status', (req, res) => {
      res.status(200).end()
    })

    server.use((req, res, next) => {
      const error = new Error('Not Found')
      error['status'] = 404
      next(error)
    })

    server.use((error, req, res, next) => {
      const code = error.status || 500
      res.status(code)
      Logger.warn(error.message)
      res.json({
        type: 'error',
        header: `${code}`,
        value: error.message,
      })
    })
    Logger.info('✔️  Express load success')
    return server
  } catch (except) {
    Logger.error('❌  Express load failed - ', except)
  }
  return null
}
