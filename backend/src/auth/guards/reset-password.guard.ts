import { type ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { type Observable } from 'rxjs'

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }
}
