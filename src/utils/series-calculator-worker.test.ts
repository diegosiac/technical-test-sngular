import '@vitest/web-worker'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'
import { WorkerMessageSeriesCalculator } from '@/types/worker-message.ts'

const mocks = vi.hoisted(() => {
  return {
    computeTerm: vi.fn<(input: number) => bigint>(),
  }
})

vi.mock('./series-calculator.ts', () => ({
  SeriesCalculator: {
    computeTerm: mocks.computeTerm,
  },
}))

describe('Series Calculator Worker', () => {
  let worker: Worker
  let messages: WorkerMessageSeriesCalculator[] = []

  beforeEach(() => {
    worker = new Worker(new URL('./series-calculator-worker.ts', import.meta.url), {
      type: 'module',
    })

    worker.onmessage = (e: MessageEvent<WorkerMessageSeriesCalculator>) => {
      messages.push(e.data)
    }

    mocks.computeTerm.mockReset()
    messages = []
  })

  afterEach(() => {
    worker.terminate()
  })

  const waitForWorkerMessage = async (timeout = 1000) => {
    return await vi.waitFor<WorkerMessageSeriesCalculator[]>(
      () => {
        if (messages.length > 0) return messages
        throw new Error('Worker response timeout')
      },
      { timeout }
    )
  }

  it('should process valid numeric input correctly', async () => {
    const testInput = 5
    const expectedResult = '42'

    mocks.computeTerm.mockReturnValue(BigInt(expectedResult))

    worker.postMessage(testInput)
    const [response] = await waitForWorkerMessage()

    expect(mocks.computeTerm).toHaveBeenCalledWith(testInput)

    const result = {
      input: testInput,
      result: expectedResult,
    } satisfies WorkerMessageSeriesCalculator

    expect(response).toEqual(result)
  })

  it('should handle calculation errors with specific error message', async () => {
    const errorMessage = 'Invalid input value'

    mocks.computeTerm.mockImplementation(() => {
      throw new Error(errorMessage)
    })

    worker.postMessage(5)

    const [response] = await waitForWorkerMessage()

    const result = {
      error: errorMessage,
    } satisfies WorkerMessageSeriesCalculator

    expect(response).toEqual(result)
  })

  it('should reject non-numeric input with validation error', async () => {
    const expectedError = 'El parámetro debe ser un número'

    worker.postMessage('invalid')

    const [response] = await waitForWorkerMessage()

    const result = {
      error: expectedError,
    } satisfies WorkerMessageSeriesCalculator

    expect(response).toEqual(result)
  })

  it('should handle generic errors with fallback message', async () => {
    const expectedError = 'Hubo un error al calcular el término, intente nuevamente'

    mocks.computeTerm.mockImplementation(() => {
      // eslint-disable-next-line no-throw-literal
      throw 'unexpected-error-type'
    })

    worker.postMessage(5)

    const [response] = await waitForWorkerMessage()

    const result = {
      error: expectedError,
    } satisfies WorkerMessageSeriesCalculator

    expect(response).toEqual(result)
  })
})
