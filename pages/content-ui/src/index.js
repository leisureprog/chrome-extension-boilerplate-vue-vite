import { createApp, defineComponent, h } from 'vue';
import App from '@src/App.vue';
// @ts-expect-error Because file doesn't exist before build
import tailwindcssOutput from '../dist/tailwind-output.css?inline';
const root = document.createElement('div');
root.id = 'chrome-extension-boilerplate-vue-vite-content-view-root';
document.body.append(root);
const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'shadow-root';
const shadowRoot = root.attachShadow({ mode: 'open' });
const ShadowApp = defineComponent({
    render() {
        return h(App);
    }
});
const globalStyleSheet = new CSSStyleSheet();
globalStyleSheet.replaceSync(tailwindcssOutput);
shadowRoot.adoptedStyleSheets = [globalStyleSheet];
// Добавляем корневой элемент в shadow DOM и монтируем приложение
shadowRoot.appendChild(rootIntoShadow);
createApp(ShadowApp).mount(rootIntoShadow);
