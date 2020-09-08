var combat = Element("combat");

function FormCombatEnvironment() {
  combat.innerHTML = `
  <div id="combatButtonsContainer">
  <div id="abilityInfo"></div>

  ${CombatAbility(global.controlling, 1)}
  ${CombatAbility(global.controlling, 2)}
  ${CombatAbility(global.controlling, 3)}
  ${CombatAbility(global.controlling, 4)}
<img src="resources/images/icons/attack_icon.png" id="combatAttack" onmouseover="showInfoCombat('attack', this)" onmouseleave="hideInfoCombat()">
<img src="resources/images/icons/defense_icon.png" id="combatDefense" onmouseover="showInfoCombat('defense', this)" onmouseleave="hideInfoCombat()">
<img src="resources/images/icons/ultimate_ability.png" id="combatUltimate">
  </div>`;
  EquipSpellsAndAbilities();
}

function slotHasAbility(char, slot) {
  for(let abi of char.abilities) {
    if(abi.slot == slot && abi.equipped == true) return true;
  }
  return false;
}

function abiOfSlot(char, slot) {
  for(let abi of char.abilities) {
    if(abi.slot == slot && abi.equipped == true) return abi;
  }
  return undefined;
}

function CombatAbility(char, slot) {
  if(slotHasAbility(char, slot)) {
    let abi = abiOfSlot(char, slot);
    return `<div id="combatAbility${slot}" onmouseover="showInfoCombat(${abi.key}, this)" onmouseleave="hideInfoCombat()">
    <img src="resources/images/icons/ability_wheel.png">
    <img src="resources/images/${abi.img}" class="combatAbiImage">
    </div>`
  }
  else {
    return `<div id="combatAbility${slot}">
    <img src="resources/images/icons/ability_wheel.png">
    </div>`
  }
}

{/* <div id="spell_wheel">
<img src="resources/images/icons/spell_wheel.png" id="combatSpell1">
<img src="resources/images/icons/spell_wheel.png" id="combatSpell2">
<img src="resources/images/icons/spell_wheel.png" id="combatSpell3">
<img src="resources/images/icons/spell_wheel.png" id="combatSpell4">
</div> */}

{/* <div id="combatAbility1">
<img src="resources/images/icons/ability_wheel.png">
</div>
<div id="combatAbility2">
<img src="resources/images/icons/ability_wheel.png">
</div>
<div id="combatAbility3">
<img src="resources/images/icons/ability_wheel.png">
</div>
<div id="combatAbility4">
<img src="resources/images/icons/ability_wheel.png">
</div> */}

function EquipSpellsAndAbilities() {
  console.log("hey");
  for(let abi of global.controlling.abilities) {
    console.log("hey");
    if(abi.equipped) {
      console.log("hai");
      console.log(abi.slot);
      if(abi.slot == 1) {Element("combatAbility1").addEventListener("mouseover",()=>showInfoCombat(abi.key, this) );
       Element("combatAbility1").addEventListener("mouseleave", ()=>hideInfoCombat());}
    }
  }
}

function showInfoCombat(key, elem) {
  let text = GetCombatInfo(key);
  if(text == undefined) text = "§¤s19-BB¤/red/Unfortunately it seems that your text was not found...§";
  Element("abilityInfo").style.background = "rgba(0,0,0,0.55)";
  Element("abilityInfo").style.opacity = "1.00";
  console.log(event.y, event.x);
  console.log("before: " + event.y + " after: " + (event.y-120));
  Element("abilityInfo").style.top = `${(elem.offsetTop - 90)}px`;
  Element("abilityInfo").style.left = `${(elem.offsetLeft - 15)}px`;
  Element("abilityInfo").appendChild(ReadContentCombat(text));
}

function hideInfoCombat() {
  Element("abilityInfo").style.background = "rgba(0,0,0,0.00)";
  Element("abilityInfo").style.opacity = "0.00";
  setTimeout(function () { Element("abilityInfo").textContent = ""; }, 100);
}

function GetCombatInfo(key) {
  for(let text of texts[0].texts) {
    if(text.key == key) return text.text;
  }
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
      text = colors.split("#")[2];
    }
    else if (colors.indexOf("/") != -1) {
      color = colors.split("/")[1];
      text = colors.split("/")[2];
    } if (colors.indexOf("&") != -1) {
      link = colors.split("&")[1];
      text = colors.split("&")[2];
    } else if (text == undefined) text = colors;
    style += ` color: ${color};`;
    if (text == ":break") textContent.innerHTML += "<br>";
    else if (img != undefined && link == undefined && imageExists(`resources/images/icons/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" src="resources/images/icons/${img}.png">`;
    else if(img != undefined && link == undefined && !imageExists(`resources/images/icons/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" src="resources/images/events/missing_image.png">`;
    else if (img != undefined && link != undefined && imageExists(`resources/images/icons/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" class="PointerClass" src="resources/images/icons/${img}.png" onclick="${link}">`;
    else if(img != undefined && link != undefined && !imageExists(`resources/images/icons/${img}.png`)) textContent.innerHTML += `<img style="width: 30px; height: 30px;" class="PointerClass" src="resources/images/events/missing_image.png" onclick="${link}">`;
    else if (link != undefined) textContent.innerHTML += `<span style = "${style}" class="PointerClass" onclick="${link}">${text}</span>`;
    else if (text) textContent.innerHTML += `<span style = "${style}" >${text}</span>`;
  }
  return textContent;
}