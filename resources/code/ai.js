
function targetingAi(char, friendly) {
  if(char.hasActed) return;
  char.hasActed = true;
  let max = 0;
  let table = ReturnTable(char);
  let triedheal = false;
  if(ShouldIHeal(char)) {
    if(CanIHeal(char)) {
      HealSelf(char, false);
      return;
    }
  }
  if(char.class.role == "support") {
    if(TeamNeedsHealing(char, friendly)) {
      if(CanIHeal(char)) {
        ChooseHealing(char, friendly, false);
        triedheal = true;
        return;
      }
    }
    table = OffenseTable(char);
  } else if(char.class.role == "offense") {
    table = OffenseTable(char);
  } 
  if(char.template) {
    let actionChosen = chooseActionTemplate(char.template);
    if(actionChosen == "buff_self" && canBuff(char)) {GetBuffForSelf(char, false); return;}
    if(actionChosen == "attack_enemy") {table = OffenseTable(char)}
 }
  for(let i = 0; i<table.length; i++) {
    if(table[i].stats.hp <= 0) continue;
    table[i].threatChance = 0;
    if(table[i-1]) table[i].threatChance = table[i-1].threatChance;
    else table[i].threatChance = 0;
    table[i].threatChance += 100 + table[i].class.threat + table[i].threat;
    table[i].threatChance = (table[i].threatChance + modifiersThreat(table[i])) * modifiersThreatpow(table[i]);
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

function RerollAi(char, friendly) {
  let max = 0;
  let table = ReturnTable(char);
  let triedheal = false;
  if(ShouldIHeal(char)) {
    if(CanIHeal(char)) {
      HealSelf(char, true);
      return;
    }
  }
  if(char.class.role == "support") {
    if(TeamNeedsHealing(char, friendly)) {
      if(CanIHeal(char)) {
        ChooseHealing(char, friendly, true);
        triedheal = true;
        return;
      }
    }
    table = OffenseTable(char);
  } else if(char.class.role == "offense") {
    table = OffenseTable(char);
  } 
  if(char.template) {
    let actionChosen = chooseActionTemplate(char.template);
    if(actionChosen == "buff_self" && canBuff(char)) {GetBuffForSelf(char, true); return;}
    if(actionChosen == "attack_enemy") {table = OffenseTable(char)}
 }
  for(let i = 0; i<table.length; i++) {
    if(table[i].stats.hp <= 0) continue;
    table[i].threatChance = 0;
    if(table[i-1]) table[i].threatChance = table[i-1].threatChance;
    else table[i].threatChance = 0;
    table[i].threatChance += 100 + table[i].class.threat + table[i].threat;
    table[i].threatChance = (table[i].threatChance + modifiersThreat(table[i])) * modifiersThreatpow(table[i]);
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
  return {target: targeting, action: act, performer: char, speed: Speed, abi: func, ally: friendly};
}

function chooseActionTemplate(template) {
  let table = deepCopy(template.behavior);
  let array = [];
  for(let data in table) {
    array.push({value: table[data] + (array[array.length - 1]?.value || 0), identifier: data});
  }
  let maxvalue = Random(array[array.length-1].value);
  for(let i = 0; i<array.length; i++) {
    if(maxvalue <= array[i].value) {
      return array[i].identifier;
    }
  }
}

// Heal anyone but self
function ChooseHealing(char, friendly, REROLL) {
  if(!CanIHeal(char)) return false;
  let Speed = CalculateSpeed(char);
  if(IsStunned(char)) { charactersActions.push({action: "recover", performer: char, speed: Speed}); return; }
  let table = [];
  if(friendly) table = alliesFight;
  else table = enemiesFight;
  let healTarget = LowestMemberInGroup(char, table)
  let healSkill = MostSuitableHealFor(healTarget, char);
  if(!REROLL)charactersActions.push({target: healTarget, action: healSkill.action, performer: char, speed: Speed, abi: healSkill, ally: friendly});
  else return {target: healTarget, action: healSkill.action, performer: char, speed: Speed, abi: healSkill, ally: friendly};
}

// Heal self
function HealSelf(char, REROLL) {
  let Speed = CalculateSpeed(char);
  if(IsStunned(char)) { charactersActions.push({action: "recover", performer: char, speed: Speed}); return; }
  let healSkill = MostSuitableHealFor(char, char);
  if(!REROLL)charactersActions.push({target: char, action: healSkill.action, performer: char, speed: Speed, abi: healSkill});
  else return {target: char, action: healSkill.action, performer: char, speed: Speed, abi: healSkill};
}

// Find the member of the group that needs healing the most.
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
// Checks if the character is low enough on hp to consider healing themself.
function ShouldIHeal(char) {
  for(let chara of charactersActions) {
    if(chara.action.toLowerCase().startsWith("heal") && chara.target == char) return false;
  }
  if(char.stats.hp < PercentOf(char.ai_behauviour.healing_self, char.stats.maxhp)) return true;
  else return false;
}

function canBuff(char) {
  for(let buff of char.abilities) {
    if(buff.selfTarget && buff.cost.mana <= char.stats.mana && buff.cooldown <= 0)
    return true;
  }
  for(let buff of char.spells) {
    if(buff.selfTarget && buff.cost.mana <= char.stats.mana && buff.cooldown <= 0)
    return true;
  }
  return false;
}

function GetBuffForSelf(char, REROLL) {
  let Speed = CalculateSpeed(char);
  if(IsStunned(char)) { charactersActions.push({action: "recover", performer: char, speed: Speed}); return; }
  let buffs = ReturnBuffs(char);
  let chosenBuff = buffs[Random(buffs.length-1)];
  if(!REROLL) charactersActions.push({target: char, action: chosenBuff.action, performer: char, speed: Speed, abi: chosenBuff});
  else return {target: char, action: chosenBuff.action, performer: char, speed: Speed, abi: chosenBuff};
}

function ReturnBuffs(char) {
  let bufflist = [];
  for(let abi of char.abilities) {
    if(abi.selfTarget && abi.cost.mana <= char.stats.mana && abi.cooldown <= 0) {
      bufflist.push(abi);
    }
  }
  for(let spell of char.spells) {
    if(spell.selfTarget && spell.cost.mana <= char.stats.mana && spell.cooldown <= 0) {
      bufflist.push(spell);
    }
  }
  return bufflist;
}

// Find healing ability/spell that heals the target closest to max hp.
function MostSuitableHealFor(char, healer) {
  let heals = [];
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

// Value threat modifiers
function modifiersThreat(char) {
  let threat = 0;
  for(let mod of char.modifiers) {
    if(mod.power) {
      for(let pow of mod.power) {
        if(pow.type == "threat" && pow.value){
          threat += pow.value;
        }      
      }
    }
  }
  return threat;
}

// % threat modifiers
function modifiersThreatpow(char) {
  let multi = 1;
  for(let mod of char.modifiers) {
    if(mod.power) {
      for(let pow of mod.power) {
        if(pow.type == "threat" && pow.power){
          multi += pow.power/100;
        }      
      }
    }
  }
  return multi;
}

// Checks if the requested team has members in need of medical attention.
function TeamNeedsHealing(char, friendly) {
  cont = false;
  if(friendly) {
    for(let member of alliesFight) {
      cont = false;
      for(let chara of charactersActions) {
        if(chara.action.toLowerCase().startsWith("heal") && chara.target == member) cont = true;
      }
      if(cont || member.stats.hp <= 0 || member.key == char.key) continue;
      if(member.stats.hp < PercentOf(char.ai_behauviour.healing, member.stats.maxhp)) return true;
    }
  } else {
    for(let member of enemiesFight) {
      cont = false;
      for(let chara of charactersActions) {
        if(chara.action.toLowerCase().startsWith("heal") && chara.target == member) cont = true;
      }
      if(cont || member.stats.hp <= 0 || member.key == char.key) continue;
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

// Just finds highest damage, must be changed!
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

// Checks if the character has healing abilities avalaible for their use on the turn.
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