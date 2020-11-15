// Libraries
import express from 'express'

// Routers
import jobRouter from './jobRouter'
import userRouter from './userRouter'

// Middleware
import loggerMiddleware from '../middleware/loggerMiddleware'
import localsMiddleware from '../middleware/localsMiddleware'
import requestMiddleware from '../middleware/requestMiddleware'
import errorMiddleware from '../middleware/errorMiddleware'

const appRouter = express.Router()

// log every request
appRouter.use(loggerMiddleware)

// add a locals properties
appRouter.use(localsMiddleware)

// add a user to the request
appRouter.use(requestMiddleware)

//routes
appRouter.use('/job', jobRouter)
appRouter.use('/user', userRouter)

// apply global error handler
appRouter.use(errorMiddleware)

export default appRouter
