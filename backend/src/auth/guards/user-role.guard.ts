import { type CanActivate, type ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { type Observable } from 'rxjs'
import { type ValidRole } from '../interfaces'

import { META_ROLE } from '../../auth/decorators'

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor (
    private readonly reflector: Reflector
  ) { }

  canActivate (
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRole: ValidRole = this.reflector.get(META_ROLE, context.getHandler())

    if (!validRole) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user

    if (!user) throw new BadRequestException('User not found')

    if (user.role === validRole) return true

    throw new ForbiddenException(`User ${user.name} need a valid role: ${validRole}`)
  }
}
