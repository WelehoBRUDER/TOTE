function RegularAttack() {

}

function TargetCharacters(charTable, Function, performer) {
  if (performer.hasActed) return;
  Element("targetingCombat").style.display = "grid";
  Element("targetingCombat").textContent = '';
  for (let char of charTable) {
    if (char.stats.hp > 0) {
      Element("targetingCombat").innerHTML += `
      <img src="resources/images/${char.image}.png" onclick="AddToRound('${char.key}', ${Function}, '${performer.key}')" >
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
  newPerformer.hasActed = true;
  Element("targetingCombat").style.display = "none";
  charactersActions.push({ target: newTarget, action: action, performer: newPerformer });
  if(newPerformer.key == "player0")  {
      for(let i = 0; i<enemiesFight.length; i++) {
        targetingAi(enemiesFight[i]); 
      }
  }
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