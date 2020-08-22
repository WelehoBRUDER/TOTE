function CreateUiButtons() {
  for(let button of ui_buttons) {
    let but = Create("img");
    but.id = button.id;
    but.src = `resources/images/icons/ui_icon${button.bg}.png`;
    but.addEventListener("click", ()=>toggleButton(button.open));
    but.classList.add("ui_button");
    Element("uiIcons").appendChild(but);
  }
}

function toggleButton(action) {
  HideAll();
  Element(action).style.display = "block";
}

var ui_buttons = [
  {
    bg: "_map",
    open: "mapFrame",
    id: "mapButton"
  },
  {
    bg: "_info",
    open: "codex",
    id: "codexButton"
  },
  {
    bg: "_settings",
    open: "settings",
    id: "settingsButton"
  },
]

function HideAll() {
  Element("codex").style.display = "none";
  Element("mapFrame").style.display = "none";
  Element("settings").style.display = "none";
  Element("saveLoad").textContent = "";
}

CreateUiButtons();