// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    const startParam = tg.initDataUnsafe?.start_param;
    sessionStorage.setItem("start_param", startParam);
    document.getElementById('tg-start-key').textContent=startParam

    document.getElementById('username-display').textContent = `${tg.initDataUnsafe.user?.first_name || "Guest"} ${tg.initDataUnsafe.user?.last_name || ""}`.trim();
    sessionStorage.setItem("telegram_key", tg?.initDataUnsafe?.user?.id);
}
