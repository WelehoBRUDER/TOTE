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

// Enable debug mode, adding more dev options and displaying errors.
let debug = true;