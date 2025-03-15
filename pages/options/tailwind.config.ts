import baseConfig from '@extension/tailwindcss-config'
import { withUI } from '@extension/ui'

export default withUI({
  ...baseConfig,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
})
