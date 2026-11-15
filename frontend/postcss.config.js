import { fileURLToPath } from 'node:url';

// Point Tailwind at its config file explicitly. By default Tailwind looks for tailwind.config.js in the
// current working directory, so a build launched from anywhere other than frontend/ would not load the
// theme or content paths at all and would emit an unstyled app.
export default {
  plugins: {
    tailwindcss: { config: fileURLToPath(new URL('./tailwind.config.js', import.meta.url)) },
    autoprefixer: {},
  },
};
