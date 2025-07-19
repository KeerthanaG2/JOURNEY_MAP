const LANGS = {
  en: {
    namePrompt: "Enter your name to begin:",
    startBtn: "Start Mapping",
    journeyTitle: "Rice Season Journey Map",
    submitBtn: "Submit",
    summaryTitle: "Your Community Crop Map",
    restartBtn: "Restart",
    timeline: [
      {key:"landprep", label:"Land Preparation", icon:"landprep.jpeg"},
      {key:"inputs", label:"Inputs & Purchase", icon:"rupee.jpeg"},
      {key:"sowing", label:"Sowing/Transplanting", icon:"sowing.jpeg"},
      {key:"early_growth", label:"Early Growth/Tillering", icon:"tillering.jpeg"},
      {key:"milky", label:"Milky/Grain Stage", icon:"milkygrain.jpeg"},
      {key:"harvest", label:"Harvesting", icon:"Harvest.jpeg"},
    ],
    painMarkers: [
      {key:"loose_khaad ( Urea )",icon:"ureakhaad.jpeg",label:"Loose khaad ( Urea )"},
      {key:"fert_price",icon:"rupee.jpeg",label:"Price (khaad/medicines)"},
      {key:"govt_inactive",icon:"inactivegov.jpeg",label:"No govt help/advice"},
      {key:"improper_app",icon:"handful.jpeg",label:"Improper fertilizer use"},
      {key:"ysb_eggs",icon:"ysb_eggs.jpeg",label:"Yellow Stem Borer eggs"},
      {key:"ysb_2",icon:"ysb.jpeg",label:"Yellow Stem Borer"},
      {key:"bb_2",icon:"blackbug.jpeg",label:"Black bug"},
      {key:"bph_1",icon:"bph.jpeg",label:"Brown Plant Hopper"},
      {key:"gundhi_bug",icon:"gundhi.jpeg",label:"Gundhi Bug"},
      {key:"yhc_3",icon:"yellow hairy caterpillar.jpeg",label:"yellow hairy caterpillar"},
      {key:"monkey_l",icon:"monkey.jpeg",label:"Monkey problem"},
      {key:"fungi_issue",icon:"Fungal.jpeg",label:"Fungal infections on paddy"},
    ],
    ideaMarkers: [
      {key:"cowdung",icon:"cowdung.jpeg",label:"Cow dung/FYM"},
      {key:"trichoderma",icon:"trichoderma.jpeg",label:"Trichoderma Viride"},
      {key:"pheromone",icon:"Phermone.jpeg",label:"Pheromone Trap"},
      {key:"neem_spray",icon:"neemspray.jpeg",label:"Neem Oil Spray"},
      {key:"medicines",icon:"meds.jpeg",label:"Medicines bought for the pests"},
      {key:"weather",icon:"weather.jpeg",label:"Weather watch"},
    ]
  },
  hi: {
    namePrompt: "शुरू करने के लिए अपना नाम दर्ज करें:",
    startBtn: "मैपिंग शुरू करें",
    journeyTitle: "धान की खेती की यात्रा मानचित्र",
    submitBtn: "सबमिट करें",
    summaryTitle: "आपका समुदाय फसल मानचित्र",
    restartBtn: "पुनः प्रारंभ करें",
    timeline: [
      {key:"landprep", label:"भूमि की तैयारी", icon:"landprep.jpeg"},
      {key:"inputs", label:"इनपुट्स और खरीद", icon:"rupee.jpeg"},
      {key:"sowing", label:"बोवाई/रोपाई", icon:"sowing.jpeg"},
      {key:"early_growth", label:"प्रारंभिक वृद्धि/टिल्लरिंग", icon:"tillering.jpeg"},
      {key:"milky", label:"दूधिया/अनाज चरण", icon:"milkygrain.jpeg"},
      {key:"harvest", label:"कटाई", icon:"Harvest.jpeg"},
    ],
    painMarkers: [
      {key:"loose_khaad ( Urea )",icon:"ureakhaad.jpeg",label:"ढीली खाद (यूरिया)"},
      {key:"fert_price",icon:"rupee.jpeg",label:"कीमत (खाद/दवाइयाँ)"},
      {key:"govt_inactive",icon:"inactivegov.jpeg",label:"कोई सरकारी मदद नहीं"},
      {key:"improper_app",icon:"handful.jpeg",label:"गलत तरीके से खाद डालना"},
      {key:"ysb",icon:"ysb_eggs.jpeg",label:"पीले तना भेदक के अंडे"},
      {key:"ysb_2",icon:"ysb.jpeg",label:"पीला तना भेदक"},
      {key:"bb",icon:"blackbug.jpeg",label:"ब्लैक बग"},
      {key:"bph",icon:"bph.jpeg",label:"ब्राउन प्लांट होपर"},
      {key:"gundhi",icon:"gundhi.jpeg",label:"गुंधी कीड़ा"},
      {key:"yhc",icon:"yellow hairy caterpillar.jpeg",label:"पीला बालों वाला इल्ली"},
      {key:"monkey",icon:"monkey.jpeg",label:"बंदरों की समस्या"},
      {key:"fungi_issue",icon:"Fungal.jpeg",label:"धान पर फफूंदी"},
    ],
    ideaMarkers: [
      {key:"cowdung",icon:"cowdung.jpeg",label:"गोबर/एफवाईएम"},
      {key:"trichoderma",icon:"trichoderma.jpeg",label:"ट्राइकोडरमा विरिडे"},
      {key:"pheromone",icon:"Phermone.jpeg",label:"फेरोमोन ट्रैप"},
      {key:"neem_spray",icon:"neemspray.jpeg",label:"नीम तेल का छिड़काव"},
      {key:"medicines",icon:"meds.jpeg",label:"कीटों की दवाइयाँ"},
      {key:"weather",icon:"weather.jpeg",label:"मौसम की निगरानी"},
    ],
  }
};

