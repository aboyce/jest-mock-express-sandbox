// Libraries
import { Response } from 'express'

interface CustomLocals {
  premium?: boolean
}

export interface LocalsResponse extends Response {
  locals: CustomLocals
}

export default LocalsResponse
