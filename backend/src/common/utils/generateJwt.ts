import * as jwt from 'jsonwebtoken'
import { type IJwtPayload } from '../../auth/interfaces'

export const generateJwt = async (payload: IJwtPayload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION
  })

  return token
}
