// Direction B — MAGAZINE
// Editorial display serif × monospace, asymmetric grid, oversized numerals
// Green is a single highlight ink

const B_BG = '#0c0c0d';
const B_FG = '#f2efe8';
const B_DIM = '#8a8780';
const B_LINE = 'rgba(242,239,232,0.12)';
const B_GREEN = 'oklch(0.85 0.22 145)';

const bSerif = '"Instrument Serif", "Iowan Old Style", Georgia, serif';
const bMono = '"JetBrains Mono", ui-monospace, Menlo, Consolas, monospace';

const bStyles = {
  page: {
    background: B_BG,
    color: B_FG,
    fontFamily: bSerif,
    minHeight: '100%',
    width: '100%',
    boxSizing: 'border-box',
  },
};

function BMast() {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', padding: '20px 40px',
      borderBottom: `1px solid ${B_LINE}`,
      fontFamily: bMono, fontSize: 11, color: B_DIM,
      textTransform: 'uppercase', letterSpacing: 0.8,
      position: 'sticky', top: 0, background: B_BG, zIndex: 10,
    }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <span style={{ color: B_FG }}>JYH—2026</span>
        <span>VOL. 01</span>
        <span>NO. 01</span>
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        <span>Index</span>
        <span>About</span>
        <span>Work</span>
        <span>Stack</span>
        <span>Letter</span>
      </div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'flex-end' }}>
        <span><span style={{ color: B_GREEN }}>●</span> Available</span>
        <span>06°14′N</span>
      </div>
    </div>
  );
}

