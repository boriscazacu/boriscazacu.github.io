// assets/scripts/telegram.js
export const tg = window.Telegram.WebApp;

export function initTelegram() {
    tg.expand(); // Expand to full screen
    tg.MainButton.text = "Submit";
    tg.MainButton.color = "#2cab37";
    tg.MainButton.textColor = "#fff";
    tg.MainButton.hide();

    console.log("Telegram WebApp initialized:", tg.initDataUnsafe);
}
