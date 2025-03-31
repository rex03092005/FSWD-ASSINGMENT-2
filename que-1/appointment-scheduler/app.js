import { addAppointment, getUpcomingAppointments } from "./scheduler.js";

document.getElementById("addAppointmentBtn").addEventListener("click", () => {
    const clientName = document.getElementById("clientName").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const serviceType = document.getElementById("serviceType").value;

    addAppointment(clientName, appointmentTime, serviceType);
    updateUpcomingAppointments();
});

// Update Upcoming Appointments List
function updateUpcomingAppointments() {
    const upcomingList = document.getElementById("upcomingAppointments");
    upcomingList.innerHTML = "";

    const upcomingAppointments = getUpcomingAppointments();
    upcomingAppointments.forEach(appt => {
        const li = document.createElement("li");
        li.textContent = `${appt.clientName} - ${appt.serviceType} at ${appt.appointmentTime}`;
        upcomingList.appendChild(li);
    });
}

// Initial Load
updateUpcomingAppointments();
