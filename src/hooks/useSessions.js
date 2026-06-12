import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'uxm:sessions'

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeToStorage(sessions) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch (e) {
    console.warn('Storage write failed:', e)
  }
}

export function useSessions() {
  const [sessions, setSessions] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setSessions(readFromStorage())
    setLoaded(true)
  }, [])

  const saveSession = useCallback((session) => {
    setSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === session.id)
      const next = idx >= 0 ? [...prev] : [session, ...prev]
      if (idx >= 0) next[idx] = session
      writeToStorage(next)
      return next
    })
  }, [])

  const deleteSession = useCallback((id) => {
    setSessions((prev) => {
      const next = prev.filter((s) => s.id !== id)
      writeToStorage(next)
      return next
    })
  }, [])

  return { sessions, loaded, saveSession, deleteSession }
}
