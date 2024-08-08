import type { httpRequest, httpResponse } from '../protocols/http'
import { ErrorMissingParam } from '../error/error-missing-params'
import { badRequest } from '../helpers/http-helper'
export class SingUpController {
  hundle (_httpRequest: httpRequest): httpResponse {
    const params = ['name', 'email', 'password', 'passwordConfirmation']
    for (const value of params) {
      if (!_httpRequest.body[value]) {
        return badRequest(new ErrorMissingParam(value))
      }
    }
    return badRequest(new ErrorMissingParam('erro'))
  }
}
