"use strict";

/* =====================================================
   SENTINEL23™ SIMULATOR V2
   Powered by VEDAHAM AI
===================================================== */

const scenarios = {
    road: {
        label: "Road Accident",
        type: "High-Severity Road Collision",
        urgency: "Critical",
        confidence: 94,
        severity: 91,
        sync: 4,
        activeRoutes: 3,
        distances: {
            police: "2.4 km",
            ambulance: "1.8 km",
            hospital: "3.1 km",
            fire: "Standby"
        },
        eta: {
            police: 430,
            ambulance: 342,
            hospital: 0,
            fire: 0
        },
        responders: {
            police: true,
            ambulance: true,
            hospital: true,
            fire: false
        },
        feed: [
            "Emergency signal received from mobile SOS trigger.",
            "Location signature acquired. Geo-lock accuracy within active response threshold.",
            "VEDAHAM AI begins incident pattern analysis.",
            "Vehicle collision indicators detected. Trauma probability elevated.",
            "Threat classification confirmed: high-severity road collision.",
            "Nearest ambulance identified and assigned to incident corridor.",
            "Police unit notified for traffic control and scene security.",
            "Hospital ER pre-alerted for incoming trauma case.",
            "Live response map synchronized across agency command views.",
            "Unified emergency command established inside SENTINEL23™."
        ]
    },

    medical: {
        label: "Medical Emergency",
        type: "Critical Medical Distress",
        urgency: "Critical",
        confidence: 92,
        severity: 88,
        sync: 3,
        activeRoutes: 2,
        distances: {
            police: "Standby",
            ambulance: "1.2 km",
            hospital: "2.6 km",
            fire: "Not Required"
        },
        eta: {
            police: 0,
            ambulance: 286,
            hospital: 0,
            fire: 0
        },
        responders: {
            police: false,
            ambulance: true,
            hospital: true,
            fire: false
        },
        feed: [
            "Medical distress alert received from connected emergency profile.",
            "Patient location locked inside residential response sector.",
            "VEDAHAM AI begins medical urgency assessment.",
            "Critical health-risk pattern detected. Ambulance priority elevated.",
            "Threat classification confirmed: critical medical distress.",
            "Nearest ambulance assigned to patient location.",
            "Hospital ER notified with medical readiness alert.",
            "Emergency contacts informed with live response status.",
            "Care pathway synchronized between field responder and hospital.",
            "Medical response command established inside SENTINEL23™."
        ]
    },

    fire: {
        label: "Fire Incident",
        type: "Residential Fire Risk",
        urgency: "Severe",
        confidence: 89,
        severity: 93,
        sync: 4,
        activeRoutes: 4,
        distances: {
            police: "3.2 km",
            ambulance: "2.3 km",
            hospital: "3.8 km",
            fire: "1.6 km"
        },
        eta: {
            police: 488,
            ambulance: 410,
            hospital: 0,
            fire: 260
        },
        responders: {
            police: true,
            ambulance: true,
            hospital: true,
            fire: true
        },
        feed: [
            "Fire-risk signal received from residential emergency zone.",
            "Smoke and heat indicators correlated with citizen report.",
            "VEDAHAM AI begins fire-risk classification.",
            "Fire escalation probability marked severe.",
            "Threat classification confirmed: residential fire risk.",
            "Fire service assigned as primary responder.",
            "Police notified for perimeter control and evacuation support.",
            "Ambulance placed on active standby for smoke-inhalation risk.",
            "Hospital ER alerted for potential burn and respiratory cases.",
            "Multi-agency fire response synchronized inside SENTINEL23™."
        ]
    },

    safety: {
        label: "Personal Safety",
        type: "Silent SOS Threat",
        urgency: "High",
        confidence: 91,
        severity: 84,
        sync: 3,
        activeRoutes: 2,
        distances: {
            police: "1.9 km",
            ambulance: "Standby",
            hospital: "Standby",
            fire: "Not Required"
        },
        eta: {
            police: 318,
            ambulance: 0,
            hospital: 0,
            fire: 0
        },
        responders: {
            police: true,
            ambulance: false,
            hospital: true,
            fire: false
        },
        feed: [
            "Silent SOS signal received from personal safety mode.",
            "Live movement pattern indicates possible distress.",
            "VEDAHAM AI begins silent threat assessment.",
            "Location trail encrypted and locked for agency command.",
            "Threat classification confirmed: personal safety threat.",
            "Nearest police unit notified discreetly.",
            "Emergency contacts informed with live location context.",
            "Predictive route monitoring enabled for responder interception.",
            "Escalation timer activated for continued movement anomaly.",
            "Personal safety response synchronized inside SENTINEL23™."
        ]
    }
};

