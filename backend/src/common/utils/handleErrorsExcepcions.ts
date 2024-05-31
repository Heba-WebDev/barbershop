import { InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common'

export const handleErrorExceptions = (error: unknown) => {
  if (error instanceof NotFoundException) throw new NotFoundException(error.message)
  if (error instanceof UnauthorizedException) throw new UnauthorizedException(error.message)

  throw new InternalServerErrorException('An unexpected error occurred')
}
