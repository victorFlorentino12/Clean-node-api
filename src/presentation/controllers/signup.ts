import type { httpRequest, httpResponse } from '../protocols/http'
export class SingUpController {
  hundle (_httpRequest: httpRequest): httpResponse {
    if (!_httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!_httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
    return {
      statusCode: 400,
      body: 'Erro'
    }
  }
}
