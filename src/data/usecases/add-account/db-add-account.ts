import type { AccountModel, AddAccount, AddAccountModel, Encrypt } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt

  constructor (encrypt: Encrypt) {
    this.encrypt = encrypt
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypt.encrypt(account.password)
    return await new Promise(resolve => {
      resolve({
        id: 's',
        name: 'e',
        email: 'v',
        password: 's'
      })
    })
  }
}
