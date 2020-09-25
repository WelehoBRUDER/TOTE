
let global = {
  time: 139939560,
  controlling: null,
  equipping: characters.player,
  equippingNUM: 0,
  party: [{equip: characters.player}, {equip: characters.allies[0]}],
  quickload: true,
  combat: {
    actor: null,
    target: null,
    value: 46,
    blocked: false,
    ongoing: false,
    speed: 500,
    delay: 800,
    history: false,
    ally: true,
    summoned: null,
    error: ""
  },
  onmap: false,
  theme: "classical",
  tile_pack: "classic"
};

var units = {
  "year": 24*60*365,
  "month": 24*60*30,
  "week": 24*60*7,
  "day": 24*60,
  "minute": 1
}


// Updates global variables
function GlobalUpdate() {
  let minutes = global.time;
  let year = Math.floor(minutes / (24*60*365));
  minutes %= (24*60*365);
  let month = Math.floor(minutes / (24*60*30));
  minutes %= (24*60*30);
  let day = Math.floor(minutes / (24*60));
  minutes %= (24*60);
  let hour = Math.floor(minutes / 60);
  minutes %= 60;
  if(day < 1) day = 1;
  Element("clock").textContent = `${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
  Element("date").textContent = `${day}${timeAbbreviation(day)} of ${getMonth(month)}, ${year}`;
}

function timeAbbreviation(day) {
  if (day == 1) return "st";
  else if (day == 2) return "nd";
  else if (day == 3) return "rd";
  else return "th";
}

function getMonth(month) {
  switch (month) {
    case 1: return "Janaruy";
    case 2: return "Februari";
    case 3: return "Märsch";
    case 4: return "Apriliam";
    case 5: return "Maid";
    case 6: return "Junai";
    case 7: return "Juleen";
    case 8: return "Aukust";
    case 9: return "Sepalus";
    case 10: return "Oktaviar";
    case 11: return "Nuvember";
    case 12: return "Jahrende";
  }
}

GlobalUpdate();

function ReloadTheme() {
  const baseURL = "./themes/"
  Element("maintheme").href = baseURL + global.theme + '/main.css'
  Element("misctheme").href = baseURL + global.theme + '/misc.css'
  Element("invtheme").href = baseURL + global.theme + '/inv.css'
  Element("codextheme").href = baseURL + global.theme + '/codex.css'
  Element("menustheme").href = baseURL + global.theme + '/menus.css'
}