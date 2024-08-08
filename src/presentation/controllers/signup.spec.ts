import { SingUpController } from './signup'
import type { httpRequest, httpResponse } from '../protocols/http'

describe('SignUp Controller', () => {
  test('Shold return 400 if no name is provided', () => {
    const sut = new SingUpController()
    const httpRequest: httpRequest = {
      body: {
        email: 'florentino@email.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
describe('singUp Controller', () => {
  test('shold return 400 if no email is provided', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        name: 'florentino',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