const els = {
    scenarioCards: document.querySelectorAll(".scenario-card"),

    start: document.getElementById("startSimulation"),
    reset: document.getElementById("resetSimulation"),

    feedList: document.getElementById("feedList"),
    feedStatus: document.getElementById("feedStatus"),
    mapStatus: document.getElementById("mapStatus"),
    aiStatus: document.getElementById("aiStatus"),

    incidentNode: document.getElementById("incidentNode"),
    mapLock: document.getElementById("mapLock"),

    routePolice: document.getElementById("routePolice"),
    routeAmbulance: document.getElementById("routeAmbulance"),
    routeHospital: document.getElementById("routeHospital"),
    routeFire: document.getElementById("routeFire"),

    policeNode: document.getElementById("policeNode"),
    ambulanceNode: document.getElementById("ambulanceNode"),
    hospitalNode: document.getElementById("hospitalNode"),
    fireNode: document.getElementById("fireNode"),

    severityScore: document.getElementById("severityScore"),
    incidentType: document.getElementById("incidentType"),
    urgency: document.getElementById("urgency"),
    confidence: document.getElementById("confidence"),
    syncIndex: document.getElementById("syncIndex"),
    dispatchMode: document.getElementById("dispatchMode"),

    policeEta: document.getElementById("policeEta"),
    ambulanceEta: document.getElementById("ambulanceEta"),
    hospitalEta: document.getElementById("hospitalEta"),
    fireEta: document.getElementById("fireEta"),

    policeDistance: document.getElementById("policeDistance"),
    ambulanceDistance: document.getElementById("ambulanceDistance"),
    hospitalDistance: document.getElementById("hospitalDistance"),
    fireDistance: document.getElementById("fireDistance"),

    cardPolice: document.getElementById("cardPolice"),
    cardAmbulance: document.getElementById("cardAmbulance"),
    cardHospital: document.getElementById("cardHospital"),
    cardFire: document.getElementById("cardFire"),

    outcomeAgencies: document.getElementById("outcomeAgencies"),
    outcomeRoutes: document.getElementById("outcomeRoutes"),
    outcomeAlerts: document.getElementById("outcomeAlerts"),
    outcomeDelay: document.getElementById("outcomeDelay"),

    orbScore: document.getElementById("orbScore")
};

let selectedScenario = "road";
let running = false;
let feedTimer = null;
let scoreTimer = null;
let countdownTimers = [];
let readinessTimer = null;

