
function targetingAi(char) {
  let max = 0;
  let table = ReturnTable(char);
  if(char.class.role == "support") {

  } else if(char.class.role == "offense") {
    table = OffenseTable(char);
  } 
  for(let i = 0; i<table.length; i++) {
    table[i].threatChance = 0;
    if(table[i-1]) table[i].threatChance = table[i-1].threatChance;
    else table[i].threatChance = 0;
    table[i].threatChance += 100 + table[i].class.threat + table[i].threat;
    max = table[i].threatChance;
  }
  let value = Random(max);
  let targeting;
  for(let unit of table) {
    if(unit.threatChance >= value) { targeting = unit; break;}
  }
  let func = decideAbility(char);
}

function decideAbility(char) {
  
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