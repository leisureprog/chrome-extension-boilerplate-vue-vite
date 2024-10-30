import { createMemoryHistory, createRouter } from 'vue-router'
import IndexView from '@src/views/index.vue'
import WelcomeView from '@src/views/welcome.vue'

const routes = [
    {
        path: '/',
        name: 'Index',
        component: IndexView
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: WelcomeView
    }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router