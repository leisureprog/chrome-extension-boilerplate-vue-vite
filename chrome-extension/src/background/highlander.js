const INTERNAL_TESTALIVE_PORT = 'DNA_Internal_alive_test';
const nextSeconds = 25;
const SECONDS = 1000;
const DEBUG = false;
let alivePort = null;
let isFirstStart = true;
let isAlreadyAwake = false;
let timer;
let firstCall;
let lastCall;
let wakeup; // Используем `number` для браузерного окружения
//#region HIGHLANDER
// ---------------------------
// HIGHLANDER FUNCTIONS
// ---------------------------
export function startHighlander() {
    if (wakeup === undefined) {
        isFirstStart = true;
        isAlreadyAwake = true;
        firstCall = Date.now();
        lastCall = firstCall;
        //timer = startSeconds * SECONDS;
        timer = 300;
        wakeup = setInterval(Highlander, timer); // Приведение типа для браузерного окружения
        // console.log(`-------- >>> Highlander has been started at ${convertNoDate(firstCall)}`);
    }
}
async function Highlander() {
    const now = Date.now();
    const age = now - firstCall;
    lastCall = now;
    // const str = `HIGHLANDER ------< ROUND >------ Time elapsed from first start: ${convertNoDate(age)}`;
    // console.log(str);
    if (alivePort == null) {
        alivePort = chrome.runtime.connect({ name: INTERNAL_TESTALIVE_PORT });
        alivePort.onDisconnect.addListener((p) => {
            if (chrome.runtime.lastError) {
                if (DEBUG)
                    console.log(`(DEBUG Highlander) Expected disconnect error. ServiceWorker status should be still RUNNING.`);
            }
            else {
                if (DEBUG)
                    console.log(`(DEBUG Highlander): port disconnected`);
            }
            alivePort = null;
        });
    }
    if (alivePort) {
        alivePort.postMessage({ content: 'ping' });
        if (chrome.runtime.lastError) {
            if (DEBUG)
                console.log(`(DEBUG Highlander): postMessage error: ${chrome.runtime.lastError.message}`);
        }
        else {
            if (DEBUG)
                console.log(`(DEBUG Highlander): "ping" sent through ${alivePort.name} port`);
        }
    }
    if (isFirstStart) {
        isFirstStart = false;
        setTimeout(() => {
            nextRound();
        }, 100);
    }
}
function convertNoDate(long) {
    const dt = new Date(long).toISOString();
    return dt.slice(-13, -5); // HH:MM:SS only
}
function nextRound() {
    if (wakeup !== undefined) {
        clearInterval(wakeup);
    }
    timer = nextSeconds * SECONDS;
    wakeup = setInterval(Highlander, timer); // Приведение типа для браузерного окружения
}
//#endregion
