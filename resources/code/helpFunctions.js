const deepCopy = o => JSON.parse(JSON.stringify(o));

function Element(elem) {
  return document.getElementById(elem);
}

function Create(elem) {
  return document.createElement(elem);
}

function CreateText(text, style) {
  let Text = Create("p");
  Text.textContent = text;
  Text.classList.add(style);
  return Text;
}

function CreateSpan(text, style) {
  let Span = Create("span");
  Span.textContent = text;
  Span.classList.add(style);
  return Span;
}

function Random(max, min = 0) {
  return Math.floor((Math.random() * max - min) + min);
}

function PercentOf(value, max) {
  return Math.ceil(max * (value / 100));
}

function GetCodexEntity(cat, subcat, key) {
  for (let cats of codex) {
    if (cats.cat == cat) {
      for (let subcats of cats.subcats) {
        if (subcats.subcat == subcat) {
          for (let entity of subcats.content) {
            if (entity.key == key) {
              return FormCodexEntity(entity.key, entity.content, entity.tags);
            }
          }
        }
      }
    }
  }
}

function imgMissing(src) {
  if (debug) console.log('Image' + `%c ${src}`, 'color: yellow', 'was broken. Replaced with missing image.');
  return "resources/images/events/missing_image.png";
}

function imageExists(image_url) {

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;

}

function CHAR(key) {
  if (key == characters.player.key) return characters.player;
  else {
    for (let char of characters.allies) {
      if (char.key == key) return char;
    }
  }

  for (let char of characters.enemies) {
    if (char.key == key) return char;
  }
}

function CHARNAME(key) {
  if (key == characters.player.key) return characters.player.name;
  else {
    for (let char of characters.allies) {
      if (char.key == key) return char.name;
    }
  }
  for (let char of characters.enemies) {
    if (char.key == key) return char.name;
  }
}

function CHARCOLOR(key) {
  if (key == characters.player.key) return characters.player.color;
  else {
    for (let char of characters.allies) {
      if (char.key == key) return char.color;
    }
  }
  for (let char of characters.enemies) {
    if (char.key == key) return char.color;
  }
}

function draggableElement(elem) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (Element(elem.id + "Draggable")) {
    Element(elem.id + "Draggable").addEventListener("mousedown", (e) => dragMousedown(e, elem));
    Element(elem.id + "Draggable").addEventListener("mouseup", ()=>elem.style.zIndex=50);
  } else if (!Element(elem.id + "Draggable")) {
    elem.addEventListener("mousedown", (e) => dragMousedown(e, elem));
    elem.addEventListener("mouseup", ()=>elem.style.zIndex=50);
  }
}

function dragMousedown(event, element) {
  element.style.zIndex = 99;
  pos3 = event.clientX;
  pos4 = event.clientY;
  document.onmouseup = closeDrag;
  document.onmousemove = (e) => dragElement(e, element);
}

function dragElement(event, element) {
  pos1 = pos3 - event.clientX;
  pos2 = pos4 - event.clientY;
  pos3 = event.clientX;
  pos4 = event.clientY;
  element.style.top = Math.clamp(pxtovh(element.offsetTop - pos2), pxtovh(element.offsetHeight) / 2, (100 - pxtovh(element.offsetHeight) / 2)) + "vh";
  element.style.left = Math.clamp(pxtovw(element.offsetLeft - pos1), pxtovw(element.offsetWidth) / 2, (100 - pxtovw(element.offsetWidth) / 2)) + "vw";
}

Math.clamp = (val, min, max) => Math.min(Math.max(val, min), max)

function closeDrag() {
  document.onmouseup = null;
  document.onmousemove = null;
}

const pxtovh = v => v / document.documentElement.clientHeight * 100;
const pxtovw = v => v / document.documentElement.clientWidth * 100;

// function imageExists(image_url){
//   var req = new Request(image_url, {method: "HEAD"});
//   fetch(req).then((res)=>{return res.status != 404});
// }
// Enable debug mode, adding more dev options and displaying errors.
let debug = true;