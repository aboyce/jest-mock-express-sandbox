// Libraries
import { Response, NextFunction } from 'express'

// Services
import * as userService from '../services/userService'

// Helpers
import { controllerLogger } from '../helpers/logger'

// Types
import AuthenticatedRequest from '../types/AuthenticatedRequest'

const log = controllerLogger('user')

export const getRequestingUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      log.error('Need to be logged in to access profile')
      res.status(404).end()
      return
    }
    res.json({ message: 'User profile.', user: req.user })
  } catch (error) {
    return next(error)
  }
  next()
}

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

export const getAllPremium = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!res.locals.premium) throw new Error('Need to be a premium user to access all Users')
    if (!req.user) throw new Error('Need to be logged in to access all Users')
    const users = await userService.getAll()
    res.json({ message: 'User results.', premium: res.locals.premium, users: users })
  } catch (error) {
    return next(error)
  }
  next()
}
