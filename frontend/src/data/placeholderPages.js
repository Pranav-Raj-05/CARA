// These four screens exist in the Stitch export only as generic placeholder cards (no dedicated design was exported),
// and the functionality does not exist yet. `planned` describes what is intended, NOT what is available.
export const placeholderPages = [
  {
    path: 'recommendations',
    title: 'Cockpit Recommendations Hub',
    icon: 'shield',
    planned:
      'Planned: a history of the recommendations produced by the decision engine, with the rule that selected each one. Today the selected recommendation is shown only on the Overview and Decision Engine screens, and it is simulated.',
  },
  {
    path: 'insights',
    title: 'Journey Insights & Analytics',
    icon: 'insights',
    planned:
      'Planned: journey-level summaries of vehicle, driver and environment states. No journey data is recorded or stored in this prototype.',
  },
  {
    path: 'assistant',
    title: 'CARA Conversational Assistant',
    icon: 'terminal',
    planned:
      'Planned: a conversational module that explains the selected recommendation in plain language. No language model, conversation backend or speech input is connected.',
  },
  {
    path: 'settings',
    title: 'System & Simulator Settings',
    icon: 'settings',
    planned: 'Planned: simulator and display settings. There are no settings to change yet.',
  },
];
