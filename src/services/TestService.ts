import { Service } from 'typedi'
import { IService } from '../common/models/service'

@Service('TestService')
class TestService implements IService {
  private value: number = 0

  execute(): string {
    try {
      this.value += 1
      if (this.value % 2 === 0) {
        throw 'test throw'
      }
      return ''
    } catch (except) {
      return this.failed(except)
    }
  }
  failed(message: string): string {
    return 'failed : ' + message
  }
}

export default TestService
