// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Tested Module
import loggerMiddleware from './loggerMiddleware'

// mock the logger helper
jest.mock('../helpers/logger', () => ({
  appLogger: jest.fn().mockReturnValue({
    info: jest.fn(),
  }),
}))

const { res, next, clearMockRes } = getMockRes()

describe('logger middleware', () => {
  beforeEach(() => {
    clearMockRes()
  })

  test('logs the method and path', () => {
    const req = getMockReq({ method: 'TEST', path: '/path/test' })

    loggerMiddleware(req, res, next)

    expect(next).toBeCalledWith()
  })
})
