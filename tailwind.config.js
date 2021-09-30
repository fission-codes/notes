const plugin = require('tailwindcss/plugin')
const kit = require('@fission-suite/kit')

module.exports = {
  purge: [
    ...kit.tailwindPurgeList(),
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    colors: kit.dasherizeObjectKeys(kit.colors),
    fontFamily: kit.fonts,

    extend: {
      fontSize: kit.fontSizes,
    },
  },
  variants: {
    opacity: ['group-hover'],
  },
  plugins: [
    plugin(function ({ addBase }) {
      // this `fontsPath` will be the relative path
      // to the fonts from the generated stylesheet
      kit.fontFaces({ fontsPath: '../fonts/' }).forEach((fontFace) => {
        addBase({ '@font-face': fontFace })
      })
    }),
  ],
}
