// Libraries
import { Request } from 'express'

// Domain Object
import User from '../models/User'

export interface AuthenticatedRequest extends Request {
  user?: User
}

export default AuthenticatedRequest
