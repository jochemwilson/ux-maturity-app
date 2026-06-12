import styles from './UI.module.css'

export function Btn({ onClick, variant = 'default', disabled, children, fullWidth, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        styles.btn,
        styles[`btn_${variant}`],
        fullWidth ? styles.btn_full : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

export function Card({ children, className = '', style = {} }) {
  return (
    <div className={`${styles.card} ${className}`} style={style}>
      {children}
    </div>
  )
}

export function PageHeader({ eyebrow, title, color }) {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <div className={styles.pageTitle} style={color ? { color } : {}}>
        {title}
      </div>
    </div>
  )
}

export function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100)
  return (
    <div className={styles.progressTrack}>
      <div className={styles.progressFill} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function StepLabel({ children }) {
  return <div className={styles.stepLabel}>{children}</div>
}

export function Badge({ label, color, bg }) {
  return (
    <span className={styles.badge} style={{ color, background: bg }}>
      {label}
    </span>
  )
}
