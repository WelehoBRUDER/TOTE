Element("invFrame").style.backgroundImage = `url(resources/images/themes/${global.theme}/bg/bg_gray.png`;
Element("invGridFrame").style.backgroundImage = `url(resources/images/themes/${global.theme}/bg/bg_cbrown.png`;
var infoContainer = Element("infoBox");

function CreateInv() {
  Element("invGrid").textContent = "";
  for (let i = 0; i < 36; i++) {
    let item = Create("div");
    if (characters.player.inventory[i]) {
      item.style.cursor = "pointer";
      let itm = characters.player.inventory[i];
      item.id = `invItem${i}`;
      let img = Create("img");
      img.style.height = "90%";
      img.style.width = "80%";
      img.style.selfAlign = "center";
      if (global.quickload) {
        img.src = `resources/images/${itm.img}.png`;
      }
      else if (imageExists(`resources/images/${itm.img}.png`)) {
        img.src = `resources/images/${itm.img}.png`;
      } else {
        img.src = imgMissing(itm.img);
      }
      item.appendChild(img);
      item.addEventListener("mouseenter", ShowItemInfo);
      item.addEventListener("mouseleave", HideItemInfo);
      item.addEventListener("click", EquipItem);
      item.addEventListener("dblclick", DoubleClickEquipItem);
      if (itm.amount > 1) {
        let num = Create("p");
        num.textContent = itm.amount;
        item.appendChild(num);
      }
    }
    Element("invGrid").appendChild(item);
  }
}

function ShowItemInfo(e) {
  infoContainer.style.transform = "scale(1)";
  infoContainer.textContent = "";
  console.log(e);
  let itm;
  if (e.target.id.length > 8) {
    itm = FindEquipment(e.target.id);
    console.log(infoContainer.offsetLeft);
    //infoContainer.style.top = `${Math.min(e.y, window.innerHeight-infoContainer.height)}px`;
    infoContainer.style.left = `${e.x}px`;
  }
  else {
    itm = characters.player.inventory[e.target.id.substring(7)];
    //infoContainer.style.top = `${Math.min(e.y, window.innerHeight-infoContainer.height)}px`;
    infoContainer.style.top = `${e.y}px`
    infoContainer.style.left = `${e.x}px`;
  }
  infoContainer.innerHTML += `<h1>${itm.name}</h1>`
  if (FoundDesc(itm) != false) infoContainer.appendChild(HandleDescSyntax(FoundDesc(itm)));
  else if (debug) infoContainer.appendChild(HandleDescSyntax(`§/red/ERROR: DESCRIPTION NOT FOUND!§`));
  infoContainer.innerHTML += `<p>Price: ${itm.price}<span style="color: yellow">¤</span</p>
  <p>Amount: ${itm.amount}</p>
  <p>Level: ${itm.level}</p>
  `;
  if (itm.speed) infoContainer.innerHTML += `<p>Speed: <span style="color: ${speedColor(itm.speed)}">${itm.speed}</span></p>`
  if (itm.slot) infoContainer.innerHTML += `<p>Slot: ${itm.slot[0].toUpperCase()}${itm.slot.substring(1)}</p>`;
  if (itm.twohand) infoContainer.innerHTML += `<p style="color: orange">Two handed weapon!</p>`;
  if (itm.blockChance) infoContainer.innerHTML += `<p>Block chance: ${itm.blockChance}%</p>`;
  if (itm.damage) infoContainer.innerHTML += `<p>Bash damage: ${itm.damage[0].value} ${itm.damage[0].type}</p>`;
  if (itm.armor) {
    infoContainer.innerHTML += `<p id="defText">Defenses: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for (let text in itm.armor) {
        textElement += `<p style="color: ${colors[text]}">${text[0].toUpperCase()}${text.substring(1)}: <span>${itm.armor[text]}%</span> </p>`;
      }
      return textElement;
    }
  }
  if (itm.dmg) {
    infoContainer.innerHTML += `<p id="defText">Damages: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for (let text of itm.dmg) {
        textElement += `<p style="color: ${colors[text.type]}">${text.type[0].toUpperCase()}${text.type.substring(1)}: <span>${text.value}</span> </p>`;
      }
      return textElement;
    }
    infoContainer.innerHTML += `<p>Total: ${totalDmg(itm.dmg)}</p>`
    function totalDmg(dmg) {
      let damage = 0;
      for (let value of dmg) {
        damage += value.value;
      }
      damage += " dmg";
      return damage;
    }
  }
  if (itm.effects) {
    infoContainer.innerHTML += `<p>Effects:</p>`;
    let effectDiv = Create("div");
    effectDiv.classList.add("effectBox");
    effectDiv.appendChild(effects(itm.effects));
    infoContainer.appendChild(effectDiv);
  }
  if(itm.traits) {
    let traitContainer = Create("p");
    traitContainer.classList.add("traitContainer");
    for(let trait of itm.traits) {
      let span = Create("span");
      if(trait.value > 0) span.textContent = `${trait.title}: ${GetStringByKey(trait.action, traitActions)} increased by ${trait.value}%`;
      else if(trait.value < 0) span.textContent = `${trait.title}: ${GetStringByKey(trait.action, traitActions)} decreased by ${trait.value}%`;
      traitContainer.appendChild(span);
    }
    infoContainer.appendChild(traitContainer);
  }
}

