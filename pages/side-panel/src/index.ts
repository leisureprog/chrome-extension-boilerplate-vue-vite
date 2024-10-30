import { createApp } from 'vue'
import SidePanel from '@src/SidePanel.vue'
import '@src/index.css'

function init() {
  const appContainer = document.querySelector('#app-container')
  if (!appContainer) {
    throw new Error('Cannot find #app-container')
  }

  const app = createApp(SidePanel)
  app.mount(appContainer)
}

init()