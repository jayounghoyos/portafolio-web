import { socials } from "../../lib/cv";
import { issue } from "../../lib/issue";

export default function Footer() {
  const buildDate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
  return (
    <footer className="panel-deep border-t border-warm/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 pb-10">
        {/* Big colophon line */}
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 items-end mb-14 lg:mb-20">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker text-warm/55 mb-3">◆ Colophon</p>
            <h3 className="font-serif italic text-3xl lg:text-5xl text-warm leading-[1.0]">
              Set in Instrument Serif &amp;{" "}
              <span className="text-accent">JetBrains Mono</span>.
              <br />
              Built deliberately in {issue.city.split(" — ")[0]}.
            </h3>
          </div>
          <div className="col-span-12 lg:col-span-4 mt-8 lg:mt-0 grid grid-cols-2 gap-y-4 gap-x-6 font-mono text-[10.5px] uppercase tracking-[0.22em]">
            <div>
              <p className="text-warm/55 mb-1.5">Editor</p>
              <p className="text-warm">{issue.editor}</p>
            </div>
            <div>
              <p className="text-warm/55 mb-1.5">Build</p>
              <p className="text-warm">v1.0 / {buildDate}</p>
            </div>
            <div>
              <p className="text-warm/55 mb-1.5">Coordinates</p>
              <p className="text-warm">{issue.coordinates}</p>
            </div>
            <div>
              <p className="text-warm/55 mb-1.5">ISSUE</p>
              <p className="text-warm">VOL.{issue.vol} / {issue.number}</p>
            </div>
          </div>
        </div>

        <div className="hair-rule mb-8" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/55">
          <p>© {new Date().getFullYear()} {issue.editor} &middot; All rights reserved</p>
          <div className="flex gap-5">
            <a className="hover:text-accent" href={socials.github}>GitHub ↗</a>
            <a className="hover:text-accent" href={socials.linkedin}>LinkedIn ↗</a>
            <a className="hover:text-accent" href={`mailto:${socials.email}`}>Email ↗</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