function effects(effects) {
  let main = Create("p");
  main.classList.add("effectMain");
  for (let effect of effects) {
    let sub = Create("p");
    sub.classList.add("effectLine");
    sub.appendChild(HandleDescSyntax(GetStringByKey(effect.action, actions)));
    sub.appendChild(HandleDescSyntax(GetStringByKey(effect.type, symbols)));
    sub.innerHTML += `<p><span>by ${effect.value}</span></p>`;
    main.appendChild(sub);
  }
  return main;
}



function GetStringByKey(key, array) {
  for (let item of array) {
    if (item.key == key) {
      return item.content;
    }
  }
}

function kassuStrat() {
  characters.player.inventory[1] = global.equipping.equipment[2];
  CreateInv();
}

function HandleDescSyntax(text) {
  let content = text.split("§");
  let textContent = Create('p');
  for (let colors of content) {
    let img;
    let color;
    let text;
    if (colors.indexOf("%") != -1) {
      img = colors.split("%")[1];
      text = colors.split("%")[2];
    }
    else if (colors.indexOf("/") != -1) {
      color = colors.split("/")[1];
      text = colors.split("/")[2];
    } else if (text == undefined) text = colors;
    if (text == ":break") textContent.innerHTML += "<br>";
    else if (img != undefined) textContent.innerHTML += `<img style="width: 1.1vw; height: 1.1vw;" src="resources/images/icons/${img}.png">`;
    else if (text) textContent.innerHTML += `<span style = "color: ${color || "white"}" class="desc">${text}</span>`;
  }
  return textContent;
}

function FoundDesc(itm) {
  for (let desc of itemDesc) {
    if (desc.key == itm.key) {
      return desc.text;
    }
  }
  return false;
}

Element("charbeingequipped").textContent = global.equipping.name;

function MoveEquip(by) {
  if (global.party.length <= 1) return;
  if (global.equippingNUM <= 0 && by < 0) global.equippingNUM = global.party.length - 1;
  else if (global.equippingNUM >= global.party.length - 1) global.equippingNUM = 0;
  else global.equippingNUM += by;
  ChangeEquip();
}

function ChangeEquip() {
  console.log(global.equippingNUM);
  global.equipping = global.party[global.equippingNUM].equip;
  Element("charbeingequipped").textContent = global.equipping.name;
  console.log(global.equipping);
  CreateEquippedInventory();
}

function speedColor(speed) {
  if (speed > 0) {
    return "rgb(22, 196, 68)";
  }
  else if (speed == 0) {
    return "rgb(211, 214, 47)";
  }
  else {
    return "rgb(179, 16, 32)";
  }
}

function HideItemInfo() {
  infoContainer.style.transform = "scale(0)";
}

