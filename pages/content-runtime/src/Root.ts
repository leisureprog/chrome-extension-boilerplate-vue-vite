import { createApp } from 'vue'
import App from './App.vue'
import injectedStyle from './index.css?inline'

export function mount() {
  const root = document.createElement('div')
  root.id = 'chrome-extension-boilerplate-vue-runtime-content-view-root'

  document.body.append(root)

  const rootIntoShadow = document.createElement('div')
  rootIntoShadow.id = 'shadow-root'

  const shadowRoot = root.attachShadow({ mode: 'open' })

  const globalStyleSheet = new CSSStyleSheet()
  globalStyleSheet.replaceSync(injectedStyle)
  shadowRoot.adoptedStyleSheets = [globalStyleSheet]

  shadowRoot.appendChild(rootIntoShadow)
  
  // Создаем приложение Vue и монтируем его в Shadow DOM
  createApp(App).mount(rootIntoShadow)
}
