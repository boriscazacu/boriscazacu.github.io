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

export async function fetchData(filters) {
    console.log("Fetching data with filters:", filters);
    if ('2025-10-20' !== filters.date) {
        console.log("No data for the selected date:", filters.date);
        return [
            { id: 3, time: "10:00" },
            { id: 4, time: "10:30" },
            { id: 14, time: "11:00" },
            { id: 41, time: "12:30" },
            { id: 12, time: "13:00" },
            { id: 9, time: "14:30" },
            { id: 19, time: "15:00" },
            { id: 11, time: "16:00" },
            { id: 13, time: "16:30" },
        ];
    }
    return [
        { id: 1, time: "9:00", title: "Tonarea părului / Painting hair", client: "Ion Radu", phone: "093483353", date: "25 Decembrie 2023, 9:00 AM" },
        { id: 2, time: "9:30", title: "Corecția sprâncenelor cu ceară/Коррекция бровей воском", client: "Ion Moldovanu", phone: "093483353", date: "25 Decembrie 2023, 9:30 AM" },
        { id: 3, time: "10:00" },
        { id: 4, time: "10:30" },
        { id: 14, time: "11:00" },
        { id: 5, time: "11:30", title: "Machiaj nunt pentru mireasa", client: "Maria Radu", phone: "093483353", date: "26 Decembrie 2023, 11:30 AM" },
        { id: 6, time: "12:00", title: "Tunsore bărbați /   Men's haircut", client: "Victor Vizitiu", phone: "093483353", date: "26 Decembrie 2023, 12:00 PM" },
        { id: 41, time: "12:30" },
        { id: 12, time: "13:00" },
        { id: 7, time: "13:30", title: "Tunsore bărbați /   Men's haircut", client: "Ion Branza", phone: "093483353", date: "26 Decembrie 2023, 12:00 PM" },
        { id: 8, time: "14:00", title: "Vopsit păr / Hair coloring", client: "Ana Popescu", phone: "093483353", date: "27 Decembrie 2023, 14:00 PM" },
        { id: 9, time: "14:30" },
        { id: 19, time: "15:00" },
        { id: 10, time: "15:30", title: "Manichiură cu gel / Gel manicure", client: "Elena Ionescu", phone: "093483353", date: "27 Decembrie 2023, 15:30 PM" },
        { id: 11, time: "16:00" },
        { id: 13, time: "16:30" },
        { id: 15, time: "17:00", title: "Pedichiură spa / Spa pedicure", client: "Cristina Vasilescu", phone: "093483353", date: "28 Decembrie 2023, 17:00 PM" },
        { id: 16, time: "17:30", title: "Machiaj de zi / Day makeup", client: "Ioana Georgescu", phone: "093483353", date: "28 Decembrie 2023, 17:30 PM" },
        { id: 17, time: "18:00", title: "Coafură pentru ocazii speciale / Hairstyling for special occasions", client: "Gabriela Stan", phone: "093483353", date: "28 Decembrie 2023, 18:00 PM" },
        { id: 18, time: "18:30" },
    ];
}