function CreateEquippedInventory() {
  UpdatePlayerStats();
  Element("weaponSlot").innerHTML = "";
  Element("chestarmor").innerHTML = "";
  Element("helmet").innerHTML = "";
  Element("gloves").innerHTML = "";
  Element("feet").innerHTML = "";
  Element("shieldSlot").innerHTML = "";
  for (let item of global.equipping.equipment) {
    if (GetWeapon() && item.dmg) {
      if (global.quickload) Element("weaponSlot").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (imageExists(`resources/images/${item.img}.png`)) Element("weaponSlot").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (!imageExists(`resources/images/${item.img}.png`)) Element("weaponSlot").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
      Element(item.key).addEventListener("mouseenter", ShowItemInfo);
      Element(item.key).addEventListener("mouseleave", HideItemInfo);
    }
    else if (item.slot) {
      if (global.quickload) {
        if (item.slot == "chest") Element("chestarmor").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "helmet") Element("helmet").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "gloves") Element("gloves").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "feet") Element("feet").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "shield") Element("shieldSlot").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
      } else {
        if (item.slot == "chest" && imageExists(`resources/images/${item.img}.png`)) Element("chestarmor").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "chest" && !imageExists(`resources/images/${item.img}.png`)) Element("chestarmor").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
        else if (item.slot == "helmet" && imageExists(`resources/images/${item.img}.png`)) Element("helmet").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "helmet" && !imageExists(`resources/images/${item.img}.png`)) Element("helmet").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
        else if (item.slot == "gloves" && imageExists(`resources/images/${item.img}.png`)) Element("gloves").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "gloves" && !imageExists(`resources/images/${item.img}.png`)) Element("gloves").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
        else if (item.slot == "feet" && imageExists(`resources/images/${item.img}.png`)) Element("feet").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "feet" && !imageExists(`resources/images/${item.img}.png`)) Element("feet").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
        else if (item.slot == "shield" && imageExists(`resources/images/${item.img}.png`)) Element("shieldSlot").innerHTML = `<img src="resources/images/${item.img}.png" class="equippedItem" id="${item.key}">`;
        else if (item.slot == "shield" && !imageExists(`resources/images/${item.img}.png`)) Element("shieldSlot").innerHTML = `<img src=${imgMissing(item.img)} class="equippedItem" id="${item.key}">`;
      }
      Element(item.key).addEventListener("mouseenter", ShowItemInfo);
      Element(item.key).addEventListener("mouseleave", HideItemInfo);
    }
  }
}

// DBL CLICK WORKS, YOU JUST NEED TO BE MORE PRECISE, IDIOT ;)
Element("weaponSlot").addEventListener("click", UnequipWeapon);
Element("weaponSlot").addEventListener("dblclick", UnequipWeaponDBL);
Element("shieldSlot").addEventListener("click", (e = this) => UnequipArmor(e, "shield"));
Element("shieldSlot").addEventListener("dblclick", () => UnequipArmorDBL("shield"));
Element("chestarmor").addEventListener("click", (e = this) => UnequipArmor(e, "chest"));
Element("chestarmor").addEventListener("dblclick", () => UnequipArmorDBL("chest"));
Element("helmet").addEventListener("click", (e = this) => UnequipArmor(e, "helmet"));
Element("helmet").addEventListener("dblclick", () => UnequipArmorDBL("helmet"));
Element("gloves").addEventListener("click", (e = this) => UnequipArmor(e, "gloves"));
Element("gloves").addEventListener("dblclick", () => UnequipArmorDBL("gloves"));
Element("feet").addEventListener("click", (e = this) => UnequipArmor(e, "feet"));
Element("feet").addEventListener("dblclick", () => UnequipArmorDBL("feet"));


function FindEquipment(key) {
  for (let eq of global.equipping.equipment) {
    if (eq.key == key) {
      return eq;
    }
  }
  return false;
}

function UnequipArmor(e, slot) {
  if (!GetArmorBySlot(slot)) return;
  if (e.shiftKey) {
    let copy = global.equipping.equipment[GetArmorBySlot(slot)];
    characters.player.inventory.push(copy);
    global.equipping.equipment.splice(GetArmorBySlot(slot), 1);
  }
  HideItemInfo();
  CreateEquippedInventory();
  CreateInv();
}

function UnequipArmorDBL(slot) {
  if (GetArmorBySlot(slot) === false) return;
  let copy = global.equipping.equipment[GetArmorBySlot(slot)];
  characters.player.inventory.push(copy);
  global.equipping.equipment.splice(GetArmorBySlot(slot), 1);
  HideItemInfo();
  CreateEquippedInventory();
  CreateInv();
}

