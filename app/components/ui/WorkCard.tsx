import Image from "next/image";
import type { Project } from "../../lib/projects";

type Props = {
  project: Project;
  index: number;
};

export default function WorkCard({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const link = project.href ?? project.repo;
  const total = 4;

  return (
    <a
      href={link}
      target={link?.startsWith("http") ? "_blank" : undefined}
      rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cursor-label={`Open ${project.title}`}
      className="cursor-grow group block py-12 lg:py-16 border-t border-rule first:border-t-0"
    >
      {/* Article header */}
      <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 items-baseline mb-6">
        <div className="col-span-6 flex items-baseline gap-3">
          <span className="font-serif italic text-3xl lg:text-4xl text-accent-deep">
            {number}
          </span>
          <span className="kicker">/ {String(total).padStart(2, "0")} &middot; {project.domain}</span>
        </div>
        <div className="col-span-6 text-right">
          <span className="kicker">[ {project.year} ]</span>
        </div>
      </div>

      {/* Spread */}
      <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 items-stretch">
        {/* Image column */}
        {project.imgUrl ? (
          <div className="col-span-12 lg:col-span-6 order-1">
            <div className="relative aspect-[5/4] overflow-hidden bg-rule scan-on-hover">
              <Image
                src={project.imgUrl}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.2,0.6,0.2,1)] group-hover:scale-[1.05]"
              />
            </div>
          </div>
        ) : null}

        {/* Title column — overlaps image edge slightly on desktop */}
        <div className="col-span-12 lg:col-span-6 order-2 flex flex-col justify-center mt-6 lg:mt-0 lg:-ml-6 relative z-10">
          <h3 className="article-title text-ink leading-[0.96] mb-5">
            <span className="group-hover:text-accent-deep transition-colors">
              {project.title}
            </span>
          </h3>
          <p className="text-base lg:text-lg text-ink/85 max-w-[42ch] text-pretty leading-[1.55]">
            {project.blurb}
          </p>
          <div className="mt-6 flex items-center gap-3 font-mono uppercase text-[11px] tracking-[0.22em]">
            <span className="text-ink group-hover:text-accent-deep transition-colors inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Read full
            </span>
            <span className="font-serif italic text-2xl text-mute group-hover:text-accent-deep group-hover:translate-x-1 transition-all">
              ↗
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
