const defaultTheme = require('tailwindcss/defaultTheme')
const kit = require('fission-kit')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    colors: {
      ...kit.dasherizeObjectKeys(kit.colors),
    },
    fontFamily: {
      ...defaultTheme.fontFamily,

      body: [kit.fonts.body, ...defaultTheme.fontFamily.sans],
      display: [kit.fonts.display, ...defaultTheme.fontFamily.serif],
      mono: [kit.fonts.mono, ...defaultTheme.fontFamily.mono],
    },
  },
  variants: {
    opacity: ['group-hover'],
  },
  plugins: [],
}
