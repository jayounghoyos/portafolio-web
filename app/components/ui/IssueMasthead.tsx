import { issue } from "../../lib/issue";

export default function IssueMasthead() {
  return (
    <div className="border-b border-rule">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 grid grid-cols-12 gap-4 items-baseline">
        <div className="col-span-4 lg:col-span-3">
          <p className="font-serif italic text-base lg:text-lg leading-none">
            {issue.publication}
            <span className="text-accent">.</span>
          </p>
          <p className="kicker mt-1">By {issue.editor}</p>
        </div>

        <div className="hidden lg:flex lg:col-span-6 items-baseline justify-center gap-3">
          <span className="kicker-strong">VOL.{issue.vol}</span>
          <span className="text-accent text-xs">◆</span>
          <span className="kicker-strong">ISSUE {issue.number}</span>
          <span className="text-accent text-xs">◆</span>
          <span className="kicker-strong">{issue.date}</span>
        </div>

        <div className="col-span-8 lg:col-span-3 text-right">
          <p className="kicker-strong">{issue.city}</p>
          <p className="kicker mt-1 hidden sm:block">{issue.coordinates}</p>
        </div>
      </div>
    </div>
  );
}
