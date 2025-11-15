const API_URL = "https://api.eppoint.site/telegram";

export async function login(formData) {
    try {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TELEGRAM": sessionStorage.getItem("telegram_key")
            },
            body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.code === 200) {
            return true;
        }
    } catch (error) {
        console.error("Error sending data:", error);
    }
    return false;
}

export async function fetchAppointments(date) {
    try {
        const response = await fetch(`${API_URL}/appointments?date=${date}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-AUTH-TELEGRAM": sessionStorage.getItem("telegram_key")
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error sending data:", error);
    }
    return null;
}

export function goToLoginPage() {
    let a = document.createElement('a');
    a.href = `https://eppoint.site/login?tgRef=${sessionStorage.getItem("telegram_key")}`
    a.target = '_blank';
    a.click();
}