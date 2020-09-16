var combat = Element("combat");

var combatTextStorage = [];

function FormCombatEnvironment() {
  combat.innerHTML = `
  <div id="combatTextContainer"></div>
  <div id="roundHistory">
    <div id="toggleRound" onclick="toggleText('Round')">Round</div>
    <div id="toggleHistory" onclick="toggleText('History')">History</div>
  </div>
  <div id="combatButtonsContainer">
  <div id="abilityInfo"></div>
  ${CombatSpell(global.controlling, 1)}
  ${CombatSpell(global.controlling, 2)}
  ${CombatSpell(global.controlling, 3)}
  ${CombatSpell(global.controlling, 4)}
<img src="resources/images/icons/attack_icon.png" id="combatAttack" onmouseover="showInfoCombat('attack', this)" onmouseleave="hideInfoCombat()" onclick="TargetCharacters(enemiesFight, 'RegularAttack()', global.controlling)">
<img src="resources/images/icons/defense_icon.png" id="combatDefense" onmouseover="showInfoCombat('defense', this)" onmouseleave="hideInfoCombat()" onclick="AddToRound('Defend()', global.controlling.key)">
<img src="resources/images/icons/ultimate_ability.png" id="combatUltimate">
  </div>`;
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 1));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 2));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 3));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 4));
  highlightCorrect();
  RestoreCombatText();
}

function toggleText(arg) {
  if(arg == "Round") {
    global.combat.history = false;
    Element("toggleRound").classList.add("roundHistorySelected");
    Element("toggleHistory").classList.remove("roundHistorySelected");
  } else if(arg == "History") {
    global.combat.history = true;
    Element("toggleRound").classList.remove("roundHistorySelected");
    Element("toggleHistory").classList.add("roundHistorySelected");
  }
  RestoreCombatText();
}

function  highlightCorrect() {
  if(global.combat.history) {
    Element("toggleRound").classList.remove("roundHistorySelected");
    Element("toggleHistory").classList.add("roundHistorySelected");
  } else {
    Element("toggleRound").classList.add("roundHistorySelected");
    Element("toggleHistory").classList.remove("roundHistorySelected");
  }
}

function abiOfSlot(char, slot) {
  for(let abi of char.abilities) {
    if(abi.slot == slot && abi.equipped == true) return abi;
  }
  return undefined;
}

function spellOfSlot(char, slot) {
  for(let spell of char.spells) {
    if(spell.slot == slot && spell.equipped == true) return spell;
  }
  return undefined;
}

function CombatAbility(char, slot) {
  let div = Create("div");
  div.id = `combatAbility${slot}`;
  let img = Create("img");
  img.src = "resources/images/icons/ability_wheel.png";
  div.appendChild(img);
  if(abiOfSlot(char, slot) != undefined) {
    let abi = abiOfSlot(char, slot);
    div.addEventListener("mouseover", ()=>showInfoCombat(abi.key, this));
    div.addEventListener("mouseleave", ()=>hideInfoCombat());
    div.addEventListener("click", ()=>TargetCharacters(enemiesFight, abi, global.controlling));
    let abiImg = Create("img");
    abiImg.src = `resources/images/${abi.img}`
    abiImg.classList.add("combatAbiImage");
    div.appendChild(abiImg);
  }
  // if(abiOfSlot(char, slot) != undefined) {
  //   let abi = abiOfSlot(char, slot);
  //   console.log(abi);

  //   return `<div id="combatAbility${slot}" onmouseover="showInfoCombat('${abi.key}', this)" onmouseleave="hideInfoCombat()" onclick="TargetCharacters(enemiesFight, ${abi}, global.controlling)">
  //   <img src="resources/images/icons/ability_wheel.png">
  //   <img src="resources/images/${abi.img}" class="combatAbiImage">
  //   </div>`
  // }
  // else {
  //   return `<div id="combatAbility${slot}">
  //   <img src="resources/images/icons/ability_wheel.png">
  //   </div>`
  // }
  return div;
}

var delay = null;

function CombatSpell(char, slot) {
  if(spellOfSlot(char, slot) != undefined) {
    let spell = spellOfSlot(char, slot);
    return `<div id="combatSpell${slot}" onmouseover="showInfoCombat('${spell.key}', this)" onmouseleave="hideInfoCombat()">
    <img src="resources/images/icons/spell_wheel.png">
    <img src="resources/images/${spell.img}" class="combatAbiImage">
    </div>`
  }
  else {
    return `<div id="combatSpell${slot}">
    <img src="resources/images/icons/spell_wheel.png">
    </div>`
  }
}

