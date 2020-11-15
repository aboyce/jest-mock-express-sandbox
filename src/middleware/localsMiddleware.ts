// Libraries
import { RequestHandler } from 'express'

// Helpers
import { middlewareLogger } from '../helpers/logger'

const log = middlewareLogger('locals')

export const localsMiddleware: RequestHandler = (req, res, next): void => {
  res.locals.premium = true
  next()
}

export default localsMiddleware
