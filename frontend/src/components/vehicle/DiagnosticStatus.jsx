import StatusTag from '../common/StatusTag';

export default function DiagnosticStatus({ running, complete, onRun }) {
  return (
      <div className="xl:col-span-4 flex flex-col justify-between bg-surface-container-low/80 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-surface-container-high/40 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-lg text-on-surface font-semibold">Diagnostic Status</h3>
            <StatusTag kind="illustrative">Sample</StatusTag>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Simulated diagnostic view. No vehicle bus or diagnostic data is connected, and the values below are sample values.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
              <span className="text-xs text-on-surface-variant uppercase">DTC Faults (sample)</span>
              <span className="text-xl text-tertiary font-bold">0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
              <span className="text-xs text-on-surface-variant uppercase">Sample Channels</span>
              <span className="text-xl text-on-surface font-bold">47 / 47</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
              <span className="text-xs text-on-surface-variant uppercase">Model Confidence</span>
              <span className="text-xl text-on-surface-variant font-bold" title="No model is connected, so there is no confidence value.">N/A</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={onRun}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold transition-colors text-center border border-surface-container-highest"
          >
            {running ? 'Running simulation…' : complete ? 'Simulated run complete (sample result)' : 'Run Simulated Diagnostic'}
          </button>
        </div>
      </div>
  );
}
