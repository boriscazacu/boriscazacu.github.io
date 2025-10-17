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

export async function fetchData() {
    return [
        { id: 1, time: "9:00", title: "Tonarea părului / Painting hair", client: "Ion Radu", phone: "093483353", date: "25 Decembrie 2023, 9:00 AM" },
        { id: 2, time: "9:30", title: "Corecția sprâncenelor cu ceară/Коррекция бровей воском", client: "Ion Moldovanu", phone: "093483353", date: "25 Decembrie 2023, 9:30 AM" },
        { id: 3, time: "10:00"},
        { id: 4, time: "10:30"},
        { id: 5, time: "11:30", title: "Machiaj nunt pentru mireasa", client: "Maria Radu", phone: "093483353", date: "26 Decembrie 2023, 11:30 AM" },
        { id: 6, time: "12:00", title: "Tunsore bărbați /   Men's haircut", client: "Victor Vizitiu", phone: "093483353", date: "26 Decembrie 2023, 12:00 PM" },
        { id: 7, time: "13:30", title: "Tunsore bărbați /   Men's haircut", client: "Ion Branza", phone: "093483353", date: "26 Decembrie 2023, 12:00 PM" },
        { id: 8, time: "14:00"},
        { id: 9, time: "14:30"},
    
    ];
}
