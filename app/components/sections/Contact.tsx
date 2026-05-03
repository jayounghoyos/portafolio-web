import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import { socials, cvPdfPath } from "../../lib/cv";
import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", href: `mailto:${socials.email}`, value: socials.email },
  { label: "GitHub", href: socials.github, value: "github.com/jayounghoyos" },
  {
    label: "LinkedIn",
    href: socials.linkedin,
    value: "linkedin.com/in/juan-andres-young-hoyos",
  },
  { label: "CV", href: cvPdfPath, value: "PDF — résumé" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="panel-deep py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-dotted pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="06"
          variant="dark"
          kicker="Contact"
          title={
            <>
              Open to research, robotics, and
              <br />
              <span className="italic text-signal">unreasonably interesting projects</span>.
            </>
          }
          meta="Open · receiving briefs"
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-10 max-w-3xl">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 60}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="cursor-grow group flex items-baseline justify-between gap-4 border-b border-warm/15 py-4 hover:border-signal/60 transition-colors"
              >
                <div>
                  <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-warm/55">
                    {String(i + 1).padStart(2, "0")} · {l.label}
                  </p>
                  <p className="font-serif text-2xl mt-1 text-warm group-hover:text-signal transition-colors">
                    {l.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-warm/55 group-hover:text-signal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 self-center"
                />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Big closing statement */}
        <div className="mt-24 lg:mt-32 max-w-4xl">
          <p className="font-mono uppercase text-[11px] tracking-[0.22em] text-warm/55 mb-5">
            ◆ Off-record
          </p>
          <p className="display-lg text-warm text-balance leading-[1.05]">
            Let&apos;s build something that{" "}
            <span className="italic text-signal">moves on its own</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
