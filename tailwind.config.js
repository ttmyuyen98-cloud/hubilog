/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: '#0A192F',
        surface: {
          DEFAULT: '#112240',
          hover: '#1b325c',
        },
        cyan: {
          accent: '#00E5FF',
        },
        orange: {
          accent: '#F59E0B',
        },
        textMuted: '#8892B0',
        hubi: {
          dark: '#0A192F',
          surface: '#112240',
          elevated: '#1b325c',
          cyan: '#00E5FF',
          orange: '#F59E0B',
          text: '#E6F1FF',
          muted: '#8892B0',
        },
      },
      fontFamily: {
        title: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        display: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        syne: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        body: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        jakarta: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "'Liberation Mono'", "'Courier New'", "monospace"],
      },
      boxShadow: {
        'neon-orange': '0px 4px 20px rgba(255, 107, 0, 0.35)',
        'neon-orange-hover': '0px 6px 30px rgba(255, 107, 0, 0.6)',
        'neon-cyan': 'inset 0 0 15px rgba(0, 240, 255, 0.15), 0 0 20px rgba(0, 240, 255, 0.2)',
        'card': '0px 10px 30px -5px rgba(0, 0, 0, 0.5), 0px 0px 1px 1px rgba(255, 255, 255, 0.05)',
        'cyan-glow': 'inset 0 0 15px rgba(0, 240, 255, 0.15), 0 0 20px rgba(0, 240, 255, 0.2)',
        'orange-glow': '0px 4px 20px rgba(255, 107, 0, 0.35)',
        'orange-glow-lg': '0px 6px 30px rgba(255, 107, 0, 0.6)',
        'card-elevation': '0px 10px 30px -5px rgba(0, 0, 0, 0.5), 0px 0px 1px 1px rgba(255, 255, 255, 0.05)',
      },
      borderRadius: {
        'bento': '20px',
        'input': '10px',
      }
    },
  },
  plugins: [],
}
