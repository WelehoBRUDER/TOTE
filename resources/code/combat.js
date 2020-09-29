'use strict';

function TargetCharacters(charTable, ability, performer) {
  if (performer.hasActed) return;
  if (ability.selfTarget) {AddToRound(ability, performer.key, performer.key); return;}
  Element("targetingCombat").style.display = "grid";
  Element("targetingCombat").textContent = '';
  for (let char of charTable) {
    if (char.stats.hp > 0) {
      let path = char.image;
      if (path == undefined || char.images) {
        if (charTable == enemiesFight) path = char.images.hostile;
        else path = char.images.friendly
      }
      let targetImage = Create("img");
      targetImage.src = `resources/images/${path}.png`;
      targetImage.addEventListener("click", () => AddToRound(ability, performer.key, char.key));
      Element("targetingCombat").appendChild(targetImage);
      //   Element("targetingCombat").innerHTML += `
      //   <img src="resources/images/${char.image}.png" onclick="AddToRound(${ability}, '${performer.key}', '${char.key}')" >
      // `;
    }
  }
}

function getCharCombat(key) {
  for (let char of alliesFight) {
    if (char.key == key) return char;
  }
  for (let char of enemiesFight) {
    if (char.key == key) return char;
  }
  return null;
}

function AddToRound(action, performer, target) {
  Element("combatButtonsContainer").classList.add("darken");
  Element("roundHistory").classList.add("darken");
  let newTarget;
  if (target) newTarget = getCharCombat(target);
  if(newTarget == null) newTarget = target;
  let newPerformer = getCharCombat(performer);
  Element("targetingCombat").style.display = "none";
  let Speed = CalculateSpeed(newPerformer);
  let ability = action;
  if (action.action) ability = action.action;
  let friendly = true;
  if (target) charactersActions.push({ target: newTarget, action: ability, performer: newPerformer, speed: Speed, abi: action, ally: friendly });
  else if (action != "Defend()") charactersActions.push({ action: action, performer: newPerformer, speed: Speed, ally: friendly });
  else {
    newPerformer.modifiers.push(Defend());
    charactersActions.push({ action: "defend", performer: newPerformer, speed: 999 });
    CreatePortraits();
  }
  if (newPerformer.key == "player0") {
    for (let i = 0; i < enemiesFight.length; i++) {
      if(enemiesFight[i].stats.hp <= 0) continue;
      targetingAi(enemiesFight[i], false);
    }
    for (let i = 1; i < alliesFight.length; i++) {
      if(alliesFight[i].stats.hp <= 0) continue;
      if (alliesFight[i].ai) targetingAi(alliesFight[i], true);
    }
  }
    EndRound();
}

function LowerCooldowns() {
  for (let char of alliesFight) {
    for (let abi of char.abilities) {
      if(!abi.equipped) continue;
      if (abi.cooldown > 0) {
        abi.cooldown--;
      }
      if (char == global.controlling && abi.cooldown > 0) {
        if (Element(`combatAbility${abi.slot}`).childNodes[2]) Element(`combatAbility${abi.slot}`).childNodes[2].remove();
        let p = Create("p");
        p.textContent = abi.cooldown;
        p.classList.add("cooldowntext");
        Element(`combatAbility${abi.slot}`).appendChild(p);
      }
      else if (abi.cooldown <= 0 && char == global.controlling) {
        Element(`combatAbility${abi.slot}`).classList.remove("darken");
        if (Element(`combatAbility${abi.slot}`).childNodes[2]) Element(`combatAbility${abi.slot}`).childNodes[2].remove();
      }
    }
    for(let spell of char.spells) {
      if(spell.cooldown > 0) {
        spell.cooldown--;
      }
      if (char == global.controlling && spell.cooldown > 0) {
        if (Element(`combatSpell${spell.slot}`).childNodes[2]) Element(`combatSpell${spell.slot}`).childNodes[2].remove();
        let p = Create("p");
        p.textContent = spell.cooldown;
        p.classList.add("cooldowntext");
        Element(`combatSpell${spell.slot}`).appendChild(p);
      }
      else if (spell.cooldown <= 0 && char == global.controlling) {
        Element(`combatSpell${spell.slot}`).classList.remove("darken");
        if (Element(`combatSpell${spell.slot}`).childNodes[2]) Element(`combatSpell${spell.slot}`).childNodes[2].remove();
      }
    }
  }
  for (let char of enemiesFight) {
    for (let abi of char.abilities) {
      if (abi.cooldown > 0) {
        abi.cooldown--;
      }
    }
    for(let spell of char.spells) {
      if(spell.cooldown > 0) {
        spell.cooldown--;
      }
    }
  }
}

