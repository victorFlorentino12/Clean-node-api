export class ErrorMissingParam extends Error {
  constructor (nameParam: string) {
    super(`Missing param: ${nameParam}`)
    this.name = 'ErrorMissingParam'
  }
}
