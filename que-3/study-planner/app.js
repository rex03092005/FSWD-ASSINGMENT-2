import { addSession, listTodaySessions, fetchStudyMaterials } from "./planner.js";

// Add Session Event
document.getElementById("addSessionBtn").addEventListener("click", () => {
    const topic = document.getElementById("topic").value;
    const sessionTime = document.getElementById("sessionTime").value;
    const duration = document.getElementById("duration").value;

    const newSession = addSession(topic, sessionTime, duration);
    if (newSession) {
        updateTodaySessions();
    }
});

// Update Today's Sessions
function updateTodaySessions() {
    const sessionList = document.getElementById("todaySessions");
    sessionList.innerHTML = "";

    const todaySessions = listTodaySessions();
    todaySessions.forEach(session => {
        const li = document.createElement("li");
        li.textContent = `${session.topic} at ${session.sessionTime.toLocaleTimeString()} for ${session.duration} min`;
        sessionList.appendChild(li);
    });
}

// Fetch Study Materials Event
document.getElementById("fetchMaterialsBtn").addEventListener("click", async () => {
    const materialsStatus = document.getElementById("materialsStatus");
    const topic = document.getElementById("topic").value;

    materialsStatus.textContent = "Fetching study materials...";

    try {
        const materials = await fetchStudyMaterials(topic);
        materialsStatus.textContent = materials;
    } catch (error) {
        materialsStatus.textContent = `Error: ${error}`;
    }
});
