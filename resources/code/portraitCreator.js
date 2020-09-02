function CreatePortrait(character, enemy) {
  let portrait = Create('div');
  portrait.id = character.key + "_Portrait";
  let name = character.name;
  if (name.length > 18) {
    name = name.substring(0, 17);
    name += "...";
  }
  portrait.innerHTML = `
    <div class="portrait_background">
      <p class="portrait_title">${name}</p>
      <img src="resources/images/portraits/${character.image}.png" class="portrait_image">
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
  combatant.stats.maxhp = combatant.stats.hp;
  combatant.stats.maxmana = combatant.stats.mana;
  table.push(combatant);
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

function HarmPlayer(dmg) {
  alliesFight[0].stats.hp -= dmg;
  CreatePortraits();
}

PushCombatantToTable(characters.player, alliesFight);
PushCombatantToTable(characters.allies[0], alliesFight);
PushCombatantToTable(characters.allies[1], alliesFight);
PushCombatantToTable(characters.enemies[0], enemiesFight);
PushCombatantToTable(characters.enemies[1], enemiesFight);
PushCombatantToTable(characters.enemies[2], enemiesFight);


CreatePortraits();
