import { SingUpController } from './signup'

describe('SignUp Controller', () => {
  test('Shold return 400 if no name is provided', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        email: 'florentino@email.com',
        password: '12345',
        passwordConfirmation: '12345'
      }
    }
    const httpResponse = sut.hundle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })
})
