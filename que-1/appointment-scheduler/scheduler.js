const appointments = [];

// Add Appointment Function
export function addAppointment(clientName, appointmentTime, serviceType) {
    try {
        if (!clientName.trim()) throw new Error("Client name cannot be empty.");
        
        const appointmentDate = new Date(appointmentTime);
        if (isNaN(appointmentDate)) throw new Error("Invalid date.");

        const appointment = { clientName, appointmentTime: appointmentDate, serviceType };
        appointments.push(appointment);
        console.log(`Appointment added: ${clientName} - ${serviceType} at ${appointmentDate}`);
        
        scheduleReminder(appointment);
    } catch (error) {
        console.error(error.message);
    }
}

// Get Upcoming Appointments
export function getUpcomingAppointments() {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    return appointments.filter(appt => appt.appointmentTime > now && appt.appointmentTime <= oneHourLater);
}

// Schedule Reminder
function scheduleReminder(appointment) {
    const now = new Date();
    const timeUntilReminder = appointment.appointmentTime - now;

    if (timeUntilReminder > 0) {
        setTimeout(() => {
            console.log(`Reminder: Your appointment for ${appointment.serviceType} with ${appointment.clientName} is at ${appointment.appointmentTime}`);
        }, timeUntilReminder);
    }
}
