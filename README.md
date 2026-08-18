# jayoungh.dev — The Machine Log

Personal portfolio of **Juan Andrés Young Hoyos** (ML & Robotics Engineer), built as the
operator console of one machine: the four-motor vehicle chassis I'm actually building.
The hero is the machine's point of view — every detection box is real work — and the
`MACHINE` section assembles the real Onshape CAD model as you scroll.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19**
- **three.js + @react-three/fiber v9 + drei v10** — WebGL scenes
- **anime.js v4** — boot timeline, scroll-linked reveals, scroll-scrubbed assembly
- **Tailwind CSS v4** — CSS-first design tokens in `app/globals.css` (`@theme`)
- **pnpm** — package manager

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm lint       # eslint (flat config)
```

## The 3D pipeline

The chassis is modeled in Onshape and exported as glTF (`assets/chassis-source.gltf`,
26 MB, 1,868 primitives — not deployed). A build-time pipeline turns it into the
0.6 MB binary the site ships:

```bash
pnpm optimize:model   # assets/chassis-source.gltf -> public/models/chassis.glb
```

It welds vertices, merges primitives per mesh (≈6,400 → 59 draw calls), simplifies
CAD over-tessellation (436k → 109k unique triangles), quantizes, and applies meshopt
compression — while preserving the 59 named occurrence nodes that the runtime uses
for role classification (French part names → chassis/motor/gear/axle/…) and per-part
assembly animation. Re-run it whenever a new Onshape export lands.

## Layout

```
app/
  lib/            content data (projects, cv, stack, now) + log registry
  components/
    motion/       anime.js layer (Reveal, split-title orchestrator)
    three/        R3F scenes (hero POV, chassis assembly, shared prep)
    sections/     the log entries (BOOT … UPLINK)
    ui/           nav, telemetry rail, cards, cursor
scripts/          model optimization pipeline
assets/           raw CAD export (source of truth, not served)
```
