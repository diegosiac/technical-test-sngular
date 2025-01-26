import { useCallback, useEffect, useRef } from 'react'

interface WorkerConfig<T> {
  onMessage: (data: T) => void
  filePath: string
  type: 'module' | 'classic'
}

export const useWorker = <T>({ filePath, type, onMessage }: WorkerConfig<T>) => {
  const workerRef = useRef<Worker | null>(null)
  const onMessageRef = useRef<WorkerConfig<T>['onMessage']>(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    const worker = new Worker(new URL(filePath, import.meta.url), { type })
    workerRef.current = worker

    const handleMessage = (e: MessageEvent<T>) => {
      onMessageRef.current?.(e.data)
    }

    worker.addEventListener('message', handleMessage)

    return () => {
      worker.removeEventListener('message', handleMessage)
      worker.terminate()
      workerRef.current = null
    }
  }, [filePath, type])

  const postMessage = useCallback((data: unknown) => {
    workerRef.current?.postMessage(data)
  }, [])

  return {
    worker: workerRef.current,
    postMessage,
  }
}
