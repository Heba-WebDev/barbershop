import { SetMetadata } from '@nestjs/common'

import { type ValidRole } from '../interfaces'

export const META_ROLE = 'role'

export const RoleProtected = (...role: ValidRole[]) => {
  return SetMetadata(META_ROLE, role)
}
