// Libraries
import { Response, NextFunction } from 'express'

// Helpers
import { controllerLogger } from '../helpers/logger'

// Types
import AuthenticatedRequest from '../types/AuthenticatedRequest'

const log = controllerLogger('example')

export const statusSend = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  res.status(400).send()
  next()
}

export const responseWritable = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  res.write('test')
  next()
}

export const responseEventEmitter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  res.removeAllListeners()
  next()
}

export const requestRead = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  req.read(456)
  next()
}

export const requestEventEmitter = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  req.addListener('close', () => undefined)
  next()
}
