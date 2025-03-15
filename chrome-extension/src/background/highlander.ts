const INTERNAL_TESTALIVE_PORT: string = 'DNA_Internal_alive_test';

const nextSeconds: number = 25;
const SECONDS: number = 1000;
const DEBUG: boolean = false;

let alivePort: chrome.runtime.Port | null = null;
let isFirstStart: boolean = true;
let isAlreadyAwake: boolean = false;

let timer: number;
let firstCall: number;
let lastCall: number;

let wakeup: number | undefined; // Используем `number` для браузерного окружения

//#region HIGHLANDER
// ---------------------------
// HIGHLANDER FUNCTIONS
// ---------------------------
export function startHighlander(): void {
  if (wakeup === undefined) {
    isFirstStart = true;
    isAlreadyAwake = true;
    firstCall = Date.now();
    lastCall = firstCall;
    //timer = startSeconds * SECONDS;
    timer = 300;

    wakeup = setInterval(Highlander, timer) as unknown as number; // Приведение типа для браузерного окружения
    // console.log(`-------- >>> Highlander has been started at ${convertNoDate(firstCall)}`);
  }
}

async function Highlander(): Promise<void> {
  const now: number = Date.now();
  const age: number = now - firstCall;
  lastCall = now;

  // const str = `HIGHLANDER ------< ROUND >------ Time elapsed from first start: ${convertNoDate(age)}`;

  // console.log(str);

  if (alivePort == null) {
    alivePort = chrome.runtime.connect({ name: INTERNAL_TESTALIVE_PORT });

    alivePort.onDisconnect.addListener((p: chrome.runtime.Port) => {
      if (chrome.runtime.lastError) {
        if (DEBUG)
          console.log(`(DEBUG Highlander) Expected disconnect error. ServiceWorker status should be still RUNNING.`);
      } else {
        if (DEBUG) console.log(`(DEBUG Highlander): port disconnected`);
      }

      alivePort = null;
    });
  }

  if (alivePort) {
    alivePort.postMessage({ content: 'ping' });

    if (chrome.runtime.lastError) {
      if (DEBUG) console.log(`(DEBUG Highlander): postMessage error: ${chrome.runtime.lastError.message}`);
    } else {
      if (DEBUG) console.log(`(DEBUG Highlander): "ping" sent through ${alivePort.name} port`);
    }
  }

  if (isFirstStart) {
    isFirstStart = false;
    setTimeout(() => {
      nextRound();
    }, 100);
  }
}

function convertNoDate(long: number): string {
  const dt: string = new Date(long).toISOString();
  return dt.slice(-13, -5); // HH:MM:SS only
}

function nextRound(): void {
  if (wakeup !== undefined) {
    clearInterval(wakeup);
  }
  timer = nextSeconds * SECONDS;
  wakeup = setInterval(Highlander, timer) as unknown as number; // Приведение типа для браузерного окружения
}
//#endregion