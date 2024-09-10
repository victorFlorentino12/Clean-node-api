import type { AccountModel, AddAccount, AddAccountModel, Encrypt, AddAccountRepository } from './db-add-account-protocols'
import { DbAddAccount } from './db-add-account-protocols'
class EncryptStub implements Encrypt {
  async encrypt (_value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashad_password') })
  }
}
class AddAccountRepositoryStub implements AddAccountRepository {
  async add (_account: AddAccountModel): Promise<AccountModel> {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashad_password'
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

const makerStub = (): { sut: AddAccount, encryptStub: Encrypt, addAccountRepositoryStub: AddAccountRepository } => {
  const addAccountRepositoryStub = new AddAccountRepositoryStub()
  const encryptStub = new EncryptStub()
  const dbAddAccount = new DbAddAccount(encryptStub, addAccountRepositoryStub)
  return {
    sut: dbAddAccount,
    encryptStub,
    addAccountRepositoryStub
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
  test('Should calls addAccountRepository with values corrects', async () => {
    const { sut, addAccountRepositoryStub } = makerStub()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashad_password'
    })
  })
  test('Should calss addAccountRepository return values correct', async () => {
    const { sut } = makerStub()
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }
    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashad_password'
    })
  })
})
