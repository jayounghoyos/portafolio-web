import Reveal from "../motion/Reveal";
import LogHeader from "../ui/LogHeader";
import { socials } from "../../lib/cv";
import { operator } from "../../lib/log";

const links = [
  { label: "Email", href: `mailto:${socials.email}`, value: socials.email },
  { label: "GitHub", href: socials.github, value: "github.com/jayounghoyos" },
  {
    label: "LinkedIn",
    href: socials.linkedin,
    value: "linkedin.com/in/juan-andres-young-hoyos",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="panel-accent relative overflow-hidden">
      <LogHeader
        id="contact"
        title={
          <>
            Uplink open. Let&apos;s build something that{" "}
            <span className="italic">moves on its own</span>.
          </>
        }
        meta="Channel open · receiving briefs"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pb-10 lg:pb-16">
        <div
          className="hair-rule mb-10 lg:mb-12"
          style={{ background: "rgba(22,19,14,0.25)" }}
        />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-base lg:text-lg text-paper-ink/90 max-w-[44ch] text-pretty leading-[1.55]">
              Open to research, robotics roles, and unreasonably interesting
              projects. The fastest channel is email — replies usually arrive
              the same day.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-8 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 50}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    l.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  data-cursor-label={`Open ${l.label}`}
                  className="cursor-grow group flex items-baseline justify-between gap-4 border-b border-paper-ink/25 py-3.5 hover:border-paper-ink/80 transition-colors"
                >
                  <div>
                    <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-paper-ink/70">
                      CH {String(i + 1).padStart(2, "0")} · {l.label}
                    </p>
                    <p className="font-serif italic text-lg lg:text-xl mt-0.5 text-paper-ink group-hover:translate-x-1 transition-transform">
                      {l.value}
                    </p>
                  </div>
                  <span className="font-serif italic text-2xl text-paper-ink/65 group-hover:text-paper-ink transition-colors">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Signature — end of log */}
        <div className="mt-14 lg:mt-20 pb-6 grid grid-cols-12 gap-x-4 items-baseline">
          <div className="col-span-12 sm:col-span-7">
            <p className="font-serif italic text-2xl lg:text-3xl text-paper-ink leading-none">
              — End of log,
            </p>
            <p className="font-serif italic text-3xl lg:text-4xl text-paper-ink mt-2">
              {operator.name}.
            </p>
          </div>
          <div className="col-span-12 sm:col-span-5 mt-4 sm:mt-0 sm:text-right">
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-paper-ink/80">
              {operator.city}
            </p>
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-paper-ink/70 mt-1">
              {operator.coordinates} · built with next · three · anime.js
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
