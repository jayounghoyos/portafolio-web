import type { Project } from "../../lib/projects";

type Props = {
  project: Project;
  index: number;
};

export default function StudyCard({ project, index }: Props) {
  const link = project.repo ?? project.href;
  const number = String(index + 1).padStart(2, "0");

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-label={`Read ${project.title}`}
      className="cursor-grow group block py-8 lg:py-10 border-b border-rule grid grid-cols-12 gap-x-4 items-baseline"
    >
      <div className="col-span-2 lg:col-span-1">
        <span className="font-serif italic text-2xl lg:text-3xl text-accent">
          {number}
        </span>
      </div>
      <div className="col-span-10 lg:col-span-7">
        <h3 className="font-serif italic text-2xl lg:text-3xl leading-[1.05] mb-2 text-ink">
          <span className="group-hover:text-accent transition-colors">
            {project.title}
          </span>
        </h3>
        <p className="text-[15px] text-dim leading-[1.6] max-w-[50ch]">
          {project.blurb}
        </p>
        {project.lesson ? (
          <p className="mt-3 text-[12px] text-mute italic max-w-[50ch]">
            &mdash; {project.lesson}
          </p>
        ) : null}
      </div>
      <div className="col-span-12 lg:col-span-4 lg:text-right mt-3 lg:mt-0 flex lg:justify-end items-baseline gap-3">
        <span className="kicker">{project.domain}</span>
        <span className="kicker opacity-70">[ {project.year} ]</span>
      </div>
    </a>
  );
}
