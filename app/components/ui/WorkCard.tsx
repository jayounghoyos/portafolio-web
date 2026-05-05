import Image from "next/image";
import type { Project } from "../../lib/projects";

type Props = {
  project: Project;
  index: number;
  big?: boolean;
};

const STAGE_BY_ID: Record<string, string> = {
  higiea: "shipped",
  "magneto-ads": "shipped",
  "claw-robot": "shipped",
  "xbox-car": "shipped",
  "game-recs": "study",
  "celsius-nn": "study",
  "movies-graph": "filed",
  rickrollprinter: "filed",
  "rick-display": "filed",
};

const STACK_BY_ID: Record<string, string> = {
  higiea: "ROS · sensors",
  "magneto-ads": "next.js · sklearn",
  "claw-robot": "arduino · servos",
  "xbox-car": "rpi · websocket",
  "game-recs": "python · sklearn",
  "celsius-nn": "tensorflow",
  "movies-graph": "three.js · python",
  rickrollprinter: "python · pypi",
  "rick-display": "arduino · st7789",
};

export default function WorkCard({ project, index, big = false }: Props) {
  const number = String(index + 1).padStart(2, "0");
  const link = project.href ?? project.repo;
  const stage = STAGE_BY_ID[project.id] ?? "—";
  const stackHint = STACK_BY_ID[project.id] ?? project.domain.toLowerCase();

  return (
    <a
      href={link}
      target={link?.startsWith("http") ? "_blank" : undefined}
      rel={link?.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cursor-label={`Open ${project.title}`}
      className={`cursor-grow group relative flex flex-col border border-rule bg-paper hover:border-ink/60 transition-colors duration-300 ${
        big ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Image / hatch fallback */}
      <div
        className={`relative w-full overflow-hidden bg-warm/40 border-b border-rule ${
          big ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {project.imgUrl ? (
          <Image
            src={project.imgUrl}
            alt={project.title}
            fill
            sizes={big ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 240"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <pattern
                id={`hatch-${project.id}`}
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="8" y2="8" stroke="#16130E" strokeOpacity="0.10" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="400" height="240" fill={`url(#hatch-${project.id})`} />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono"
              fill="#6E665B"
              fontSize="11"
              letterSpacing="3"
            >
              [ {project.title.toUpperCase()} ]
            </text>
          </svg>
        )}

        {/* Top-left tag */}
        <div className="absolute top-3 left-3 inline-flex items-center gap-2 z-10">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono uppercase text-[9.5px] tracking-[0.22em] text-warm bg-deep/85 px-2 py-1 backdrop-blur-sm">
            {project.domain}
            {stage !== "—" ? ` · ${stage}` : ""}
          </span>
        </div>

        {/* Top-right ID */}
        <span className="absolute top-3 right-3 z-10 font-mono uppercase text-[9.5px] tracking-[0.18em] text-warm bg-deep/85 px-2 py-1 backdrop-blur-sm">
          [ {number} ]
        </span>

        {/* Featured pulse */}
        {big ? (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-2 font-mono uppercase text-[9.5px] tracking-[0.22em] text-deep bg-accent px-2 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-deep ambient-pulse" />
            Featured
          </span>
        ) : null}
      </div>

      {/* Spec strip */}
      <div className="grid grid-cols-4 border-b border-rule">
        {[
          ["TYPE", project.domain.split(" ")[0].toLowerCase()],
          ["STAGE", stage],
          ["STACK", stackHint],
          ["YEAR", project.year],
        ].map(([k, v], i) => (
          <div
            key={k}
            className={`px-3 py-2.5 ${i < 3 ? "border-r border-rule" : ""}`}
          >
            <p className="font-mono uppercase text-[9px] tracking-[0.2em] text-mute mb-0.5">
              {k}
            </p>
            <p className="font-mono uppercase text-[10.5px] tracking-[0.10em] text-ink truncate">
              {v}
            </p>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-baseline justify-between mb-2 gap-3">
          <h3
            className={`font-serif italic leading-[1.0] text-ink group-hover:text-accent-deep transition-colors ${
              big ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
            }`}
          >
            {project.title}
          </h3>
          <span className="kicker shrink-0">[ {project.year} ]</span>
        </div>
        <p
          className={`text-ink/80 leading-[1.55] text-pretty flex-1 ${
            big ? "text-base lg:text-lg max-w-[52ch]" : "text-[14px]"
          }`}
        >
          {project.blurb}
        </p>
        <div className="mt-4 flex items-center gap-2 font-mono uppercase text-[10px] tracking-[0.22em] text-ink/85 group-hover:text-accent-deep transition-colors">
          <span>→ Read case study</span>
        </div>
      </div>
    </a>
  );
}
