import { type ExecutionContext, createParamDecorator, InternalServerErrorException } from '@nestjs/common'

export const GetUser = createParamDecorator((data: string, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  const user = req.user

  if (!user) throw new InternalServerErrorException('User not found')

  return (!data) ? user : user[data]
})
