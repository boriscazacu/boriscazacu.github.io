import { tg, initTelegram } from "./telegram.js";
import { sendData } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    initTelegram();

    // setTimeout(() => {
    //     console.log('Timeout')
    //     document.getElementById('app-loader-index').classList.remove('active')
    // }, 3000)

    const closeModalButton = document.getElementById("close-modal");
    const modal = document.getElementById("appointment-modal");
    closeModalButton.addEventListener("click", () => {
        modal.classList.add("slide-in-bottom");
        modal.classList.remove("active", "slide-in-top");
    });
    
    document.querySelectorAll('.calendar_item .info').forEach(appointment => {
        console.log('Adding listener to appointment', appointment);
        
        appointment.addEventListener('click', () => {
            console.log('Appointment clicked');
            // Here you would typically fetch and display the appointment details
            modal.classList.remove("active", "slide-in-bottom");
            modal.classList.add( "slide-in-top", "active");
        });
    });
});
