// Libraries
import { RequestHandler } from 'express'

// Helpers
import { middlewareLogger } from '../helpers/logger'

const log = middlewareLogger('auth')

export const authMiddleware: RequestHandler = (req, res, next): void => {
  res.locals.token = 'auth-token-value'
  next()
}

export default authMiddleware
