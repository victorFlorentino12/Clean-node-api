import type { httpRequest, httpResponse } from '../protocols/http'
import { ErrorMissingParam } from '../error/error-missing-params'
import { badRequest } from '../helpers/http-helper'
import type { Controller } from '../protocols/controller'
import type { EmailValidator } from '../protocols/email-validator'
import { ErrorInvalidParam } from '../error/error-invalid-param'
import { ServerError } from '../error/server-error'
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
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }
}
