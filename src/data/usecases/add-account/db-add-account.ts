import type { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypt } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypt: Encrypt
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypt: Encrypt, addAccountRepository: AddAccountRepository) {
    this.encrypt = encrypt
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const passwordEncrypt = await this.encrypt.encrypt(account.password)
    const accountModel = await this.addAccountRepository.add(Object.assign({}, account, { password: passwordEncrypt }))
    return accountModel
  }
}
