// Libraries
import { Response, NextFunction } from 'express'

// Services
import * as userService from '../services/userService'

// Helpers
import { controllerLogger } from '../helpers/logger'

// Types
import AuthenticatedRequest from '../types/AuthenticatedRequest'

const log = controllerLogger('user')

export const getCount = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const count = await userService.getCount()
    res.json({ message: 'User count.', count: count })
  } catch (error) {
    return next(error)
  }
  next()
}

export const get = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  if (!id) return next()
  try {
    const user = await userService.getById(id)
    res.json({ message: 'User result.', user })
  } catch (error) {
    return next(error)
  }
  next()
}

export const getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAll()
    res.json({ message: 'User results.', users: users })
  } catch (error) {
    return next(error)
  }
  next()
}
