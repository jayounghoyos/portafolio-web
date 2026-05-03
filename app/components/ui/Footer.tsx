import { socials } from "../../lib/cv";

export default function Footer() {
  return (
    <footer className="border-t border-deep-soft mt-0 bg-deep text-warm">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/60 mb-3">
              ◆ End of document
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-warm">
              <span className="italic">Built deliberately</span> in Medellín.
            </h3>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-6 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <div>
              <p className="text-warm/55 mb-2">Source</p>
              <a className="block text-warm hover:text-signal" href={socials.github}>
                ↗ GitHub
              </a>
              <a className="block text-warm hover:text-signal mt-1" href={socials.linkedin}>
                ↗ LinkedIn
              </a>
              <a
                className="block text-warm hover:text-signal mt-1"
                href={`mailto:${socials.email}`}
              >
                ↗ Email
              </a>
            </div>
            <div>
              <p className="text-warm/55 mb-2">Build</p>
              <p className="text-warm">v1.0 · 2026</p>
              <p className="text-warm/70 mt-1">
                {new Date().toISOString().slice(0, 10).replace(/-/g, ".")}
              </p>
              <p className="text-warm/70 mt-1">JYH-PORTAFOLIO</p>
            </div>
          </div>
        </div>

        <div className="datum-line my-10" aria-hidden />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/60">
          <p>
            © {new Date().getFullYear()} · Juan Andrés Young Hoyos · All rights
            reserved
          </p>
          <p>
            Next.js · React Three Fiber · Inter · Instrument Serif · JetBrains
            Mono
          </p>
        </div>
      </div>
    </footer>
  );
}
