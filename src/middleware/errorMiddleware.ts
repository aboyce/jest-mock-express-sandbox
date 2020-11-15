// Libraries
import { Request, Response, NextFunction } from 'express'

// Helpers
import { middlewareLogger } from '../helpers/logger'

const log = middlewareLogger('error')

export const errorMiddleware = (requestError: Error, req: Request, res: Response, next: NextFunction): void => {
  // ensure that we have safe default values for an unknown error response
  const status = 500
  const message = 'An unknown error occurred, it has been logged. Please try again later.'

  // log the error message
  log.error(requestError.message)
  // log the stack if it has been provided
  requestError.stack && log.error(requestError.stack)

  res.status(status).json({
    message: requestError.message || message,
  })
  // call next() to ensure database connections etc. are closed
  return next()
}

export default errorMiddleware
