// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Domain Models
import Job, { Grade } from '../models/Job'

// Services
import { getCount, getById, getAll } from '../services/jobService'

// Tested Module
import * as jobController from './jobController'

const mockJob = new Job({ id: '12345', title: 'Mock Job', grade: Grade.D04 })
const mockJob2 = new Job({ id: '67890', title: 'Second Mock Job', grade: Grade.B02 })

// mock the job service
jest.mock('../services/jobService')
const mockGetCount = getCount as jest.Mock
const mockGetById = getById as jest.Mock
const mockGetAll = getAll as jest.Mock

const { res, next, clearMockRes } = getMockRes()

describe('job controller', () => {
  beforeEach(() => {
    clearMockRes()
    // reset the mock job service
    mockGetCount.mockClear()
    mockGetById.mockClear()
    mockGetAll.mockClear()
  })

  describe('getCount', () => {
    test('will return the count fro the job service', async () => {
      const req = getMockReq()
      // mock the service
      mockGetCount.mockResolvedValue(20)

      await jobController.getCount(req, res, next)

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

      await jobController.getCount(req, res, next)

      expect(mockGetCount).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })

  describe('get', () => {
    test('if an id is not provided it skips the logic', async () => {
      // an empty req with no id
      const req = getMockReq()

      await jobController.get(req, res, next)

      expect(next).toHaveBeenCalledWith()
    })

    test('will respond with the job from the job service', async () => {
      const req = getMockReq({ params: { id: '123' } })
      // mock the service
      mockGetById.mockResolvedValue(mockJob)

      await jobController.get(req, res, next)

      expect(mockGetById).toHaveBeenCalledWith('123')
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        job: mockJob,
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

      await jobController.get(req, res, next)

      expect(mockGetById).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })

  describe('getAll', () => {
    test('will respond with the jobs from the job service', async () => {
      const req = getMockReq()
      // mock the service
      mockGetAll.mockResolvedValue([mockJob, mockJob2])

      await jobController.getAll(req, res, next)

      expect(mockGetAll).toHaveBeenCalledWith()
      expect(res.json).toHaveBeenCalledWith({
        message: expect.any(String),
        jobs: [mockJob, mockJob2],
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

      await jobController.getAll(req, res, next)

      expect(mockGetAll).toBeCalledTimes(1)
      expect(next).toBeCalledWith(mockError)
    })
  })
})
