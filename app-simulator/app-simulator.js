"use strict";

/* =====================================================
   SENTINEL23™ CITIZEN APP SIMULATOR
   Launch-button-safe version
   Powered by VEDAHAM AI
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  const scenarioData = {
    fire: {
      code: "F-01",
      name: "Fire Alarm",
      hook: "From alarm to multi-agency fire response in seconds.",
      modeCode: "FIRE ALARM",
      modeState: "Fire Alarm Ready",
      instruction: "Fixed GPS lock. Fire, police, ambulance, and hospital readiness chain activates.",
      phoneTitle: "Fire Emergency",
      incidentType: "Residential Fire Alarm",
      gpsBehaviour: "Fixed GPS Lock",
      gpsMode: "Fixed Lock",
      gpsAccuracy: "8m",
      gpsWatch: "Heat / Smoke",
      agencySync: "4 Agencies",
      patrolStatus: "Perimeter Alert",
      escalationLogic: "Fire Chain",
      threat: "High",
      responder: "Fire + Police + EMS",
      contacts: "Family + Building",
      score: 87,
      metricGps: "FIXED",
      metricAgencies: "4",
      metricSignals: "7",
      outcomeTitle: "From fire alarm to coordinated fire response.",
      outcomeText:
        "SENTINEL23™ does not simply send a fire alert. It coordinates fire response, evacuation support, perimeter control, ambulance standby, and hospital readiness.",
      events: [
        ["00:01", "Fire alarm activated from citizen app.", "critical"],
        ["00:03", "GPS location locked with 8m accuracy.", ""],
        ["00:05", "VEDAHAM AI classifies event as residential fire risk.", "critical"],
        ["00:07", "Fire service dispatched as primary responder.", ""],
        ["00:09", "Police perimeter alert activated.", ""],
        ["00:11", "Ambulance standby enabled for smoke inhalation risk.", ""],
        ["00:14", "Nearby hospital receives casualty readiness signal.", ""],
        ["00:17", "Evacuation advisory prepared for affected radius.", "success"],
        ["00:20", "Unified fire response chain active.", "success"]
      ]
    },

    accident: {
      code: "A-02",
      name: "Accident",
      hook: "The road accident becomes a live operational event.",
      modeCode: "ACCIDENT MODE",
      modeState: "Accident SOS Ready",
      instruction:
        "Fixed GPS lock. Ambulance, police, hospital, and emergency contacts synchronize instantly.",
      phoneTitle: "Accident Response",
      incidentType: "Road Accident",
      gpsBehaviour: "Fixed GPS Lock",
      gpsMode: "Fixed Lock",
      gpsAccuracy: "6m",
      gpsWatch: "Impact Zone",
      agencySync: "3 Agencies",
      patrolStatus: "Traffic Control",
      escalationLogic: "Trauma Chain",
      threat: "Critical",
      responder: "Ambulance + Police",
      contacts: "Family Sent",
      score: 91,
      metricGps: "FIXED",
      metricAgencies: "3",
      metricSignals: "8",
      outcomeTitle: "The road accident is no longer a phone call.",
      outcomeText:
        "One trigger gives every responder the same operational context: location, severity, ambulance need, police response, hospital readiness, and family notification.",
      events: [
        ["00:01", "Accident SOS triggered from citizen app.", "critical"],
        ["00:02", "GPS lock established at impact location.", ""],
        ["00:04", "VEDAHAM AI begins severity classification.", "critical"],
        ["00:06", "Ambulance assigned to nearest available unit.", ""],
        ["00:08", "Police notified for traffic control and site safety.", ""],
        ["00:10", "Hospital trauma bay receives pre-alert.", ""],
        ["00:13", "Emergency contacts notified with protected status.", ""],
        ["00:16", "Responder ETA and case context synchronized.", "success"],
        ["00:20", "Accident response pathway fully coordinated.", "success"]
      ]
    },

    kidnapping: {
      code: "K-03",
      name: "Possible Kidnapping",
      hook: "When the victim is moving, the system moves with them.",
      modeCode: "SILENT SOS",
      modeState: "Silent Protection Ready",
      instruction:
        "Screen remains discreet. Moving GPS trail starts, patrol team tracks, stagnancy escalation triggers after 20 seconds.",
      phoneTitle: "Silent Protection",
      incidentType: "Possible Abduction",
      gpsBehaviour: "Moving GPS Trail",
      gpsMode: "Moving Trail",
      gpsAccuracy: "Live",
      gpsWatch: "20s Stagnancy",
      agencySync: "Police + Command + Family",
      patrolStatus: "Tracking",
      escalationLogic: "20s Stagnancy Watch",
      threat: "Elevated",
      responder: "Patrol Tracking",
      contacts: "Protected Alert",
      score: 94,
      metricGps: "MOVING",
      metricAgencies: "3",
      metricSignals: "10",
      outcomeTitle: "In a possible kidnapping, the trail matters.",
      outcomeText:
        "The last known location is not enough. SENTINEL23™ tracks the movement trail before it goes cold and escalates immediately when movement stops unexpectedly.",
      events: [
        ["00:01", "Silent SOS received. No visible alarm shown on user screen.", "critical"],
        ["00:02", "GPS lock established at current location.", ""],
        ["00:03", "Moving GPS trail activated in silent mode.", ""],
        ["00:05", "Nearest patrol team begins live background tracking.", ""],
        ["00:08", "Family receives protected emergency status.", ""],
        ["00:10", "Route deviation detected. Threat level elevated.", "critical"],
        ["00:15", "Movement continues. Command center keeps live trail active.", ""],
        ["00:20", "Movement stagnant for 20 seconds. Possible threat escalation raised.", "critical"],
        ["00:21", "Last known location locked. Interception radius activated.", "critical"],
        ["00:23", "Patrol team receives immediate escalation and route lock.", "success"]
      ]
    }
  };

  const $ = function (id) {
    return document.getElementById(id);
  };

  const els = {
    scenarioBtns: document.querySelectorAll(".scenario-btn"),

    scenarioCode: $("scenarioCode"),
    scenarioName: $("scenarioName"),
    scenarioHook: $("scenarioHook"),

    phoneTitle: $("phoneTitle"),
    modeCode: $("modeCode"),
    modeState: $("modeState"),
    modeInstruction: $("modeInstruction"),

    launchBtn: $("launchBtn"),
    replayBtn: $("replayBtn"),
    timeline: $("timeline"),

    gpsStatus: $("gpsStatus"),
    gpsMode: $("gpsMode"),
    gpsAccuracy: $("gpsAccuracy"),
    gpsWatch: $("gpsWatch"),

    fixedPulse: $("fixedPulse"),
    movingDot: $("movingDot"),
    patrolDot: $("patrolDot"),
    stagnantRing: $("stagnantRing"),
    trails: document.querySelectorAll(".trail"),

    phoneResponder: $("phoneResponder"),
    phoneContacts: $("phoneContacts"),
    phoneThreat: $("phoneThreat"),

    aiScore: $("aiScore"),
    incidentType: $("incidentType"),
    gpsBehaviour: $("gpsBehaviour"),
    agencySync: $("agencySync"),
    patrolStatus: $("patrolStatus"),
    escalationLogic: $("escalationLogic"),

    outcomeTitle: $("outcomeTitle"),
    outcomeText: $("outcomeText"),
    metricGps: $("metricGps"),
    metricAgencies: $("metricAgencies"),
    metricSignals: $("metricSignals"),
    metricDelay: $("metricDelay")
  };

  if (!els.launchBtn || !els.timeline) {
    console.error(
      "SENTINEL23 App Simulator error: launchBtn or timeline is missing. Please check app-simulator.html element IDs."
    );
    return;
  }

  const qs = new URLSearchParams(window.location.search);
  let activeScenario = qs.get("scenario") || "fire";

  if (!scenarioData[activeScenario]) {
    activeScenario = "fire";
  }

  let timers = [];
  let running = false;

  function clearTimers() {
    timers.forEach(function (timer) {
      clearTimeout(timer);
    });
    timers = [];
  }

  function setScenarioVisualClass(extraClass) {
    document.body.classList.remove("fire", "accident", "kidnapping", "running", "escalated");
    document.body.classList.add(activeScenario);

    if (extraClass) {
      document.body.classList.add(extraClass);
    }
  }

  function setActiveButtons() {
    els.scenarioBtns.forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.scenario === activeScenario);
    });
  }

  function addTimeline(time, text, type) {
    const row = document.createElement("div");
    row.className = "timeline-row " + (type || "");
    row.innerHTML = "<span>" + time + "</span><p>" + text + "</p>";

    els.timeline.appendChild(row);
    els.timeline.scrollTop = els.timeline.scrollHeight;
  }

  function animateScore(target) {
    let current = 0;

    function step() {
      current += 1;
      els.aiScore.textContent = String(current).padStart(2, "0");

      if (current < target) {
        timers.push(setTimeout(step, 14));
      }
    }

    step();
  }

  function resetVisuals() {
    if (els.fixedPulse) els.fixedPulse.classList.remove("active");
    if (els.movingDot) els.movingDot.classList.remove("active");
    if (els.patrolDot) els.patrolDot.classList.remove("active");
    if (els.stagnantRing) els.stagnantRing.classList.remove("active");

    els.trails.forEach(function (trail) {
      trail.classList.remove("active");
    });

    if (els.movingDot) {
      els.movingDot.style.left = "20%";
      els.movingDot.style.top = "68%";
    }

    if (els.patrolDot) {
      els.patrolDot.style.left = "11%";
      els.patrolDot.style.top = "79%";
    }
  }

  function resetSimulation() {
    clearTimers();
    running = false;

    const data = scenarioData[activeScenario];

    setScenarioVisualClass();
    setActiveButtons();
    resetVisuals();

    els.scenarioCode.textContent = data.code;
    els.scenarioName.textContent = data.name;
    els.scenarioHook.textContent = data.hook;

    els.phoneTitle.textContent = data.phoneTitle;
    els.modeCode.textContent = data.modeCode;
    els.modeState.textContent = data.modeState;
    els.modeInstruction.textContent = data.instruction;

    els.launchBtn.textContent = "LAUNCH";
    els.launchBtn.disabled = false;

    els.timeline.innerHTML = "";
    addTimeline("00:00", data.name + " simulation loaded. Citizen app ready.", "success");

    els.gpsStatus.textContent = "STANDBY";
    els.gpsMode.textContent = "Awaiting";
    els.gpsAccuracy.textContent = "--";
    els.gpsWatch.textContent = "Inactive";

    els.phoneResponder.textContent = "Standby";
    els.phoneContacts.textContent = "Pending";
    els.phoneThreat.textContent = "Normal";

    els.aiScore.textContent = "00";
    els.incidentType.textContent = "Awaiting Signal";
    els.gpsBehaviour.textContent = "Pending";
    els.agencySync.textContent = "0 Agencies";
    els.patrolStatus.textContent = "Standby";
    els.escalationLogic.textContent = "Inactive";

    els.outcomeTitle.textContent = data.outcomeTitle;
    els.outcomeText.textContent = data.outcomeText;
    els.metricGps.textContent = "0";
    els.metricAgencies.textContent = "0";
    els.metricSignals.textContent = "0";
    els.metricDelay.textContent = "0";
  }

  function runFixedGpsScenario(data) {
    timers.push(
      setTimeout(function () {
        if (els.fixedPulse) els.fixedPulse.classList.add("active");

        els.gpsStatus.textContent = "GPS LOCKED";
        els.gpsMode.textContent = data.gpsMode;
        els.gpsAccuracy.textContent = data.gpsAccuracy;
        els.gpsWatch.textContent = data.gpsWatch;
      }, 700)
    );
  }

  function runMovingGpsScenario(data) {
    timers.push(
      setTimeout(function () {
        if (els.movingDot) els.movingDot.classList.add("active");

        els.gpsStatus.textContent = "LIVE TRAIL";
        els.gpsMode.textContent = data.gpsMode;
        els.gpsAccuracy.textContent = data.gpsAccuracy;
        els.gpsWatch.textContent = data.gpsWatch;
      }, 700)
    );

    timers.push(
      setTimeout(function () {
        if (els.trails[0]) els.trails[0].classList.add("active");

        if (els.movingDot) {
          els.movingDot.style.left = "40%";
          els.movingDot.style.top = "58%";
        }
      }, 2700)
    );

    timers.push(
      setTimeout(function () {
        if (els.trails[1]) els.trails[1].classList.add("active");
        if (els.patrolDot) els.patrolDot.classList.add("active");

        if (els.patrolDot) {
          els.patrolDot.style.left = "30%";
          els.patrolDot.style.top = "67%";
        }

        if (els.movingDot) {
          els.movingDot.style.left = "58%";
          els.movingDot.style.top = "64%";
        }
      }, 5400)
    );

    timers.push(
      setTimeout(function () {
        if (els.trails[2]) els.trails[2].classList.add("active");

        if (els.patrolDot) {
          els.patrolDot.style.left = "48%";
          els.patrolDot.style.top = "62%";
        }

        if (els.movingDot) {
          els.movingDot.style.left = "73%";
          els.movingDot.style.top = "48%";
        }
      }, 8100)
    );

    timers.push(
      setTimeout(function () {
        document.body.classList.add("escalated");

        if (els.stagnantRing) els.stagnantRing.classList.add("active");

        els.modeState.textContent = "Threat Escalation Raised";
        els.modeInstruction.textContent =
          "Movement stopped for 20 seconds. Last known location locked. Patrol team alerted.";
        els.gpsStatus.textContent = "STAGNANT";
        els.gpsWatch.textContent = "Escalated";
        els.phoneThreat.textContent = "Critical";
      }, 15000)
    );
  }

  function finishSimulation(data) {
    els.metricGps.textContent = data.metricGps;
    els.metricAgencies.textContent = data.metricAgencies;
    els.metricSignals.textContent = data.metricSignals;
    els.metricDelay.textContent = "0";

    els.launchBtn.textContent = "REPLAY";
    els.launchBtn.disabled = false;
    running = false;
  }

  function launchSimulation() {
    if (running) return;

    const data = scenarioData[activeScenario];

    clearTimers();
    resetVisuals();

    running = true;
    setScenarioVisualClass("running");

    els.launchBtn.textContent = "ACTIVE";
    els.launchBtn.disabled = true;

    els.timeline.innerHTML = "";

    els.modeState.textContent =
      activeScenario === "kidnapping" ? "Silent SOS Active" : data.name + " Activated";

    els.modeInstruction.textContent =
      activeScenario === "kidnapping"
        ? "Screen remains discreet. Protection runs silently in the background."
        : "GPS lock active. VEDAHAM AI is coordinating responders.";

    els.phoneResponder.textContent = data.responder;
    els.phoneContacts.textContent = data.contacts;
    els.phoneThreat.textContent = data.threat;

    els.incidentType.textContent = data.incidentType;
    els.gpsBehaviour.textContent = data.gpsBehaviour;
    els.agencySync.textContent = data.agencySync;
    els.patrolStatus.textContent = data.patrolStatus;
    els.escalationLogic.textContent = data.escalationLogic;

    animateScore(data.score);

    if (activeScenario === "kidnapping") {
      runMovingGpsScenario(data);
    } else {
      runFixedGpsScenario(data);
    }

    data.events.forEach(function (event, index) {
      timers.push(
        setTimeout(function () {
          addTimeline(event[0], event[1], event[2]);
        }, index * 1450)
      );
    });

    timers.push(
      setTimeout(function () {
        finishSimulation(data);
      }, data.events.length * 1450 + 700)
    );
  }

  function selectScenarioFromButton(event) {
    const nextScenario = event.currentTarget.dataset.scenario;

    if (!nextScenario || !scenarioData[nextScenario]) return;

    /*
      The scenario buttons are links. If the user clicks the same scenario,
      we stop navigation and simply reset the current simulation.
      If they click another scenario, the URL changes normally.
    */
    if (nextScenario === activeScenario) {
      event.preventDefault();
      resetSimulation();
    }
  }

  els.scenarioBtns.forEach(function (btn) {
    btn.addEventListener("click", selectScenarioFromButton);
  });

  els.launchBtn.addEventListener("click", function (event) {
    event.preventDefault();

    if (running) return;

    if (els.launchBtn.textContent.trim().toUpperCase() === "REPLAY") {
      resetSimulation();
    }

    launchSimulation();
  });

  if (els.replayBtn) {
    els.replayBtn.addEventListener("click", function (event) {
      event.preventDefault();
      resetSimulation();
      launchSimulation();
    });
  }

  resetSimulation();
});