function UnequipWeapon(e) {
  if (!THEREISWEAPON()) return;
  if (e.shiftKey) {
    let copy = GetWeapon();
    characters.player.inventory.push(copy);
    global.equipping.equipment.splice(GetWeaponInt(), 1);
    HideItemInfo();
    CreateEquippedInventory();
    CreateInv();
  }
}

function UnequipWeaponDBL() {
  if (!THEREISWEAPON()) return;
  let copy = GetWeapon();
  characters.player.inventory.push(copy);
  global.equipping.equipment.splice(GetWeaponInt(), 1);
  HideItemInfo();
  CreateEquippedInventory();
  CreateInv();
}

function SortInv(reverse, filter, string) {
  characters.player.inventory.sort(function (a, b) {
    var compareA;
    var compareB;
    if (string == true) {
      compareA = a[filter].toUpperCase(); // ignore upper and lowercase
      compareB = b[filter].toUpperCase(); // ignore upper and lowercase
    } else if (string == false) {
      compareA = a[filter];
      compareB = b[filter];
    }

    if (compareA < compareB) {
      if (!reverse) return 1;
      else return -1;
    }
    if (compareA > compareB) {
      if (!reverse) return -1;
      else return 1;
    }

    return 0;
  });
}

function EquipItem(e) {
  let int;
  if (!e.target.id) int = e.target.parentElement.id.substring(7);
  else int = e.target.id.substring(7);
  if (e.shiftKey) {
    if (characters.player.inventory[int].dmg) {
      let copy = GetWeapon();
      if (THEREISWEAPON() === true) {
        global.equipping.equipment[GetWeaponInt()] = characters.player.inventory[int];
        characters.player.inventory[int] = copy;
      }
      else {
        global.equipping.equipment.push(characters.player.inventory[int]);
        characters.player.inventory.splice(int, 1);
      }
    }
    else if (characters.player.inventory[int].slot) {
      let copy = global.equipping.equipment[GetArmorBySlot(characters.player.inventory[int].slot)];
      if (GetArmorBySlot(characters.player.inventory[int].slot)) {
        global.equipping.equipment[GetArmorBySlot(characters.player.inventory[int].slot)] = characters.player.inventory[int];
        characters.player.inventory[int] = copy;
      } else {
        global.equipping.equipment.push(characters.player.inventory[int]);
        characters.player.inventory.splice(int, 1);
      }
    }
    CreateEquippedInventory();
    CreateInv();
  }
}

function DoubleClickEquipItem(e) {
  let int;
  if (!e.target.id) int = e.target.parentElement.id.substring(7);
  else int = e.target.id.substring(7);
  if (characters.player.inventory[int].dmg) {
    let copy = GetWeapon();
    if (THEREISWEAPON() === true) {
      global.equipping.equipment[GetWeaponInt()] = characters.player.inventory[int];
      characters.player.inventory[int] = copy;
    }
    else {
      global.equipping.equipment.push(characters.player.inventory[int]);
      characters.player.inventory.splice(int, 1);
    }
  }
  else if (characters.player.inventory[int].slot) {
    let copy = global.equipping.equipment[GetArmorBySlot(characters.player.inventory[int].slot)];
    if (GetArmorBySlot(characters.player.inventory[int].slot)) {
      global.equipping.equipment[GetArmorBySlot(characters.player.inventory[int].slot)] = characters.player.inventory[int];
      characters.player.inventory[int] = copy;
    } else {
      global.equipping.equipment.push(characters.player.inventory[int]);
      characters.player.inventory.splice(int, 1);
    }
  }
  CreateEquippedInventory();
  CreateInv();
}

function GetArmorBySlot(slot) {
  for (let i = 0; i < global.equipping.equipment.length; i++) {
    if (global.equipping.equipment[i].slot == slot) return i;
  }
  return false;
}

function GetWeapon() {
  for (let wep of global.equipping.equipment) {
    if (wep.dmg) return wep;
  }
}

// Had to add this since the other ones weren't enough...
function THEREISWEAPON() {
  for (let wep of global.equipping.equipment) {
    if (wep.dmg) return true;
  }
  return false;
}

function GetWeaponInt() {
  for (let i = 0; i < global.equipping.equipment.length; i++) {
    if (global.equipping.equipment[i].dmg) return i;
  }
  return false;
}

CreateEquippedInventory();

