// ── Maturity levels ────────────────────────────────────────────────────────

export const LEVELS = [
  {
    value: 1,
    name: 'Ad hoc',
    color: '#D85A30',
    range: [1, 1.9],
    tagline: 'UX is incidenteel en reactief.',
    desc: 'We werken op basis van aannames, zonder structuur of samenhang.',
    focus: 'Basis creëren: zicht krijgen, eerste samenwerking opstarten.',
    practice: [
      'Geen structurele UX rol',
      'Contact incidenteel en op verzoek',
      'Geen structureel onderzoek of data',
      'Geen design system',
      'Elk team ontwerpt en bouwt zelf',
    ],
  },
  {
    value: 2,
    name: 'Projectmatig',
    color: '#EF9F27',
    range: [2, 2.9],
    tagline: 'UX wordt per project ingezet.',
    desc: 'Samenwerking en inzichten zijn lokaal en inconsistent.',
    focus: 'Structuur aanbrengen: processen, rollen en inzichten consistent maken.',
    practice: [
      'UX sluit aan bij projecten, vaak na start',
      'Onderzoek en data per project',
      'Losse componenten of richtlijnen',
      'Gebruik en adoptie beperkt',
    ],
  },
  {
    value: 3,
    name: 'Gestructureerd',
    color: '#97C459',
    range: [3, 3.9],
    tagline: 'UX is structureel onderdeel van ontwikkeling.',
    desc: 'Processen, rollen en inzichten zijn ingericht en worden gedeeld.',
    focus: 'Verankeren: standaarden, inzichten en samenwerking breder toepassen.',
    practice: [
      'UX is vaste partner binnen teams',
      'Methoden, tools en templates aanwezig',
      'Inzichten gedeeld en gebruikt binnen meerdere teams',
      'Design system toegepast en adoptie groeit',
    ],
  },
  {
    value: 4,
    name: 'Geïntegreerd',
    color: '#1D9E75',
    range: [4, 4.4],
    tagline: 'UX is geïntegreerd in besluitvorming.',
    desc: 'Inzichten sturen prioriteiten en UX is een gezamenlijke verantwoordelijkheid.',
    focus: 'Integreren: inzichten sturen beslissingen en experience wordt schaalbaar.',
    practice: [
      'UX strategische partner',
      'Inzichten sturen prioriteiten en roadmap',
      'Design system geborgd en schaalbaar',
      'Gezamenlijke verantwoordelijkheid voor UX',
    ],
  },
  {
    value: 5,
    name: 'Experience gedreven',
    color: '#1D4E35',
    range: [4.5, 5],
    tagline: 'Gebruikerswaarde stuurt strategie en innovatie.',
    desc: 'UX beïnvloedt de koers en zorgt voor continue waarde en differentiatie.',
    focus: 'Leiden: gebruikerswaarde is het startpunt van strategie en innovatie.',
    practice: [
      'UX stuurt mede strategie en investeringen',
      'Continu leren en optimaliseren op impact',
      'Design system als strategisch product',
      'Gebruikerswaarde in DNA van de organisatie',
    ],
  },
]

// ── Pillars ────────────────────────────────────────────────────────────────

