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
  Element("infoBox").style.top = `${e.target.offsetTop}px`;
  Element("infoBox").style.left = `${e.target.offsetLeft+100}px`;
  let itm = characters.player.inventory[e.target.id.substring(7)];
  Element("infoBox").innerHTML += `<h1>${itm.name}</h1>`
  Element("infoBox").innerHTML += `<p>Price: ${itm.price}<span style="color: yellow">¤</span</p>
  <p>Amount: ${itm.amount}</p>
  <p>Level: ${itm.level}</p>
  `;
  if(itm.speed) Element("infoBox").innerHTML += `<p>Speed: <span style="color: ${speedColor(itm.speed)}">${itm.speed}</span></p>`
  if(itm.slot) Element("infoBox").innerHTML += `<p>Slot: ${itm.slot[0].toUpperCase()}${itm.slot.substring(1)}</p>`;
  if(itm.twohand) Element("infoBox").innerHTML += `<p style="color: orange">Two handed weapon!</p>`;
  if(itm.armor) {
    Element("infoBox").innerHTML += `<p id="defText">Defenses: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for(let text in itm.armor) {
        textElement += `<p style="color: ${colors[text]}">${text[0].toUpperCase()}${text.substring(1)}: <span>${itm.armor[text]}</span> </p>`;
      }
      return textElement;
    }
  }
  if(itm.dmg) {
    Element("infoBox").innerHTML += `<p id="defText">Damages: </p>
    <div class="grid">${loop()}</div>
    `;
    function loop() {
      let textElement = "";
      for(let text of itm.dmg) {
        textElement += `<p style="color: ${colors[text.type]}">${text.type[0].toUpperCase()}${text.type.substring(1)}: <span>${text.value}</span> </p>`;
      }
      return textElement;
    }
    Element("infoBox").innerHTML += `<p>Total: ${totalDmg(itm.dmg)}</p>`
    function totalDmg(dmg) {
      let damage = 0;
      for(let value of dmg) {
        damage += value.value;
      }
      damage += " dmg";
      return damage;
    }
  }
  
}

function speedColor(speed) {
  if(speed > 0) {
    return "rgb(22, 196, 68)";
  }
  else if(speed == 0) {
    return "rgb(211, 214, 47)";
  }
  else {
    return "rgb(179, 16, 32)";
  }
}

function HideItemInfo() {
  Element("infoBox").style.transform = "scale(0)";
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

CreateInv();