const colors = {
  dark: "rgb(10, 10, 10)",
  light: "255, 253, 120",
  fire: "rgb(232, 143, 26)",
  wind: "rgb(196, 210, 255)",
  frost: "rgb(88, 125, 245)",
  water: "rgb(22, 53, 156)",
  shock: "rgb(118, 26, 189)",
  slash: "rgb(129, 129, 130)",
  blunt: "rgb(154, 152, 156)",
  thrust: "rgb(91, 90, 92)"
};

const actions = [
  { key: "increase", content: "§/rgb(11, 191, 32)/Increases§" },
  { key: "decrease", content: "§/rgb(128, 9, 15)/Decreases§" }
];

const symbols = [
  { key: "maxhp", content: "§/rgb(237, 9, 47)/maximum health§ §%heart_icon_small%§" },
  { key: "maxmana", content: "§/rgb(9, 106, 128)/maximum mana§ §%warn_icon%§" },
  { key: "str", content: "§/rgb(201, 198, 187)/strength§ §%warn_icon%§" },
  { key: "dex", content: "§/rgb(201, 198, 187)/dexterity §%warn_icon%§" },
  { key: "agi", content: "§/rgb(201, 198, 187)/agility §%warn_icon%§" },
  { key: "wis", content: "§/rgb(201, 198, 187)/wisdom §%warn_icon%§" },
  { key: "int", content: "§/rgb(201, 198, 187)/intelligence §%warn_icon%§" },
  { key: "fth", content: "§/rgb(201, 198, 187)/faith §%warn_icon%§" },
  { key: "acc", content: "§/rgb(201, 198, 187)/accuracy §%warn_icon%§" },
];

const traitActions = [
  { key: "flying_target_hit_chance", content: "Chance to hit flying enemies" }
]

function GetAVGArmor(char) {
  let arm = {};
  let amnt = 0;
  let firstTime = true;
  for (let eq of char.equipment) {
    if (eq.slot && eq.slot != "shield") {
      if (firstTime) {
        arm = JSON.parse(JSON.stringify(eq.armor));
        firstTime = false;
        for (let text in arm) {
          arm[text] = 0;
        }
      }
      for (let def in eq.armor) {
        arm[def] += eq.armor[def];
      }
      amnt++;
    }
  }

  for (let def in arm) {
    arm[def] = Math.ceil(arm[def] / (8 - amnt));
  }
  return arm;
}

function UpdatePlayerStats() {
  if (!global.equipping.modifiers) global.equipping.modifiers = [];
  for (let eq of global.equipping.equipment) {
    if (eq.effects) {
      for (let effect of eq.effects) {
        if (!ModExists(effect.key)) {
          effect.applied = false;
          global.equipping.modifiers.push(effect);
          AddValueOfMod(effect);
        }
      }
    }
  }
  while (KeepRunningModRemoval()) {
    RemoveModIfEquipRemoved();
  }
  addToFight();
}

function AddValueOfMod(effect) {
  if (effect.applied == true) return;
  if (effect.action == "increase") global.equipping.stats[effect.type] += effect.value;
  else if (effect.action == "decrease") global.equipping.stats[effect.type] -= effect.value;
  effect.applied = true;
}

function KeepRunningModRemoval() {
  for (let mod of global.equipping.modifiers) {
    if (ModShouldNotExist(mod.key)) return true;
  }
  return false;
}

function RemoveModIfEquipRemoved() {
  let copy = global.equipping.modifiers
  for (let i = 0; i < global.equipping.modifiers.length; i++) {
    if (ModShouldNotExist(global.equipping.modifiers[i].key)) {
      let effect = global.equipping.modifiers[i];
      if (effect.action == "increase") global.equipping.stats[effect.type] -= effect.value;
      else if (effect.action == "decrease") global.equipping.stats[effect.type] += effect.value;
      copy.splice(i, 1);
    }
  }
  global.equipping.modifiers = copy;
}

function ModShouldNotExist(key) {
  for (let eq of global.equipping.equipment) {
    if (eq.effects) {
      for (let effect of eq.effects) {
        if (effect.key == key) return false;
      }
    }
  }
  return true;
}

function ModExists(key) {
  for (let mod of global.equipping.modifiers) {
    if (mod.key == key) {
      return true;
    }
  }
}

CreateInv();