export const PILLARS = [
  {
    id: 'partnerschap',
    name: 'Partnerschap',
    sub: 'Hoe volwassen is de samenwerking en rol van UX?',
    color: '#534AB7',
    bg: '#EEEDFE',
    icon: 'fa-solid fa-handshake',
    questions: [
      {
        id: 'betrokkenheid',
        label: 'Betrokkenheid',
        text: 'Wanneer wordt UX betrokken bij ontwikkeling?',
        options: [
          'Alleen incidenteel of op verzoek',
          'Per project, vaak na start',
          'Structureel betrokken binnen teams',
          'Vroeg betrokken bij roadmapbeslissingen',
          'Continue betrokken bij besluitvorming',
        ],
      },
      {
        id: 'invloed',
        label: 'Invloed UX',
        text: 'Hoe wordt UX gezien binnen de propositie?',
        options: ['Uitvoerend', 'Adviserend', 'Samenwerkend', 'Sturend', 'Richtinggevend'],
      },
    ],
  },
  {
    id: 'research',
    name: 'Research & Inzichten',
    sub: 'Hoe volwassen is de inzet van onderzoek en data?',
    color: '#0F6E56',
    bg: '#E1F5EE',
    icon: 'fa-solid fa-chart-column',
    questions: [
      {
        id: 'toepassing',
        label: 'Toepassing',
        text: 'Hoe structureel worden onderzoek en data ingezet?',
        options: [
          'Er wordt geen onderzoek gedaan, data gemeten',
          'Onderzoek/data projectafhankelijk',
          'Onderzoek/data actief en structureel ingezet',
          'Onderzoek/data actief ingezet vanaf start',
          'Continu leren en optimaliseren',
        ],
      },
      {
        id: 'impact',
        label: 'Impact',
        text: 'Hoe worden inzichten gedeeld en gebruikt?',
        options: [
          'Inzichten worden niet gebruikt',
          'Inzichten worden soms gebruikt als onderbouwing',
          'Inzichten worden regelmatig meegenomen',
          'Inzichten sturen prioriteiten en roadmap',
          'Inzichten zijn leidend in besluitvorming',
        ],
      },
    ],
  },
  {
    id: 'designsystem',
    name: 'Design System',
    sub: 'Hoe volwassen is het gebruik van het Design System?',
    color: '#185FA5',
    bg: '#E6F1FB',
    icon: 'fa-solid fa-layer-group',
    questions: [
      {
        id: 'toepassing',
        label: 'Toepassing',
        text: 'Wat is de invloed van het Design System op ontwerpkeuzes?',
        options: [
          'Nauwelijks',
          'Per project',
          'Actief en structureel',
          'Geborgd en schaalbaar',
          'Breed gedragen en de standaard',
        ],
      },
      {
        id: 'consistentie',
        label: 'Consistentie',
        text: 'Hoe consistent is de gebruikerservaring?',
        options: [
          'Sterk inconsistent',
          'Beperkte consistentie',
          'Gestandaardiseerd binnen teams',
          'Consistent over teams heen',
          'Consistent en innovatieversnellend',
        ],
      },
    ],
  },
]

// ── Scoring helpers ────────────────────────────────────────────────────────

/** Score for a single pillar (average of its answered questions, 1-based) */
export function calcPillarScore(answers) {
  if (!answers || answers.some((a) => a === null || a === undefined)) return null
  return answers.reduce((s, a) => s + (a + 1), 0) / answers.length
}

/**
 * Overall score: average of pillar scores, capped at lowest + 1 (balansregel).
 * A propositie can score at most 1 level above its lowest-scoring pillar.
 */
export function calcOverallScore(pillarScores) {
  const valid = pillarScores.filter((s) => s !== null && s !== undefined)
  if (!valid.length) return null
  const avg = valid.reduce((s, v) => s + v, 0) / valid.length
  const min = Math.min(...valid)
  return avg - min > 1 ? min + 1 : avg
}

/** Find the maturity level object for a given score */
export function getLevel(score) {
  if (score === null || score === undefined) return null
  return LEVELS.find((l) => score >= l.range[0] && score <= l.range[1]) || LEVELS[0]
}

// ── Session helpers ────────────────────────────────────────────────────────

export function makeId() {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7)
}

export function todayStr() {
  return new Date().toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function freshAnswers() {
  return Object.fromEntries(PILLARS.map((p) => [p.id, p.questions.map(() => null)]))
}

export function freshNotes() {
  return { goed: '', knelpunten: '', acties: '' }
}

/** Derive summary fields from a full session object */
export function deriveSessionMeta(session) {
  const pillarScores = PILLARS.map((p) => calcPillarScore(session.answers[p.id]))
  const avg = calcOverallScore(pillarScores)
  const level = getLevel(avg)
  return {
    ...session,
    pillarScores: Object.fromEntries(PILLARS.map((p, i) => [p.id, pillarScores[i]])),
    avgScore: avg,
    levelName: level ? level.name : '–',
    levelColor: level ? level.color : '#888',
  }
}
