import { type EmailValidator } from '../presentation/controllers/signup/singup-protocols'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (_email: string): boolean {
    return true
  }
}
