export default function HealthTrendChart() {
  return (
      <div className="xl:col-span-8 flex flex-col bg-surface-container-low/80 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-surface-container-high/40 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 gap-2">
          <div className="flex flex-col">
            <h3 className="text-lg text-on-surface font-semibold">30-Day Vehicle Health Trend (illustrative)</h3>
            <span className="text-xs text-on-surface-variant">Hardcoded sample curve. It is not measured CAN data and not a model prediction.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-primary"><span className="w-3 h-0.5 bg-primary"></span>Sample trend</span>
            <span className="flex items-center gap-1.5 text-tertiary"><span className="w-3 h-0.5 bg-tertiary border-b border-dashed"></span>Sample projection</span>
          </div>
        </div>
        <div className="relative w-full h-56 pt-3">
          <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 600 180">
            <line stroke="#31353d" strokeDasharray="3 3" x1="0" x2="600" y1="30" y2="30"></line>
            <line stroke="#31353d" strokeDasharray="3 3" x1="0" x2="600" y1="80" y2="80"></line>
            <line stroke="#31353d" strokeDasharray="3 3" x1="0" x2="600" y1="130" y2="130"></line>
            <path d="M 0 50 Q 150 55, 300 62 T 600 70" fill="none" stroke="#6af7ba" strokeDasharray="4 4" strokeWidth="2"></path>
            <path d="M 0 45 C 70 48, 140 46, 210 54 C 280 62, 350 59, 420 63 C 490 67, 540 68, 600 69" fill="none" stroke="#00d4ff" strokeWidth="2.5"></path>
            <path d="M 0 45 C 70 48, 140 46, 210 54 C 280 62, 350 59, 420 63 C 490 67, 540 68, 600 69 L 600 180 L 0 180 Z" fill="url(#blueChartGradClean)" opacity="0.12"></path>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="blueChartGradClean" x1="0" x2="0" y1="45" y2="180">
                <stop stopColor="#00d4ff"></stop>
                <stop offset="1" stopColor="#00d4ff" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <circle cx="210" cy="54" fill="#00d4ff" r="4"></circle>
            <circle cx="420" cy="63" fill="#00d4ff" r="4"></circle>
            <circle cx="600" cy="69" fill="#6af7ba" r="4"></circle>
          </svg>
        </div>
        <div className="flex justify-between text-on-surface-variant text-xs pt-4 border-t border-surface-container-high/40 mt-2">
          <span>Day -30</span>
          <span>Day -20</span>
          <span>Day -10</span>
          <span>Today</span>
          <span className="text-tertiary font-semibold">+30 d (sample projection)</span>
        </div>
      </div>
  );
}
