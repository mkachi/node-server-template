import express from 'express'
import cors from 'cors'
import config from '../configs'

const server = express()

export default async () => {
  try {
    server.use(cors())

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
      res.json({
        type: 'error',
        header: `${code}`,
        value: error.message,
      })
    })
    Logger.info('✔️  Express load success')
  } catch (except) {
    Logger.error('❌  Express load failed - ', except)
  }
}
