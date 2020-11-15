// Libraries
import express from 'express'

// Routers
import jobRouter from './jobRouter'
import userRouter from './userRouter'

// Middleware
import loggerMiddleware from '../middleware/loggerMiddleware'
import authMiddleware from '../middleware/authMiddleware'
import errorMiddleware from '../middleware/errorMiddleware'

const appRouter = express.Router()

// log every request
appRouter.use(loggerMiddleware)

// add a user
appRouter.use(authMiddleware)

//routes
appRouter.use('/job', jobRouter)
appRouter.use('/user', userRouter)

// apply global error handler
appRouter.use(errorMiddleware)

export default appRouter