function CalculateSpeed(char) {
  let extraSpeed = 0;
  //console.log(char);
  for (let piece of char.equipment) {
    if (piece.speed > 0) extraSpeed += piece.speed;
  }
  return char.stats.spd + extraSpeed;
}

function ReRollThis(act, friendly) {
  let rerolled = RerollAi(act.performer, friendly)
  return rerolled;
}

function IsCharFriendly(char) {
  for(let ally of alliesFight) {
    if(ally.key == char.key) return true;
  }
  return false;
}

async function EndRound() {
  SortActions();
  LowerCooldowns();
  thisRoundHistory = [];
  if (!global.combat.history) Element("combatTextContainer").textContent = "";
  for (let act of charactersActions) {
    let container = Element("combatTextContainer");
    let SuitableText = null;
    let trigger1 = null;
    let trigger2 = null;
    if(act.performer.stats.hp <= 0) {
      continue;
    }
    for(let mod of act.performer.modifiers) {
      if(mod.everyTurn && mod.power) {
        let damag = 0;
        for(let dmg of mod.power) {
          act.performer.stats.hp -= dmg.value;
          damag += dmg.value;
        }
        global.combat.value = damag;
        global.combat.actor = act.performer;
        container.appendChild(ReadContentCombat(GetRandomCombatText("everyturn")));
        StatsForCharacters(act.performer)
        if(act.target) StatsForCharacters(act.target)
        if (global.combat.speed > 0) await sleep(global.combat.speed);
        continue;
      }
    }
    let BREAK_INFINITE_LOOP = 100;
    if(act.action != "resurrect" && act.target?.stats?.hp <= 0) {
      for(let i = 0; i<BREAK_INFINITE_LOOP; i++) {
        if(act?.performer) {
          let friendly = IsCharFriendly(act?.performer);
          act = ReRollThis(act, friendly);
        }
      }
    }
    if(act == undefined || act?.action == undefined) continue;
    if((act.action != "resurrect" && act.target?.stats?.hp <= 0) || !act?.action) continue;
    if(act.action == "recover" || IsStunned(act.performer)) {
      EndRound_Recover(act, container);
      if (global.combat.speed > 0) await sleep(global.combat.speed);
      StatsForCharacters(act.performer)
      if(act.target) StatsForCharacters(act.target)
       continue;
    }
    if (act.action == "defend") {
      EndRound_Defend(act, container);
      if (global.combat.speed > 0) await sleep(global.combat.speed);
      StatsForCharacters(act.performer)
      if(act.target) StatsForCharacters(act.target)
      continue;
    }
    else if (act.abi) {
      if (act.abi.action) {
        if (act.abi.action.startsWith("Summoning")) {
          EndRound_Summon(act, container);
          if (global.combat.speed > 0) await sleep(global.combat.speed);
          StatsForCharacters(act.performer)
          if(act.target) StatsForCharacters(act.target)
          continue;
        } else if(act.abi.action.startsWith("Heal")) {
          EndRound_Heal(act, container);
          if (global.combat.speed > 0) await sleep(global.combat.speed);
          StatsForCharacters(act.performer)
          if(act.target) StatsForCharacters(act.target)
          continue;
        } else if(act.abi.action.startsWith("Support")) {
          EndRound_Support(act, container);
          if (global.combat.speed > 0) await sleep(global.combat.speed);
          StatsForCharacters(act.performer)
          if(act.target) StatsForCharacters(act.target)
          continue;
        }
      }
    }
    if (act.action == "RegularAttack()") {
      trigger2 = GetHighestDamageType(act.performer);
    } else {
      trigger2 = act.action;
    }
    global.combat.actor = act.performer;
    global.combat.target = act.target;
    global.combat.value = eval(act.action);
    global.combat.ally = act.ally
    if (global.combat.value <= 0) global.combat.value = 0;
    else if (global.combat.value == "miss") trigger1 = "miss";
    else if (global.combat.value != "miss") trigger1 = "nomiss";
    if (global.combat.blocked) trigger1 = "block";
    if(global.combat.value != "miss" && act.abi.status) {
      let statuscopy = deepCopy(act.abi.status);
      act.target.modifiers.push(statuscopy);
    }
    BV = global.combat;
    if(act.abi.selfTarget) global.combat.value = 0;
    if (global.combat.value != "miss") act.target.stats.hp -= global.combat.value;
    if (global.combat.value <= 0) global.combat.value = "no";
    if (act.abi != undefined && act.abi != "RegularAttack()") {
      EndRound_Cost(act);
    }
    let triggers = `${trigger1} ${trigger2} land`;
    if(act.action.startsWith("Buff")) triggers = trigger2;
    SuitableText = GetRandomCombatText(triggers);
    if(SuitableText == null || SuitableText == undefined) {
      global.combat.error = act.action;
      if(debug) SuitableText = GetRandomCombatText("debug error");
      else SuitableText = GetRandomCombatText("nodebug error");
    }
    let actionElem = ReadContentCombat(SuitableText)
    container.appendChild(actionElem);
    let bt = deepCopy(global.combat)
    thisRoundHistory.push({ actionElem: actionElem });
    thisBattleHistory.push({ actionElem: actionElem });
    if (act.target.stats.hp <= 0) {
      if (global.combat.speed > 0) await sleep(global.combat.speed);
      StatsForCharacters(act.performer)
      if(act.target) StatsForCharacters(act.target)
      EndRound_targetDeath(act, container);
    }
    container.scrollTop = container.scrollHeight;
    StatsForCharacters(act.performer)
    if(act.target) StatsForCharacters(act.target)
    if (global.combat.speed > 0) await sleep(global.combat.speed);
  }
  RemoveOrDecreaseStatuses();
  coolDowns();
  RemoveDeadSummons();
  charactersActions = [];
  for (let char of enemiesFight) {
    char.hasActed = false;
  }
  for (let char of alliesFight) {
    char.hasActed = false;
  }
  Element("combatButtonsContainer").classList.remove("darken");
  Element("roundHistory").classList.remove("darken");
}

