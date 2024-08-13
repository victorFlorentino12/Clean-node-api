import { SingUpController } from './signup'
import type { httpRequest, httpResponse } from '../protocols/http'
import type { EmailValidator } from '../protocols/email-validator'
import { ErrorInvalidParam, ErrorMissingParam, PasswordDifferentError, ServerError } from '../error/index'

interface MockTypes {
  sut: SingUpController
  emailValidatorStub: EmailValidator
}
const makerEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
const makerEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (_email: string): boolean {
      throw new Error()
    }
  }
  return new EmailValidatorStub()
}

const makerSut = (): MockTypes => {
  const emailValidatorStub = makerEmailValidator()
  const sut = new SingUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUp Controller', () => {
  test('Shold return 400 if no name is provided', () => {
    const { sut } = makerSut()
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
    const { sut } = makerSut()
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
    const { sut } = makerSut()
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
    const { sut } = makerSut()
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
  test('Shold return 400 if invalid email provide', () => {
    const { sut, emailValidatorStub } = makerSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValue(false)
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'invalid_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorInvalidParam('email'))
  })
  test('Shold return 400 if invalid email provide', () => {
    const { sut, emailValidatorStub } = makerSut()
    const spyRequest = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    sut.hundle(httpRequest)
    expect(spyRequest).toHaveBeenCalledWith('any_12345@fdew.com')
  })
  test('Shold return 500 if emailValidator return throw', () => {
    const emailValidatorStub = makerEmailValidatorWithError()
    const sut = new SingUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Shold return 400 if password is diferent the passwordConfirme', () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345_different'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new PasswordDifferentError())
  })
})
