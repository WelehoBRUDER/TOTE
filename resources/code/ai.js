
function targetingAi(char, friendly) {
  if(char.hasActed) return;
  char.hasActed = true;
  let max = 0;
  let table = ReturnTable(char);
  let triedheal = false;
  if(ShouldIHeal(char)) {
    if(CanIHeal(char)) {
      console.log("Tried to heal self!");
      HealSelf(char);
      return;
    }
  }
  if(char.class.role == "support") {
    if(TeamNeedsHealing(char, friendly)) {
      console.log(CanIHeal(char));
      if(CanIHeal(char)) {
        console.log("Tried to heal!");
        ChooseHealing(char, friendly);
        triedheal = true;
        return;
      }
    }
    console.log("Did not heal!");
    table = OffenseTable(char);
  } else if(char.class.role == "offense") {
    table = OffenseTable(char);
  } 
  for(let i = 0; i<table.length; i++) {
    if(table[i].stats.hp <= 0) continue;
    table[i].threatChance = 0;
    if(table[i-1]) table[i].threatChance = table[i-1].threatChance;
    else table[i].threatChance = 0;
    table[i].threatChance += 100 + table[i].class.threat + table[i].threat;
    table[i].threatChance += modifiersThreat(table[i]);
    max = table[i].threatChance;
  }
  let value = Random(max);
  let targeting;
  for(let unit of table) {
    if(unit.threatChance >= value) { targeting = unit; break;}
  }
  global.combat.actor = char;
  let func = decideAbility(char);
  let Speed = CalculateSpeed(char);
  let act = func;
  if(act != "RegularAttack()") act = func.action;
  if(IsStunned(char)) charactersActions.push({action: "recover", performer: char, speed: Speed});
  else charactersActions.push({target: targeting, action: act, performer: char, speed: Speed, abi: func, ally: friendly})
}

function ChooseHealing(char, friendly) {
  if(!CanIHeal(char)) return false;
  let Speed = CalculateSpeed(char);
  if(IsStunned(char)) { charactersActions.push({action: "recover", performer: char, speed: Speed}); return; }
  let table = [];
  if(friendly) table = alliesFight;
  else table = enemiesFight;
  let healTarget = LowestMemberInGroup(char, table)
  let healSkill = MostSuitableHealFor(healTarget, char);
  charactersActions.push({target: healTarget, action: healSkill.action, performer: char, speed: Speed, abi: healSkill, ally: friendly})
}

function HealSelf(char) {
  let Speed = CalculateSpeed(char);
  if(IsStunned(char)) { charactersActions.push({action: "recover", performer: char, speed: Speed}); return; }
  let healSkill = MostSuitableHealFor(char, char);
  charactersActions.push({target: char, action: healSkill.action, performer: char, speed: Speed, abi: healSkill})
}

function LowestMemberInGroup(char, group) {
  let lowesthp = 100;
  let lowestmember = null;
  let comparison = 0;
  for(let member of group) {
    if(member.key == char.key || member.stats.hp <= 0) continue;
    comparison = (member.stats.hp/member.stats.maxhp) * 100;
    if(comparison < lowesthp) {lowesthp = comparison; lowestmember = member;}
  }
  return lowestmember;
}

function ShouldIHeal(char) {
  for(let chara of charactersActions) {
    if(chara.action.toLowerCase().startsWith("heal") && chara.target == char) return false;
  }
  console.log(char.stats.hp < PercentOf(char.ai_behauviour.healing_self, char.stats.maxhp));
  if(char.stats.hp < PercentOf(char.ai_behauviour.healing_self, char.stats.maxhp)) return true;
  else return false;
}

function MostSuitableHealFor(char, healer) {
  let heals = [];
  console.log(char);
  let target = char.stats.maxhp - char.stats.hp;
  let abiHeal = 0;
  let spellHeal = 0;
  let abi = null;
  let spell = null;
  let finalValue = 0;
  function correctspell() {
    for(let spe of healer.spells) {
      if(eval(spe.action) == spellHeal) return spe;
    }
  }
  function correctability() {
    for(let abi of healer.abilities) {
      if(eval(abi.action) == abiHeal) return abi;
    }
  }
  function abilityorspell() {
    for(let abi of healer.abilities) {
      if(eval(abi.action) == finalValue) return abi;
    }
    for(let spe of healer.spells) {
      if(eval(spe.action) == finalValue) return spe;
    }
  }
  for(let abi of healer.abilities) {
    if(abi.action.toLowerCase().startsWith("heal") && abi.cooldown <= 0 && abi.cost.mana <= healer.stats.mana) {
      heals.push(eval(abi.action));
    }
  }
  if(heals.length > 1) abiHeal = heals.reduce(function(prev, curr) {return (Math.abs(curr - target) < Math.abs(prev - target) ? curr: prev);});
  if(abiHeal > 0) abi = correctability();
  else if(heals.length > 0) {abiHeal = heals[0]; abi = correctability();}
  heals = [];
  for(let spell of healer.spells) {
    if(spell.action.toLowerCase().startsWith("heal") && spell.cooldown <= 0 && spell.cost.mana <= healer.stats.mana) {
      heals.push(eval(spell.action))
    }
  }
  if(heals.length > 1) spellHeal = heals.reduce(function(prev, curr) {return (Math.abs(curr - target) < Math.abs(prev - target) ? curr: prev);});
  if(spellHeal > 0) spell = correctspell();
  else if(heals.length > 0) {spellHeal = heals[0]; spell = correctspell();}
  if(abi && spell) {
    heals = [];
    heals.push(abiHeal);
    heals.push(spellHeal);
    finalValue = heals.reduce(function(prev, curr) {return (Math.abs(curr - target) < Math.abs(prev - target) ? curr: prev);});
    return abilityorspell();
  }
  else if(abi && !spell) {
    return abi;
  }
  else {
    return spell;
  }
}

