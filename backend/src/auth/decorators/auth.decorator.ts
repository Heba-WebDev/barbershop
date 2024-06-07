import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { type ValidRole } from '../interfaces'

import { RoleProtected } from './role-protected.decorator'
import { UserRoleGuard } from '../guards/user-role.guard'

export function Auth (...role: ValidRole[]) {
  return applyDecorators(
    RoleProtected(...role),
    UseGuards(AuthGuard('jwt'), UserRoleGuard)
  )
}
