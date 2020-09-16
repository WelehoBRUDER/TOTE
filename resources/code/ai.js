
function targetingAi(char) {
  if(char.hasActed) return;
  char.hasActed = true;
  let max = 0;
  let table = ReturnTable(char);
  if(char.class.role == "support") {
    table = OffenseTable(char);
  } else if(char.class.role == "offense") {
    table = OffenseTable(char);
  } 
  for(let i = 0; i<table.length; i++) {
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
  let func = decideAbility(char);
  let Speed = CalculateSpeed(char);
  charactersActions.push({target: targeting, action: func, performer: char, speed: Speed})
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
    if(bestDamage < eval(abi.action)) {bestDamage = eval(abi.action); chosenAbi = abi.action}
  }
  console.log("chosen abi: " + chosenAbi + " char: " + char.name);
  if(regDamage >= bestDamage || chosenAbi == null) return "RegularAttack()";
  else return chosenAbi;
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