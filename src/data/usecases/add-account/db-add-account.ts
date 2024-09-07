import { type AccountModel } from '../../../domain/model/account-model'
import type { AddAccount, AddAccountModel } from '../../../domain/usercase/add-account'
import { type Encrypt } from '../../protocols/encrypt'

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