function IsStunned(char) {
  for(let mod of char.modifiers) {
    if(mod.recover) return true;
  }
}

function modifiersThreat(char) {
  let threat = 0;
  for(let mod of char.modifiers) {
    if(mod.power) {
      for(let pow of mod.power) {
        if(pow.type == "threat"){
          threat += pow.value;
        }      
      }
    }
  }
  return threat;
}

function TeamNeedsHealing(char, friendly) {
  cont = false;
  if(friendly) {
    for(let member of alliesFight) {
      cont = false;
      for(let chara of charactersActions) {
        if(chara.action.toLowerCase().startsWith("heal") && chara.target == member) cont = true;
      }
      if(cont || member.stats.hp <= 0) continue;
      if(member.stats.hp < PercentOf(char.ai_behauviour.healing, member.stats.maxhp)) return true;
    }
  } else {
    for(let member of enemiesFight) {
      cont = false;
      for(let chara of charactersActions) {
        if(chara.action.toLowerCase().startsWith("heal") && chara.target == member) cont = true;
      }
      if(cont || member.stats.hp <= 0) continue;
      if(member.stats.hp < PercentOf(char.ai_behauviour.healing, member.stats.maxhp)) return true;
    }
  }
  return false
}

function betterAI()
{
// I have lost all hope, this is my last resort, hope this works.
// Thy shall pray that peepeepoopoo ¤%f!TE_:*^LT@£@€$@£ 
//
//             ______              
//        .d$$$******$$$$c.        
//     .d$P"            "$$c      
//    $$$$$.           .$$$*$.    
//  .$$ 4$L*$$.     .$$Pd$  '$b   
//  $F   *$. "$$e.e$$" 4$F   ^$b  
// d$     $$   z$$$e   $$     '$. 
// $P     `$L$$P` `"$$d$"      $$ 
// $$     e$$F       4$$b.     $$ 
// $b  .$$" $$      .$$ "4$b.  $$ 
// $$e$P"    $b     d$`    "$$c$F 
// '$P$$$$$$$$$$$$$$$$$$$$$$$$$$  
//  "$c.      4$.  $$       .$$   
//   ^$$.      $$ d$"      d$P    
//     "$$c.   `$b$F    .d$P"     
//       `4$$$c.$$$..e$$P"        
//           `^^^^^^^`
}

function decideAbility(char) {
  let regDamage = 0;
  let bestDamage = 0;
  let chosenAbi = null;
  regDamage = RegularAttack();
  for(let abi of char.abilities) {
    if(abi.cooldown > 0) continue;
    if(bestDamage < eval(abi.action)) {bestDamage = eval(abi.action); chosenAbi = abi}
  }
  //console.log("chosen abi: " + chosenAbi + " char: " + char.name);
  if(regDamage >= bestDamage || chosenAbi == null) return "RegularAttack()";
  else return chosenAbi;
}

function CanIHeal(char) {
  for(let abi of char.abilities) {
    if(abi.action.toLowerCase().startsWith("heal") && abi.cooldown <= 0 && abi.cost.mana <= char.stats.mana) return true;
  }
  for(let spell of char.spells) {
    if(spell.action.toLowerCase().startsWith("heal") && spell.cooldown <= 0 && spell.cost.mana <= char.stats.mana) return true;
  }
  return false;
}

function ReturnTable(char) {
  for(let ally of alliesFight) {
    if(ally.key == char.key) return alliesFight;
  }
  for(let enemy of enemiesFight) {
    if(enemy.key == char.key) return enemiesFight;
  }
}

function OffenseTable(char) {
  for(let ally of alliesFight) {
    if(ally.key == char.key) return enemiesFight;
  }
  for(let enemy of enemiesFight) {
    if(enemy.key == char.key) return alliesFight;
  }
}