function getCharacterAbilityOrSpell(char, key) {
  for (let abi of char.abilities) {
    if (abi.key == key) return abi;
  }
  for(let spell of char.spells) {
    if (spell.key == key) return spell;
  }
}

function RemoveOrDecreaseStatuses() {
  for (let char of alliesFight) {
    if (char.modifiers.length > 0) {
      for (let i = 0; i < char.modifiers.length; i++) {
        if (char.modifiers[i].last) {
          char.modifiers[i].last--;
          if (char.modifiers[i].last <= 0) {
            char.modifiers.splice(i, 1);
          }
        }
      }
    }
  }
  for (let char of enemiesFight) {
    if (char.modifiers.length > 0) {
      for (let i = 0; i < char.modifiers.length; i++) {
        if (char.modifiers[i].last) {
          char.modifiers[i].last--;
          if (char.modifiers[i].last <= 0) {
            char.modifiers.splice(i, 1);
          }
        }
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function GetHighestDamageType(char) {
  let highestDamage = 0;
  let type = "nothing";
  for (let weapon of char.equipment) {
    if (weapon.dmg) {
      for (let damage of weapon.dmg) {
        if (damage.value > highestDamage) {
          highestDamage = damage.value;
          type = damage.type;
        }
      }
    }
  }
  return type;
}

function GetRandomCombatText(triggers) {
  for (let cat of texts) {
    if (cat.cat == "battle") {
      for (let subcat of cat.subcats) {
        if (subcat.trigger == triggers) {
          return subcat.texts[Random(subcat.texts.length)].text;
        }
      }
    }
  }
}

function SortActions() {
  charactersActions.sort(function (a, b) {
    var compareA;
    var compareB;
    compareA = a.speed;
    compareB = b.speed;
    if (compareA < compareB) {
      return 1;
    }
    if (compareA > compareB) {
      return -1;
    }
    return 0;
  });
}

function RemoveDeadSummons() {
  for(let i=0; i<alliesFight.length; i++) {
    if(alliesFight[i].images && alliesFight[i].stats.hp <= 0) {
      alliesFight.splice(i, 1);
    }
  }
  for(let i=0; i<enemiesFight.length; i++) {
    if(enemiesFight[i].images && enemiesFight[i].stats.hp <= 0) {
      enemiesFight.splice(i, 1);
    }
  }
}

var charactersActions = [];
var thisBattleHistory = [];
var thisRoundHistory = [];

/* FUNCTIONS MOVED HERE FOR CLARITY IN END ROUND */

function EndRound_Recover(act, container) {
  global.combat.actor = act.performer;
  BV = global.combat;
  let SuitableText = GetRandomCombatText("recover");
  let bt = deepCopy(global.combat)
  let actionElem = ReadContentCombat(SuitableText);
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
  container.scrollTop = container.scrollHeight;
  CreatePortraits();
}

function EndRound_Defend(act, container) {
  global.combat.actor = act.performer;
  global.combat.ally = act.ally
  BV = global.combat;
  let SuitableText = GetRandomCombatText("defend");
  let bt = deepCopy(global.combat)
  let actionElem = ReadContentCombat(SuitableText);
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
  container.scrollTop = container.scrollHeight;
  CreatePortraits();
}

function EndRound_Summon(act, container) {
  global.combat.actor = act.performer;
  global.combat.ally = act.ally
  global.combat.summoned = eval(act.abi.action);
  BV = global.combat;
  let SuitableText = GetRandomCombatText("summon");
  let bt = deepCopy(global.combat);
  let actionElem = ReadContentCombat(SuitableText);
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
  container.scrollTop = container.scrollHeight;
  if (act.abi.cost.mana) global.combat.actor.stats.mana -= act.abi.cost.mana;
  getCharacterAbilityOrSpell(act.performer, act.abi.key).cooldown = act.abi.cost.cd;
  PushCombatantToTable(eval(act.abi.action), act.target);
  CreatePortraits();
}

function EndRound_Heal(act, container) {
  global.combat.actor = act.performer;
  global.combat.ally = act.ally
  global.combat.target = act.target;
  global.combat.value = Math.ceil(eval(act.action));
  BV = global.combat;
  let SuitableText;
  if(act.target == act.performer) SuitableText = GetRandomCombatText("self heal");
  else SuitableText = GetRandomCombatText("target heal");
  let bt = deepCopy(global.combat);
  let actionElem = ReadContentCombat(SuitableText);
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
  container.scrollTop = container.scrollHeight;
  if (act.abi.cost.mana) global.combat.actor.stats.mana -= act.abi.cost.mana;
  getCharacterAbilityOrSpell(act.performer, act.abi.key).cooldown = act.abi.cost.cd;
  act.target.stats.hp += global.combat.value;
  if(act.target.stats.hp > act.target.stats.maxhp) act.target.stats.hp = act.target.stats.maxhp;
  CreatePortraits();
}

function EndRound_Support(act, container) {
  global.combat.actor = act.performer;
  global.combat.ally = act.ally
  global.combat.target = act.target;
  if(act.abi?.action?.power) global.combat.value = Math.ceil(eval(act.action));
  if(act.abi?.status) {
    let statuscopy = deepCopy(act.abi.status);
    act.target.modifiers.push(statuscopy);
  }
  BV = global.combat;
  let trigger2 = null;
  trigger2 = act.action;
  let SuitableText;
  if(act.target == act.performer) SuitableText = GetRandomCombatText(`nomiss ${trigger2} land`);
  else SuitableText = GetRandomCombatText("debug error");
  let bt = deepCopy(global.combat);
  let actionElem = ReadContentCombat(SuitableText);
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
  container.scrollTop = container.scrollHeight;
  if (act.abi.cost.mana) global.combat.actor.stats.mana -= act.abi.cost.mana;
  getCharacterAbilityOrSpell(act.performer, act.abi.key).cooldown = act.abi.cost.cd;
 // act.target.stats.hp += global.combat.value;
  if(act.target.stats.hp > act.target.stats.maxhp) act.target.stats.hp = act.target.stats.maxhp;
  CreatePortraits();
}

function EndRound_Cost(act) {
  if (act.abi.cost.mana) global.combat.actor.stats.mana -= act.abi.cost.mana;
  getCharacterAbilityOrSpell(act.performer, act.abi.key).cooldown = act.abi.cost.cd;
}

function EndRound_targetDeath(act, container) {
  act.target.stats.hp = 0;
  let deathTrigger = "target death";
  let bt = deepCopy(global.combat);
  let actionElem = ReadContentCombat(GetRandomCombatText(deathTrigger))
  thisRoundHistory.push({ actionElem: actionElem });
  thisBattleHistory.push({ actionElem: actionElem });
  container.appendChild(actionElem);
}