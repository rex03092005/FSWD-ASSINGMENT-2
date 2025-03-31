const studySessions = [];

// Add Study Session
export function addSession(topic, sessionTime, duration) {
    try {
        if (!topic.trim()) throw new Error("Topic cannot be empty.");
        if (isNaN(duration) || duration <= 0) throw new Error("Duration must be a positive number.");
        
        const sessionDate = new Date(sessionTime);
        if (isNaN(sessionDate.getTime())) throw new Error("Invalid date.");

        const session = { topic, sessionTime: sessionDate, duration: parseInt(duration) };
        studySessions.push(session);
        console.log(`Study session added: ${topic} at ${sessionDate} for ${duration} minutes.`);

        scheduleSessionCountdown(session);
        return session;
    } catch (error) {
        console.error(error.message);
    }
}

// List Today's Sessions
export function listTodaySessions() {
    const today = new Date();
    return studySessions.filter(session => {
        return session.sessionTime.toDateString() === today.toDateString();
    });
}

// Session Countdown
function scheduleSessionCountdown(session) {
    const now = new Date();
    const timeUntilStart = session.sessionTime - now;

    if (timeUntilStart > 0) {
        setTimeout(() => {
            console.log(`Session on "${session.topic}" starts now!`);
        }, timeUntilStart);
    }
}

// Simulate Fetching Study Materials Asynchronously
export function fetchStudyMaterials(topic) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!topic) {
                reject("No topic provided.");
            } else {
                resolve(`Study materials for "${topic}" are available.`);
            }
        }, 2000);
    });
}
