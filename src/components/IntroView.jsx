import { useState } from 'react'
import { Btn, Card, PageHeader } from './UI.jsx'
import styles from './IntroView.module.css'

const PROPOSITIES = [
  'Acute Zorg',
  'Diagnostiek',
  'Patiënt',
  'Regiozorg',
  'Screening & Preventie',
  'Jeugd',
  'Zorgdeclaraties',
  'Zorgverzekeraars',
]

export default function IntroView({ propName, onChange, onBack, onStart }) {
  // When editing a saved session with a custom name, start in "anders" mode
  const [isAnders, setIsAnders] = useState(
    () => propName !== '' && !PROPOSITIES.includes(propName)
  )

  const selectValue = isAnders ? '__anders__' : propName

  function handleSelect(e) {
    const val = e.target.value
    if (val === '__anders__') {
      setIsAnders(true)
      onChange('')
    } else {
      setIsAnders(false)
      onChange(val)
    }
  }

  return (
    <div>
      <PageHeader eyebrow="UX Maturity · Nieuwe assessment" title="Propositie" />

      <Card style={{ marginBottom: 12 }}>
        <label className={styles.label} htmlFor="propselect">
          Naam van de propositie
        </label>
        <select
          id="propselect"
          className={styles.select}
          value={selectValue}
          onChange={handleSelect}
        >
          <option value="" disabled>Kies een propositie…</option>
          {PROPOSITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
          <option value="__anders__">Anders…</option>
        </select>

        {selectValue === '__anders__' && (
          <input
            id="propname"
            type="text"
            className={styles.input}
            placeholder="Naam van de propositie"
            value={propName}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        )}
      </Card>

      <Card className={styles.infoCard}>
        <div className={styles.infoTitle}>Wat wordt er beoordeeld?</div>
        <p className={styles.infoText}>
          De propositie wordt gescoord op drie pijlers:{' '}
          <strong style={{ color: '#534AB7' }}>Partnerschap</strong>,{' '}
          <strong style={{ color: '#0F6E56' }}>Research & Inzichten</strong> en{' '}
          <strong style={{ color: '#185FA5' }}>Design System</strong>.
          Per pijler worden twee scoringsvragen gesteld, gevolgd door een notitieronde.
          De gemiddelde score bepaalt het maturity niveau.
        </p>
        <div className={styles.balansNote}>
          <i className="fa-solid fa-lightbulb" /> Balansregel: een propositie kan maximaal 1 niveau hoger scoren dan de laagst scorende pijler.
        </div>
      </Card>

      <div className={styles.nav}>
        <Btn onClick={onBack}>← Terug</Btn>
        <Btn variant="primary" onClick={onStart} disabled={!propName.trim()}>Start →</Btn>
      </div>
    </div>
  )
}
