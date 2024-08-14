import { SingUpController } from './signup'
import type { httpRequest, httpResponse, EmailValidator } from './singup-protocols'
import { ErrorInvalidParam, ErrorMissingParam, PasswordDifferentError, ServerError } from '../../error/index'
import type { AddAccount, AddAccountModel } from '../../../domain/usercase/add-account'
import type { AccountModel } from '../../../domain/model/account-model'
interface MockTypes {
  sut: SingUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
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
const makerAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (_account: AddAccountModel): Promise<AccountModel> {
      const accountFake = {
        id: 'id_valid',
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password'
      }
      return await new Promise(resolve => { resolve(accountFake) })
    }
  }
  return new AddAccountStub()
}
const makerSut = (): MockTypes => {
  const addAccountStub = makerAddAccount()
  const emailValidatorStub = makerEmailValidator()
  const sut = new SingUpController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('Shold return 400 if no name is provided', async () => {
    const { sut } = makerSut()
    const httpRequest: httpRequest = {
      body: {
        email: 'florentino@email.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('name'))
  })
  test('shold return 400 if no email is provided', async () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse: httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('email'))
  })
  test('Shold returm 400 if no password is provide', async () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: '12345@fdew',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('password'))
  })
  test('Shold return 400 if no passwordConfimation in provide', async () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: '12345@fdew',
        password: '12345'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorMissingParam('passwordConfirmation'))
  })
  test('Shold return 400 if invalid email provide', async () => {
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
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new ErrorInvalidParam('email'))
  })
  test('Shold return 400 if invalid email provide', async () => {
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
    await sut.hundle(httpRequest)
    expect(spyRequest).toHaveBeenCalledWith('any_12345@fdew.com')
  })
  test('Shold return 500 if emailValidator return throw', async () => {
    const emailValidatorStub = makerEmailValidatorWithError()
    const addAccountStub = makerAddAccount()
    const sut = new SingUpController(emailValidatorStub, addAccountStub)
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Shold return 500 if addAccount return throw', async () => {
    const { sut, addAccountStub } = makerSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
  test('Shold return 400 if password is diferent the passwordConfirme', async () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345_different'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new PasswordDifferentError())
  })
  test('Shold Call addAccount with values corrects', async () => {
    const { sut, addAccountStub } = makerSut()
    const spyAdd = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'florentino',
        email: 'any_12345@fdew.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    await sut.hundle(httpRequest)
    expect(spyAdd).toHaveBeenCalledWith({
      name: 'florentino',
      email: 'any_12345@fdew.com',
      password: '12345'
    })
  })
  test('Should SignUpControler return 200 if values are corrects', async () => {
    const { sut } = makerSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    const httpResponse = await sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'id_valid',
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    })
  })
})
