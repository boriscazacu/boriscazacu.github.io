import { tg, initTelegram } from "./telegram.js";
import { sendData, fetchData } from "./api.js";

const modal = document.getElementById("appointment-modal");
const closeModalButton = document.getElementById("close-modal");
const calendar = document.getElementById("calendar");
const cellHeight = 60 + 7; // 60px height + 7px border-bottom
let currentDate = new Date();

const clientConfig = {
    timeStep: 30, // minutes
    startTimeInMinutes: 9 * 60, // 9:00 in minutes
    endTimeInMinutes: 19 * 60
}

document.addEventListener("DOMContentLoaded", async () => {
    // initTelegram();
    await updateCurrentTimeIndicator(0);

    startCalculateTimeOffsetInterval();

    closeModalButton.addEventListener("click", () => {
        modal.classList.add("slide-in-bottom");
        modal.classList.remove("slide-in-top", "active");
    });
});

function startCalculateTimeOffsetInterval() {
    const now = new Date();
    const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    // 3️⃣ Wait until the next exact minute, then start syncing every minute
    setTimeout(() => {
        calculateTopOffset();

        // Run exactly every minute after that
        setInterval(calculateTopOffset, 60 * 1000);
    }, msUntilNextMinute);

}


document.getElementById("prev-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(-1);
});

document.getElementById("next-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(1);
});

// Method to get calendar data
async function getCalendarData(filters) {
    const data = await fetchData(filters);
    populateCalendar(data);
}

function calculateTopOffset() {
    if (!isEqualNow(currentDate)) {
        console.log("Not today, skipping time indicator update.");
        return;
    }
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

    root.style.setProperty('--time-line-position', (offsetMinutes - 24) + 'px');
    calendar.scrollTo(0, offsetMinutes - cellHeight);
    document.querySelector(".calendar_current-time").textContent = now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0');
}

function isEqualNow(date) {
    const now = new Date();
    return date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();
}

function populateCalendar(appointments) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";

    if (isEqualNow(currentDate)) {
        const marker = document.createElement("div");
        marker.className = "calendar_current-time";
        marker.textContent = new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
        calendar.appendChild(marker);
    }


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

async function updateCurrentTimeIndicator(value) {
    currentDate.setDate(currentDate.getDate() + value);
    const today = new Date();
    let dateString = currentDate.toLocaleDateString('ro-RO', { weekday: "long", day: '2-digit', month: "long" });

    if (today.getFullYear() === currentDate.getFullYear() && today.getMonth() === currentDate.getMonth()) {
        if (today.getDate() === currentDate.getDate()) {
            dateString = `Astăzi, ${currentDate.toLocaleDateString('ro-RO', { day: '2-digit', month: "long" })}`;
        }
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        if (tomorrow.getDate() === currentDate.getDate()) {
            dateString = `Mâine, ${currentDate.toLocaleDateString('ro-RO', { day: '2-digit', month: "long" })}`;
        }
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        if (yesterday.getDate() === currentDate.getDate()) {
            dateString = `Ieri, ${currentDate.toLocaleDateString('ro-RO', { day: '2-digit', month: "long" })}`;
        }
    }
    document.getElementById("currentTimeDisplay").textContent = capitalise(dateString);
    await getCalendarData({ date: currentDate.toISOString().split('T')[0] });
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
