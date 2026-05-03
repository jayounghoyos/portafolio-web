import Folio from "../ui/Folio";
import MetroMap from "../ui/MetroMap";
import Reveal from "../ui/Reveal";
import { selected } from "../../lib/projects";
import { issue } from "../../lib/issue";

export default function Work() {
  return (
    <section id="work" className="relative bg-paper overflow-hidden">
      <div className="border-b border-rule">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 py-3 flex items-baseline justify-between">
          <Folio current="02" total={issue.contents.length.toString().padStart(2, "0")} label="THE NETWORK" />
          <span className="kicker">{selected.length} primary lines · interchanges noted</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-12 pt-14 lg:pt-24 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-x-4 lg:gap-x-8 mb-12 lg:mb-16">
          <div className="col-span-12 lg:col-span-8">
            <p className="kicker mb-5">Article 02</p>
            <h2 className="article-title">
              The work as a{" "}
              <span className="text-accent-deep">network</span>.
            </h2>
            <p className="mt-5 text-base lg:text-lg text-ink/80 max-w-[52ch] leading-[1.55]">
              Each project a station. Each discipline a line. Where lines
              cross, the project lives in two places at once &mdash; a
              chassis driven by a learned policy, an ad-recommendation
              system shipped behind a Next.js front end.
            </p>
          </div>
          <div className="hidden lg:flex lg:col-span-4 items-end justify-end">
            <span className="font-serif italic text-[clamp(6rem,12vw,11rem)] text-accent leading-[0.85]">
              02
            </span>
          </div>
        </div>

        <Reveal>
          <MetroMap />
        </Reveal>
      </div>
    </section>
  );
}
