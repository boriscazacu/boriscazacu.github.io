// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    console.log("Telegram WebApp initialized:", tg.initDataUnsafe);
    document.getElementById('json-display').textContent = tg.initDataUnsafe;
}
