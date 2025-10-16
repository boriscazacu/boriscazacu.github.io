import { tg, initTelegram } from "./telegram.js";
import { sendData } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    initTelegram();

    const button = document.getElementById("main-button");
    button.addEventListener("click", () => {
        const data = { action: "book", user: tg.initDataUnsafe.user };
        // sendData(data);
        document.getElementById('json-display').textContent = tg.initDataUnsafe.user;

    });
});
