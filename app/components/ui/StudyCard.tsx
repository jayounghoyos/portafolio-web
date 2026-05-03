import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/projects";

type Props = {
  project: Project;
};

export default function StudyCard({ project }: Props) {
  const link = project.repo ?? project.href;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block hud-frame bg-warm/30 hover:bg-warm/60 transition-colors duration-500 p-6 lg:p-7"
    >
      <span className="hud-tr" aria-hidden />
      <span className="hud-bl" aria-hidden />

      <div className="flex items-baseline justify-between">
        <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute">
          {project.domain}
        </span>
        <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute">
          [ {project.year} ]
        </span>
      </div>

      <h3 className="mt-5 font-serif text-2xl lg:text-[1.65rem] leading-snug flex items-start gap-2">
        <span className="group-hover:text-signal transition-colors">
          {project.title}
        </span>
        <ArrowUpRight
          size={18}
          className="text-mute mt-1 group-hover:text-signal transition-colors"
        />
      </h3>

      <p className="mt-3 text-[15px] text-ink/85 leading-relaxed">
        {project.blurb}
      </p>

      {project.lesson ? (
        <p className="mt-5 pt-4 border-t border-rule font-mono uppercase text-[10.5px] tracking-[0.18em] text-signal">
          ⤳ &nbsp;{project.lesson}
        </p>
      ) : null}
    </a>
  );
}
