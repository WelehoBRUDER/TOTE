
let global = {
  time: {
    minute: 15,
    hour: 7,
    day: 1,
    month: 3,
    year: 266
  },
  equipping: characters.player,
  equippingNUM: 0
};

// Updates global variables
function GlobalUpdate() {
  while (global.time.minute > 59) {
    global.time.hour++;
    global.time.minute -= 60;
  }
  while (global.time.hour > 23) {
    global.time.day++;
    global.time.hour -= 24;
  }
  while (global.time.day > 27) {
    global.time.month++;
    global.time.day -= 28;
  }
  while (global.time.month > 11) {
    global.time.year++;
    global.time.month -= 12;
  }
  if (global.time.day < 1) global.time.day = 1;
  if (global.time.month < 1) global.time.month = 1;
  Element("clock").textContent = `${global.time.hour}:${global.time.minute < 10 ? "0" : ""}${global.time.minute}`;
  Element("date").textContent = `${global.time.day}${timeAbbreviation()} of ${getMonth()}, ${global.time.year}`;
}

function timeAbbreviation() {
  if (global.time.day == 1) return "st";
  else if (global.time.day == 2) return "nd";
  else if (global.time.day == 3) return "rd";
  else return "th";
}

function getMonth() {
  switch (global.time.month) {
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