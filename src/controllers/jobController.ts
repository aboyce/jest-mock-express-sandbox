// Libraries
import { Response, NextFunction } from 'express'

// Services
import * as jobService from '../services/jobService'

// Helpers
import { controllerLogger } from '../helpers/logger'

// Types
import AuthenticatedRequest from '../types/AuthenticatedRequest'

const log = controllerLogger('job')

export const getCount = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const count = await jobService.getCount()
    res.json({ message: 'Job count.', count: count })
  } catch (error) {
    return next(error)
  }
  next()
}

export const get = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params
  if (!id) return next()
  try {
    const job = await jobService.getById(id)
    res.json({ message: 'Job result.', job: job })
  } catch (error) {
    return next(error)
  }
  next()
}

export const getAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!res.locals.premium) throw new Error('Need to be a premium user to access all Jobs')
    if (!req.user) throw new Error('Need to be logged in to access all Jobs')
    const jobs = await jobService.getAll()
    res.json({ message: 'Job results.', jobs: jobs })
  } catch (error) {
    return next(error)
  }
  next()
}
