import { initTelegram } from "./telegram.js";
import { checkAuth, fetchAppointments, fetchWorkHour, goToLoginPage } from "./api.js";

const modal = document.getElementById("appointment-modal");
const tgModal = document.getElementById("tg-data-modal");
const closeModalButton = document.getElementById("close-modal");
const calendar = document.getElementById("calendar");
const loaderElement = document.getElementById("calendar-loader");
const cellHeight = 60 + 7; // 60px height + 7px border-bottom
let currentDate = new Date();
let hideCurrentTimeIndicator = false;

const clientConfig = {
    timeStep: 30, // minutes
    startTimeInMinutes: 9 * 60, // 9:00 in minutes
    endTimeInMinutes: 19 * 60
}

document.addEventListener("DOMContentLoaded", async () => {
    initTelegram();

    let userLogIn = await checkAuth();
    loaderElement.classList.add('calendars');
    startCalculateTimeOffsetInterval();

    fetchWorkHour(currentDate.toISOString()).then(wh => {
        clientConfig.timeStep = wh.interval;
        clientConfig.startTimeInMinutes = Number(wh.startTime.split(":")[0]) * 60
        clientConfig.endTimeInMinutes = Number(wh.endTime.split(":")[0]) * 60
    });

    if (!userLogIn) {
        calendar.style.visibility = 'hidden';
        document.getElementById("login-form").style.display = 'flex';
        hideCurrentTimeIndicator = true;
        loader(false);
        return;
    }
    await updateCurrentTimeIndicator(0);
});

closeModalButton.addEventListener("click", () => {
    closeModal();
});

document.getElementById("prev-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(-1);
});

document.getElementById("next-day-btn").addEventListener("click", (e) => {
    updateCurrentTimeIndicator(1);
});

document.getElementById("login-button").addEventListener("click", (e) => {
    e.target.classList.add('loading');
    goToLoginPage();
    let cnt = 0;

    const intervalId = setInterval(async () => {
        let userLogIn = await checkAuth();
        if (cnt++ > 20) {
            clearInterval(intervalId);
        }
        if (userLogIn) {
            clearInterval(intervalId);
            document.getElementById("login-form").style.display = 'none';
            await updateCurrentTimeIndicator(0);
        }
    }, 10 * 1000);
});

//For test
document.getElementById("settings-link").addEventListener("click", (e) => {
    tgModal.classList.remove("active", "slide-in-bottom");
    tgModal.classList.add("slide-in-top", "active");
});

// ==================== METHODS ==============================================

function closeModal() {
    modal.classList.add("slide-in-bottom");
    modal.classList.remove("slide-in-top", "active");
}

function startCalculateTimeOffsetInterval() {
    const now = new Date();
    const msUntilNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    setTimeout(() => {
        // Run exactly every minute after that
        setInterval(calculateTopOffset, 60 * 1000);
    }, msUntilNextMinute);

}

// Method to get calendar data
async function getCalendarData(filters) {
    loader(true);
    closeModal();
    setTimeout(async () => {
        const data = await fetchAppointments(filters);
        populateCalendar(data);

        calendar.scrollTo(0, 0);
        calculateTopOffset();
    }, 1500);
}

function calculateTopOffset() {
    if (!isEqualNow(currentDate) || hideCurrentTimeIndicator) {
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

    const offsetMinutes = Math.round(
        ((minutes - clientConfig.startTimeInMinutes) / clientConfig.timeStep) * cellHeight
    );

    root.style.setProperty('--time-line-position', (offsetMinutes - 21) + 'px');
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
    calendar.style.display = 'flex';

    if (!appointments || appointments.length === 0) {
        const item = document.createElement("div");
        item.className = "calendar_no-data";
        item.textContent = "Nu există programări pentru această dată.";
        calendar.appendChild(item);
        hideCurrentTimeIndicator = true;
        loader(false);
        return;
    }

    if (isEqualNow(currentDate)) {
        const marker = document.createElement("div");
        marker.className = "calendar_current-time";
        marker.textContent = new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
        calendar.appendChild(marker);
    }

    appointments.forEach(appointment => {
        const isActive = appointment.phone && appointment.name;
        const item = document.createElement("div");
        item.className = "calendar_item";

        const time = document.createElement("span");
        time.className = "time";
        time.textContent = appointment.time;

        const info = document.createElement("div");
        info.className = `info ${isActive ? "active" : ""}`;

        const title = document.createElement("h4");
        title.textContent = appointment?.services?.length > 0
            ? appointment?.services.map(s => s.name).join(", ")
            : appointment.name;

        const clientInfo = document.createElement("small");
        clientInfo.textContent = !appointment.name
            ? appointment.phone
            : `${appointment.name} / ${appointment.phone}`;

        if (isActive) {
            info.appendChild(title);
            info.appendChild(clientInfo);
        }
        item.appendChild(time);
        item.appendChild(info);
        calendar.appendChild(item);
        calendar.style.visibility = 'visible';

        // Add click listener to open modal with details
        if (isActive) {
            info.addEventListener('click', () => {
                modal.querySelector(".modal-service").textContent = appointment?.services?.length > 0
                    ? appointment.services.map(s => s.name).join(", ")
                    : "N/A";
                modal.querySelector(".modal-client").textContent = appointment.name;
                modal.querySelector(".modal-phone").textContent = appointment.phone;
                modal.querySelector(".modal-date").textContent = appointment.createdAt;
                modal.classList.remove("active", "slide-in-bottom");
                modal.classList.add("slide-in-top", "active");
            });
        }
        loader(false);
    });
}

async function updateCurrentTimeIndicator(value) {
    hideCurrentTimeIndicator = false;
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
    await getCalendarData(currentDate.toISOString());
}

function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function loader(show) {
    if (show) {
        loaderElement.style.display = "flex";
    } else {
        loaderElement.style.display = "none";
    }
}
