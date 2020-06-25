import { Request, Response } from 'express'
import { RestRoute, Controller, RestType } from '../common/decorator'
import { IService } from '../common/models/service'
import { Container } from 'typedi'
import TestService from '../services/TestService'

@Controller('/test')
class TestController {
  private testService: IService = Container.get(TestService)

  @RestRoute('/')
  public index(req: Request, res: Response) {
    res.send(this.testService.execute(undefined))
  }

  @RestRoute('/value2', RestType.PUT)
  public value2(req: Request, res: Response) {
    res.send(this.testService.failed('error'))
  }
}

export default TestController
