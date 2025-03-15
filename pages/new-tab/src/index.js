import { createApp } from 'vue';
import NewTab from './NewTab.vue';
import '@src/index.css';
import '@extension/ui/lib/global.css';
function init() {
    const appContainer = document.querySelector('#app-container');
    if (!appContainer) {
        throw new Error('Cannot find #app-container');
    }
    const app = createApp(NewTab);
    app.mount(appContainer);
}
init();
