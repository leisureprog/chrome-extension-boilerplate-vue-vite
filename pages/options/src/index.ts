import { createApp } from 'vue'
import '@src/index.css'
import '@extension/ui/dist/global.css'
import Options from '@src/Options.vue'

function init() {
  const appContainer = document.querySelector('#app-container')
  if (!appContainer) {
    throw new Error('Cannot find #app-container')
  }

  const app = createApp(Options)
  app.mount(appContainer)
}

init()
