import { Btn, Card, PageHeader } from './UI.jsx'
import styles from './HomeView.module.css'

export default function HomeView({ sessions, onNew, onOpen, onDelete }) {
  return (
    <div>
      <PageHeader eyebrow="UX Maturity" title="Assessment" />

      <Btn variant="primary" fullWidth onClick={onNew}>
        + Nieuwe assessment starten
      </Btn>

      {sessions.length > 0 ? (
        <div className={styles.list}>
          <div className={styles.listLabel}>Opgeslagen sessies</div>
          {sessions.map((s) => (
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
                  {['partnerschap', 'research', 'designsystem'].map((id, i) => {
                    const colors = ['#534AB7', '#0F6E56', '#185FA5']
                    const labels = ['P', 'R', 'D']
                    const score = s.pillarScores?.[id]
                    return (
                      <div key={id} className={styles.dimPill} style={{ color: colors[i] }}>
                        <span className={styles.dimLabel}>{labels[i]}</span>
                        <span className={styles.dimVal}>{score != null ? score.toFixed(1) : '–'}</span>
                      </div>
                    )
                  })}
                </div>
              </button>
              <div className={styles.deleteWrap}>
                <Btn variant="danger" onClick={(e) => { e.stopPropagation(); onDelete(s.id) }}>
                  <i className="fa-solid fa-trash" />
                </Btn>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          Nog geen opgeslagen sessies.
          <br />
          Start een nieuwe assessment hierboven.
        </div>
      )}
    </div>
  )
}