// ── HERO ─────────────────────────────────────────────────────────
function BHero() {
  return (
    <div style={{ padding: '60px 40px 40px' }}>
      {/* huge editorial banner */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: bMono, fontSize: 11, color: B_DIM, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 24 }}>
          <span>— Issue 01 / The Vehicle Issue</span>
          <span>Medellín · May 2026</span>
        </div>

        <h1 style={{
          fontFamily: bSerif, fontSize: 'clamp(64px, 11vw, 168px)',
          fontWeight: 400, lineHeight: 0.92, letterSpacing: '-0.03em',
          margin: 0, color: B_FG,
        }}>
          Juan Andrés
          <br />
          <span style={{ fontStyle: 'italic', color: B_FG }}>Young Hoyos</span>
          <span style={{ color: B_GREEN }}>.</span>
        </h1>

        <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, alignItems: 'start', borderTop: `1px solid ${B_LINE}`, paddingTop: 24 }}>
          <div style={{ fontSize: 22, lineHeight: 1.3, color: B_FG, fontFamily: bSerif, gridColumn: 'span 2' }}>
            <span style={{ fontFamily: bMono, fontSize: 11, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase', display: 'block', marginBottom: 12 }}>
              — The byline
            </span>
            Engineering student at <em>EAFIT</em>, building a four-motor vehicle platform from CAD to controller — and the perception stack that will eventually drive it. Full-stack when the model needs an interface.
          </div>
          <div style={{ fontFamily: bMono, fontSize: 11, color: B_DIM, lineHeight: 1.9 }}>
            <div style={{ color: B_GREEN, marginBottom: 8 }}>— On the cover</div>
            01 · <span style={{ color: B_FG }}>Chassis v0.3</span> — page 14
            <br />
            02 · Magneto Ads — page 22
            <br />
            03 · The full toolbox — page 30
            <br />
            04 · A letter to the editor — page 36
          </div>
        </div>
      </div>

      {/* featured project plate */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, marginTop: 48 }}>
        <div style={{
          aspectRatio: '4/3', background: '#15141a',
          position: 'relative', overflow: 'hidden', borderRadius: 2,
        }}>
          <svg viewBox="0 0 600 450" style={{ width: '100%', height: '100%', display: 'block' }}>
            <defs>
              <pattern id="bGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
              </pattern>
              <radialGradient id="bGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={B_GREEN} stopOpacity="0.18" />
                <stop offset="100%" stopColor={B_GREEN} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="600" height="450" fill="url(#bGrid)" />
            <rect width="600" height="450" fill="url(#bGlow)" />
            {/* exploded chassis */}
            <g stroke={B_FG} strokeWidth="1.2" fill="none" opacity="0.9">
              <path d="M 180 270 L 300 200 L 420 270 L 300 340 Z" />
              <path d="M 180 270 L 180 295 L 300 365 L 300 340" />
              <path d="M 300 365 L 420 295 L 420 270" />
              <path d="M 220 250 L 270 220 L 270 240 L 220 270 Z" />
              <path d="M 330 220 L 380 250 L 380 270 L 330 240 Z" />
              <path d="M 270 290 L 330 290" strokeDasharray="3 4" opacity="0.5" />
              <circle cx="300" cy="270" r="4" fill={B_GREEN} stroke="none" />
              {/* dimension lines */}
              <g stroke={B_DIM} strokeWidth="0.5" opacity="0.6">
                <line x1="180" y1="380" x2="420" y2="380" />
                <line x1="180" y1="375" x2="180" y2="385" />
                <line x1="420" y1="375" x2="420" y2="385" />
              </g>
            </g>
            <text x="300" y="395" fill={B_DIM} fontSize="10" fontFamily={bMono} textAnchor="middle">
              480.0 mm
            </text>
            <text x="40" y="40" fill={B_GREEN} fontSize="10" fontFamily={bMono}>
              FIG. 01
            </text>
            <text x="40" y="425" fill={B_DIM} fontSize="10" fontFamily={bMono}>
              Onshape · 123 nodes · 16 unique meshes
            </text>
            <text x="560" y="40" fill={B_DIM} fontSize="10" fontFamily={bMono} textAnchor="end">
              ● LIVE
            </text>
          </svg>
        </div>

        <div>
          <div style={{ fontFamily: bMono, fontSize: 11, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 16 }}>
            ◆ Featured · The Chassis
          </div>
          <h2 style={{
            fontFamily: bSerif, fontSize: 56, fontWeight: 400,
            lineHeight: 1, margin: 0, letterSpacing: '-0.02em',
          }}>
            A vehicle, in <em>pieces</em>.
          </h2>
          <p style={{ fontFamily: bSerif, fontSize: 18, lineHeight: 1.5, color: B_FG, marginTop: 20 }}>
            The hero on the page is the actual assembly from Onshape, streaming in as glTF. It cycles every twelve seconds. The CAD lives upstream of the web — same model, same units.
          </p>
          <div style={{ marginTop: 24, borderTop: `1px solid ${B_LINE}`, paddingTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontFamily: bMono, fontSize: 11 }}>
            {[
              ['Source', 'Onshape (.gltf)'],
              ['Nodes', '123'],
              ['Unique', '16'],
              ['Instances', '59'],
            ].map(([k, v]) => (
              <div key={k}>
                <div style={{ color: B_DIM, marginBottom: 4 }}>{k}</div>
                <div style={{ color: B_FG }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 16, alignItems: 'center', fontFamily: bMono, fontSize: 12 }}>
            <span style={{
              color: '#000', background: B_GREEN, padding: '8px 14px',
              letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 600,
            }}>
              Read the case study →
            </span>
            <span style={{ color: B_DIM }}>or, jump to all work ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SECTION HEADER ─────────────────────────────────────────────────────────
function BSectionHead({ no, kicker, title, lede }) {
  return (
    <div style={{ padding: '80px 40px 32px', borderTop: `1px solid ${B_LINE}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 32, alignItems: 'start' }}>
        <div style={{ fontFamily: bMono, fontSize: 11, color: B_DIM, textTransform: 'uppercase', letterSpacing: 0.8 }}>
          <div style={{ fontFamily: bSerif, fontSize: 96, lineHeight: 1, color: B_FG, fontStyle: 'italic' }}>
            {no}
          </div>
          <div style={{ marginTop: 12, color: B_GREEN }}>— {kicker}</div>
        </div>
        <div>
          <h2 style={{
            fontFamily: bSerif, fontSize: 'clamp(40px, 5vw, 72px)',
            fontWeight: 400, lineHeight: 1, margin: 0, letterSpacing: '-0.02em',
            maxWidth: 900,
          }}>
            {title}
          </h2>
          {lede && (
            <p style={{ fontFamily: bSerif, fontSize: 20, lineHeight: 1.4, color: B_DIM, marginTop: 20, maxWidth: 720 }}>
              {lede}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────
function BAbout() {
  return (
    <>
      <BSectionHead
        no="02"
        kicker="The byline"
        title={<>A short version, <em>until</em> the long version is asked for.</>}
      />
      <div style={{ padding: '0 40px 60px', display: 'grid', gridTemplateColumns: '180px 1fr 1fr', gap: 32 }}>
        <div style={{ fontFamily: bMono, fontSize: 11, color: B_DIM, lineHeight: 1.9 }}>
          <div style={{ color: B_GREEN, marginBottom: 12 }}>— ABSTRACT</div>
          ML × ROBOTICS × WEB.
          <br />
          MEDELLÍN, COLOMBIA.
          <br />
          EAFIT · B.S. Systems Eng.
          <br />
          Scholarship recipient.
          <br /><br />
          <div style={{ color: B_GREEN, marginBottom: 12 }}>— FILED UNDER</div>
          robotics ·
          <br />
          deep learning ·
          <br />
          fullstack ·
          <br />
          control systems
        </div>

        <div style={{ fontFamily: bSerif }}>
          <p style={{ fontSize: 22, lineHeight: 1.4, margin: '0 0 20px', color: B_FG }}>
            <span style={{ float: 'left', fontSize: 78, lineHeight: 0.85, marginRight: 10, marginTop: 6, color: B_GREEN, fontStyle: 'italic' }}>I</span>
            work at the intersection of machine learning and robotics. Most of what I build starts as a question — usually about how a physical thing should behave — and ends as code, a circuit, or something that <em>rolls</em>.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: B_DIM, margin: 0 }}>
            I came up through robotics competitions, picked up classical ML on the side, and now spend most of my time on deep learning, control, and the full-stack glue that makes a model actually useful to someone other than me.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 0 }}>
          {[
            ['Currently', 'Building a tubular-frame vehicle chassis in Onshape, plus the perception and control stack to drive it.'],
            ['Studying', 'Transformers, optimization, classical robotics — kinematics, SLAM — and the glue between them.'],
            ['Reading', 'Probabilistic Robotics (Thrun), 3Blue1Brown, and whatever Anthropic and DeepMind publish.'],
          ].map(([k, v], i) => (
            <div key={k} style={{
              padding: '16px 0',
              borderTop: `1px solid ${B_LINE}`,
              borderBottom: i === 2 ? `1px solid ${B_LINE}` : 'none',
            }}>
              <div style={{ fontFamily: bMono, fontSize: 10, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>— {k}</div>
              <div style={{ fontFamily: bSerif, fontSize: 17, lineHeight: 1.4, color: B_FG }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────────
const B_PROJECTS = [
  { id: '01', name: 'Chassis v0.3', tag: 'Robotics', year: '2026',
    desc: 'A four-motor independently-driven vehicle platform. CAD upstream of the web.', big: true },
  { id: '02', name: 'Magneto Ads', tag: 'Fullstack · ML', year: '2024',
    desc: 'Ad-recommendation system shipped behind a Next.js front end.' },
  { id: '03', name: 'Higiea', tag: 'Robotics', year: '2021',
    desc: 'Disinfectant robot. Award entry, national robotics competition.' },
  { id: '04', name: 'Claw Robot', tag: 'Robotics', year: '2022',
    desc: 'Claw-arm grabbing event. Competition-winning build.' },
  { id: '05', name: 'Xbox-controlled RPi Car', tag: 'Robotics · Web', year: '2023',
    desc: 'Raspberry Pi car driven by an Xbox controller over a websocket.' },
  { id: '06', name: 'Game Recommendations', tag: 'Machine Learning', year: '2023',
    desc: 'Scikit-learn classifier recommending games by player age.' },
  { id: '07', name: 'Movies 3D Graph', tag: 'Visualization', year: '2022',
    desc: 'IMDB dataset rendered as a 3D graph for a data structures course.' },
];

function BProjectPlate({ p }) {
  const big = p.big;
  return (
    <article style={{
      gridColumn: big ? 'span 2' : 'span 1',
      borderTop: `1px solid ${B_LINE}`,
      paddingTop: 20,
    }}>
      <div style={{
        aspectRatio: big ? '16/9' : '4/5',
        background: '#15141a', position: 'relative', overflow: 'hidden',
        marginBottom: 16, borderRadius: 2,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`bp${p.id}`} width="6" height="6" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="400" height="300" fill={`url(#bp${p.id})`} />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                fill={B_DIM} fontSize="12" fontFamily={bMono} letterSpacing="3">
            [ {p.name.toUpperCase()} ]
          </text>
        </svg>
        <div style={{
          position: 'absolute', top: 14, left: 14,
          fontFamily: bMono, fontSize: 10, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase',
        }}>
          ◆ FIG. {p.id}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: bMono, fontSize: 11, color: B_DIM, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        <span>— {p.tag}</span>
        <span>{p.year}</span>
      </div>
      <h3 style={{
        fontFamily: bSerif, fontSize: big ? 48 : 30, fontWeight: 400,
        lineHeight: 1, margin: '0 0 10px', letterSpacing: '-0.02em',
      }}>
        {p.name}<span style={{ color: B_GREEN }}>.</span>
      </h3>
      <p style={{ fontFamily: bSerif, fontSize: big ? 18 : 15, lineHeight: 1.5, color: B_DIM, margin: 0, maxWidth: 640 }}>
        {p.desc}
      </p>
    </article>
  );
}

function BProjects() {
  return (
    <>
      <BSectionHead
        no="03"
        kicker="Selected work"
        title={<>The work, <em>filed</em> as a magazine.</>}
        lede="Each project a plate; each plate a station. Where lines cross, the project lives in two places at once — a chassis driven by a learned policy, an ad system shipped behind a Next.js front end."
      />
      <div style={{ padding: '0 40px 60px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 32px' }}>
        {B_PROJECTS.map(p => <BProjectPlate key={p.id} p={p} />)}
      </div>
    </>
  );
}

// ── STACK ─────────────────────────────────────────────────────────
const B_STACK = [
  { cat: 'Languages', items: 'TypeScript · Python · C++ · Rust · SQL' },
  { cat: 'Web', items: 'Next.js · Node · React · Tailwind · tRPC' },
  { cat: 'Machine Learning', items: 'PyTorch · TensorFlow · scikit-learn · NumPy · OpenCV' },
  { cat: 'Robotics', items: 'ROS2 · Onshape · Arduino · Raspberry Pi · ST7789' },
  { cat: 'Infrastructure', items: 'Postgres · Docker · Vercel · GitHub Actions · Linux' },
];

function BStack() {
  return (
    <>
      <BSectionHead
        no="04"
        kicker="The toolbox"
        title={<>Tools, in <em>order</em> of how often I reach for them.</>}
      />
      <div style={{ padding: '0 40px 60px' }}>
        {B_STACK.map((s, i) => (
          <div key={s.cat} style={{
            display: 'grid', gridTemplateColumns: '120px 280px 1fr',
            gap: 24, padding: '28px 0',
            borderTop: `1px solid ${B_LINE}`,
            borderBottom: i === B_STACK.length - 1 ? `1px solid ${B_LINE}` : 'none',
            alignItems: 'baseline',
          }}>
            <div style={{ fontFamily: bMono, fontSize: 11, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase' }}>
              — {String(i + 1).padStart(2, '0')}
            </div>
            <h3 style={{ fontFamily: bSerif, fontSize: 36, fontWeight: 400, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
              {s.cat}
            </h3>
            <div style={{ fontFamily: bMono, fontSize: 13, color: B_FG, lineHeight: 1.6 }}>
              {s.items}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── EXPERIENCE / TIMELINE ─────────────────────────────────────────────────────────
const B_EXP = [
  { y: '2026', t: 'Chassis v0.3', org: 'Self-directed', d: 'Vehicle platform — CAD, control, perception.' },
  { y: '2024', t: 'Magneto Ads', org: 'Capstone project', d: 'Ad-recommendation system on Next.js.' },
  { y: '2023', t: 'Xbox-controlled RPi Car', org: 'Side project', d: 'Browser → controller → Raspberry Pi.' },
  { y: '2023', t: 'B.S. Systems Engineering', org: 'EAFIT · scholarship', d: 'Coursework: ML, data structures, robotics, web systems.' },
  { y: '2022', t: 'Claw Robot', org: 'Robotics competition', d: 'Award-winning grabbing-event entry.' },
  { y: '2021', t: 'Higiea', org: 'Robotics competition', d: 'Disinfectant robot — first national event.' },
];

function BExperience() {
  return (
    <>
      <BSectionHead
        no="05"
        kicker="The timeline"
        title={<>Five years, <em>five</em> things still worth talking about.</>}
      />
      <div style={{ padding: '0 40px 60px' }}>
        {B_EXP.map((e, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 280px 60px',
            gap: 24, padding: '24px 0',
            borderTop: `1px solid ${B_LINE}`,
            borderBottom: i === B_EXP.length - 1 ? `1px solid ${B_LINE}` : 'none',
            alignItems: 'baseline',
          }}>
            <div style={{ fontFamily: bMono, fontSize: 12, color: B_DIM }}>— {e.y}</div>
            <div>
              <div style={{ fontFamily: bSerif, fontSize: 28, lineHeight: 1, letterSpacing: '-0.01em' }}>
                {e.t}
              </div>
              <div style={{ fontFamily: bSerif, fontSize: 15, color: B_DIM, marginTop: 6 }}>{e.d}</div>
            </div>
            <div style={{ fontFamily: bMono, fontSize: 11, color: B_DIM, textTransform: 'uppercase', letterSpacing: 0.8 }}>
              {e.org}
            </div>
            <div style={{ fontFamily: bMono, fontSize: 16, color: B_GREEN, textAlign: 'right' }}>↗</div>
          </div>
        ))}
      </div>

      {/* Letter / closing */}
      <div style={{ padding: '40px 40px 80px', borderTop: `1px solid ${B_LINE}`, marginTop: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: 32, alignItems: 'start' }}>
          <div style={{ fontFamily: bMono, fontSize: 11, color: B_GREEN, letterSpacing: 0.8, textTransform: 'uppercase' }}>
            ◆ Letter to the editor
          </div>
          <h2 style={{
            fontFamily: bSerif, fontSize: 'clamp(40px, 6vw, 88px)',
            fontWeight: 400, lineHeight: 0.95, margin: 0, letterSpacing: '-0.02em',
          }}>
            Let's build something that <em>moves</em><span style={{ color: B_GREEN }}>.</span>
          </h2>
          <div style={{ fontFamily: bMono, fontSize: 12, color: B_DIM, lineHeight: 1.9 }}>
            <div style={{ color: B_GREEN, marginBottom: 8 }}>— Channels</div>
            <div style={{ color: B_FG }}>juanmanuel12.13.jmyh81@gmail.com</div>
            github.com/jayounghoyos
            <br />
            linkedin.com/in/juan-andres-young-hoyos
            <br />
            cv.pdf ↗
          </div>
        </div>

        <div style={{ marginTop: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontFamily: bMono, fontSize: 11, color: B_DIM, textTransform: 'uppercase', letterSpacing: 0.8, borderTop: `1px solid ${B_LINE}`, paddingTop: 24 }}>
          <span>© 2026 Juan Andrés Young Hoyos</span>
          <span>— Set in Instrument Serif &amp; JetBrains Mono</span>
          <span>v1.0 · Medellín · 06°14′N 75°34′W</span>
        </div>
      </div>
    </>
  );
}

// ── ASSEMBLY ─────────────────────────────────────────────────────────
function PortfolioB() {
  return (
    <div style={bStyles.page}>
      <BMast />
      <BHero />
      <BAbout />
      <BProjects />
      <BStack />
      <BExperience />
    </div>
  );
}

window.PortfolioB = PortfolioB;
