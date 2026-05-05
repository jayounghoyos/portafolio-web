// Direction A — TERMINAL
// Brutalist monospace grid, command-line metaphor, ASCII rules
// Green is reserved for live signals only

const A_BG = '#0a0a0a';
const A_FG = '#e8e6e0';
const A_DIM = '#7a7770';
const A_LINE = '#1f1f1f';
const A_GREEN = 'oklch(0.85 0.22 145)';

const aMono = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';

const aStyles = {
  page: {
    background: A_BG,
    color: A_FG,
    fontFamily: aMono,
    fontSize: 13,
    lineHeight: 1.55,
    minHeight: '100%',
    width: '100%',
    boxSizing: 'border-box',
    padding: '0',
    fontFeatureSettings: '"ss01","calt"',
  },
  rule: { borderTop: `1px solid ${A_LINE}`, margin: 0 },
  ruleDouble: {
    borderTop: `1px solid ${A_LINE}`,
    borderBottom: `1px solid ${A_LINE}`,
    height: 4,
    margin: 0,
  },
};

function ARule({ char = '─', color = A_DIM }) {
  return (
    <div style={{
      color, fontFamily: aMono, fontSize: 12,
      whiteSpace: 'nowrap', overflow: 'hidden', userSelect: 'none',
      letterSpacing: 0,
    }}>
      {char.repeat(400)}
    </div>
  );
}

function ATopBar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', borderBottom: `1px solid ${A_LINE}`,
      fontSize: 11, letterSpacing: 0.4, textTransform: 'uppercase',
      color: A_DIM, position: 'sticky', top: 0, background: A_BG, zIndex: 10,
    }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <span style={{ color: A_FG }}>jyh@portfolio</span>
        <span>~/2026</span>
        <span style={{ color: A_GREEN }}>● online</span>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <span>about</span>
        <span>work</span>
        <span>stack</span>
        <span>experience</span>
        <span style={{ color: A_FG }}>contact</span>
      </div>
      <div style={{ display: 'flex', gap: 24 }}>
        <span>06°14′N 75°34′W</span>
        <span>v1.0</span>
      </div>
    </div>
  );
}