let lang = "en";
let currentDrop = {};
let userName = "";

// --------- SCREEN MANAGEMENT

function showScreen(screenId) {
  const screens = ["name-screen", "journey-screen", "summary-screen"];
  screens.forEach(id => {
    const screen = document.getElementById(id);
    if (screen) {
      screen.style.display = id === screenId ? "block" : "none";
    }
  });
}

// --------- INIT

function setLang(l) {
  lang = l;
  const elements = {
    "name-prompt": LANGS[lang].namePrompt,
    "start-btn": LANGS[lang].startBtn,
    "journey-title": LANGS[lang].journeyTitle,
    "submit-btn": LANGS[lang].submitBtn,
    "summary-title": LANGS[lang].summaryTitle,
    "restart-btn": LANGS[lang].restartBtn
  };
  
  for (const [id, text] of Object.entries(elements)) {
    const element = document.getElementById(id);
    if (element) {
      element.innerText = text;
    }
  }

  if (document.getElementById("journey-screen").style.display !== "none") {
    buildJourneyUI();
  }

  showScreen("name-screen");
  const nameInput = document.getElementById("name-input");
  if (nameInput) {
    nameInput.value = "";
  }
}

// --------- JOURNEY MAP BUILD

function startJourney() {
  const nameInput = document.getElementById("name-input");
  if (!nameInput) return;
  const name = nameInput.value.trim();
  if (!name) { 
    alert(lang === "en" ? "Please enter your name" : "कृपया नाम लिखें"); 
    return; 
  }
  userName = name;
  buildJourneyUI();
  showScreen("journey-screen");
}

function buildJourneyUI() {
  const row = document.getElementById("timeline-row");
  if (!row) return;
  row.innerHTML = "";
  currentDrop = {};
  LANGS[lang].timeline.forEach(stage => {
    let col = document.createElement("div");
    col.className = "timeline-col";
    col.innerHTML = `<div class="timeline-label"><img src="images/${stage.icon}" class="marker-icon" draggable="false"><br>${stage.label}</div>
    <div class="marker-drop-row">
      <div class="drop-box pain" ondragover="allowDrop(event)" ondrop="dropMarker(event,'pain','${stage.key}')"></div>
    </div>
    <div class="marker-drop-row">
      <div class="drop-box idea" ondragover="allowDrop(event)" ondrop="dropMarker(event,'idea','${stage.key}')"></div>
    </div>`;
    row.appendChild(col);
    currentDrop[stage.key] = {pain: [], idea: []};
  });

  const painRow = document.getElementById("pain-row");
  const ideaRow = document.getElementById("idea-row");
  if (painRow) {
    painRow.innerHTML = `<div style="font-weight:bold;color:#d34444;">${
      lang === "en" ? "Problems:" : "समस्याएँ:"
    }</div>` + LANGS[lang].painMarkers.map(m =>
      `<div class="marker-option" draggable="true" ondragstart="dragMarker(event,'pain','${m.key}')">
        <img src="images/${m.icon}" alt="${m.label}"><div class="marker-label">${m.label}</div>
      </div>`).join("");
  }
  if (ideaRow) {
    ideaRow.innerHTML = `<div style="font-weight:bold;color:#4cc261;">${
      lang === "en" ? "Solutions/Ideas:" : "समाधान/आइडिया:"
    }</div>` + LANGS[lang].ideaMarkers.map(m =>
      `<div class="marker-option" draggable="true" ondragstart="dragMarker(event,'idea','${m.key}')">
        <img src="images/${m.icon}" alt="${m.label}"><div class="marker-label">${m.label}</div>
      </div>`).join("");
  }
}

