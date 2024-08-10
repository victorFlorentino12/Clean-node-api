import type { httpResponse } from '../protocols/http'
import { ServerError } from '../error/server-error'

export const badRequest = (error: Error): httpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const serverError = (): httpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
