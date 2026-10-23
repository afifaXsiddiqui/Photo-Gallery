import { useCallback, useEffect, useState } from 'react'

const PHOTOS_URL = 'https://picsum.photos/v2/list?limit=30'

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Changing this number re-runs the effect below, which is how retry works.
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(PHOTOS_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`The server responded with status ${response.status}.`)
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('The server sent an unexpected response.')
        }
        setPhotos(data)
      } catch (err) {
        if (err.name === 'AbortError') return
        setError(
          err instanceof TypeError
            ? 'The request could not reach the server. Check your connection.'
            : err.message,
        )
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchPhotos()

    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setError(null)
    setLoading(true)
    setAttempt((current) => current + 1)
  }, [])

  return { photos, loading, error, retry }
}
