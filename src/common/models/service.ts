export interface IService {
  execute(): string
  failed(message: string): string
}
