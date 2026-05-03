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
    <section id="contact" className="py-24 lg:py-32 relative border-t border-rule">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <SectionHeader
          index="06"
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
                className="group flex items-baseline justify-between gap-4 border-b border-rule py-4 hover:border-ink/40 transition-colors"
              >
                <div>
                  <p className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute">
                    {String(i + 1).padStart(2, "0")} · {l.label}
                  </p>
                  <p className="font-serif text-xl mt-1 group-hover:text-signal transition-colors">
                    {l.value}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-mute group-hover:text-signal transition-colors shrink-0 self-center"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
