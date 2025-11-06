// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    console.log("Telegram WebApp initialized:", tg.initDataUnsafe);
    document.getElementById('username-display').textContent = `${tg.initDataUnsafe.user?.first_name || "Guest"} ${tg.initDataUnsafe.user?.last_name || ""}`.trim();

    document.getElementById('tg-data').textContent = JSON.stringify(tg.initDataUnsafe);
}
