import validator from 'validator'
import type { EmailValidator } from '../presentation/controllers/signup/singup-protocols'
import { EmailValidatorAdapter } from './email-validator-adapter'

interface StubType {
  EmailValidatorAdapterStub: EmailValidator
}

const makerStub = (): StubType => {
  const EmailValidatorAdapterStub = new EmailValidatorAdapter()
  return {
    EmailValidatorAdapterStub
  }
}
jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidatorAdapter', () => {
  test('Should EmailValidatorAdapter return false if email no valid', () => {
    const sut = makerStub()
    const emailValidatorAdapterStub = sut.EmailValidatorAdapterStub
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = emailValidatorAdapterStub.isValid('invalid_email@emailcom')
    expect(isValid).toEqual(false)
  })
  test('Shold EmailValidatorAdapter return true if email is valid', () => {
    const sut = makerStub()
    const emailValidatorAdapterStub = sut.EmailValidatorAdapterStub
    const isValid = emailValidatorAdapterStub.isValid('valid_email@email.com')
    expect(isValid).toEqual(true)
  })
  test('Shold EmailValidatorAdapter be call with correct email', () => {
    const sut = makerStub()
    const emailValidatorAdapterStub = sut.EmailValidatorAdapterStub
    const isEmail = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapterStub.isValid('any_email@email.com')
    expect(isEmail).toHaveBeenCalledWith('any_email@email.com')
  })
})
