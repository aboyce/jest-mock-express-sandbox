// Libraries
import { RequestHandler } from 'express'

// Domain Objects
import User from '../models/User'

// Types
import type AuthenticatedRequest from '../types/AuthenticatedRequest'

// Helpers
import { middlewareLogger } from '../helpers/logger'

const log = middlewareLogger('request')

export const requestMiddleware: RequestHandler = (req: AuthenticatedRequest, res, next): void => {
  req.user = new User({
    id: '123',
    forename: 'Bob',
    surname: 'Smith',
    email: 'bob@provider.com',
  })
  next()
}

export default requestMiddleware
