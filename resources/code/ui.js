function CreateUiButtons() {
  for(let button of ui_buttons) {
    let but = Create("img");
    but.id = button.id;
    but.src = `../../resources/images/themes/${global.theme}/icons/ui_icon${button.bg}.png`;
    but.style.width = "4.5vw";
    but.style.height = "4.5vw";
    if(global.combat.ongoing == false || button.combat)but.addEventListener("click", ()=>toggleButton(button.open));
    but.classList.add("ui_button");
    but.setAttribute('draggable', false);
    if(global.combat.ongoing == true && !button.combat) but.classList.add("darken");
    Element("uiIcons").appendChild(but);
  }
}

function toggleButton(action) {
  HideAll();
  if(action == "mapFrame") global.onmap = true;
  Element(action).style.display = "block";
  try{
    Element("settings").querySelector(".darken").classList.remove("darken");
  }
  catch(e){
    console.log("Encountered error: " + e.message);
  }
  if(global.combat.ongoing) {
    Element("saves").classList.add("darken");
    Element("load").classList.add("darken");
  }
  if(action == "combat") FormCombatEnvironment();
}

var ui_buttons = [
  {
    bg: "_combat",
    open: "combat",
    id: "combatButton",
    combat: true
  },
  {
    bg: "_map",
    open: "mapFrame",
    id: "mapButton"
  },
  {
    bg: "_inv",
    open: "invFrame",
    id: "invButton"
  },
  {
    bg: "_info",
    open: "codex",
    id: "codexButton",
    combat: true
  },
  {
    bg: "_settings",
    open: "settings",
    id: "settingsButton",
    combat: true
  },
]

function HideAll() {
  Element("codex").style.display = "none";
  Element("mapFrame").style.display = "none";
  Element("settings").style.display = "none";
  Element("invFrame").style.display = "none";
  Element("combat").style.display = "none";
  Element("saveLoad").textContent = "";
  global.onmap = false;
}

function Worldmap() {
  HideAll();
}

function toggleQL() {
  if(global.quickload == false) {
    global.quickload = true;
    Element("qlCheck").style.transform = "scale(1.00)";
  } else {
    global.quickload = false;
    Element("qlCheck").style.transform = "scale(0.00)";
  }
}

function OpenSettings() {
  HideAll();
  Element("optionsScreen").style.display = "block";
}

function backToMenu() {
  Element("optionsScreen").style.display = "none";
  Element("settings").style.display = "block";
}

addToFight();

CreateUiButtons();