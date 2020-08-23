function Saving() {
  HideAll();
  Element("saveLoad").textContent = "";
  for (let slot of Saves) {
    if (slot.key == "back") {
      let button = Create("button");
      button.textContent = `Back`;
      button.style.fontSize = "48px";
      button.style.width = "260px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => toggleButton("settings"));
    }
    else if (slot.key == "file") {
      let button = Create("button");
      button.textContent = `Save to File`;
      button.style.width = "160px";
      button.style.fontSize = "24px";
      button.style.height = "90px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => SaveNoPrompt("toFile"));
    }
    else if (!slot.save) {
      let button = Create("button");
      button.textContent = `Save ${slot.key} - empty`;
      button.style.fontSize = "24px";
      button.style.width = "500px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => SaveNoPrompt(slot.key));
    }
    else {
      let button = Create("button");
      let pInfo = JSON.parse(localStorage.getItem(`${slot.key}characters`));
      button.textContent = `Save ${slot.key} - ${pInfo.player.name} | ${pInfo.player.map} | last saved: ${slot.date}`;
      button.style.fontSize = "24px";
      button.style.width = "500px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => SavePrompt(slot.key));
    }
  }
}

function Loading() {
  HideAll();
  Element("saveLoad").textContent = "";
  for (let slot of Saves) {
    if (slot.key == "back") {
      let button = Create("button");
      button.textContent = `Back`;
      button.style.fontSize = "48px";
      button.style.width = "260px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => toggleButton("settings"));
    }
    else if (slot.key == "file") {
      let button = Create("button");
      button.textContent = `Load from File`;
      button.style.width = "160px";
      button.style.fontSize = "36px";
      button.style.height = "120px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => LoadSlotNoPrompt("toFile"));
    }
    else if (!slot.save) {
      let button = Create("button");
      button.textContent = `Save ${slot.key} - empty`;
      button.style.fontSize = "24px";
      button.style.width = "500px";
      Element("saveLoad").appendChild(button);
    }
    else {
      let button = Create("button");
      let pInfo = JSON.parse(localStorage.getItem(`${slot.key}characters`));
      button.textContent = `Save ${slot.key} - ${pInfo.player.name} | ${pInfo.player.map} | last saved: ${slot.date}`;
      button.style.fontSize = "24px";
      button.style.width = "500px";
      Element("saveLoad").appendChild(button);
      button.addEventListener("click", () => LoadSlotPrompt(slot.key));
    }
  }
}

function SaveNoPrompt(key) {
  hideAlert();
  if (key == "toFile") {
    var saveData = (function () {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      return function (data, fileName) {
        var json = JSON.stringify(data),
          blob = new Blob([json], { type: "octet/stream" }),
          url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      };

    }());
    saveData(characters, `TOTE-${characters.player.name}-save-${new Date().getHours()}.${new Date().getMinutes()}.txt`);
    return
  }
  let int = 0;
  for (let i = 0; i < Saves.length; i++) {
    if (Saves[i].key == key) int = i;
  }
  Saves[int].save = true;
  Saves[int].date = `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()} | ${new Date().getHours()}:${new Date().getMinutes()}`;
  localStorage.setItem("saves", JSON.stringify(Saves));
  localStorage.setItem(`${Saves[int].key}characters`, JSON.stringify(characters));
  Saving();
}

function LoadSlotNoPrompt(key) {
  hideAlert();
  if (key == "toFile") {
    let fileInput = Create("input");
    fileInput.setAttribute('type', 'file');
    document.body.appendChild(fileInput);
    fileInput.id = "fileinput";
    fileInput.click();
    fileInput.addEventListener("change", () => HandleFile());
    return;
  }
  characters = JSON.parse(localStorage.getItem(`${key}characters`));
  DrawMap();
  Loading();
}

function HandleFile() {
  console.log(Element("fileinput").files);
  let file = Element("fileinput").files[0];
  let reader = new FileReader();
  let text = "";

  // file reading finished successfully
  reader.addEventListener('load', function (e) {
    // contents of file in variable     
    text = e.target.result;
    FinishRead();
  });

  // read as text file
  reader.readAsText(file);

  function FinishRead() {
    let table = JSON.parse(text);
    characters = table;
    DrawMap();
    Loading();
  }
}

function LoadSlotPrompt(key) {
  Element("AlertBase").style.display = "block";
  Element("yesAlert").textContent = "Load";
  Element("textAlert").textContent = `Are you sure you wish to load game on ${key}? You will lose all unsaved progress.`;
  Element("yesAlert").onclick = () => LoadSlotNoPrompt(key);
}

function SavePrompt(key) {
  Element("AlertBase").style.display = "block";
  Element("yesAlert").textContent = "Save";
  Element("textAlert").textContent = `Save ${key} already has a save created before. Overwrite game on save ${key}?`;
  Element("yesAlert").onclick = () => SaveNoPrompt(key);
}

function hideAlert() {
  Element("AlertBase").style.display = "none";
}

var Saves = [
  {
    key: "slot 1",
    date: null,
    save: false
  },
  {
    key: "slot 2",
    date: null,
    save: false
  },
  {
    key: "slot 3",
    date: null,
    save: false
  },
  {
    key: "slot 4",
    date: null,
    save: false
  },
  {
    key: "back"
  },
  {
    key: "file"
  }
]

if (localStorage.getItem("saves")) {
  Saves = JSON.parse(localStorage.getItem("saves"));
}

function RemoveStorage() {
  for (let save of Saves) {
    save.save = false;
  }
}