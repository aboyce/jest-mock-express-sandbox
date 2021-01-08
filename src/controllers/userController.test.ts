// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Domain Models
import User from '../models/User'

// Services
import { getCount, getById, getAll } from '../services/userService'

// Tested Module
import * as userController from './userController'

const mockUser = new User({
  id: 'abcdef',
  forename: 'James',
  surname: 'Smith',
})
const mockUser2 = new User({
  id: 'ghijkl',
  forename: 'Rose',
  surname: 'Peppers',
})

// mock the user service
jest.mock('../services/userService')
const mockGetCount = getCount as jest.Mock
const mockGetById = getById as jest.Mock
const mockGetAll = getAll as jest.Mock

// mock the logger
jest.mock('../helpers/logger', () => ({
  controllerLogger: jest.fn().mockReturnValue({
    error: jest.fn(),
  }),
}))

const { res, next, clearMockRes } = getMockRes({
  locals: {
    premium: true,
  },
})

describe('user controller', () => {
  beforeEach(() => {
    clearMockRes()
    // reset the mock user service
    mockGetCount.mockClear()
    mockGetById.mockClear()
    mockGetAll.mockClear()
  })

  describe('getRequestingUser', () => {
    test('ensures the req user is returned', async () => {
      const req = getMockReq({ user: mockUser })

      await userController.getRequestingUser(req, res, next)

      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        user: mockUser,
      })
      expect(next).toHaveBeenCalledWith()
    })

    test('ensures the req user has been provided', async () => {
      const req = getMockReq()

      await userController.getRequestingUser(req, res, next)

      expect(res.status).toBeCalledWith(500)
      expect(res.end).toBeCalledWith()
      expect(next).not.toBeCalled()
    })
  })

  describe('getCount', () => {
    test('will return the count from the job service', async () => {
      const req = getMockReq()
      // mock the service
      mockGetCount.mockResolvedValue(20)

      await userController.getCount(req, res, next)

      expect(mockGetCount).toHaveBeenCalledWith()
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        count: 20,
      })
      expect(next).toHaveBeenCalledWith()
    })

    test('will handle an error', async () => {
      const req = getMockReq()
      // mock the service
      const mockError = new Error()
      mockGetCount.mockImplementationOnce(() => {
        throw mockError
      })

      await userController.getCount(req, res, next)

      expect(mockGetCount).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })

  describe('get', () => {
    test('if an id is not provided it skips the logic', async () => {
      const req = getMockReq()

      await userController.get(req, res, next)

      expect(next).toHaveBeenCalledWith()
    })

    test('will respond with user from user service', async () => {
      const req = getMockReq({ params: { id: '123' } })
      // mock the service
      mockGetById.mockResolvedValue(mockUser)

      await userController.get(req, res, next)

      expect(mockGetById).toHaveBeenCalledWith('123')
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        user: mockUser,
      })
      expect(next).toHaveBeenCalledWith()
    })

    test('will handle an error', async () => {
      const req = getMockReq({ params: { id: '123' } })
      // mock the service
      const mockError = new Error()
      mockGetById.mockImplementationOnce(() => {
        throw mockError
      })

      await userController.get(req, res, next)

      expect(mockGetById).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })

  describe('getAll', () => {
    test('will respond with the users from the user service', async () => {
      const req = getMockReq()
      // mock the service
      mockGetAll.mockResolvedValue([mockUser, mockUser2])

      await userController.getAll(req, res, next)

      expect(mockGetAll).toHaveBeenCalledWith()
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        users: [mockUser, mockUser2],
      })
      expect(next).toHaveBeenCalledWith()
    })

    test('will handle an error', async () => {
      const req = getMockReq()
      // mock the service
      const mockError = new Error()
      mockGetAll.mockImplementationOnce(() => {
        throw mockError
      })

      await userController.getAll(req, res, next)

      expect(mockGetAll).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })

  describe('getAllPremium', () => {
    test('will respond with the users from the user service', async () => {
      const req = getMockReq({ user: mockUser })
      // mock the service
      mockGetAll.mockResolvedValue([mockUser, mockUser2])

      await userController.getAllPremium(req, res, next)

      expect(mockGetAll).toHaveBeenCalledWith()
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        users: [mockUser, mockUser2],
        premium: true,
      })
      expect(next).toHaveBeenCalledWith()
    })

    test('will handle an error', async () => {
      const req = getMockReq({ user: mockUser })
      // mock the service
      const mockError = new Error()
      mockGetAll.mockImplementation(() => {
        throw mockError
      })

      await userController.getAllPremium(req, res, next)

      expect(mockGetAll).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })

    test('ensures the locals premium has been provided', async () => {
      const { res: emptyRes, next } = getMockRes()
      const req = getMockReq()
      // mock the service
      mockGetAll.mockResolvedValue([mockUser, mockUser2])

      await userController.getAllPremium(req, emptyRes, next)

      expect(mockGetAll).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()

      expect(next).toHaveBeenCalledWith(new Error('Need to be a premium user to access all Users'))
    })

    test('ensures the req user has been provided', async () => {
      const req = getMockReq()
      // mock the service
      mockGetAll.mockResolvedValue([mockUser, mockUser2])

      await userController.getAllPremium(req, res, next)

      expect(mockGetAll).not.toHaveBeenCalled()
      expect(res.json).not.toHaveBeenCalled()

      expect(next).toHaveBeenCalledWith(new Error('Need to be logged in to access all Users'))
    })
  })
})
