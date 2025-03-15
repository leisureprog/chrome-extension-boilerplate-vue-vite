import 'webextension-polyfill';
import { startHighlander } from './highlander';
import { startExtension } from './extension';
console.log('background loaded');
async function main() {
    startHighlander();
    startExtension();
}
main();
