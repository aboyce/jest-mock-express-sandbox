// Libraries
import express from 'express'
import bodyParser from 'body-parser'

// Routers
import appRouter from './src/routers/app'

// Helpers
import appLogger from './src/helpers/logger'

// Config
import { version } from './package.json'

const app = express()
const port = 4444

const log = appLogger()

app.use(bodyParser.json())

app.get('/api', (req, res, next) => {
  res.json({
    version: version,
  })
  next()
})

app.use(`/api/`, appRouter)

// A catch all to prevent a page being returned on a missing endpoint
app.all('*', (req, res, next) => {
  if (!res.headersSent) {
    res.status(404).json({
      message: 'The route is not supported.',
    })
  }
  next()
})

app.listen(port, async () => {
  log.info(`server v${version} started at http://localhost:${port}`)
})
