import { Card } from './UI.jsx'
import RadarChart from './RadarChart.jsx'
import { PILLARS, LEVELS, calcPillarScore, calcOverallScore, getLevel } from '../data/model.js'
import styles from './ScorecardView.module.css'

const DIM_COLORS = ['#534AB7', '#0F6E56', '#185FA5']
const DIM_LABELS = ['Partnerschap', 'R&I', 'Design System']

const NOTE_META = [
  { key: 'goed',       label: 'Wat gaat goed',           icon: 'fa-solid fa-circle-check' },
  { key: 'knelpunten', label: 'Uitdagingen / knelpunten', icon: 'fa-solid fa-triangle-exclamation' },
  { key: 'acties',     label: 'Acties en besluiten',      icon: 'fa-solid fa-bolt' },
]

export default function ScorecardView({ propName, date, answers, notes, savedBanner, onHome, onEdit }) {
  const pillarScores = PILLARS.map((p) => calcPillarScore(answers[p.id]))
  const avg   = calcOverallScore(pillarScores)
  const level = getLevel(avg)
  const color = level ? level.color : '#888'

  const hasNotes = NOTE_META.some(({ key }) => notes[key]?.trim())

  return (
    <div>
      {savedBanner && (
        <div className={styles.saveBanner}><i className="fa-solid fa-floppy-disk" /> Sessie opgeslagen</div>
      )}

      <div className={styles.layout}>
        {/* ── Left panel ── */}
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <button className={styles.backLink} onClick={onHome}>
            <i className="fa-solid fa-chevron-left" /> Overzicht
          </button>
            <div className={styles.propName}>{propName || 'Propositie'}</div>
            <div className={styles.dateLabel}>Datum: {date}</div>
          </div>

          {/* Combined scores block */}
          <div className={styles.scoresBlock}>
            <div className={styles.scoresInner}>
              {/* Top row: gemiddelde score + maturity level */}
              <div className={styles.topRow}>
                <div className={styles.avgScore}>
                  <span className={styles.metricLabel}>Gemiddelde score</span>
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

            {/* Pencil edit button */}
            <div className={styles.editRow}>
              <button className={styles.editBtn} onClick={onEdit} aria-label="Aanpassen">
                <i className="fa-solid fa-pen" />
              </button>
            </div>
          </div>

          {/* Notes (left panel on desktop) */}
          {hasNotes && (
            <Card style={{ marginBottom: 16 }}>
              <div className={styles.sectionTitle}><i className="fa-solid fa-note-sticky" /> Notities</div>
              {NOTE_META.filter(({ key }) => notes[key]?.trim()).map(({ key, label, icon }) => (
                <div key={key} className={styles.noteBlock}>
                  <div className={styles.noteLabel}><i className={icon} /> {label}</div>
                  <div className={styles.noteText}>{notes[key]}</div>
                </div>
              ))}
            </Card>
          )}

          {/* Maturity levels legend */}
          <Card style={{ marginBottom: 0 }}>
            <div className={styles.sectionTitle}>Maturity levels</div>
            {[...LEVELS].reverse().map((l) => {
              const isActive = level && l.name === level.name
              return (
                <div
                  key={l.name}
                  className={`${styles.levelRow} ${isActive ? styles.levelActive : ''}`}
                  style={isActive ? { borderColor: l.color } : {}}
                >
                  <div className={styles.levelDot} style={{ background: l.color }}>
                    {LEVELS.indexOf(l) + 1}
                  </div>
                  <div className={styles.levelText}>
                    <div className={styles.levelName} style={isActive ? { color: l.color } : {}}>
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
          </Card>
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
