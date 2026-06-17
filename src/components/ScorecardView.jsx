import { useEffect, useState } from 'react'
import { Card } from './UI.jsx'
import RadarChart from './RadarChart.jsx'
import { PILLARS, LEVELS, calcPillarScore, calcOverallScore, getLevel } from '../data/model.js'
import styles from './ScorecardView.module.css'

const DIM_COLORS = ['#534AB7', '#0F6E56', '#185FA5']
const DIM_LABELS = ['Partnerschap', 'R&I', 'Design System']

const NOTE_META = [
  { key: 'goed',       label: 'Wat gaat goed?',            isActies: false },
  { key: 'knelpunten', label: 'Uitdagingen/knelpunten',    isActies: false },
  { key: 'acties',     label: 'Acties/besluiten',          isActies: true  },
]

export default function ScorecardView({ propName, date, answers, notes, savedBanner, onHome, onEdit }) {
  const pillarScores = PILLARS.map((p) => calcPillarScore(answers[p.id]))
  const avg   = calcOverallScore(pillarScores)
  const level = getLevel(avg)
  const color = level ? level.color : '#888'

  const hasNotes = NOTE_META.some(({ key }) => notes[key]?.trim())

  const [toastVisible, setToastVisible] = useState(false)
  useEffect(() => {
    if (savedBanner) {
      setToastVisible(true)
      const t = setTimeout(() => setToastVisible(false), 3000)
      return () => clearTimeout(t)
    }
  }, [savedBanner])

  return (
    <div>
      {toastVisible && (
        <div className={`${styles.toast} ${toastVisible ? styles.toastIn : ''}`}>
          <i className="fa-solid fa-circle-check" /> Maturity score opgeslagen
        </div>
      )}

      <div className={styles.layout}>
        {/* ── Left panel ── */}
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <button className={styles.backLink} onClick={onHome}>
              <i className="fa-solid fa-chevron-left" /> Overzicht
            </button>
            <div className={styles.propName}>{propName || 'Propositie'}</div>
            <div className={styles.dateLine}>
              <div className={styles.dateLabel}>Assessment: {date}</div>
              <button className={styles.editBtn} onClick={onEdit}>
                <i className="fa-solid fa-pen" /> wijzig
              </button>
            </div>
          </div>

          {/* Combined scores block */}
          <div className={styles.scoresBlock}>
            <div className={styles.scoresInner}>
              {/* Top row: gemiddelde score + maturity level */}
              <div className={styles.topRow}>
                <div className={styles.avgScore}>
                  <span className={styles.metricLabel}>Gemiddelde Score</span>
                  <span className={styles.metricValue} style={{ color }}>
                    {avg != null ? avg.toFixed(1) : '–'}
                  </span>
                </div>
                <div className={styles.levelScore}>
                  <div className={styles.metricLabel}>UX Maturity level</div>
                  <div className={styles.metricLevel} style={{ color }}>
                    {level ? level.name : '–'}
                  </div>
                </div>
              </div>

              {/* Bottom row: pillar scores */}
              <div className={styles.dimGrid}>
                {PILLARS.map((p, i) => (
                  <div key={p.id} className={`${styles.dimCell} ${i > 0 ? styles.dimCellBorder : ''}`}>
                    <div className={styles.dimLabel}>{DIM_LABELS[i]}</div>
                    <div className={styles.dimValue} style={{ color: DIM_COLORS[i] }}>
                      {pillarScores[i] != null ? pillarScores[i].toFixed(1) : '–'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Notities */}
          {hasNotes && (
            <div className={styles.notitiesBlock}>
              <div className={styles.notitiesHeader}>Notities</div>
              {NOTE_META.filter(({ key }) => notes[key]?.trim()).map(({ key, label, isActies }) => (
                <div key={key} className={styles.notitieItem}>
                  <div className={styles.notitieLabel}>{label}</div>
                  {isActies ? (
                    <ul className={styles.actiesList}>
                      {notes[key].split('\n').filter(l => l.trim()).map((line, i) => (
                        <li key={i}>{line.trim()}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className={styles.notitieText}>{notes[key]}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Maturity levels */}
          <div className={styles.levelsBlock}>
            <div className={styles.levelsHeader}>Maturity Levels</div>
            {[...LEVELS].reverse().map((l) => {
              const isActive = level && l.name === level.name
              return (
                <div key={l.name} className={`${styles.levelRow} ${isActive ? styles.levelRowActive : ''}`}>
                  <div className={styles.levelDot} style={{ background: l.color }}>
                    {LEVELS.indexOf(l) + 1}
                  </div>
                  <div className={styles.levelText}>
                    <div className={styles.levelName} style={isActive ? { color: l.color, fontWeight: 700 } : {}}>
                      {l.name}
                    </div>
                    <div className={styles.levelDesc}>{l.desc}</div>
                    {isActive && (
                      <div className={styles.levelFocus}>Focuspunt: {l.focus}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Right panel: radar chart ── */}
        <div className={styles.rightPanel}>
          <Card className={styles.radarCard}>
            <RadarChart scores={pillarScores.map((s) => s ?? 0)} />
          </Card>
        </div>
      </div>
    </div>
  )
}