function ASectionHead({ idx, label, meta }) {
  return (
    <div style={{ padding: '60px 32px 18px', display: 'flex', alignItems: 'baseline', gap: 28 }}>
      <span style={{ color: A_GREEN, fontSize: 12 }}>$</span>
      <span style={{ color: A_DIM, fontSize: 11, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        section.{String(idx).padStart(2, '0')}
      </span>
      <span style={{ fontSize: 11, color: A_FG, letterSpacing: 0.6, textTransform: 'uppercase' }}>
        {label}
      </span>
      <span style={{ flex: 1, borderTop: `1px dashed ${A_LINE}`, transform: 'translateY(-3px)' }} />
      <span style={{ color: A_DIM, fontSize: 11 }}>{meta}</span>
    </div>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function AHero() {
  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
        <div>
          <div style={{ color: A_DIM, fontSize: 11, marginBottom: 16, letterSpacing: 0.6 }}>
            ┌── INTRO ─────────────────────────────────────────┐
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, maxWidth: 520, marginBottom: 28 }}>
            <span style={{ color: A_GREEN }}>&gt;</span> Hi, I'm <span style={{ color: A_FG, background: '#1a1a1a', padding: '1px 6px' }}>Juan Andrés Young Hoyos</span>.
            <br />
            <span style={{ color: A_GREEN }}>&gt;</span> Systems Engineering @ EAFIT.
            <br />
            <span style={{ color: A_GREEN }}>&gt;</span> I build things that move — full-stack web,
            <br />
            <span style={{ color: A_GREEN }}>&gt;&nbsp;&nbsp;</span>robotics platforms, and the ML that drives them.
            <br />
            <span style={{ color: A_GREEN }}>&gt;</span> <span style={{ color: A_FG }}>_</span><span style={{ color: A_GREEN, animation: 'aBlink 1s steps(2) infinite' }}>█</span>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            <button style={{
              background: A_GREEN, color: '#000', border: 'none',
              padding: '10px 18px', fontFamily: aMono, fontSize: 12,
              letterSpacing: 0.6, textTransform: 'uppercase', cursor: 'pointer',
              fontWeight: 600,
            }}>./run --portfolio</button>
            <button style={{
              background: 'transparent', color: A_FG, border: `1px solid ${A_LINE}`,
              padding: '10px 18px', fontFamily: aMono, fontSize: 12,
              letterSpacing: 0.6, textTransform: 'uppercase', cursor: 'pointer',
            }}>cat resume.pdf ↗</button>
          </div>

          <div style={{ borderTop: `1px solid ${A_LINE}`, paddingTop: 20, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              ['STATUS', 'available'],
              ['LOC', 'medellín, co'],
              ['STACK', 'ts·py·ros'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ color: A_DIM, fontSize: 10, marginBottom: 4 }}>{k}</div>
                <div style={{ color: A_FG, fontSize: 13 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured project preview */}
        <div style={{ position: 'relative' }}>
          <div style={{ color: A_DIM, fontSize: 11, marginBottom: 16, letterSpacing: 0.6 }}>
            ┌── FEATURED.001 / chassis_v0.3 ──────────────────┐
          </div>
          <div style={{
            border: `1px solid ${A_LINE}`, background: '#0d0d0d',
            aspectRatio: '4/3', position: 'relative', overflow: 'hidden',
          }}>
            {/* faux 3D wireframe placeholder */}
            <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <pattern id="aGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1a1a1a" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#aGrid)" />
              {/* isometric chassis */}
              <g stroke={A_FG} strokeWidth="1" fill="none" opacity="0.85">
                <path d="M 100 180 L 200 130 L 300 180 L 200 230 Z" />
                <path d="M 100 180 L 100 200 L 200 250 L 200 230" />
                <path d="M 200 250 L 300 200 L 300 180" />
                <path d="M 130 165 L 170 145 L 170 165 L 130 185 Z" />
                <path d="M 230 145 L 270 165 L 270 185 L 230 165 Z" />
                <path d="M 130 215 L 170 235" strokeDasharray="2 3" />
                <path d="M 230 235 L 270 215" strokeDasharray="2 3" />
                <circle cx="200" cy="180" r="3" fill={A_GREEN} stroke="none" />
              </g>
              <text x="20" y="280" fill={A_DIM} fontSize="10" fontFamily={aMono}>
                123 nodes · 16 unique meshes · 59 instances
              </text>
              <text x="20" y="30" fill={A_GREEN} fontSize="10" fontFamily={aMono}>
                ● LIVE · cycle 12.0s
              </text>
              <text x="320" y="30" fill={A_DIM} fontSize="10" fontFamily={aMono}>
                FRAME 042881
              </text>
            </svg>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: `1px solid ${A_LINE}`, marginTop: -1 }}>
            {[
              ['TYPE', 'robotics'],
              ['STAGE', 'in dev'],
              ['STACK', 'onshape · gltf · three'],
              ['YEAR', '2026'],
            ].map(([k, v]) => (
              <div key={k} style={{ padding: 12, borderRight: `1px solid ${A_LINE}` }}>
                <div style={{ color: A_DIM, fontSize: 10, marginBottom: 4 }}>{k}</div>
                <div style={{ color: A_FG, fontSize: 11 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* live console strip */}
      <div style={{ marginTop: 36, border: `1px solid ${A_LINE}`, background: '#0d0d0d', padding: '12px 16px', fontSize: 11, color: A_DIM, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <span style={{ color: A_GREEN }}>●</span> [T+00.00] BOOT &middot; sensor array online &nbsp;&middot;&nbsp;
        [T+00.04] CALIBRATE &middot; IMU drift 0.012 &nbsp;&middot;&nbsp;
        [T+00.07] OBJECT detection: VEHICLE_PLATFORM_v0.3 &nbsp;&middot;&nbsp;
        [T+00.09] OBJECT detection: WORKBENCH &nbsp;&middot;&nbsp;
        [T+00.12] CONF check pass · 5/5 targets &nbsp;&middot;&nbsp;
        [T+00.18] STATUS · standing by
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────
function AAbout() {
  return (
    <div style={{ padding: '0 32px 60px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48 }}>
      <div>
        <div style={{ color: A_DIM, fontSize: 11, marginBottom: 8, letterSpacing: 0.6 }}>
          // editor.bio
        </div>
        <div style={{ fontSize: 11, color: A_DIM, lineHeight: 2 }}>
          juan.andrés.young.hoyos
          <br />
          medellín · colombia
          <br />
          eafit · b.s. systems engineering
          <br />
          scholarship recipient
          <br />
          <span style={{ color: A_GREEN }}>$</span> ls ./interests
          <br />
          → robotics
          <br />
          → deep learning
          <br />
          → fullstack
          <br />
          → control systems
        </div>
      </div>
      <div>
        <div style={{ fontSize: 18, lineHeight: 1.7, color: A_FG, maxWidth: 640, fontFamily: aMono }}>
          I work at the intersection of <span style={{ color: A_GREEN }}>machine learning</span> and <span style={{ color: A_GREEN }}>robotics</span>.
          Most of what I build starts as a question — usually about how a physical thing should behave —
          and ends as code, a circuit, or something that rolls.
        </div>
        <div style={{ marginTop: 24, fontSize: 13, lineHeight: 1.8, color: A_DIM, maxWidth: 640 }}>
          I came up through robotics competitions, picked up classical ML on the side,
          and now spend most of my time on deep learning, control, and the full-stack
          glue that makes a model actually useful to someone other than me.
        </div>

        <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: `1px solid ${A_LINE}` }}>
          {[
            ['CURRENTLY', 'building a 4-motor vehicle chassis · CAD → controller → perception'],
            ['STUDYING', 'transformers, kinematics, SLAM, the glue between them'],
            ['READING', 'Probabilistic Robotics · 3B1B · Anthropic & DeepMind papers'],
          ].map(([k, v], i) => (
            <div key={k} style={{ padding: 16, borderRight: i < 2 ? `1px solid ${A_LINE}` : 'none' }}>
              <div style={{ color: A_GREEN, fontSize: 10, marginBottom: 8, letterSpacing: 0.6 }}>— {k}</div>
              <div style={{ color: A_FG, fontSize: 12, lineHeight: 1.6 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────────
const A_PROJECTS = [
  { id: '01', name: 'Chassis v0.3', tag: 'ROBOTICS · IN DEV', year: '2026',
    desc: 'Tubular-frame vehicle chassis. CAD → web. 4 motors, 3 plates, 59 instances.',
    color: A_GREEN, featured: true },
  { id: '02', name: 'Magneto Ads', tag: 'FULLSTACK · ML', year: '2024',
    desc: 'Ad-recommendation system shipped behind a Next.js front end.', color: '#888' },
  { id: '03', name: 'Higiea', tag: 'ROBOTICS', year: '2021',
    desc: 'Disinfectant robot. National robotics competition entry.', color: '#888' },
  { id: '04', name: 'Claw Robot', tag: 'ROBOTICS', year: '2022',
    desc: 'Claw-arm grabbing event. Award-winning competition build.', color: '#888' },
  { id: '05', name: 'Xbox-controlled RPi Car', tag: 'ROBOTICS · FULLSTACK', year: '2023',
    desc: 'Raspberry Pi car driven by an Xbox controller over websocket.', color: '#888' },
  { id: '06', name: 'Game Recommendations', tag: 'ML', year: '2023',
    desc: 'Scikit-learn classifier recommending games by player age.', color: '#888' },
];

function AProjectCard({ p, big }) {
  return (
    <div style={{
      border: `1px solid ${A_LINE}`, background: '#0d0d0d',
      padding: 0, position: 'relative',
      gridColumn: big ? 'span 2' : 'span 1',
      gridRow: big ? 'span 2' : 'span 1',
    }}>
      <div style={{
        aspectRatio: big ? '16/9' : '4/3',
        background: '#0a0a0a',
        borderBottom: `1px solid ${A_LINE}`,
        position: 'relative', overflow: 'hidden',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`ap${p.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="8" y2="8" stroke="#1a1a1a" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="400" height="240" fill={`url(#ap${p.id})`} />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                fill={A_DIM} fontSize="11" fontFamily={aMono} letterSpacing="2">
            [ {p.name.toUpperCase()} ]
          </text>
        </svg>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          fontSize: 10, color: p.color, fontFamily: aMono, letterSpacing: 0.6,
        }}>
          ● {p.tag}
        </div>
        <div style={{
          position: 'absolute', top: 12, right: 12,
          fontSize: 10, color: A_DIM, fontFamily: aMono,
        }}>
          [{p.id}]
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: big ? 22 : 16, color: A_FG, fontWeight: 500 }}>{p.name}</div>
          <div style={{ fontSize: 10, color: A_DIM }}>[ {p.year} ]</div>
        </div>
        <div style={{ fontSize: 12, color: A_DIM, lineHeight: 1.6 }}>{p.desc}</div>
        <div style={{ marginTop: 12, fontSize: 10, color: A_FG, letterSpacing: 0.6 }}>
          → READ CASE STUDY
        </div>
      </div>
    </div>
  );
}

function AProjects() {
  return (
    <div style={{ padding: '0 32px 60px' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: 'auto', gap: 16,
      }}>
        {A_PROJECTS.map(p => <AProjectCard key={p.id} p={p} big={p.featured} />)}
      </div>
    </div>
  );
}

// ── STACK ─────────────────────────────────────────────────────────
const A_STACK = [
  ['LANG', ['TypeScript', 'Python', 'C++', 'Rust', 'SQL']],
  ['WEB', ['Next.js', 'Node', 'React', 'Tailwind', 'tRPC']],
  ['ML', ['PyTorch', 'TensorFlow', 'sklearn', 'NumPy', 'OpenCV']],
  ['ROBOTICS', ['ROS2', 'Onshape', 'Arduino', 'RPi', 'ST7789']],
  ['INFRA', ['Postgres', 'Docker', 'Vercel', 'GitHub Actions', 'Linux']],
];

function AStack() {
  return (
    <div style={{ padding: '0 32px 60px' }}>
      <div style={{ border: `1px solid ${A_LINE}`, background: '#0d0d0d' }}>
        {A_STACK.map(([cat, items], i) => (
          <div key={cat} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr',
            borderTop: i > 0 ? `1px solid ${A_LINE}` : 'none',
          }}>
            <div style={{ padding: '16px 20px', borderRight: `1px solid ${A_LINE}`, color: A_GREEN, fontSize: 11, letterSpacing: 0.8 }}>
              {cat}
            </div>
            <div style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '4px 0' }}>
              {items.map((it, j) => (
                <span key={it} style={{ color: A_FG, fontSize: 13 }}>
                  {it}
                  {j < items.length - 1 && <span style={{ color: A_DIM, margin: '0 12px' }}>·</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── EXPERIENCE ─────────────────────────────────────────────────────────
const A_EXP = [
  { y: '2026 →', t: 'Chassis v0.3', org: 'self-directed', d: 'Vehicle platform, CAD to controller, perception pipeline.' },
  { y: '2024 — 2025', t: 'Magneto Ads', org: 'capstone', d: 'Ad-recommendation behind a Next.js front-end.' },
  { y: '2023', t: 'B.S. Systems Engineering', org: 'EAFIT · scholarship', d: 'Coursework: ML, data structures, robotics, web systems.' },
  { y: '2022', t: 'Claw Robot', org: 'robotics competition', d: 'Award-winning grabbing-event entry.' },
  { y: '2021', t: 'Higiea', org: 'robotics competition', d: 'Disinfectant robot — first national event.' },
];

function AExperience() {
  return (
    <div style={{ padding: '0 32px 80px' }}>
      <div style={{ border: `1px solid ${A_LINE}` }}>
        {A_EXP.map((e, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '160px 1fr 280px 60px',
            borderTop: i > 0 ? `1px solid ${A_LINE}` : 'none',
            padding: '20px 20px',
            alignItems: 'baseline',
          }}>
            <div style={{ color: A_DIM, fontSize: 11 }}>{e.y}</div>
            <div style={{ color: A_FG, fontSize: 16 }}>{e.t}</div>
            <div style={{ color: A_DIM, fontSize: 12 }}>{e.org}</div>
            <div style={{ color: A_GREEN, fontSize: 11, textAlign: 'right' }}>↗</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div style={{ border: `1px solid ${A_LINE}`, padding: 24 }}>
          <div style={{ color: A_GREEN, fontSize: 11, letterSpacing: 0.6, marginBottom: 12 }}>— LET'S TALK</div>
          <div style={{ fontSize: 22, color: A_FG, fontFamily: aMono, marginBottom: 16 }}>
            Open to research, robotics roles, and unreasonably interesting projects.
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 12, color: A_DIM }}>
            <span style={{ color: A_FG }}>email ↗</span>
            <span>github ↗</span>
            <span>linkedin ↗</span>
            <span>cv.pdf ↗</span>
          </div>
        </div>
        <div style={{ border: `1px solid ${A_LINE}`, padding: 24, fontSize: 11, color: A_DIM, lineHeight: 1.9 }}>
          — colophon
          <br />
          set in jetbrains mono.
          <br />
          built deliberately in medellín.
          <br />
          v1.0 / 2026.05.03
          <br />
          06°14′n 75°34′w
          <br />
          <span style={{ color: A_GREEN }}>●</span> last sync · just now
        </div>
      </div>
    </div>
  );
}

// ── ASSEMBLY ─────────────────────────────────────────────────────────
function PortfolioA() {
  return (
    <div style={aStyles.page}>
      <style>{`@keyframes aBlink { 50% { opacity: 0 } }`}</style>
      <ATopBar />
      <ASectionHead idx={1} label="INTRO / FEATURED" meta="article 01 · ~ 2 min" />
      <AHero />
      <ASectionHead idx={2} label="ABOUT" meta="article 02 · byline" />
      <AAbout />
      <ASectionHead idx={3} label="SELECTED WORK" meta="article 03 · 6 entries" />
      <AProjects />
      <ASectionHead idx={4} label="STACK" meta="article 04 · tools of the trade" />
      <AStack />
      <ASectionHead idx={5} label="TIMELINE" meta="article 05 · résumé" />
      <AExperience />
    </div>
  );
}

window.PortfolioA = PortfolioA;
