import Reveal from "../ui/Reveal";
import Folio from "../ui/Folio";
import { socials } from "../../lib/cv";
import { issue } from "../../lib/issue";

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
    <section
      id="contact"
      className="panel-accent relative overflow-hidden"
    >
      {/* Folio strip top */}
      <div className="border-b border-ink/15">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio
            current="08"
            total={issue.contents.length.toString().padStart(2, "0")}
            label="LETTER · COLOPHON"
          />
          <span className="kicker">Open · receiving briefs</span>
        </div>
      </div>

      {/* Main letter block */}
      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-10 lg:pb-16">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-10 lg:mb-14">
          <div className="col-span-12 lg:col-span-9">
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink/65 mb-5">
              Article 08 &middot; Letter to the editor
            </p>
            <h2 className="article-title text-ink">
              Let&apos;s build
              <br />
              something that{" "}
              <span className="italic">moves on its own</span>.
            </h2>
          </div>
          <div className="hidden lg:flex lg:col-span-3 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-ink/85 leading-[0.82]">
              08
            </span>
          </div>
        </div>

        <div
          className="hair-rule mb-10 lg:mb-12"
          style={{ background: "rgba(22,19,14,0.25)" }}
        />

        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-base lg:text-lg text-ink/90 max-w-[44ch] text-pretty leading-[1.55]">
              Open to research, robotics roles, and unreasonably interesting
              projects. The fastest channel is email — replies usually
              arrive the same day.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-7 mt-8 lg:mt-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
            {links.map((l, i) => (
              <Reveal key={l.label} delay={i * 50}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    l.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  data-cursor-label={`Open ${l.label}`}
                  className="cursor-grow group flex items-baseline justify-between gap-4 border-b border-ink/25 py-3.5 hover:border-ink/80 transition-colors"
                >
                  <div>
                    <p className="font-mono uppercase text-[10px] tracking-[0.22em] text-ink/55">
                      {String(i + 1).padStart(2, "0")} · {l.label}
                    </p>
                    <p className="font-serif italic text-lg lg:text-xl mt-0.5 text-ink group-hover:translate-x-1 transition-transform">
                      {l.value}
                    </p>
                  </div>
                  <span className="font-serif italic text-2xl text-ink/65 group-hover:text-ink transition-colors">
                    ↗
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Signature line — closes the page */}
        <div className="mt-14 lg:mt-20 pb-6 grid grid-cols-12 gap-x-4 items-baseline">
          <div className="col-span-12 sm:col-span-7">
            <p className="font-serif italic text-2xl lg:text-3xl text-ink leading-none">
              — Yours,
            </p>
            <p className="font-serif italic text-3xl lg:text-4xl text-ink mt-2">
              {issue.editor}.
            </p>
          </div>
          <div className="col-span-12 sm:col-span-5 mt-4 sm:mt-0 sm:text-right">
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink/70">
              {issue.city}
            </p>
            <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-ink/55 mt-1">
              {issue.coordinates}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
