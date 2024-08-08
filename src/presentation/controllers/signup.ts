import type { httpRequest, httpResponse } from '../protocols/http'
import { ErrorMissingParam } from '../error/error-missing-params'
import { badRequest } from '../helpers/http-helper'
export class SingUpController {
  hundle (_httpRequest: httpRequest): httpResponse {
    if (!_httpRequest.body.name) {
      return badRequest(new ErrorMissingParam('name'))
    }
    if (!_httpRequest.body.email) {
      return badRequest(new ErrorMissingParam('email'))
    }
    return badRequest(new ErrorMissingParam('erro'))
  }
}
