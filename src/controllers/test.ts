import { Router } from 'express'

const TestController = (router: Router) => {
  router.get('/test', (req, res) => {
    res.send('test')
  })
  router.get('/test2', (req, res) => {
    res.send('test2')
  })
}

export default TestController