// ---- MARKER DRAG & DROP

let dragObject = null;
function dragMarker(e, type, key) {
  dragObject = {type, key};
}

function allowDrop(e) {
  e.preventDefault();
}

function dropMarker(e, type, stageKey) {
  e.preventDefault();
  if (!dragObject) return;
  if (!currentDrop[stageKey][type].includes(dragObject.key)) {
    currentDrop[stageKey][type].push(dragObject.key);
    updateDropBoxes();
  }
  dragObject = null;
}

function updateDropBoxes() {
  LANGS[lang].timeline.forEach(stage => {
    const col = document.querySelectorAll(".timeline-col")[LANGS[lang].timeline.indexOf(stage)];
    if (!col) return;
    const painBox = col.querySelector(".drop-box.pain");
    const ideaBox = col.querySelector(".drop-box.idea");
    if (painBox) {
      painBox.innerHTML = currentDrop[stage.key].pain.map(k => {
        let m = LANGS[lang].painMarkers.find(mm => mm.key === k);
        if (!m) return "";
        return `<span class='dropped-marker'><img src='images/${m.icon}' title='${m.label}' alt='${m.label}' /></span>`;
      }).join("");
    }
    if (ideaBox) {
      ideaBox.innerHTML = currentDrop[stage.key].idea.map(k => {
        let m = LANGS[lang].ideaMarkers.find(mm => mm.key === k);
        if (!m) return "";
        return `<span class='dropped-marker'><img src='images/${m.icon}' title='${m.label}' alt='${m.label}' /></span>`;
      }).join("");
    }
  });
}

// --------- SUBMIT & SUMMARY

function showSummary() {
  showScreen("summary-screen");
  let summary = `<p><b>${lang === "en" ? "Name" : "नाम"}:</b> ${userName}</p>`;
  summary += `<table border="1" style="margin:1em auto;border-collapse:collapse;"><tr><th>${
    lang === "en" ? "Stage" : "चरण"
  }</th><th>${lang === "en" ? "Problems" : "समस्याएँ"}</th><th>${lang === "en" ? "Solutions/Ideas" : "समाधान/आइडिया"}</th></tr>`;
  LANGS[lang].timeline.forEach(stage => {
    let pains = currentDrop[stage.key].pain.map(k => {
      let m = LANGS[lang].painMarkers.find(mm => mm.key === k);
      if (!m) return "";
      return m.label; // Only include the label text, no image
    }).join(", ");
    let ideas = currentDrop[stage.key].idea.map(k => {
      let m = LANGS[lang].ideaMarkers.find(mm => mm.key === k);
      if (!m) return "";
      return m.label; // Only include the label text, no image
    }).join(", ");
    summary += `<tr>
      <td style="padding:8px">${stage.label}</td>
      <td style="padding:8px">${pains || "-"}</td>
      <td style="padding:8px">${ideas || "-"}</td>
    </tr>`;
  });
  summary += `</table>`;
  const summaryContent = document.getElementById("summary-content");
  if (summaryContent) {
    summaryContent.innerHTML = summary;
  }
}

// --------- RESTART

function restart() {
  showScreen("name-screen");
  const nameInput = document.getElementById("name-input");
  if (nameInput) {
    nameInput.value = "";
  }
  userName = "";
  currentDrop = {};
}

setLang("en");