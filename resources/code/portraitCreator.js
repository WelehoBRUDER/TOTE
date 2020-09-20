function CreatePortrait(character, enemy) {
  let portrait = Create('div');
  portrait.id = character.key + "_Portrait";
  let name = character.name;
  if (name.length > 18) {
    name = name.substring(0, 17);
    name += "...";
  }
  let portrait_image_url = `${character.image}`;
  if (character.key.startsWith("summon_")) {
    if (enemy) portrait_image_url = `${character.images.hostile}`;
    else portrait_image_url = `${character.images.friendly}`;
  }
  if (!global.quickload) if (!imageExists(`resources/images/${portrait_image_url}.png`)) portrait_image_url = "events/missing_image";
  portrait.innerHTML = `
    <div class="portrait_background">
      <p class="portrait_title">${name}</p>
      <img src="resources/images/${portrait_image_url}.png" class="portrait_image">
      ${createOverlay(character)}
      ${createWeapon(character)}
      ${createShield(character)}
      <div class="hpbarbg">
      <p class="barNum">${character.stats.hp} / ${character.stats.maxhp}</p>
      </div>
      <div class="hpbarfill" style="width: ${character.stats.hp / character.stats.maxhp * 128 + 'px'};">
      </div>
      <div class="mpbarbg">
      <p class="barNum">${character.stats.mana} / ${character.stats.maxmana}</p>
      </div>
      <div class="mpbarfill" style="width: ${character.stats.mana / character.stats.maxmana * 128 + 'px'};"></div>
      <div class="statusEffects" onmousemove="statusEffectInfo()" onmouseleave="statusEffectHide()">${loopMods(character)}</div>
    </div>
  `;
  if (!enemy) Element("allyportraits").appendChild(portrait);
  else Element("enemyportraits").appendChild(portrait);
}

var hovering = null;
var infodelay = null;

function loopMods(char) {
  let d = Create('div');
  for (let mod of char.modifiers) {
    if (mod.power || mod.last) {
      let img = Create("img");
      img.src = `resources/images/${mod.img}`;
      img.id = mod.key;
      img.style.width = "33px";
      img.style.height = "33px";
      img.style.margin = "3px";
      d.appendChild(img);
    }
  }
  return d.outerHTML;
}

function statusEffectInfo() {
  let hoverbox = Element("statusInfo");
  if (infodelay) {
    clearTimeout(infodelay);
    infodelay = null;
  }
  if (event.target.classList.contains("statusEffects") || !event.target.id) {
    hovering = event.target;
    hoverbox.style.background = "rgba(0, 0, 0, 0.00)";
    hoverbox.textContent = "";
    clearTimeout(infodelay);
    return;
  }
  else if (hovering == event.target) {
    hoverbox.style.top = `${event.y}px`;
    hoverbox.style.left = `${event.x}px`;
  }
  let pass = event;
  infodelay = setTimeout(() => statusEffectInfoExecute(pass), global.combat.delay);
}

function statusEffectInfoExecute(event) {
  let hoverbox = Element("statusInfo");
    hovering = event.target
    hoverbox.style.background = "rgba(0, 0, 0, 0.45)";
    hoverbox.textContent = "";
    if (event.target.id) { 
      id = event.target.id;
      let infotext = "";
      for(let stattext of statuses) {
        if(stattext.key == id) infotext = stattext.text;
      }
      hoverbox.appendChild(ReadContentCombat(infotext))
    }
    hoverbox.style.top = `${event.y}px`;
    hoverbox.style.left = `${event.x}px`;
}

function statusEffectHide() {
  let hoverbox = Element("statusInfo");
  if (infodelay) {
    clearTimeout(infodelay);
    infodelay = null;
  }
  hoverbox.style.background = "rgba(0, 0, 0, 0.00)";
  hoverbox.textContent = "";
  hovering = event.target;
}

function statusEffectInfoHide() {
  console.log("wtf yo");
}


function createOverlay(char) {
  let d = Create('div');
  for (let eq of char.equipment) {
    if (eq.slot == "helmet" || eq.slot == "chest") {
      let img = Create("img");
      img.src = `resources/images/${eq.imgEq}`;
      img.classList.add("portrait_overlay");
      d.appendChild(img);
    }
  }
  return d.outerHTML;
}

function createWeapon(char) {
  let d = Create('div');
  for (let eq of char.equipment) {
    if (eq.dmg) {
      let img = Create("img");
      img.src = `resources/images/${eq.img}.png`;
      img.classList.add("portrait_weapon");
      d.appendChild(img);
    }
  }
  return d.outerHTML;
}

function createShield(char) {
  let d = Create('div');
  for (let eq of char.equipment) {
    if (eq.slot == "shield") {
      let img = Create("img");
      img.src = `resources/images/${eq.img}.png`;
      img.classList.add("portrait_shield");
      d.appendChild(img);
    }
  }
  return d.outerHTML;
}

let alliesFight = [];
let enemiesFight = [];

function PushCombatantToTable(combatant, table) {
  let copy = JSON.parse(JSON.stringify(combatant));
  copy.key += `${table.length}`;
  copy.armor = GetAVGArmor(copy);
  copy.hasActed = false;
  copy.threat = 0;
  if (copy.armor == {}) copy.armor = ArmorZero();
  table.push(copy);
}

function ArmorZero() {
  return {
    slash: 0,
    blunt: 0,
    thrust: 0,
    fire: 0,
    frost: 0,
    wind: 0,
    water: 0,
    shock: 0,
    light: 0,
    dark: 0
  }
}

function CreatePortraits() {
  Element("allyportraits").textContent = "";
  Element("enemyportraits").textContent = "";
  for (let enemy of enemiesFight) {
    CreatePortrait(enemy, true);
  }
  for (let ally of alliesFight) {
    CreatePortrait(ally, false);
  }
}

function ClearCombatTables() {
  alliesFight = [];
  enemiesFight = [];
}

function HarmPlayer(dmg) {
  alliesFight[0].stats.hp -= dmg;
  CreatePortraits();
}
function addToFight() {
  ClearCombatTables();
  PushCombatantToTable(characters.player, alliesFight);
  PushCombatantToTable(characters.allies[0], alliesFight);
  PushCombatantToTable(characters.enemies[1], enemiesFight);
  PushCombatantToTable(characters.enemies[2], enemiesFight);
  PushCombatantToTable(characters.enemies[0], enemiesFight);
  PushCombatantToTable(characters.enemies[0], enemiesFight);
  global.controlling = alliesFight[0];
  global.combat.actor = alliesFight[0];
  global.combat.target = enemiesFight[1];
  CreatePortraits();
}



