// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Types
import type AuthenticatedRequest from '../types/AuthenticatedRequest'

// Tested Module
import requestMiddleware from './requestMiddleware'

const { res, next, clearMockRes } = getMockRes()

describe('request middleware', () => {
  beforeEach(() => {
    clearMockRes()
  })

  test('adds the token to locals object', () => {
    const req = getMockReq() as AuthenticatedRequest

    requestMiddleware(req, res, next)

    expect(req.user).toEqual(
      expect.objectContaining({
        id: '123',
        forename: 'Bob',
        surname: 'Smith',
        email: 'bob@provider.com',
      }),
    )
    expect(next).toBeCalledWith()
  })
})
