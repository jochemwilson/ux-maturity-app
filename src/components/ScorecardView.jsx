import { Btn, Card } from './UI.jsx'
import RadarChart from './RadarChart.jsx'
import { PILLARS, LEVELS, calcPillarScore, calcOverallScore, getLevel } from '../data/model.js'
import styles from './ScorecardView.module.css'

const DIM_COLORS = ['#534AB7', '#0F6E56', '#185FA5']
const DIM_LABELS = ['Partnerschap', 'R&I', 'Design System']

const NOTE_META = [
  { key: 'goed',       label: 'Wat gaat goed',           icon: '✅' },
  { key: 'knelpunten', label: 'Uitdagingen / knelpunten', icon: '⚠️' },
  { key: 'acties',     label: 'Acties en besluiten',      icon: '⚡' },
]

export default function ScorecardView({ propName, date, answers, notes, savedBanner, onHome, onEdit, onNew }) {
  const pillarScores = PILLARS.map((p) => calcPillarScore(answers[p.id]))
  const avg   = calcOverallScore(pillarScores)
  const level = getLevel(avg)
  const color = level ? level.color : '#888'

  const hasNotes = NOTE_META.some(({ key }) => notes[key]?.trim())

  return (
    <div>
      {savedBanner && (
        <div className={styles.saveBanner}>💾 Sessie opgeslagen</div>
      )}

      <div className={styles.layout}>
        {/* ── Left panel ── */}
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <div className={styles.eyebrow}>UX Maturity</div>
            <div className={styles.propName}>{propName || 'Propositie'}</div>
            <div className={styles.dateLabel}>Datum: {date}</div>
          </div>

          {/* Top metrics */}
          <div className={styles.topGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>Gemiddelde score</div>
              <div className={styles.metricValue} style={{ color }}>
                {avg != null ? avg.toFixed(1) : '–'}
              </div>
            </div>
            <div className={styles.metricCard}>
              <div className={styles.metricLabel}>UX Maturity level</div>
              <div className={styles.metricLevel} style={{ color }}>
                {level ? level.name : '–'}
              </div>
            </div>
          </div>

          {/* Pillar scores */}
          <div className={styles.dimGrid}>
            {PILLARS.map((p, i) => (
              <div key={p.id} className={styles.dimCard}>
                <div className={styles.dimLabel}>{DIM_LABELS[i]}</div>
                <div className={styles.dimValue} style={{ color: DIM_COLORS[i] }}>
                  {pillarScores[i] != null ? pillarScores[i].toFixed(1) : '–'}
                </div>
              </div>
            ))}
          </div>

          {/* Notes (left panel on desktop) */}
          {hasNotes && (
            <Card style={{ marginBottom: 16 }}>
              <div className={styles.sectionTitle}>📝 Notities</div>
              {NOTE_META.filter(({ key }) => notes[key]?.trim()).map(({ key, label, icon }) => (
                <div key={key} className={styles.noteBlock}>
                  <div className={styles.noteLabel}>{icon} {label}</div>
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

      {/* Actions – full width below layout */}
      <div className={styles.actions}>
        <Btn onClick={onHome}>← Alle sessies</Btn>
        <div className={styles.actionsRight}>
          <Btn onClick={onEdit}>Aanpassen</Btn>
          <Btn variant="primary" onClick={onNew}>Nieuwe assessment</Btn>
        </div>
      </div>
    </div>
  )
}
