import { useState } from 'react'
import { useSessions } from './hooks/useSessions.js'
import {
  PILLARS,
  freshAnswers,
  freshNotes,
  makeId,
  todayStr,
  calcPillarScore,
  calcOverallScore,
  getLevel,
  deriveSessionMeta,
} from './data/model.js'
import HomeView     from './components/HomeView.jsx'
import IntroView    from './components/IntroView.jsx'
import PillarView   from './components/PillarView.jsx'
import NotesView    from './components/NotesView.jsx'
import ScorecardView from './components/ScorecardView.jsx'
import styles from './App.module.css'

// Views: 'home' | 'intro' | 'pillar' | 'notes' | 'scorecard'

export default function App() {
  const { sessions, loaded, saveSession, deleteSession } = useSessions()

  const [view, setView]           = useState('home')
  const [pillarIdx, setPillarIdx] = useState(0)
  const [propName, setPropName]   = useState('')
  const [sessionDate, setSessionDate] = useState('')
  const [answers, setAnswers]     = useState(freshAnswers())
  const [notes, setNotes]         = useState(freshNotes())
  const [editingId, setEditingId] = useState(null)
  const [savedBanner, setSavedBanner] = useState(false)

  // ── Helpers ────────────────────────────────────────────────────────────────

  function reset() {
    setPropName('')
    setAnswers(freshAnswers())
    setNotes(freshNotes())
    setEditingId(null)
    setSavedBanner(false)
    setPillarIdx(0)
    setSessionDate('')
  }

  function handleAnswer(qi, oi) {
    const pillarId = PILLARS[pillarIdx].id
    setAnswers((prev) => {
      const updated = [...prev[pillarId]]
      updated[qi] = oi
      return { ...prev, [pillarId]: updated }
    })
  }

  function handleNote(key, val) {
    setNotes((prev) => ({ ...prev, [key]: val }))
  }

  function handleFinish() {
    const today = todayStr()
    const pillarScores = Object.fromEntries(
      PILLARS.map((p) => [p.id, calcPillarScore(answers[p.id])])
    )
    const avg = calcOverallScore(Object.values(pillarScores))
    const level = getLevel(avg)

    const sess = deriveSessionMeta({
      id: editingId || makeId(),
      propName: propName.trim() || 'Naamloos',
      date: today,
      answers: JSON.parse(JSON.stringify(answers)),
      notes: { ...notes },
    })

    saveSession(sess)
    setEditingId(sess.id)
    setSessionDate(today)
    setSavedBanner(true)
    setView('scorecard')
  }

  function handleOpenSession(id) {
    const sess = sessions.find((s) => s.id === id)
    if (!sess) return
    setPropName(sess.propName)
    setAnswers(JSON.parse(JSON.stringify(sess.answers)))
    setNotes({ ...sess.notes })
    setEditingId(sess.id)
    setSessionDate(sess.date)
    setSavedBanner(false)
    setView('scorecard')
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (!loaded) {
    return (
      <div className={styles.shell}>
        <div className={styles.container}>
          <div className={styles.loading}>Laden…</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.logo} onClick={() => { reset(); setView('home') }}>
            <span className={styles.logoMark}>U</span>
            <span className={styles.logoText}>UX Maturity</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={view === 'scorecard' ? styles.containerWide : styles.container}>
          {view === 'home' && (
            <HomeView
              sessions={sessions}
              onNew={() => { reset(); setView('intro') }}
              onOpen={handleOpenSession}
              onDelete={deleteSession}
            />
          )}

          {view === 'intro' && (
            <IntroView
              propName={propName}
              onChange={setPropName}
              onBack={() => setView('home')}
              onStart={() => { setPillarIdx(0); setView('pillar') }}
            />
          )}

          {view === 'pillar' && (
            <PillarView
              pillarIndex={pillarIdx}
              answers={answers[PILLARS[pillarIdx].id]}
              onAnswer={handleAnswer}
              onPrev={() => {
                if (pillarIdx === 0) setView('intro')
                else setPillarIdx((i) => i - 1)
              }}
              onNext={() => {
                if (pillarIdx < PILLARS.length - 1) setPillarIdx((i) => i + 1)
                else setView('notes')
              }}
              isLast={pillarIdx === PILLARS.length - 1}
            />
          )}

          {view === 'notes' && (
            <NotesView
              notes={notes}
              onChange={handleNote}
              onPrev={() => { setPillarIdx(PILLARS.length - 1); setView('pillar') }}
              onFinish={handleFinish}
            />
          )}

          {view === 'scorecard' && (
            <ScorecardView
              propName={propName}
              date={sessionDate || todayStr()}
              answers={answers}
              notes={notes}
              savedBanner={savedBanner}
              onHome={() => { setSavedBanner(false); setView('home') }}
              onEdit={() => { setSavedBanner(false); setPillarIdx(PILLARS.length - 1); setView('pillar') }}
              onNew={() => { reset(); setView('intro') }}
            />
          )}
        </div>
      </main>
    </div>
  )
}
