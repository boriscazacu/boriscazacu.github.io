// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    console.log("Telegram WebApp initialized:", tg.initDataUnsafe);
    // document.getElementById('json-display').textContent = JSON.stringify(tg.initDataUnsafe, null, 2);
    document.getElementById('username-display').textContent = `${tg.initDataUnsafe.user?.first_name || "Guest"} ${tg.initDataUnsafe.user?.last_name || ""}`.trim();
}
