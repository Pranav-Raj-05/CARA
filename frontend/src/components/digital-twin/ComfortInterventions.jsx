import StatusTag from '../common/StatusTag';

// Concepts only: none of these interventions exist. They illustrate the kind of cockpit adaptation CARA could
// recommend in future. The "Simulate" button only displays a message.
const interventions = [
  {
    icon: 'air',
    iconClass: 'text-primary',
    title: 'Cabin Air Ionization',
    desc: 'Concept: adjust cabin air to support alertness.',
  },
  {
    icon: 'chair',
    iconClass: 'text-secondary',
    title: 'Adaptive Lumbar Massage',
    desc: 'Concept: seat micro-pulses to reduce fatigue.',
  },
  {
    icon: 'local_cafe',
    iconClass: 'text-primary-container',
    title: 'Hydration Stop Waypoint',
    desc: 'Concept: suggest a rest stop along the route.',
  },
];

export default function ComfortInterventions({ onTest }) {
  return (
    <div className="min-[1400px]:col-span-4 bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-md border border-outline-variant/20">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between max-[1399px]:flex-wrap max-[1399px]:gap-x-2 max-[1399px]:gap-y-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary" aria-hidden="true">auto_awesome</span>
            <h2 className="text-xl text-on-surface font-semibold">Comfort Interventions</h2>
          </div>
          <StatusTag kind="not-implemented" />
        </div>
        <p className="text-xs text-on-surface-variant">
          Ideas for cockpit adaptations that could help with fatigue. None of them exist yet; no cabin, seat or navigation system is
          connected.
        </p>

        <ul className="space-y-space-sm">
          {interventions.map((item) => (
            <li key={item.title} className="p-space-sm bg-surface-container rounded-xl flex items-start gap-space-sm">
              <div className={`p-2 rounded-lg bg-surface-container-high ${item.iconClass} mt-0.5`}>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">{item.icon}</span>
              </div>
              <div className="flex flex-col max-[1399px]:min-w-0">
                <div className="flex items-center gap-2 max-[1399px]:flex-wrap max-[1399px]:gap-y-1">
                  <span className="text-sm text-on-surface font-medium">{item.title}</span>
                  <StatusTag kind="planned" />
                </div>
                <p className="text-xs text-on-surface-variant mt-0.5">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onTest}
        className="w-full mt-4 py-3 px-space-md rounded-xl bg-primary-container text-on-primary-container text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_24px_-2px_rgba(0,212,255,0.4)] transition-all active:scale-[0.99]"
      >
        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">tune</span>
        <span>Simulate Intervention (no actuators)</span>
      </button>
    </div>
  );
}
