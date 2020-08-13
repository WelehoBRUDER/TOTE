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