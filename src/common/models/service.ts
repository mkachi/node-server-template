export interface IService {
  execute(svo: any): string
  failed(message: string): string
}
