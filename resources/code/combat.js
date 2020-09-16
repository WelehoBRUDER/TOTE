

function TargetCharacters(charTable, ability, performer) {
  console.log(ability);
  if (performer.hasActed) return;
  Element("targetingCombat").style.display = "grid";
  Element("targetingCombat").textContent = '';
  for (let char of charTable) {
    if (char.stats.hp > 0) {
      Element("targetingCombat").innerHTML += `
      <img src="resources/images/${char.image}.png" onclick="AddToRound('${ability}', '${performer.key}', '${char.key}')" >
    `;
    }
  }
}

function getCharCombat(key) {
  for(let char of alliesFight) {
    if(char.key == key) return char;
  }
  for(let char of enemiesFight) {
    if(char.key == key) return char;
  }
  return null;
}

function AddToRound(action, performer, target) {
  Element("combatButtonsContainer").classList.add("darken");
  let newTarget;
  if(target) newTarget = getCharCombat(target);
  let newPerformer = getCharCombat(performer);
  Element("targetingCombat").style.display = "none";
  let Speed = CalculateSpeed(newPerformer);
  if(target) charactersActions.push({ target: newTarget, action: action, performer: newPerformer, speed: Speed});
  else if(action != "Defend()") charactersActions.push({action: action, performer: newPerformer, speed: Speed});
  else {
    newPerformer.modifiers.push(Defend());
    charactersActions.push({action: "ignore"});
    CreatePortraits();
  }
  if(newPerformer.key == "player0")  {
      for(let i = 0; i<enemiesFight.length; i++) {
        targetingAi(enemiesFight[i]); 
      }
      for(let i = 1; i<alliesFight.length; i++) {
        if(alliesFight[i].ai) targetingAi(alliesFight[i]);
      }
  }
  if(charactersActions.length === enemiesFight.length+alliesFight.length) {
    EndRound();
  }
}

function CalculateSpeed(char) {
  let extraSpeed = 0;
  for(let piece of char.equipment) {
    if(piece.speed > 0) extraSpeed += piece.speed;
  }
  return char.stats.spd + extraSpeed;
}

async function EndRound() {
  SortActions();
  for(let act of charactersActions) {
    if(act.action == "ignore") continue;
    let SuitableText = null;
    let trigger1 = null;
    let trigger2 = null;
    if(act.action == "RegularAttack()") {
      trigger2 = GetHighestDamageType(act.performer);
    } else {
      trigger2 = act.action;
    }
    global.combat.actor = act.performer;
    global.combat.target = act.target;
    global.combat.value  = eval(act.action);
    if(global.combat.value <= 0) global.combat.value = 0;
    else if(global.combat.value == "miss") trigger1 = "miss";
    else if(global.combat.value != "miss") trigger1 = "nomiss";
    if(global.combat.blocked) trigger1 = "block";
    BV = global.combat;
    if(global.combat.value != "miss") act.target.stats.hp -= global.combat.value;
    if(global.combat.value <= 0) global.combat.value = "no";
    let triggers = `${trigger1} ${trigger2} land`;
    SuitableText = GetRandomCombatText(triggers);
    let container =  Element("combatTextContainer");
    container.appendChild(ReadContentCombat(SuitableText));
    if(act.target.stats.hp <= 0) {
      act.target.stats.hp = 0;
      let deathTrigger = "target death";
      container.appendChild(ReadContentCombat(GetRandomCombatText(deathTrigger)));
    }
    container.scrollTop = container.scrollHeight;
    CreatePortraits();
    if(global.combat.speed > 0) await sleep(global.combat.speed);
  }
  RemoveOrDecreaseStatuses();
  CreatePortraits();
  charactersActions = [];
  for(let char of enemiesFight) {
    char.hasActed = false;
  }
  for(let char of alliesFight) {
    char.hasActed = false;
  }
  Element("combatButtonsContainer").classList.remove("darken");
}

function RemoveOrDecreaseStatuses() {
  for(let char of alliesFight) {
    if(char.modifiers.length > 0) {
      for(let i = 0; i<char.modifiers.length; i++) {
        if(char.modifiers[i].power) {
          char.modifiers[i].last--;
          if(char.modifiers[i].last <= 0) {
            char.modifiers.splice(i, 1);
          }
        }
      }
    }
  }
  for(let char of enemiesFight) {
    if(char.modifiers.length > 0) {
      for(let i = 0; i<char.modifiers.length; i++) {
        if(char.modifiers[i].power) {
          char.modifiers[i].last--;
          if(char.modifiers[i].last <= 0) {
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
  for(let weapon of char.equipment) {
    if(weapon.dmg) {
      for(let damage of weapon.dmg) {
        if(damage.value > highestDamage) {
          highestDamage = damage.value;
          type = damage.type;
        }
      }
    }
  }
  return type;
}

function GetRandomCombatText(triggers) {
  for(let cat of texts) {
    if(cat.cat == "battle") {
      for(let subcat of cat.subcats) {
        if(subcat.trigger == triggers) {
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

// function TEMP_ENEMY_AI(enemy) {
//   let maximum = 0;
//   for(let i=0; i<alliesFight.length; i++) {
//     alliesFight[i].threatChance = 0;
//     if(alliesFight[i-1]) alliesFight[i].threatChance = alliesFight[i-1].threatChance;
//     else alliesFight[i].threatChance = 0;
//     alliesFight[i].threatChance += 100 + alliesFight[i].class.threat + alliesFight[i].threat;
//     maximum = alliesFight[i].threatChance;
//   }
//   let value = Random(maximum);
//   let targeting;
//   for(let char of alliesFight) {
//     if(char.threatChance >= value) { targeting = char; break;}
//   }
//   console.log(targeting);
// }

var charactersActions = [];