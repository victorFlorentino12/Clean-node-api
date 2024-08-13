import type { AccountModel } from '../model/account-model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}
export interface AddAccount {
  add: ((account: AddAccountModel) => AccountModel)
}
