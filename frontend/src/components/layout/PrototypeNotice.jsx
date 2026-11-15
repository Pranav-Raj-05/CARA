import StatusTag, { STATUS } from '../common/StatusTag';

// Persistent, low-key disclosure at the end of every page: what this prototype is and is not.
export default function PrototypeNotice() {
  return (
    <section
      aria-label="Prototype status"
      className="mt-space-xl max-w-7xl mx-auto w-full rounded-xl bg-surface-container-lowest/60 border border-surface-container-high/50 px-space-md py-3 text-xs text-on-surface-variant"
    >
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 leading-relaxed">
        <span className="material-symbols-outlined text-primary text-[16px]" aria-hidden="true">info</span>
        <span className="text-on-surface font-semibold">CARA v4.2 is a frontend prototype.</span>
        <span>
          No production backend, trained machine-learning model or live vehicle telemetry is connected. Values and charts are
          illustrative unless marked otherwise, decision behaviour is simulated, and planned capabilities are not operational.
        </span>
      </p>
      <details className="mt-2 group">
        <summary className="cursor-pointer text-primary hover:underline w-fit rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          What do these labels mean?
        </summary>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {Object.keys(STATUS).map((k) => (
            <li key={k} className="flex items-start gap-2">
              <StatusTag kind={k} className="shrink-0 mt-0.5" />
              <span>{STATUS[k].meaning}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
