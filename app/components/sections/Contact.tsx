import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { socials, cvPdfPath } from "../../lib/cv";
import { issue } from "../../lib/issue";

const links = [
  { label: "Email", href: `mailto:${socials.email}`, value: socials.email },
  { label: "GitHub", href: socials.github, value: "github.com/jayounghoyos" },
  {
    label: "LinkedIn",
    href: socials.linkedin,
    value: "linkedin.com/in/juan-andres-young-hoyos",
  },
  { label: "CV", href: cvPdfPath, value: "PDF · résumé" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="panel-accent relative overflow-hidden"
    >
      <div className="border-b border-ink/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="07" total={issue.contents.length.toString().padStart(2, "0")} label="LETTER" />
          <span className="kicker">Open · receiving briefs</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-16 lg:pt-28 pb-20 lg:pb-32">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-12 lg:mb-20">
          <div className="col-span-12 lg:col-span-9">
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink/65 mb-5">
              Article 07 &middot; Letter to the editor
            </p>
            <h2 className="cover-title text-ink">
              <span className="block">Let&apos;s build</span>
              <span className="block">something that</span>
              <span className="block italic">moves on its own.</span>
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-3 items-end justify-end">
            <span className="font-serif italic text-[clamp(8rem,16vw,14rem)] text-ink/85 leading-[0.82]">
              07
            </span>
          </div>
        </div>

        <div className="hair-rule mt-12 mb-12 lg:mb-16" style={{ background: "rgba(22,19,14,0.25)" }} />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-lg lg:text-xl text-ink/90 max-w-[44ch] text-pretty leading-[1.55]">
              Open to research, robotics roles, and unreasonably interesting
              projects. The fastest channel is email — replies usually arrive
              the same day.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 mt-10 lg:mt-0 grid grid-cols-1 gap-2">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 60}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-cursor-label={`Open ${l.label}`}
                  className="cursor-grow group flex items-baseline justify-between gap-4 border-b border-ink/25 py-4 hover:border-ink/80 transition-colors"
                >
                  <div>
                    <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink/55">
                      {String(i + 1).padStart(2, "0")} · {l.label}
                    </p>
                    <p className="font-serif italic text-2xl mt-1 text-ink group-hover:translate-x-1 transition-transform">
                      {l.value}
                    </p>
                  </div>
                  <span className="font-serif italic text-3xl text-ink/65 group-hover:text-ink transition-colors">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-32 grid grid-cols-12 items-baseline gap-x-4">
          <div className="col-span-6">
            <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink/65">
              {issue.editor}
            </p>
            <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-ink/55 mt-1">
              {issue.city} &middot; {issue.coordinates}
            </p>
          </div>
          <div className="col-span-6 text-right">
            <p className="font-serif italic text-xl">
              — yrs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