function infoContent(key, elem) {
  Element("abilityInfo").textContent = "";
  let text = GetCombatInfo(key);
  if(text == undefined) text = "§¤s19-BB¤/red/Unfortunately it seems that your text was not found...§";
  Element("abilityInfo").style.background = "rgba(0,0,0,0.55)";
  Element("abilityInfo").style.opacity = "1.00";
  Element("abilityInfo").style.top = `${(elem.offsetTop - 100)}px`;
  Element("abilityInfo").style.left = `${(elem.offsetLeft - 50)}px`;
  Element("abilityInfo").appendChild(ReadContentCombat(text));
}

function showInfoCombat(key, elem) {
  if(delay) {
    clearTimeout(delay);
    delay = null;
  }
  delay = setTimeout(()=>infoContent(key, elem), global.combat.delay);
}

function hideInfoCombat() {
  clearTimeout(delay);
  Element("abilityInfo").style.background = "rgba(0,0,0,0.00)";
  Element("abilityInfo").style.opacity = "0.00";
  setTimeout(function () { Element("abilityInfo").textContent = ""; clearTimeout(delay); }, 50);
}

function GetCombatInfo(key) {
  for(let text of texts[0].texts) {
    if(text.key == key) return text.text;
  }
}

function CreateCombatText() {
  global.combat.actor = characters.enemies[0];
  global.combat.target = characters.player;
  UpdateBV();
  let text = texts[1].subcats[0].texts[Random(texts[1].subcats[0].texts.length)].text;
  combatTextStorage.push({text: text});
  Element("combatTextContainer").appendChild(ReadContentCombat(text));
}

function RestoreCombatText() {
  Element("combatTextContainer").textContent = "";
  let bank;
  if(!global.combat.history) bank = thisRoundHistory;
  else bank = thisBattleHistory;
  for(let txt of bank) {
    BV = txt.bv;
    Element("combatTextContainer").appendChild(ReadContentCombat(txt.text));
  }
}


function ActorWep(char) {
  for(let wep of char.equipment) if(wep.dmg) return wep;
}


function ReadContentCombat(text) {
  let content = text.split("§");
  let textContent = Create('p');
  for (let colors of content) {
    let img;
    let link;
    let color = "white";
    let text;
    let style = "";
    if(colors.indexOf("¤") != -1) {
      let styleMarks = colors.split("¤")[1];
      text = colors.split("¤")[2];
      if(styleMarks.indexOf("-") != -1) {
        let marks = styleMarks.split("-");
        for(let mark of marks) {
          style += getMark(mark);
        }
      }
    }
    if (colors.indexOf("#") != -1) {
      img = colors.split("#")[1];
      if(img.startsWith("@var.")) img = VariableText(img);
      text = colors.split("#")[2];
      if(text.startsWith("@var.")) text = VariableText(text);
    }
    else if (colors.indexOf("/") != -1) {
      color = colors.split("/")[1];
      if(color.startsWith("@var.")) color = VariableText(color);
      text = colors.split("/")[2];
      if(text.startsWith("@var.")) text = VariableText(text);
    } if (colors.indexOf("&") != -1) {
      link = colors.split("&")[1];
      text = colors.split("&")[2];
    } else if  (text == undefined) {
      text = colors;
      if(text.startsWith("@var.")) text = VariableText(text);
    } 
    style += ` color: ${color};`;
    if (text == ":break") textContent.innerHTML += "<br>";
    else if(global.quickload && img != undefined) {
      if (img != undefined && link == undefined) textContent.innerHTML += `<img style="width: 30px; height: 30px;" src="resources/images/${img}.png">`;
      else if (img != undefined && link != undefined) textContent.innerHTML += `<img style="width: 30px; height: 30px;" class="PointerClass" src="resources/images/${img}.png" onclick="${link}">`;
    }
    else if(!global.quickload && img != undefined) {
      if (img != undefined && link == undefined && imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" src="resources/images/${img}.png">`;
      else if(img != undefined && link == undefined && !imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" src="resources/images/events/missing_image.png">`;
      else if (img != undefined && link != undefined && imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" class="PointerClass" src="resources/images/${img}.png" onclick="${link}">`;
      else if(img != undefined && link != undefined && !imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" class="PointerClass" src="resources/images/events/missing_image.png" onclick="${link}">`;
    }
    else if (link != undefined) textContent.innerHTML += `<span style = "${style}" class="PointerClass" onclick="${link}">${text}</span>`;
    else if (text) textContent.innerHTML += `<span style = "${style}" >${text}</span>`;
  }
  return textContent;
}