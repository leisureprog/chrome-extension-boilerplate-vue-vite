import 'webextension-polyfill'
import { startExtension } from './extension'

console.log('background loaded')

async function main() {
  startExtension()
}

main()
