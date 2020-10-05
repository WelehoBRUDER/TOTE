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
<img src="resources/images/themes/${global.theme}/icons/attack_icon.png" id="combatAttack" onmouseover="showInfoCombat('attack', this)" onmouseleave="hideInfoCombat()" onclick="TargetCharacters(enemiesFight, 'RegularAttack()', global.controlling)">
<img src="resources/images/themes/${global.theme}/icons/defense_icon.png" id="combatDefense" onmouseover="showInfoCombat('defense', this)" onmouseleave="hideInfoCombat()" onclick="AddToRound('Defend()', global.controlling.key)">
  </div>`;
  Element("combatButtonsContainer").appendChild(UltimateCreation());
  UltimateCharge();
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 1));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 2));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 3));
  Element("combatButtonsContainer").appendChild(CombatAbility(global.controlling, 4));
  Element("combatButtonsContainer").appendChild(CombatSpell(global.controlling, 1));
  Element("combatButtonsContainer").appendChild(CombatSpell(global.controlling, 2));
  Element("combatButtonsContainer").appendChild(CombatSpell(global.controlling, 3));
  Element("combatButtonsContainer").appendChild(CombatSpell(global.controlling, 4));
  coolDowns();
  highlightCorrect();
  RestoreCombatText();
}

function coolDowns() {
  for(let abi of global.controlling.abilities) {
    if(!abi.equipped) continue;
    if(abi.cooldown > 0) {
      Element(`combatAbility${abi.slot}`).classList.add("darken");
      if (Element(`combatAbility${abi.slot}`).childNodes[2]) Element(`combatAbility${abi.slot}`).childNodes[2].remove();
      let p = Create("p");
      p.textContent = abi.cooldown;
      p.classList.add("cooldowntext");
      Element(`combatAbility${abi.slot}`).appendChild(p);
    }
    if(abi.cost?.mana > global.controlling.stats.mana) {
      Element(`combatAbility${abi.slot}`).classList.add("darken");
    } else if(abi.cooldown <= 0) Element(`combatAbility${abi.slot}`).classList.remove("darken");
  }
  for(let abi of global.controlling.spells) {
    if(!abi.equipped) continue;
    if(abi.cooldown > 0) {
      Element(`combatSpell${abi.slot}`).classList.add("darken");
      if (Element(`combatSpell${abi.slot}`).childNodes[2]) Element(`combatSpell${abi.slot}`).childNodes[2].remove();
      let p = Create("p");
      p.textContent = abi.cooldown;
      p.classList.add("cooldowntext");
      Element(`combatSpell${abi.slot}`).appendChild(p);
    }
    if(abi.cost?.mana > global.controlling.stats.mana) {
      Element(`combatSpell${abi.slot}`).classList.add("darken");
    } else if(abi.cooldown <= 0) Element(`combatSpell${abi.slot}`).classList.remove("darken");
  }
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
  img.src = `resources/images/themes/${global.theme}/icons/ability_wheel.png`;
  div.appendChild(img);
  if(abiOfSlot(char, slot) != undefined) {
    let abi = abiOfSlot(char, slot);
    div.addEventListener("mouseover", ()=>showInfoCombat(abi.key, div));
    div.addEventListener("mouseleave", ()=>hideInfoCombat());
    if(abi.no_target) div.addEventListener("click", ()=>AddToRound(abi, global.controlling.key, alliesFight));
    else div.addEventListener("click", ()=>TargetCharacters(enemiesFight, abi, global.controlling));
    let abiImg = Create("img");
    abiImg.src = `resources/images/${abi.img}`
    abiImg.classList.add("combatAbiImage");
    div.appendChild(abiImg);
  }
  return div;
}

function CombatSpell(char, slot) {
  let div = Create("div");
  div.id = `combatSpell${slot}`;
  let img = Create("img");
  img.src = `resources/images/themes/${global.theme}/icons/spell_wheel.png`;
  div.appendChild(img);
  if(spellOfSlot(char, slot) != undefined) {
    let abi = spellOfSlot(char, slot);
    div.addEventListener("mouseover", ()=>showInfoCombat(abi.key, div));
    div.addEventListener("mouseleave", ()=>hideInfoCombat());
    if(abi.no_target) div.addEventListener("click", ()=>AddToRound(abi, global.controlling.key, alliesFight));
    else div.addEventListener("click", ()=>TargetCharacters(enemiesFight, abi, global.controlling));
    let abiImg = Create("img");
    abiImg.src = `resources/images/${abi.img}`
    abiImg.classList.add("combatAbiImage");
    div.appendChild(abiImg);
  }
  return div;
}
function UltimateCreation() {
  let div = Create("div");
  div.id = `containerUltimate`;
  let img = Create("img");
  img.src = `resources/images/themes/${global.theme}/icons/ultimate_ability.png`;
  img.id = "combatUltimate";
  div.appendChild(img);
  if(UltEquipped()) {
    let ultimate = UltEquipped();
    let ult = Create("img");
    ult.src = "resources/images/icons/sword_rain_ultimate.png";
    ult.id = "ultimateImage";
    div.appendChild(ult);
  }
  return div;
}

function UltimateCharge() {
  if(!UltEquipped) return;
  let main = Element("containerUltimate");
  let ult = UltEquipped();
  if(ult.charge < 100) {
    main.classList.add("darken");
    if (main.childNodes[2]) main.childNodes[2].remove();
    let p = Create("p");
    p.textContent = ult.charge + "%";
    p.classList.add("ultcharge");
    main.appendChild(p);
  }
  else {
    let rays = Create("div");
    rays.id = "ultimateGodrays";
    rays.classList.add("enabled");
    main.appendChild(rays);
    main.addEventListener("click", ()=>eval(ult.action));
  }
}

function UltEquipped() {
  for(let ult of global.controlling.ultimates) {
    if(ult.equipped) return ult;
  }
  return false;
}

var delay = null;
var fadeoutDelay = null;

function infoContent(key, elem) {
  Element("abilityInfo").textContent = "";
  let text = GetCombatInfo(key);
  if(text == undefined) text = "§¤s19-BB¤/red/Unfortunately it seems that your text was not found...§";
  Element("abilityInfo").style.background = "rgba(0,0,0,0.55)";
  Element("abilityInfo").style.opacity = "1.00";
  Element("abilityInfo").style.top = `${((elem.offsetTop) / document.documentElement.clientHeight) * 90}vh`;
  Element("abilityInfo").style.left = `${((elem.offsetLeft) / document.documentElement.clientWidth) * 100}vw`;
  Element("abilityInfo").appendChild(ReadContentCombat(text));
}

function showInfoCombat(key, elem) {
  if(fadeoutDelay) {
    clearTimeout(fadeoutDelay);
  }
  if(delay) {
    clearTimeout(delay);
    delay = null;
  }
  delay = setTimeout(()=>infoContent(key, elem), global.combat.delay);
}

function hideInfoCombat() {
  clearTimeout(fadeoutDelay);
  clearTimeout(delay);
  Element("abilityInfo").style.background = "rgba(0,0,0,0.00)";
  Element("abilityInfo").style.opacity = "0.00";
  fadeoutDelay = setTimeout(function () { Element("abilityInfo").textContent = ""; clearTimeout(delay); }, 90);
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
    Element("combatTextContainer").appendChild(txt.actionElem);
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
    let color = "";
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
      if (img != undefined && link == undefined) textContent.innerHTML += `<img style="width: 2.3vw; height: 2.3vw;" src="resources/images/${img}.png">`;
      else if (img != undefined && link != undefined) textContent.innerHTML += `<img style="width: 2.3vw; height: 2.3vw;" class="PointerClass" src="resources/images/${img}.png" onclick="${link}">`;
    }
    else if(!global.quickload && img != undefined) {
      if (img != undefined && link == undefined && imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 2.4vw; height: 3.5vh;" src="resources/images/${img}.png">`;
      else if(img != undefined && link == undefined && !imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 2.4vw; height: 3.5vh;" src="resources/images/events/missing_image.png">`;
      else if (img != undefined && link != undefined && imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 2.4vw; height: 3.5vh;" class="PointerClass" src="resources/images/${img}.png" onclick="${link}">`;
      else if(img != undefined && link != undefined && !imageExists(`resources/images/${img}.png`)) textContent.innerHTML += `<img style="width: 2.4vw; height: 3.5vh;" class="PointerClass" src="resources/images/events/missing_image.png" onclick="${link}">`;
    }
    else if (link != undefined) textContent.innerHTML += `<span style = "${style}" class="PointerClass" onclick="${link}">${text}</span>`;
    else if (text) textContent.innerHTML += `<span style = "${style}" >${text}</span>`;
  }
  return textContent;
}