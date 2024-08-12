export class PasswordDifferentError extends Error {
  constructor () {
    super('the passwords are diffetent')
    this.name = 'PasswordDifferentError'
  }
}
