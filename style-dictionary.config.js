import StyleDictionary from 'style-dictionary'

const sd = new StyleDictionary({
  source: ['src/tokens/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/tokens/generated/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          selector: ':root',
        },
        {
          destination: 'variables-dark.css',
          format: 'css/variables',
          selector: '[data-theme="dark"]',
        },
      ],
    },
  },
})

sd.buildAllPlatforms()
console.log('✅ Design tokens generated successfully')
