import type { AddAccount } from '../../domain/usercase/add-account'
import { ErrorMissingParam, ErrorInvalidParam, PasswordDifferentError } from '../error/index'
import { badRequest, serverError } from '../helpers/http-helper'
import type { Controller, EmailValidator, httpRequest, httpResponse } from '../protocols/index'

export class SingUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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
      const { name, email, password, passwordConfirmation } = _httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new PasswordDifferentError())
      }
      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
    return serverError()
  }
}
