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

describe('EmailValidatorAdapter', () => {
  test('Should EmailValidatorAdapter return false if email no valid', () => {
    const sut = makerStub()
    const emailValidatorAdapterStub = sut.EmailValidatorAdapterStub
    jest.spyOn(emailValidatorAdapterStub, 'isValid').mockReturnValue(false)
    const isValid = emailValidatorAdapterStub.isValid('invalid_email@email.com')
    expect(isValid).toEqual(false)
  })
  test('Shold EmailValidatorAdapter return true if email is valid', () => {
    const sut = makerStub()
    const emailValidatorAdapterStub = sut.EmailValidatorAdapterStub
    const isValid = emailValidatorAdapterStub.isValid('valid_email@email.com')
    expect(isValid).toEqual(true)
  })
})
