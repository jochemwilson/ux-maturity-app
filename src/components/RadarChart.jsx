import { PILLARS } from '../data/model.js'

const SIZE    = 500
const CX      = SIZE / 2
const CY      = SIZE / 2 + 30
const RADIUS  = 125

const ANGLES_DEG = [-90, 150, 30]

function polar(angleDeg, r) {
  const a = (angleDeg * Math.PI) / 180
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)]
}

// Simple SVG icon paths for each pillar
function PillarIcon({ index, cx, cy, color, bg }) {
  const S = 22
  const x = cx - S / 2
  const y = cy - S / 2

  const icons = [
    // Partnerschap – handshake (two hands)
    <g key="p" transform={`translate(${x},${y})`}>
      <rect width={S} height={S} rx={5} fill={bg} />
      <path
        d="M4 13c0-1 .8-1.8 2-2l3-1 1 1-2 1.5L9 14h4l2-2 1 1-2 2.5c-.3.3-.7.5-1 .5H9l-1.5 1L6 16.5"
        fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M11 11l1.5-1.5c.4-.4 1-.4 1.4 0l2.6 2.6c.4.4.4 1 0 1.4L15 15"
        fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round"
      />
      <path
        d="M4 13l-1.5 1.5c-.4.4-.4 1 0 1.4L5 17.5"
        fill="none" stroke={color} strokeWidth={1.4} strokeLinecap="round"
      />
    </g>,

    // Research – bar chart
    <g key="r" transform={`translate(${x},${y})`}>
      <rect width={S} height={S} rx={5} fill={bg} />
      <rect x={4}  y={13} width={3.5} height={5} rx={1} fill={color} />
      <rect x={9}  y={9}  width={3.5} height={9} rx={1} fill={color} />
      <rect x={14} y={5}  width={3.5} height={13} rx={1} fill={color} />
    </g>,

    // Design System – grid/table
    <g key="d" transform={`translate(${x},${y})`}>
      <rect width={S} height={S} rx={5} fill={bg} />
      <rect x={4}  y={4}  width={6} height={6} rx={1.2} fill={color} />
      <rect x={12} y={4}  width={6} height={6} rx={1.2} fill={color} opacity={0.5} />
      <rect x={4}  y={12} width={6} height={6} rx={1.2} fill={color} opacity={0.5} />
      <rect x={12} y={12} width={6} height={6} rx={1.2} fill={color} />
    </g>,
  ]

  return icons[index]
}

export default function RadarChart({ scores }) {
  const gridLevels = [1, 2, 3, 4, 5]
  const colors = PILLARS.map((p) => p.color)
  const bgs    = PILLARS.map((p) => p.bg)
  const names  = ['Partnerschap', 'Research & Inzichten', 'Design System']
  const subs   = PILLARS.map((p) => p.sub)

  const gridPolygons = gridLevels.map((lvl) => {
    const pts = ANGLES_DEG.map((a) => polar(a, (RADIUS * lvl) / 5))
    return pts.map((p) => p.join(',')).join(' ')
  })

  const dataPoints = PILLARS.map((_, i) => {
    const s = scores[i] || 0
    return polar(ANGLES_DEG[i], (RADIUS * s) / 5)
  })
  const dataPolygon = dataPoints.map((p) => p.join(',')).join(' ')

  // Label anchor positions (further out)
  const LABEL_OFFSET = RADIUS + 80
  const labelPositions = ANGLES_DEG.map((a) => polar(a, LABEL_OFFSET))

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="100%"
      style={{ display: 'block' }}
      aria-label={`Radar chart: Partnerschap ${scores[0]?.toFixed(1) ?? 0}, Research ${scores[1]?.toFixed(1) ?? 0}, Design System ${scores[2]?.toFixed(1) ?? 0}`}
      role="img"
    >
      {/* Grid polygons */}
      {gridPolygons.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="#dde3ec" strokeWidth={i === 4 ? 1.2 : 0.8} />
      ))}

      {/* Axis lines */}
      {ANGLES_DEG.map((a, i) => {
        const [x, y] = polar(a, RADIUS)
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="#dde3ec" strokeWidth={0.8} />
      })}

      {/* Grid tick labels on top axis */}
      {gridLevels.map((lvl) => {
        const [lx, ly] = polar(-90, (RADIUS * lvl) / 5)
        return (
          <text key={lvl} x={lx + 5} y={ly + 4} fontSize={10} fill="#bbb" textAnchor="start">
            {lvl}
          </text>
        )
      })}

      {/* Data fill */}
      <polygon
        points={dataPolygon}
        fill="rgba(29,78,53,0.10)"
        stroke="#1D4E35"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Data point circles */}
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} fill={colors[i]} stroke="#fff" strokeWidth={2} />
      ))}

      {/* Score labels near points */}
      {dataPoints.map(([x, y], i) => {
        const s = scores[i]
        if (!s) return null
        return (
          <text key={i} x={x} y={y - 12} fontSize={11} fill={colors[i]} fontWeight="700" textAnchor="middle">
            {s.toFixed(1)}
          </text>
        )
      })}

      {/* Pillar labels with icons */}
      {labelPositions.map(([lx, ly], i) => {
        const anchor = i === 0 ? 'middle' : i === 1 ? 'middle' : 'middle'
        const iconSize = 22
        const lineH = 15

        // Sub text – wrap at ~20 chars
        const subWords = subs[i].split(' ')
        const subLines = []
        let cur = ''
        for (const w of subWords) {
          if ((cur + ' ' + w).trim().length > 22) { subLines.push(cur.trim()); cur = w }
          else cur = (cur + ' ' + w).trim()
        }
        if (cur) subLines.push(cur)

        const nameLines = names[i].includes(' & ')
          ? names[i].split(' & ').map((l, j) => j === 0 ? l + ' &' : l)
          : [names[i]]
        const totalHeight = iconSize + 4 + nameLines.length * lineH + subLines.length * 13
        const startY = ly - totalHeight / 2

        return (
          <g key={i}>
            {/* Icon box */}
            <PillarIcon index={i} cx={lx} cy={startY + iconSize / 2} color={colors[i]} bg={bgs[i]} />

            {/* Pillar name */}
            {nameLines.map((line, j) => (
              <text
                key={j}
                x={lx}
                y={startY + iconSize + 4 + (j + 1) * lineH}
                textAnchor={anchor}
                fontSize={12}
                fontWeight="700"
                fill={colors[i]}
              >
                {line}
              </text>
            ))}

            {/* Sub text */}
            {subLines.map((line, j) => (
              <text
                key={j}
                x={lx}
                y={startY + iconSize + 4 + nameLines.length * lineH + 4 + (j + 1) * 13}
                textAnchor={anchor}
                fontSize={10}
                fill="#888"
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
