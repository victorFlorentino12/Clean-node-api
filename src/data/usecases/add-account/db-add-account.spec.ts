import type { AddAccount, Encrypt } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account-protocols'
class EncryptStub implements Encrypt {
  async encrypt (_value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashad_password') })
  }
}

const makerStub = (): { sut: AddAccount, encryptStub: Encrypt } => {
  const encryptStub = new EncryptStub()
  const dbAddAccount = new DbAddAccount(encryptStub)
  return {
    sut: dbAddAccount,
    encryptStub
  }
}

describe('DbAddAccount Usercase', () => {
  test('Should calls password with Encrypt', async () => {
    const { sut, encryptStub } = makerStub()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
