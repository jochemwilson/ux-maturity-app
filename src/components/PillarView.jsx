import { Btn, Card, ProgressBar, StepLabel } from './UI.jsx'
import { PILLARS } from '../data/model.js'
import styles from './PillarView.module.css'

export default function PillarView({ pillarIndex, answers, onAnswer, onPrev, onNext, isLast }) {
  const pillar = PILLARS[pillarIndex]
  const canNext = answers.every((a) => a !== null && a !== undefined)

  return (
    <div>
      <ProgressBar step={pillarIndex + 1} total={PILLARS.length + 1} />
      <StepLabel>Stap {pillarIndex + 1} van {PILLARS.length} · {pillar.name}</StepLabel>

      <div className={styles.pillarHeader}>
        <div className={styles.pillarIcon} style={{ background: pillar.bg }}>
          {pillar.emoji}
        </div>
        <div>
          <div className={styles.pillarName} style={{ color: pillar.color }}>{pillar.name}</div>
          <div className={styles.pillarSub}>{pillar.sub}</div>
        </div>
      </div>

      {pillar.questions.map((q, qi) => (
        <Card key={q.id} style={{ marginBottom: 12 }}>
          <div className={styles.qLabel}>{q.label}</div>
          <div className={styles.qText}>{q.text}</div>
          <div className={styles.options}>
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi
              return (
                <button
                  key={oi}
                  className={`${styles.optBtn} ${selected ? styles.optSelected : ''}`}
                  style={selected ? { borderColor: pillar.color, background: pillar.bg } : {}}
                  onClick={() => onAnswer(qi, oi)}
                >
                  <div
                    className={styles.optNum}
                    style={selected ? { background: pillar.color, borderColor: pillar.color, color: '#fff' } : {}}
                  >
                    {oi + 1}
                  </div>
                  <div className={styles.optText}>{opt}</div>
                </button>
              )
            })}
          </div>
        </Card>
      ))}

      <div className={styles.nav}>
        <Btn onClick={onPrev}>← Vorige</Btn>
        <Btn variant="primary" onClick={onNext} disabled={!canNext}>
          {isLast ? 'Notities toevoegen →' : 'Volgende →'}
        </Btn>
      </div>
    </div>
  )
}
