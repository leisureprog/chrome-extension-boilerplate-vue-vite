import { createApp } from 'vue'
import App from './App.vue'
import stores from './stores'
import router from './router'

import './index.css'

createApp(App)
    .use(stores)
    .use(router)
    .mount('#app')