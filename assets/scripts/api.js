export async function sendData(data) {
    try {
        const response = await fetch("https://your-api-url.com/api/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Server response:", result);
    } catch (error) {
        console.error("Error sending data:", error);
    }
}
