import { useCallback, useEffect, useRef } from 'react'

type CalculationCache = Map<number, string>

const CACHE_STORAGE_KEY = 'calculationCache'
const MAX_CACHE_SIZE = 50

type CacheEntry = [number, string]

const isCacheEntries = (data: unknown): data is CacheEntry[] => {
  return (
    Array.isArray(data) &&
    data.every(
      (entry) =>
        Array.isArray(entry) && typeof entry[0] === 'number' && typeof entry[1] === 'string'
    )
  )
}

export const useCalculationCache = () => {
  const cacheRef = useRef<CalculationCache>(new Map())

  const loadCache = useCallback(() => {
    try {
      const savedCache = localStorage.getItem(CACHE_STORAGE_KEY)

      if (!savedCache) return

      const parsed = JSON.parse(savedCache) as unknown

      if (!isCacheEntries(parsed)) {
        throw new Error('invalid cache format')
      }

      const newCache = new Map(parsed)

      cacheRef.current =
        newCache.size <= MAX_CACHE_SIZE ? newCache : new Map([...newCache].slice(-MAX_CACHE_SIZE))
    } catch (error) {
      console.error('Error loading cache:', error)
      localStorage.removeItem(CACHE_STORAGE_KEY)
    }
  }, [])

  const persistCache = useCallback(({ input, value }: { input: number; value: string }) => {
    const newCache = new Map(cacheRef.current)
    newCache.set(input, value)

    if (newCache.size > MAX_CACHE_SIZE) {
      const oldestKey = [...newCache.keys()][0]

      newCache.delete(oldestKey)
    }

    cacheRef.current = newCache

    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(Array.from(newCache.entries())))
  }, [])

  const clearCache = useCallback(() => {
    cacheRef.current.clear()
    localStorage.removeItem(CACHE_STORAGE_KEY)
  }, [])

  const getFromCache = useCallback((key: number) => cacheRef.current.get(key), [])
  const hasInCache = useCallback((key: number) => cacheRef.current.has(key), [])

  useEffect(() => {
    loadCache()
  }, [loadCache])

  return {
    cache: cacheRef.current,
    persistCache,
    clearCache,
    getFromCache,
    hasInCache,
  }
}
