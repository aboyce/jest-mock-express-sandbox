// Libraries
import winston, { Logger, transports, format } from 'winston'

enum LogFileTypes {
  App = 'APP',
  Middleware = 'MIDDLE',
  Helper = 'HELPER',
  Controller = 'CONTROL',
}

interface LogConfig {
  fileType: LogFileTypes
  name?: string
}

const customFormat = format.printf(({ timestamp, fileType, name, level, message }) => {
  const fileDetails = name ? `${fileType} - ${name}` : fileType
  return `${timestamp} [${fileDetails}] ${level} : ${message}`
})

const logger = winston.createLogger({
  level: 'verbose',
  format: format.combine(format.timestamp(), format.colorize(), customFormat),
  transports: [new transports.Console()],
})

const customLogger = (config: LogConfig): Logger => {
  return logger.child(config)
}

export const appLogger = (): Logger =>
  customLogger({
    fileType: LogFileTypes.App,
  })

export const middlewareLogger = (name: string): Logger =>
  customLogger({ fileType: LogFileTypes.Middleware, name: name })

export const helperLogger = (name: string): Logger => customLogger({ fileType: LogFileTypes.Helper, name: name })

export const controllerLogger = (name: string): Logger =>
  customLogger({ fileType: LogFileTypes.Controller, name: name })

export default appLogger
