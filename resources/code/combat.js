

function TargetCharacters(charTable, ability, performer) {
  console.log(ability);
  if (performer.hasActed) return;
  Element("targetingCombat").style.display = "grid";
  Element("targetingCombat").textContent = '';
  for (let char of charTable) {
    if (char.stats.hp > 0) {
      Element("targetingCombat").innerHTML += `
      <img src="resources/images/${char.image}.png" onclick="AddToRound('${char.key}', '${ability}', '${performer.key}')" >
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

function AddToRound(target, action, performer) {
  let newTarget = getCharCombat(target);
  let newPerformer = getCharCombat(performer);
  Element("targetingCombat").style.display = "none";
  charactersActions.push({ target: newTarget, action: action, performer: newPerformer, speed: newPerformer.stats.spd });
  if(newPerformer.key == "player0")  {
      for(let i = 0; i<enemiesFight.length; i++) {
        targetingAi(enemiesFight[i]); 
      }
      for(let i = 1; i<alliesFight.length; i++) {
        targetingAi(alliesFight[i]);
      }
  }
  if(charactersActions.length === enemiesFight.length+alliesFight.length) {
    EndRound();
  }
}

function EndRound() {
  SortActions();
  for(let act of charactersActions) {
    let SuitableText = null;
    let trigger2 = null;
    if(act.action == "RegularAttack()") {
      trigger2 = GetHighestDamageType(act.performer);
    } else {
      trigger2 = act.action;
    }
    let triggers = `nomiss ${trigger2} land`;
    SuitableText = GetRandomCombatText(triggers);
    global.combat.actor = act.performer;
    global.combat.target = act.target;
    global.combat.value  = eval(act.action);
    BV = global.combat;
    act.target.stats.hp -= global.combat.value;
    Element("combatTextContainer").appendChild(ReadContentCombat(SuitableText));
  }
  CreatePortraits();
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
          console.log("hey");
          return subcat.texts[Random(subcat.texts.length-1)].text;
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