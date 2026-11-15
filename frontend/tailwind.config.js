import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Anchor the content globs to this file's folder (frontend/), NOT the current working directory.
// Tailwind v3 otherwise resolves them from wherever the build is launched, and a build started
// from another directory would silently find no files and emit an unstyled app.
// Forward slashes are required for globs, including on Windows.
const root = dirname(fileURLToPath(import.meta.url)).replace(/\\/g, '/');

/** @type {import('tailwindcss').Config} */
export default {
  content: [`${root}/index.html`, `${root}/src/**/*.{js,jsx}`],
darkMode: "class",
theme: {
  extend: {
    colors: {
      "on-secondary": "#00277f",
      "on-tertiary-fixed-variant": "#005236",
      "tertiary-container": "#49da9f",
      "on-primary-fixed": "#001f27",
      "secondary-fixed-dim": "#b6c4ff",
      "inverse-surface": "#dfe2ed",
      "surface-dim": "#0f131b",
      "surface-container-lowest": "#0a0e15",
      "inverse-on-surface": "#2d3038",
      "on-error": "#690005",
      "primary-fixed-dim": "#3cd7ff",
      "on-background": "#dfe2ed",
      "background": "#0f131b",
      "outline": "#859398",
      "on-surface-variant": "#bbc9cf",
      "inverse-primary": "#00677e",
      "surface-container-high": "#262a32",
      "on-primary-container": "#00586b",
      "surface-bright": "#353941",
      "primary-fixed": "#b4ebff",
      "tertiary": "#6af7ba",
      "secondary-fixed": "#dce1ff",
      "surface-tint": "#3cd7ff",
      "surface-container-low": "#181c23",
      "secondary-container": "#0042c7",
      "on-secondary-container": "#b1c0ff",
      "on-secondary-fixed": "#001550",
      "on-tertiary-container": "#005c3e",
      "secondary": "#b6c4ff",
      "on-tertiary-fixed": "#002113",
      "surface": "#0f131b",
      "on-secondary-fixed-variant": "#003ab2",
      "on-primary": "#003642",
      "primary": "#a8e8ff",
      "error": "#ffb4ab",
      "error-container": "#93000a",
      "on-primary-fixed-variant": "#004e5f",
      "surface-container-highest": "#31353d",
      "on-tertiary": "#003824",
      "tertiary-fixed": "#6ffbbe",
      "surface-container": "#1c2027",
      "primary-container": "#00d4ff",
      "surface-variant": "#31353d",
      "on-surface": "#dfe2ed",
      "tertiary-fixed-dim": "#4edea3",
      "outline-variant": "#3c494e",
      "on-error-container": "#ffdad6"
    },
    borderRadius: {
      "DEFAULT": "0.25rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "full": "9999px"
    },
    spacing: {
      "space-md": "1rem",
      "space-xl": "2.5rem",
      "space-sm": "0.5rem",
      "space-lg": "1.5rem",
      "space-xs": "0.25rem"
    },
    fontFamily: {
      "spaceGrotesk": ["Space Grotesk", "sans-serif"],
      "geist": ["Geist", "sans-serif"]
    }
  }
}
};
