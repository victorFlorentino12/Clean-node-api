import { SingUpController } from './signup'
import type { httpRequest, httpResponse } from '../protocols/http'
import { ErrorMissingParam } from '../error/error-missing-params'

const makerSut = (): SingUpController => {
  return new SingUpController()
}
describe('SignUp Controller', () => {
  test('Shold return 400 if no name is provided', () => {
    const sut = makerSut()
    const httpRequest: httpRequest = {
      body: {
        email: 'florentino@email.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('name'))
  })
  test('shold return 400 if no email is provided', () => {
    const sut = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('email'))
  })
  test('Shold returm 400 if no password is provide', () => {
    const sut = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: '12345@fdew',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('password'))
  })
  test('Shold return 400 if no passwordConfimation in provide', () => {
    const sut = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: '12345@fdew',
        password: '12345'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('passwordConfirmation'))
  })
})
