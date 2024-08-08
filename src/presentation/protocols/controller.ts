import type { httpResponse, httpRequest } from './http'

export interface Controller {
  hundle: ((_httpRequest: httpRequest) => httpResponse)
}
