import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../../lib/projects";

type Props = {
  project: Project;
  index: number;
};

export default function WorkCard({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const link = project.href ?? project.repo;

  return (
    <a
      href={link}
      target={link?.startsWith("http") ? "_blank" : undefined}
      rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative block py-10 border-t border-rule first:border-t-0 hover:bg-warm/40 transition-colors duration-500 px-2 -mx-2"
    >
      {/* Index marker */}
      <span className="absolute -left-1 top-10 hidden lg:flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-signal" />
      </span>

      <div className="flex items-baseline justify-between gap-6">
        <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute">
          §{number} &nbsp;/&nbsp; {project.domain}
        </span>
        <span className="font-mono uppercase text-[10.5px] tracking-[0.22em] text-mute">
          [ {project.year} ]
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <h3 className="font-serif text-3xl md:text-[2.6rem] lg:text-[3rem] leading-[1.05] text-ink flex items-start gap-3">
            <span className="transition-colors group-hover:text-signal">
              {project.title}
            </span>
            <ArrowUpRight
              size={22}
              className="text-mute mt-2 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal"
            />
          </h3>
          <p className="mt-4 text-base lg:text-lg text-ink/85 max-w-measure text-pretty">
            {project.blurb}
          </p>
          {project.repo && project.href && project.href !== project.repo ? (
            <div className="mt-5 flex gap-5 font-mono uppercase text-[10.5px] tracking-[0.22em]">
              <span className="text-ink">↗ live demo</span>
              <span className="text-mute">↗ source</span>
            </div>
          ) : null}
        </div>

        {project.imgUrl ? (
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="hud-frame relative">
              <span className="hud-tr" aria-hidden />
              <span className="hud-bl" aria-hidden />
              <div className="relative aspect-[4/3] overflow-hidden bg-warm scan-on-hover">
                <Image
                  src={project.imgUrl}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </a>
  );
}
