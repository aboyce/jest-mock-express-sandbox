// Libraries
import { RequestHandler } from 'express'

// Helpers
import { appLogger } from '../helpers/logger'

const log = appLogger()

export const loggerMiddleware: RequestHandler = (req, res, next): void => {
  log.info(`${req.method} ${req.path} ${JSON.stringify(req.body)}`)
  next()
}

export default loggerMiddleware
