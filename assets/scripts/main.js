import { tg, initTelegram } from "./telegram.js";
import { sendData, fetchData } from "./api.js";

const modal = document.getElementById("appointment-modal");
const closeModalButton = document.getElementById("close-modal");
const calendar = document.getElementById("calendar");
const cellHeight = 60 + 7; // 60px height + 7px border-bottom
let curentDate = new Date();

const clientConfig = {
    timeStep: 30, // minutes
    startTimeInMinutes: 9 * 60, // 9:00 in minutes
    endTimeInMinutes: 19 * 60
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

    if (minutes < clientConfig.startTimeInMinutes) {
        minutes = 0;
    }
    else if (minutes > clientConfig.endTimeInMinutes) {
        minutes = clientConfig.endTimeInMinutes;
    }

    const offsetMinutes = ((minutes - clientConfig.startTimeInMinutes) / clientConfig.timeStep) * cellHeight;
    console.log("Offset minutes:", offsetMinutes);

    root.style.setProperty('--time-line-position', (offsetMinutes - 25) + 'px');
    calendar.scrollTo(0, offsetMinutes - cellHeight);
    document.querySelector(".calendar_current-time").textContent = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
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

document.getElementById("prev-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(-1);
});

document.getElementById("next-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(1);
});

function updateCurrentTimeIndicator(value) {
    curentDate.setDate(curentDate.getDate() + value);
    const dateString = curentDate.toLocaleDateString('ro-RO', { weekday: "long", day: '2-digit', month: "long" });
    console.log("Updated date:", capitalise(dateString));
    document.getElementById("currentTimeDisplay").textContent = capitalise(dateString);
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
