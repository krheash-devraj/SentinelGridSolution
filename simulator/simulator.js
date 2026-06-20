"use strict";

const scenarios = {
    road: {
        name: "Road Accident",
        type: "Road Accident",
        classification: "High Severity Collision",
        confidence: 94,
        severity: 91,
        sync: 4,
        distance: {
            ambulance: "1.8 km",
            police: "2.4 km",
            hospital: "3.1 km",
            fire: "Standby"
        },
        eta: {
            ambulance: 342,
            police: 430,
            hospital: 0,
            fire: 0
        },
        feed: [
            "Emergency signal received from mobile SOS trigger.",
            "GPS location locked within active response grid.",
            "Athena AI begins incident classification.",
            "Vehicle collision indicators detected.",
            "Injury probability elevated. Severity marked HIGH.",
            "Nearest ambulance identified and assigned.",
            "Police unit notified for traffic control and public safety.",
            "Hospital ER alerted for incoming trauma case.",
            "Live tracking enabled for all response agencies.",
            "Unified emergency command view activated."
        ]
    },

    medical: {
        name: "Medical Emergency",
        type: "Medical Distress",
        classification: "Critical Health Alert",
        confidence: 92,
        severity: 88,
        sync: 3,
        distance: {
            ambulance: "1.2 km",
            police: "Standby",
            hospital: "2.6 km",
            fire: "Not Required"
        },
        eta: {
            ambulance: 286,
            police: 0,
            hospital: 0,
            fire: 0
        },
        feed: [
            "Wearable-linked emergency signal received.",
            "Senior citizen distress pattern detected.",
            "Location confirmed inside residential zone.",
            "Athena AI classifies event as medical emergency.",
            "Nearest ambulance assigned automatically.",
            "Hospital ER notified with patient risk profile.",
            "Emergency contacts informed.",
            "Live patient location tracking enabled.",
            "Medical responder ETA optimization active.",
            "Coordinated medical response established."
        ]
    },

    fire: {
        name: "Fire Incident",
        type: "Fire Emergency",
        classification: "Residential Fire Risk",
        confidence: 89,
        severity: 93,
        sync: 4,
        distance: {
            ambulance: "2.3 km",
            police: "3.2 km",
            hospital: "3.8 km",
            fire: "1.6 km"
        },
        eta: {
            ambulance: 410,
            police: 488,
            hospital: 0,
            fire: 260
        },
        feed: [
            "Emergency report received from residential block.",
            "Smoke and flame indicators registered.",
            "Athena AI begins fire-risk classification.",
            "Fire service automatically prioritized.",
            "Ambulance placed on active medical standby.",
            "Police notified for perimeter control.",
            "Nearby hospital alerted for possible burn injuries.",
            "Responder routes optimized through live grid.",
            "Multi-agency fire response synchronized.",
            "Command center incident view activated."
        ]
    },

    safety: {
        name: "Personal Safety",
        type: "Silent SOS",
        classification: "Personal Safety Threat",
        confidence: 91,
        severity: 84,
        sync: 3,
        distance: {
            ambulance: "Standby",
            police: "1.9 km",
            hospital: "Standby",
            fire: "Not Required"
        },
        eta: {
            ambulance: 0,
            police: 318,
            hospital: 0,
            fire: 0
        },
        feed: [
            "Silent SOS signal received.",
            "User movement pattern indicates possible distress.",
            "Live GPS trail locked and encrypted.",
            "Athena AI classifies alert as personal safety threat.",
            "Nearest police unit notified discreetly.",
            "Emergency contacts informed with live location.",
            "Continuous location tracking enabled.",
            "Route prediction active for responder interception.",
            "Escalation timer started.",
            "Personal safety response coordinated."
        ]
    }
};

