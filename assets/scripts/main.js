import { tg, initTelegram } from "./telegram.js";
import { sendData, fetchData } from "./api.js";

const modal = document.getElementById("appointment-modal");
const closeModalButton = document.getElementById("close-modal");


document.addEventListener("DOMContentLoaded", async () => {
    // initTelegram();
    const data = await fetchData();
    populateCalendar(data);

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("slide-in-bottom");
        modal.classList.remove("slide-in-top", "active");
    });
});

function populateCalendar(appointments) {
    const calendar = document.getElementById("calendar");

    appointments.forEach(appointment => {
        const isActive = appointment.title && appointment.client;
        const item = document.createElement("div");
        item.className = "calendar_item";

        const time = document.createElement("span");
        time.className = "time";
        time.textContent = appointment.time;

        const info = document.createElement("div");
        info.className = `info ${isActive ? "active" : ""}`;

        const title = document.createElement("h4");
        title.textContent = appointment.title;

        const clientInfo = document.createElement("small");
        clientInfo.textContent = `${appointment.client} / ${appointment.phone}`;

        if (isActive) {
            info.appendChild(title);
            info.appendChild(clientInfo);
        }
        item.appendChild(time);
        item.appendChild(info);
        calendar.appendChild(item);

        // Add click listener to open modal with details
        if (isActive) {
            info.addEventListener('click', () => {
                // const modal = document.getElementById("appointment-modal");
                console.log(modal);
                
                modal.querySelector(".modal-service").textContent = appointment.title;
                modal.querySelector(".modal-client").textContent = appointment.client;
                modal.querySelector(".modal-phone").textContent = appointment.phone;
                modal.querySelector(".modal-date").textContent = appointment.date;
                modal.classList.remove("active", "slide-in-bottom");
                modal.classList.add("slide-in-top", "active");
            });
        }
    });
}