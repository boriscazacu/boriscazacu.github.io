// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    document.getElementById('username-display').textContent = `${tg.initDataUnsafe.user?.first_name || "Guest"} ${tg.initDataUnsafe.user?.last_name || ""}`.trim();
    sessionStorage.setItem("telegram_key", tg?.initDataUnsafe?.user?.id);
}