const elements = {
    scenarioCards: document.querySelectorAll(".scenario-card"),
    startButton: document.getElementById("startSimulation"),
    resetButton: document.getElementById("resetSimulation"),
    feedList: document.getElementById("feedList"),
    feedStatus: document.getElementById("feedStatus"),
    mapStatus: document.getElementById("mapStatus"),
    aiStatus: document.getElementById("aiStatus"),
    incidentPulse: document.getElementById("incidentPulse"),
    incidentLabel: document.getElementById("incidentLabel"),
    routeAmbulance: document.getElementById("routeAmbulance"),
    routePolice: document.getElementById("routePolice"),
    routeHospital: document.getElementById("routeHospital"),
    ambulanceUnit: document.getElementById("ambulanceUnit"),
    policeUnit: document.getElementById("policeUnit"),
    hospitalUnit: document.getElementById("hospitalUnit"),
    fireUnit: document.getElementById("fireUnit"),
    aiScore: document.getElementById("aiScore"),
    incidentType: document.getElementById("incidentType"),
    classification: document.getElementById("classification"),
    confidence: document.getElementById("confidence"),
    responderSync: document.getElementById("responderSync"),
    commandStatus: document.getElementById("commandStatus"),
    ambulanceEta: document.getElementById("ambulanceEta"),
    policeEta: document.getElementById("policeEta"),
    hospitalEta: document.getElementById("hospitalEta"),
    fireEta: document.getElementById("fireEta"),
    ambulanceDistance: document.getElementById("ambulanceDistance"),
    policeDistance: document.getElementById("policeDistance"),
    hospitalDistance: document.getElementById("hospitalDistance"),
    fireDistance: document.getElementById("fireDistance"),
    cardAmbulance: document.getElementById("cardAmbulance"),
    cardPolice: document.getElementById("cardPolice"),
    cardHospital: document.getElementById("cardHospital"),
    cardFire: document.getElementById("cardFire"),
    impactAgencies: document.getElementById("impactAgencies"),
    impactRoutes: document.getElementById("impactRoutes"),
    impactAlerts: document.getElementById("impactAlerts"),
    impactStatus: document.getElementById("impactStatus"),
    heroIncidents: document.getElementById("heroIncidents")
};

let selectedScenario = "road";
let isRunning = false;
let feedTimer = null;
let countdownTimers = [];
let severityTimer = null;
let simulationCount = 0;

