import { tg, initTelegram } from "./telegram.js";
import { sendData, fetchData } from "./api.js";

const modal = document.getElementById("appointment-modal");
const closeModalButton = document.getElementById("close-modal");
const calendar = document.getElementById("calendar");
const cellHeight = 60; // pixels per hour

const clientConfig = {
    timeStep: 30, // minutes
    startTimeInMinutes: 9 * 60, // 9:00 AM in minutes
    endTimeInMinutes: 19 * 60 // 9:00 AM in minutes
}

document.addEventListener("DOMContentLoaded", async () => {
    // initTelegram();
    const data = await fetchData();
    populateCalendar(data);

    calculateTopOffset();

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("slide-in-bottom");
        modal.classList.remove("slide-in-top", "active");
    });
});

function calculateTopOffset() {
    const root = document.documentElement;
    const now = new Date();

    let minutes = now.getHours() * 60 + now.getMinutes();

    console.log("Current time in minutes:", minutes, now.getHours(), now.getMinutes());

    if (minutes < clientConfig.startTimeInMinutes) {
        minutes = 0;
    }
    else if (minutes > clientConfig.endTimeInMinutes) {
        minutes = clientConfig.endTimeInMinutes;
    }

    const offsetMinutes = ((minutes - clientConfig.startTimeInMinutes) / clientConfig.timeStep) * cellHeight;
    console.log("Offset minutes:", offsetMinutes);
    

    root.style.setProperty('--time-line-position', (offsetMinutes + clientConfig.timeStep * 2) + 'px');
    calendar.scrollTo(0, offsetMinutes);
}

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