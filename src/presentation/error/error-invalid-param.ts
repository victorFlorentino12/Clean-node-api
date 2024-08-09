export class ErrorInvalidParam extends Error {
  constructor (invalidParam: string) {
    super(`Invalid param: ${invalidParam}`)
    this.name = 'ErrorInvalidParam'
  }
}
