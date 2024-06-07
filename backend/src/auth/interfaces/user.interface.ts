import { type ValidRole } from './valid-role.interface'

export interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  role: ValidRole[]
}