function formatEta(seconds) {
    if (!seconds || seconds <= 0) {
        return "READY";
    }

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function clearAllTimers() {
    if (feedTimer) {
        clearInterval(feedTimer);
        feedTimer = null;
    }

    if (scoreTimer) {
        clearInterval(scoreTimer);
        scoreTimer = null;
    }

    if (readinessTimer) {
        clearInterval(readinessTimer);
        readinessTimer = null;
    }

    countdownTimers.forEach((timer) => clearInterval(timer));
    countdownTimers = [];
}

function addFeed(time, message, type = "") {
    const row = document.createElement("div");
    row.className = `feed-row ${type}`;

    row.innerHTML = `
        <span>${time}</span>
        <p>${message}</p>
    `;

    els.feedList.appendChild(row);
    els.feedList.scrollTop = els.feedList.scrollHeight;
}

function resetActiveVisuals() {
    [
        els.incidentNode,
        els.mapLock,

        els.routePolice,
        els.routeAmbulance,
        els.routeHospital,
        els.routeFire,

        els.policeNode,
        els.ambulanceNode,
        els.hospitalNode,
        els.fireNode,

        els.cardPolice,
        els.cardAmbulance,
        els.cardHospital,
        els.cardFire
    ].forEach((node) => {
        if (node) {
            node.classList.remove("active");
        }
    });
}

function resetReadinessOrb() {
    let value = 0;

    readinessTimer = setInterval(() => {
        value += 1;
        els.orbScore.textContent = String(value).padStart(2, "0");

        if (value >= 23) {
            clearInterval(readinessTimer);
            readinessTimer = null;
        }
    }, 32);
}

function resetSimulation() {
    clearAllTimers();

    running = false;
    els.start.disabled = false;
    els.start.textContent = "Trigger SENTINEL23™";

    els.feedStatus.textContent = "STANDBY";
    els.mapStatus.textContent = "IDLE";
    els.aiStatus.textContent = "OFFLINE";

    els.feedList.innerHTML = `
        <div class="feed-row muted">
            <span>00:00</span>
            <p>SENTINEL23™ standby. Awaiting emergency signal.</p>
        </div>
    `;

    resetActiveVisuals();

    els.severityScore.textContent = "00";
    els.incidentType.textContent = "Awaiting Signal";
    els.urgency.textContent = "Pending";
    els.confidence.textContent = "0%";
    els.syncIndex.textContent = "0 / 4";
    els.dispatchMode.textContent = "Standby";

    els.policeEta.textContent = "--:--";
    els.ambulanceEta.textContent = "--:--";
    els.hospitalEta.textContent = "READY";
    els.fireEta.textContent = "STANDBY";

    els.policeDistance.textContent = "Distance: --";
    els.ambulanceDistance.textContent = "Distance: --";
    els.hospitalDistance.textContent = "Distance: --";
    els.fireDistance.textContent = "Distance: --";

    els.outcomeAgencies.textContent = "0";
    els.outcomeRoutes.textContent = "0";
    els.outcomeAlerts.textContent = "0";
    els.outcomeDelay.textContent = "0";

    els.orbScore.textContent = "00";
    resetReadinessOrb();
}

function animateScore(target) {
    let current = 0;

    scoreTimer = setInterval(() => {
        current += 1;
        els.severityScore.textContent = String(current).padStart(2, "0");

        if (current >= target) {
            clearInterval(scoreTimer);
            scoreTimer = null;
        }
    }, 18);
}

function startCountdown(el, seconds) {
    if (!seconds || seconds <= 0) {
        el.textContent = "READY";
        return;
    }

    let remaining = seconds;
    el.textContent = formatEta(remaining);

    const timer = setInterval(() => {
        remaining -= 1;
        el.textContent = formatEta(remaining);

        if (remaining <= seconds - 23) {
            clearInterval(timer);
        }
    }, 1000);

    countdownTimers.push(timer);
}

function activateResponderNetwork(data) {
    els.policeDistance.textContent = `Distance: ${data.distances.police}`;
    els.ambulanceDistance.textContent = `Distance: ${data.distances.ambulance}`;
    els.hospitalDistance.textContent = `Distance: ${data.distances.hospital}`;
    els.fireDistance.textContent = `Distance: ${data.distances.fire}`;

    const visualQueue = [];

    if (data.responders.police) {
        visualQueue.push(els.policeNode, els.routePolice, els.cardPolice);
        startCountdown(els.policeEta, data.eta.police);
    } else {
        els.policeEta.textContent = data.distances.police;
    }

    if (data.responders.ambulance) {
        visualQueue.push(els.ambulanceNode, els.routeAmbulance, els.cardAmbulance);
        startCountdown(els.ambulanceEta, data.eta.ambulance);
    } else {
        els.ambulanceEta.textContent = data.distances.ambulance;
    }

    if (data.responders.hospital) {
        visualQueue.push(els.hospitalNode, els.routeHospital, els.cardHospital);
        startCountdown(els.hospitalEta, data.eta.hospital);
    } else {
        els.hospitalEta.textContent = data.distances.hospital;
    }

    if (data.responders.fire) {
        visualQueue.push(els.fireNode, els.routeFire, els.cardFire);
        startCountdown(els.fireEta, data.eta.fire);
    } else {
        els.fireEta.textContent = data.distances.fire;
    }

    visualQueue.forEach((node, index) => {
        setTimeout(() => {
            if (node) {
                node.classList.add("active");
            }
        }, index * 180);
    });
}

function completeOutcome(data) {
    els.outcomeAgencies.textContent = String(data.sync);
    els.outcomeRoutes.textContent = String(data.activeRoutes);
    els.outcomeAlerts.textContent = String(data.feed.length);
    els.outcomeDelay.textContent = "0";

    els.feedStatus.textContent = "COMPLETE";
    els.mapStatus.textContent = "COORDINATED";
    els.aiStatus.textContent = "ONLINE";
    els.dispatchMode.textContent = "Unified Command";

    els.start.disabled = false;
    els.start.textContent = "Run Simulation Again";

    running = false;
}

function runFeed(data) {
    let index = 0;

    els.feedList.innerHTML = "";
    els.feedStatus.textContent = "LIVE";
    els.mapStatus.textContent = "SIGNAL LOCK";
    els.aiStatus.textContent = "ACTIVE";

    addFeed("00:01", data.feed[index], "critical");
    index += 1;

    feedTimer = setInterval(() => {
        if (index >= data.feed.length) {
            clearInterval(feedTimer);
            feedTimer = null;

            addFeed("00:23", "First 23 seconds complete. Unified response command established.", "success");
            completeOutcome(data);
            return;
        }

        const seconds = String(Math.min((index + 1) * 2, 22)).padStart(2, "0");
        const type = index <= 3 ? "critical" : index >= 7 ? "success" : "";

        addFeed(`00:${seconds}`, data.feed[index], type);

        if (index === 1) {
            els.incidentNode.classList.add("active");
            els.mapLock.classList.add("active");
            els.mapStatus.textContent = "GEO-LOCKED";
        }

        if (index === 2) {
            els.aiStatus.textContent = "ANALYZING";
            els.dispatchMode.textContent = "AI Processing";
            animateScore(data.severity);
        }

        if (index === 4) {
            els.incidentType.textContent = data.type;
            els.urgency.textContent = data.urgency;
            els.confidence.textContent = `${data.confidence}%`;
            els.syncIndex.textContent = `${data.sync} / 4`;
            els.dispatchMode.textContent = "Dispatch Preparing";
        }

        if (index === 5) {
            els.mapStatus.textContent = "ROUTES ACTIVE";
            els.dispatchMode.textContent = "Multi-Agency Dispatch";
            activateResponderNetwork(data);
        }

        index += 1;
    }, 1500);
}

function startSimulation() {
    if (running) {
        return;
    }

    running = true;
    clearAllTimers();
    resetActiveVisuals();

    const data = scenarios[selectedScenario];

    els.start.disabled = true;
    els.start.textContent = "Simulation Running";

    els.feedStatus.textContent = "LIVE";
    els.mapStatus.textContent = "SIGNAL";
    els.aiStatus.textContent = "ACTIVE";

    els.severityScore.textContent = "00";
    els.incidentType.textContent = "Signal Received";
    els.urgency.textContent = "Calculating";
    els.confidence.textContent = "0%";
    els.syncIndex.textContent = "0 / 4";
    els.dispatchMode.textContent = "Emergency Triggered";

    els.outcomeAgencies.textContent = "0";
    els.outcomeRoutes.textContent = "0";
    els.outcomeAlerts.textContent = "0";
    els.outcomeDelay.textContent = "Processing";

    runFeed(data);
}

function selectScenario(event) {
    const card = event.currentTarget;
    selectedScenario = card.dataset.scenario;

    els.scenarioCards.forEach((item) => {
        item.classList.remove("active");
    });

    card.classList.add("active");

    resetSimulation();

    addFeed(
        "00:00",
        `${scenarios[selectedScenario].label} scenario loaded. Command grid ready for activation.`,
        "success"
    );
}

els.scenarioCards.forEach((card) => {
    card.addEventListener("click", selectScenario);
});

els.start.addEventListener("click", startSimulation);
els.reset.addEventListener("click", resetSimulation);

resetSimulation();
