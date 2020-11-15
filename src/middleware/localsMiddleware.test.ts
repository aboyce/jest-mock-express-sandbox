// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Tested Module
import localsMiddleware from './localsMiddleware'

const { res, next, clearMockRes } = getMockRes()

describe('locals middleware', () => {
  beforeEach(() => {
    clearMockRes()
  })

  test('adds the token to locals object', () => {
    const req = getMockReq()

    localsMiddleware(req, res, next)

    expect(res.locals).toEqual(
      expect.objectContaining({
        premium: true,
      }),
    )
    expect(next).toBeCalledWith()
  })
})
