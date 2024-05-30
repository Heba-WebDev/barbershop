// Importa PassportStrategy

import { mockUser } from './user.mock'

// Crea una clase mock para PassportStrategy
export class MockPassportStrategy {
  constructor () {}

  async validate (payload: any) {
    console.log('AQUI GASPAR ')

    return mockUser
  }
}
