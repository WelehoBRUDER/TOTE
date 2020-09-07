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

function GetCodexEntity(cat, subcat, key) {
  for(let cats of codex) {
    if(cats.cat == cat) {
      for(let subcats of cats.subcats) {
        if(subcats.subcat == subcat) {
          for(let entity of subcats.content) {
            if(entity.key == key) {
              return FormCodexEntity(entity.key, entity.content, entity.tags);
            }
          }
        }
      }
    }
  }
}

function imgMissing(src) {
  if(debug) console.log('Image' + `%c ${src}`, 'color: yellow', 'was broken. Replaced with missing image.');
  return "resources/images/events/missing_image.png";
}

function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;

}

const CHAR = function(key) {
  if(key == characters.player.key) return characters.player;
  else {
    for(let char of characters.allies) {
      if(char.key == key) return char;
    }
  }

    for(let char of characters.enemies) {
      if(char.key == key) return char;
  }
}

// function imageExists(image_url){
//   var req = new Request(image_url, {method: "HEAD"});
//   fetch(req).then((res)=>{return res.status != 404});
// }
// Enable debug mode, adding more dev options and displaying errors.
let debug = true;