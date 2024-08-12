import { ErrorMissingParam, ErrorInvalidParam, PasswordDifferentError } from '../error/index'
import { badRequest, serverError } from '../helpers/http-helper'
import type { Controller, EmailValidator, httpRequest, httpResponse } from '../protocols/index'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  hundle (_httpRequest: httpRequest): httpResponse {
    try {
      const params = ['name', 'email', 'password', 'passwordConfirmation']
      for (const value of params) {
        if (!_httpRequest.body[value]) {
          return badRequest(new ErrorMissingParam(value))
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const isValid = this.emailValidator.isValid(_httpRequest.body.email)
      if (!isValid) {
        return badRequest(new ErrorInvalidParam('email'))
      }
      if (_httpRequest.body.password !== _httpRequest.body.passwordConfirmation) {
        return badRequest(new PasswordDifferentError())
      }
    } catch (error) {
      return serverError()
    }
    return serverError()
  }
}
