// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Tested Module
import authMiddleware from './authMiddleware'


const { res, next, clearMockRes } = getMockRes()

describe('auth middleware', () => {
  beforeEach(() => {
    clearMockRes()
  })

  test('adds the token to locals object', () => {
    const req = getMockReq()

    authMiddleware(req, res, next)

    expect(res.locals).toEqual(expect.objectContaining({
      token: expect.stringContaining('token')
    }))
    expect(next).toBeCalledWith()
  })
})
