import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'

export function useSessions() {
  const [sessions, setSessions] = useState([])
  const [loaded, setLoaded] = useState(false)

  // Laad alle sessies bij opstarten
  useEffect(() => {
    async function fetchSessions() {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.warn('Supabase fetch error:', error.message)
      } else {
        setSessions(data.map(fromRow))
      }
      setLoaded(true)
    }
    fetchSessions()
  }, [])

  const saveSession = useCallback(async (session) => {
    const row = toRow(session)
    const { error } = await supabase
      .from('sessions')
      .upsert(row, { onConflict: 'id' })

    if (error) {
      console.warn('Supabase save error:', error.message)
      return
    }

    setSessions((prev) => {
      const idx = prev.findIndex((s) => s.id === session.id)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = session
        return next
      }
      return [session, ...prev]
    })
  }, [])

  const deleteSession = useCallback(async (id) => {
    const { error } = await supabase
      .from('sessions')
      .delete()
      .eq('id', id)

    if (error) {
      console.warn('Supabase delete error:', error.message)
      return
    }

    setSessions((prev) => prev.filter((s) => s.id !== id))
  }, [])

  return { sessions, loaded, saveSession, deleteSession }
}

// App-object → database rij
function toRow(s) {
  return {
    id:            s.id,
    prop_name:     s.propName,
    date:          s.date,
    answers:       s.answers,
    notes:         s.notes,
    pillar_scores: s.pillarScores,
    avg_score:     s.avgScore,
    level_name:    s.levelName,
    level_color:   s.levelColor,
  }
}

// Database rij → app-object
function fromRow(r) {
  return {
    id:           r.id,
    propName:     r.prop_name,
    date:         r.date,
    answers:      r.answers,
    notes:        r.notes,
    pillarScores: r.pillar_scores,
    avgScore:     r.avg_score,
    levelName:    r.level_name,
    levelColor:   r.level_color,
  }
}