function formatTime(totalSeconds) {
    if (!totalSeconds || totalSeconds <= 0) {
        return "READY";
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function clearTimers() {
    if (feedTimer) {
        clearInterval(feedTimer);
        feedTimer = null;
    }

    if (severityTimer) {
        clearInterval(severityTimer);
        severityTimer = null;
    }

    countdownTimers.forEach((timer) => clearInterval(timer));
    countdownTimers = [];
}

function resetClasses() {
    [
        elements.incidentPulse,
        elements.incidentLabel,
        elements.routeAmbulance,
        elements.routePolice,
        elements.routeHospital,
        elements.ambulanceUnit,
        elements.policeUnit,
        elements.hospitalUnit,
        elements.fireUnit,
        elements.cardAmbulance,
        elements.cardPolice,
        elements.cardHospital,
        elements.cardFire
    ].forEach((item) => {
        if (item) {
            item.classList.remove("active");
        }
    });
}

function resetSimulation() {
    clearTimers();

    isRunning = false;
    elements.startButton.disabled = false;
    elements.startButton.textContent = "Trigger Sentinel Grid";

    elements.feedStatus.textContent = "STANDBY";
    elements.mapStatus.textContent = "IDLE";
    elements.aiStatus.textContent = "OFFLINE";

    elements.feedList.innerHTML = `
        <div class="feed-item muted">
            <span>00:00</span>
            <p>System ready. Awaiting emergency trigger.</p>
        </div>
    `;

    resetClasses();

    elements.aiScore.textContent = "00";
    elements.incidentType.textContent = "Awaiting Signal";
    elements.classification.textContent = "Pending";
    elements.confidence.textContent = "0%";
    elements.responderSync.textContent = "0 Agencies";
    elements.commandStatus.textContent = "Standby";

    elements.ambulanceEta.textContent = "--:--";
    elements.policeEta.textContent = "--:--";
    elements.hospitalEta.textContent = "--:--";
    elements.fireEta.textContent = "--:--";

    elements.ambulanceDistance.textContent = "Distance: --";
    elements.policeDistance.textContent = "Distance: --";
    elements.hospitalDistance.textContent = "Distance: --";
    elements.fireDistance.textContent = "Distance: --";

    elements.impactAgencies.textContent = "0";
    elements.impactRoutes.textContent = "0";
    elements.impactAlerts.textContent = "0";
    elements.impactStatus.textContent = "Idle";
}

function addFeedItem(time, message, type = "") {
    const item = document.createElement("div");
    item.className = `feed-item ${type}`;
    item.innerHTML = `
        <span>${time}</span>
        <p>${message}</p>
    `;

    elements.feedList.appendChild(item);
    elements.feedList.scrollTop = elements.feedList.scrollHeight;
}

function animateSeverity(targetScore) {
    let currentScore = 0;

    severityTimer = setInterval(() => {
        currentScore += 1;
        elements.aiScore.textContent = String(currentScore).padStart(2, "0");

        if (currentScore >= targetScore) {
            clearInterval(severityTimer);
            severityTimer = null;
        }
    }, 18);
}

function startCountdown(element, seconds) {
    if (!seconds || seconds <= 0) {
        element.textContent = "READY";
        return;
    }

    let remaining = seconds;
    element.textContent = formatTime(remaining);

    const timer = setInterval(() => {
        remaining -= 1;
        element.textContent = formatTime(remaining);

        if (remaining <= seconds - 25) {
            clearInterval(timer);
        }
    }, 1000);

    countdownTimers.push(timer);
}

function activateResponderCards(data) {
    elements.ambulanceDistance.textContent = `Distance: ${data.distance.ambulance}`;
    elements.policeDistance.textContent = `Distance: ${data.distance.police}`;
    elements.hospitalDistance.textContent = `Distance: ${data.distance.hospital}`;
    elements.fireDistance.textContent = `Distance: ${data.distance.fire}`;

    const activeCards = [];

    if (data.distance.ambulance !== "Not Required" && data.distance.ambulance !== "Standby") {
        activeCards.push(elements.cardAmbulance, elements.ambulanceUnit, elements.routeAmbulance);
        startCountdown(elements.ambulanceEta, data.eta.ambulance);
    } else {
        elements.ambulanceEta.textContent = data.distance.ambulance;
    }

    if (data.distance.police !== "Not Required" && data.distance.police !== "Standby") {
        activeCards.push(elements.cardPolice, elements.policeUnit, elements.routePolice);
        startCountdown(elements.policeEta, data.eta.police);
    } else {
        elements.policeEta.textContent = data.distance.police;
    }

    if (data.distance.hospital !== "Not Required") {
        activeCards.push(elements.cardHospital, elements.hospitalUnit, elements.routeHospital);
        startCountdown(elements.hospitalEta, data.eta.hospital);
    } else {
        elements.hospitalEta.textContent = data.distance.hospital;
    }

    if (data.distance.fire !== "Not Required" && data.distance.fire !== "Standby") {
        activeCards.push(elements.cardFire, elements.fireUnit);
        startCountdown(elements.fireEta, data.eta.fire);
    } else {
        elements.fireEta.textContent = data.distance.fire;
    }

    activeCards.forEach((item, index) => {
        setTimeout(() => {
            if (item) {
                item.classList.add("active");
            }
        }, index * 220);
    });
}

function updateImpact(data) {
    const activeRoutes = [
        data.distance.ambulance,
        data.distance.police,
        data.distance.hospital,
        data.distance.fire
    ].filter((distance) => distance !== "Not Required" && distance !== "Standby").length;

    elements.impactAgencies.textContent = String(data.sync);
    elements.impactRoutes.textContent = String(activeRoutes);
    elements.impactAlerts.textContent = String(data.feed.length);
    elements.impactStatus.textContent = "Coordinated";
}

function runFeedSequence(data) {
    let index = 0;

    elements.feedList.innerHTML = "";
    elements.feedStatus.textContent = "LIVE";
    elements.mapStatus.textContent = "TRACKING";
    elements.aiStatus.textContent = "ACTIVE";

    addFeedItem("00:01", data.feed[index], "critical");
    index += 1;

    feedTimer = setInterval(() => {
        if (index >= data.feed.length) {
            clearInterval(feedTimer);
            feedTimer = null;

            addFeedItem("00:30", "Simulation complete. Agencies synchronized through Sentinel Grid.", "success");
            elements.feedStatus.textContent = "COMPLETE";
            elements.mapStatus.textContent = "COORDINATED";
            elements.aiStatus.textContent = "ONLINE";
            elements.commandStatus.textContent = "Incident Coordinated";
            elements.startButton.disabled = false;
            elements.startButton.textContent = "Run Simulation Again";
            isRunning = false;

            updateImpact(data);
            return;
        }

        const seconds = String((index + 1) * 3).padStart(2, "0");
        const type = index <= 3 ? "critical" : index >= 7 ? "success" : "";

        addFeedItem(`00:${seconds}`, data.feed[index], type);

        if (index === 1) {
            elements.incidentPulse.classList.add("active");
            elements.incidentLabel.classList.add("active");
        }

        if (index === 2) {
            animateSeverity(data.severity);
            elements.incidentType.textContent = data.type;
            elements.classification.textContent = "Analyzing";
            elements.commandStatus.textContent = "AI Processing";
        }

        if (index === 3) {
            elements.classification.textContent = data.classification;
            elements.confidence.textContent = `${data.confidence}%`;
            elements.responderSync.textContent = `${data.sync} Agencies`;
            elements.commandStatus.textContent = "Dispatch Preparing";
        }

        if (index === 5) {
            activateResponderCards(data);
            elements.commandStatus.textContent = "Multi-Agency Dispatch";
        }

        index += 1;
    }, 1750);
}

function startSimulation() {
    if (isRunning) {
        return;
    }

    isRunning = true;
    clearTimers();
    resetClasses();

    const data = scenarios[selectedScenario];

    simulationCount += 1;
    elements.heroIncidents.textContent = String(simulationCount).padStart(2, "0");

    elements.startButton.disabled = true;
    elements.startButton.textContent = "Simulation Running";

    elements.aiScore.textContent = "00";
    elements.incidentType.textContent = "Signal Received";
    elements.classification.textContent = "Pending";
    elements.confidence.textContent = "0%";
    elements.responderSync.textContent = "0 Agencies";
    elements.commandStatus.textContent = "Emergency Triggered";

    elements.ambulanceEta.textContent = "--:--";
    elements.policeEta.textContent = "--:--";
    elements.hospitalEta.textContent = "--:--";
    elements.fireEta.textContent = "--:--";

    elements.impactAgencies.textContent = "0";
    elements.impactRoutes.textContent = "0";
    elements.impactAlerts.textContent = "0";
    elements.impactStatus.textContent = "Processing";

    runFeedSequence(data);
}

function selectScenario(event) {
    const card = event.currentTarget;
    selectedScenario = card.dataset.scenario;

    elements.scenarioCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");

    resetSimulation();

    const scenarioName = scenarios[selectedScenario].name;
    addFeedItem("00:00", `${scenarioName} scenario loaded. Ready for activation.`, "success");
}

elements.scenarioCards.forEach((card) => {
    card.addEventListener("click", selectScenario);
});

elements.startButton.addEventListener("click", startSimulation);
elements.resetButton.addEventListener("click", resetSimulation);

resetSimulation();
