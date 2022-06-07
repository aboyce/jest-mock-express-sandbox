// Libraries
import { getMockReq, getMockRes } from '@jest-mock/express'

// Tested Module
import * as exampleController from './exampleController'

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

describe('example controller', () => {
  beforeEach(() => {
    clearMockRes()
  })

  describe('statusSend', () => {
    test('checks that status and send are chained', async () => {
      const req = getMockReq()

      exampleController.statusSend(req, res, next)

      expect(res.status).toBeCalledTimes(1)
      expect(res.send).toBeCalledTimes(1)
      expect(next).toBeCalledTimes(1)
    })
  })

  describe('responseWritable', () => {
    test('write from stream.Writable is implemented', async () => {
      const req = getMockReq()

      exampleController.responseWritable(req, res, next)

      expect(res.write).toBeCalledTimes(1)
      expect(res.write).toBeCalledWith('test')

      expect(next).toBeCalledTimes(1)
    })
  })

  describe('responseEventEmitter', () => {
    test('removeAllListeners from event.EventEmitter is implemented', async () => {
      const req = getMockReq()

      exampleController.responseEventEmitter(req, res, next)

      expect(res.removeAllListeners).toBeCalledTimes(1)
      expect(res.removeAllListeners).toBeCalledWith()

      expect(next).toBeCalledTimes(1)
    })
  })

  describe('requestRead', () => {
    test('read from stream.Readable is implemented', async () => {
      const req = getMockReq()

      exampleController.requestRead(req, res, next)

      expect(req.read).toBeCalledTimes(1)
      expect(req.read).toBeCalledWith(456)

      expect(next).toBeCalledTimes(1)
    })
  })

  describe('requestEventEmitter', () => {
    test('read from event.EventEmitter is implemented', async () => {
      const req = getMockReq()

      exampleController.requestEventEmitter(req, res, next)

      expect(req.addListener).toBeCalledTimes(1)
      expect(req.addListener).toBeCalledWith('close', expect.anything())

      expect(next).toBeCalledTimes(1)
    })
  })
})
