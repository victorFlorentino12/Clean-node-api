import { type EmailValidator } from '../presentation/controllers/signup/singup-protocols'
import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
