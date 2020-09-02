Element("invFrame").style.backgroundImage = "url(resources/images/bg/bg_gray.png";
Element("invGridFrame").style.backgroundImage = "url(resources/images/bg/bg_cbrown.png";

function CreateInv() {
  Element("invGrid").textContent = "";
  for (let i = 0; i < 36; i++) {
    let item = Create("div");
    if (characters.player.inventory[i]) {
      item.style.cursor = "pointer";
      let itm = characters.player.inventory[i];
      item.id = `invItem${i}`;
      let img = Create("img");
      img.src = `resources/images/items/${itm.img}.png`;
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
  Element("infoBox").style.transform = "scale(1)";
  Element("infoBox").textContent = "";
  let itm;
  if (e.target.id.length > 8) {
    itm = FindEquipment(e.target.id);
    Element("infoBox").style.top = `${e.target.parentElement.offsetTop}px`;
    Element("infoBox").style.left = `${e.target.parentElement.offsetLeft + 150}px`;
  }
  else {
    itm = characters.player.inventory[e.target.id.substring(7)];
    Element("infoBox").style.top = `${e.target.offsetTop}px`;
    Element("infoBox").style.left = `${e.target.offsetLeft + 585}px`;
  }
  Element("infoBox").innerHTML += `<h1>${itm.name}</h1>`
  if (FoundDesc(itm) != false) Element("infoBox").appendChild(HandleDescSyntax(FoundDesc(itm)));
  else if (debug) Element("infoBox").appendChild(HandleDescSyntax(`§/red/ERROR: DESCRIPTION NOT FOUND!§`));
  Element("infoBox").innerHTML += `<p>Price: ${itm.price}<span style="color: yellow">¤</span</p>
  <p>Amount: ${itm.amount}</p>
  <p>Level: ${itm.level}</p>
  `;
  if (itm.speed) Element("infoBox").innerHTML += `<p>Speed: <span style="color: ${speedColor(itm.speed)}">${itm.speed}</span></p>`
  if (itm.slot) Element("infoBox").innerHTML += `<p>Slot: ${itm.slot[0].toUpperCase()}${itm.slot.substring(1)}</p>`;
  if (itm.twohand) Element("infoBox").innerHTML += `<p style="color: orange">Two handed weapon!</p>`;
  if (itm.armor) {
    Element("infoBox").innerHTML += `<p id="defText">Defenses: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for (let text in itm.armor) {
        textElement += `<p style="color: ${colors[text]}">${text[0].toUpperCase()}${text.substring(1)}: <span>${itm.armor[text]}</span> </p>`;
      }
      return textElement;
    }
  }
  if (itm.dmg) {
    Element("infoBox").innerHTML += `<p id="defText">Damages: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for (let text of itm.dmg) {
        textElement += `<p style="color: ${colors[text.type]}">${text.type[0].toUpperCase()}${text.type.substring(1)}: <span>${text.value}</span> </p>`;
      }
      return textElement;
    }
    Element("infoBox").innerHTML += `<p>Total: ${totalDmg(itm.dmg)}</p>`
    function totalDmg(dmg) {
      let damage = 0;
      for (let value of dmg) {
        damage += value.value;
      }
      damage += " dmg";
      return damage;
    }
  }
}

function kassuStrat() {
  characters.player.inventory[1] = characters.player.equipment[2];
  CreateInv();
}

function HandleDescSyntax(text) {
  let content = text.split("§");
  let textContent = Create('div');
  for (let colors of content) {
    let color;
    let text;
    if (colors.indexOf("/") != -1) {
      color = colors.split("/")[1];
      text = colors.split("/")[2];
    } else if (text == undefined) text = colors;
    if (text == ":break") textContent.innerHTML += "<br>";
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
  Element("infoBox").style.transform = "scale(0)";
}

function CreateEquippedInventory() {
  Element("weaponSlot").innerHTML = "";
  Element("chestarmor").innerHTML = "";
  Element("helmet").innerHTML = "";
  Element("gloves").innerHTML = "";
  Element("feet").innerHTML = "";
  Element("shieldSlot").innerHTML = "";
  for (let item of characters.player.equipment) {
    if (GetWeapon() && item.dmg) {
      Element("weaponSlot").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
      Element(item.key).addEventListener("mouseenter", ShowItemInfo);
      Element(item.key).addEventListener("mouseleave", HideItemInfo);
    }
    else if (item.slot) {
      if (item.slot == "chest") Element("chestarmor").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (item.slot == "helmet") Element("helmet").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (item.slot == "gloves") Element("gloves").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (item.slot == "feet") Element("feet").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
      else if (item.slot == "shield") Element("shieldSlot").innerHTML = `<img src="resources/images/items/${item.img}.png" class="equippedItem" id="${item.key}">`;
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
  for (let eq of characters.player.equipment) {
    if (eq.key == key) {
      return eq;
    }
  }
  return false;
}

function UnequipArmor(e, slot) {
  if (e.shiftKey) {
    let copy = characters.player.equipment[GetArmorBySlot(slot)];
    characters.player.inventory.push(copy);
    characters.player.equipment.splice(GetArmorBySlot(slot), 1);
  }
  HideItemInfo();
  CreateEquippedInventory();
  CreateInv();
}

function UnequipArmorDBL(slot) {
  let copy = characters.player.equipment[GetArmorBySlot(slot)];
  characters.player.inventory.push(copy);
  characters.player.equipment.splice(GetArmorBySlot(slot), 1);
  HideItemInfo();
  CreateEquippedInventory();
  CreateInv();
}

function UnequipWeapon(e) {
  if (e.shiftKey) {
    let copy = GetWeapon();
    characters.player.inventory.push(copy);
    characters.player.equipment.splice(GetWeaponInt(), 1);
    HideItemInfo();
    CreateEquippedInventory();
    CreateInv();
  }
}

function UnequipWeaponDBL() {
  let copy = GetWeapon();
  characters.player.inventory.push(copy);
  characters.player.equipment.splice(GetWeaponInt(), 1);
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
        characters.player.equipment[GetWeaponInt()] = characters.player.inventory[int];
        characters.player.inventory[int] = copy;
      }
      else {
        characters.player.equipment.push(characters.player.inventory[int]);
        characters.player.inventory.splice(int, 1);
      }
    }
    else if (characters.player.inventory[int].slot) {
      let copy = characters.player.equipment[GetArmorBySlot(characters.player.inventory[int].slot)];
      if (GetArmorBySlot(characters.player.inventory[int].slot)) {
        characters.player.equipment[GetArmorBySlot(characters.player.inventory[int].slot)] = characters.player.inventory[int];
        characters.player.inventory[int] = copy;
      } else {
        characters.player.equipment.push(characters.player.inventory[int]);
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
      characters.player.equipment[GetWeaponInt()] = characters.player.inventory[int];
      characters.player.inventory[int] = copy;
    }
    else {
      characters.player.equipment.push(characters.player.inventory[int]);
      characters.player.inventory.splice(int, 1);
    }
  }
  else if (characters.player.inventory[int].slot) {
    let copy = characters.player.equipment[GetArmorBySlot(characters.player.inventory[int].slot)];
    if (GetArmorBySlot(characters.player.inventory[int].slot)) {
      characters.player.equipment[GetArmorBySlot(characters.player.inventory[int].slot)] = characters.player.inventory[int];
      characters.player.inventory[int] = copy;
    } else {
      characters.player.equipment.push(characters.player.inventory[int]);
      characters.player.inventory.splice(int, 1);
    }
  }
  CreateEquippedInventory();
  CreateInv();
}

function GetArmorBySlot(slot) {
  for (let i = 0; i < characters.player.equipment.length; i++) {
    if (characters.player.equipment[i].slot == slot) return i;
  }
  return false;
}

function GetWeapon() {
  for (let wep of characters.player.equipment) {
    if (wep.dmg) return wep;
  }
}

// Had to add this since the other ones weren't enough...
function THEREISWEAPON() {
  for (let wep of characters.player.equipment) {
    if (wep.dmg) return true;
  }
  return false;
}

function GetWeaponInt() {
  for (let i = 0; i < characters.player.equipment.length; i++) {
    if (characters.player.equipment[i].dmg) return i;
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
}

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
  console.log(arm);
}

CreateInv();