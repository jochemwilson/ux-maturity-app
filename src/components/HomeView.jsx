import { useState } from 'react'
import { Btn, Card, PageHeader } from './UI.jsx'
import styles from './HomeView.module.css'

const PILLAR_IDS  = ['partnerschap', 'research', 'designsystem']
const PILLAR_COLORS = ['#534AB7', '#0F6E56', '#185FA5']
const PILLAR_LABELS = ['PS', 'R&I', 'DS']

function getQuarter(dateStr) {
  // dateStr format: DD-MM-YYYY
  const parts = dateStr?.split('-')
  if (!parts || parts.length < 3) return null
  const month = parseInt(parts[1], 10)
  const year  = parseInt(parts[2], 10)
  const q = Math.ceil(month / 3)
  return { label: `Q${q} ${year}`, year, q }
}

function getCurrentQuarters() {
  const now = new Date()
  const year = now.getFullYear()
  const curQ = Math.ceil((now.getMonth() + 1) / 3)
  const quarters = []
  for (let i = 0; i < 4; i++) {
    let q = curQ - i
    let y = year
    if (q <= 0) { q += 4; y -= 1 }
    quarters.push({ label: `Q${q} ${y}`, year: y, q })
  }
  return quarters
}

export default function HomeView({ sessions, onNew, onOpen, onDelete, onEdit }) {
  const [confirmId, setConfirmId] = useState(null)

  function handleDeleteClick(e, id) {
    e.stopPropagation()
    setConfirmId(id)
  }

  function handleConfirm() {
    onDelete(confirmId)
    setConfirmId(null)
  }

  const quarters = getCurrentQuarters()

  // Group sessions by quarter label
  const grouped = {}
  sessions.forEach((s) => {
    const q = getQuarter(s.date)
    const key = q ? q.label : 'Overig'
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(s)
  })

  return (
    <div>
      <PageHeader eyebrow="UX Maturity" title="Assessment" />

      <Btn variant="primary" fullWidth onClick={onNew}>
        + Nieuwe assessment starten
      </Btn>

      <div className={styles.list}>
        {quarters.map(({ label }) => {
          const items = grouped[label] || []
          return (
            <div key={label} className={styles.quarter}>
              <div className={styles.quarterLabel}>{label}</div>
              {items.length === 0 ? (
                <Card className={styles.quarterEmpty} style={{ padding: '12px 16px' }}>
                  Er zijn geen assessments weer te geven.
                </Card>
              ) : (
                items.map((s) => (
                  <Card key={s.id} className={styles.sessionCard} style={{ padding: 0 }}>
                    <button className={styles.sessionBtn} onClick={() => onOpen(s.id)}>
                      <div className={styles.sessionInfo}>
                        <div className={styles.sessionName}>{s.propName}</div>
                        <div className={styles.sessionMeta}>
                          {s.date} ·{' '}
                          <span style={{ color: s.levelColor, fontWeight: 600 }}>{s.levelName}</span>
                          {s.avgScore != null && ` · ${s.avgScore.toFixed(1)}`}
                        </div>
                      </div>
                      <div className={styles.sessionScores}>
                        {PILLAR_IDS.map((id, i) => {
                          const score = s.pillarScores?.[id]
                          return (
                            <div key={id} className={styles.dimPill} style={{ color: PILLAR_COLORS[i] }}>
                              <span className={styles.dimLabel}>{PILLAR_LABELS[i]}</span>
                              <span className={styles.dimVal}>{score != null ? score.toFixed(1) : '–'}</span>
                            </div>
                          )
                        })}
                      </div>
                    </button>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} title="Bewerken" onClick={(e) => { e.stopPropagation(); onEdit(s.id) }}>
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className={styles.iconBtn + ' ' + styles.iconBtnDanger} title="Verwijderen" onClick={(e) => handleDeleteClick(e, s.id)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )
        })}
      </div>

      {/* Confirmation dialog */}
      {confirmId && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <div className={styles.dialogTitle}>Assessment verwijderen</div>
            <div className={styles.dialogText}>
              Weet je zeker dat je deze assessment wilt verwijderen?
            </div>
            <div className={styles.dialogActions}>
              <Btn onClick={() => setConfirmId(null)}>Annuleren</Btn>
              <Btn variant="danger" onClick={handleConfirm}>Verwijderen</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
