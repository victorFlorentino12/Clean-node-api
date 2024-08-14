export * from '../../protocols/index'
export interface EmailValidator {
  isValid: ((email: string) => boolean)
}
