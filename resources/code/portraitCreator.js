function CreatePortrait(character, enemy) {
  let portrait = Create('div');
  portrait.id = character.key + "_Portrait";
  let name = character.name;
  if (name.length > 18) {
    name = name.substring(0, 17);
    name += "...";
  }
  let portrait_image_url = `${character.image}`;
  if (!global.quickload) if (!imageExists(`resources/images/${portrait_image_url}.png`)) portrait_image_url = "events/missing_image";
  portrait.innerHTML = `
    <div class="portrait_background">
      <p class="portrait_title">${name}</p>
      <img src="resources/images/${portrait_image_url}.png" class="portrait_image">
      <div class="hpbarbg">
      <p class="barNum">${character.stats.hp} / ${character.stats.maxhp}</p>
      </div>
      <div class="hpbarfill" style="width: ${character.stats.hp / character.stats.maxhp * 128 + 'px'};">
      </div>
      <div class="mpbarbg">
      <p class="barNum">${character.stats.mana} / ${character.stats.maxmana}</p>
      </div>
      <div class="mpbarfill" style="width: ${character.stats.mana / character.stats.maxmana * 128 + 'px'};"></div>
      <div class="statusEffects"></div>
    </div>
  `;
  if (!enemy) Element("allyportraits").appendChild(portrait);
  else Element("enemyportraits").appendChild(portrait);
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



