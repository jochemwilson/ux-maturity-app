import { Btn, Card, ProgressBar, StepLabel } from './UI.jsx'
import { PILLARS } from '../data/model.js'
import styles from './NotesView.module.css'

const NOTE_FIELDS = [
  { key: 'goed',       label: 'Wat gaat goed?',                   icon: 'fa-solid fa-circle-check',          color: '#1D9E75', placeholder: 'Beschrijf wat er al goed werkt binnen deze propositie...' },
  { key: 'knelpunten', label: 'Wat zijn uitdagingen / knelpunten?', icon: 'fa-solid fa-triangle-exclamation',  color: '#EF9F27', placeholder: 'Beschrijf de belangrijkste knelpunten of uitdagingen...' },
  { key: 'acties',     label: 'Acties en besluiten',               icon: 'fa-solid fa-bolt',                  color: '#534AB7', placeholder: 'Wat zijn de concrete vervolgstappen of besluiten?' },
]

export default function NotesView({ notes, onChange, onPrev, onFinish }) {
  return (
    <div>
      <ProgressBar step={PILLARS.length + 1} total={PILLARS.length + 1} />
      <StepLabel>Stap 4 van 4 · Notities & acties</StepLabel>

      {NOTE_FIELDS.map(({ key, label, icon, color, placeholder }) => (
        <Card key={key} style={{ marginBottom: 12 }}>
          <label className={styles.label} htmlFor={`note_${key}`}>
            <i className={icon} style={{ color }} />
            {label}
          </label>
          <textarea
            id={`note_${key}`}
            className={styles.textarea}
            placeholder={placeholder}
            value={notes[key]}
            onChange={(e) => onChange(key, e.target.value)}
            rows={3}
          />
        </Card>
      ))}

      <div className={styles.nav}>
        <Btn onClick={onPrev}>← Vorige</Btn>
        <Btn variant="primary" onClick={onFinish}>Bekijk scorecard →</Btn>
      </div>
    </div>
  )
}
