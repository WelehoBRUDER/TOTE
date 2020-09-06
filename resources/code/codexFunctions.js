var tagSearch = false;

Element("contentSearchbutton").style.backgroundImage = 'url("resources/images/icons/magnifying_glass_medium.png")';
Element("contentSearchtagtoggle").style.backgroundImage = 'url("resources/images/icons/tag_icon_medium.png")';
Element("content").style.backgroundImage = 'url("resources/images/bg/bg_gray.png")';
Element("contentScroller").style.backgroundImage = 'url("resources/images/bg/bg_red.png")';

function CreateCodex() {
  Element("content").textContent = "";
  Element("contentScroller").textContent = "";
  for (let cat of codex) {
    let catTitle = CreateText(cat.cat, "CodexCategories");
    let catArrow = CreateSpan("▶", "CodexArrows");
    catTitle.id = cat.cat + "Title";
    catArrow.id = cat.cat + "Button";
    catArrow.addEventListener("click", () => openSubCategories(cat.subcats, catArrow.id, catTitle.id));
    catTitle.onclick = ()=>renderCategoryContent(cat.cat, cat.text, cat.image);
    catTitle.appendChild(catArrow);
    Element("contentScroller").appendChild(catTitle);
  }
}

function openSubCategories(subcats, id, parent) {
  if (Element(id).textContent == "▶") {
    Element(id).textContent = "▼";
    let base = Create('div');
    base.id = id + "Base";
    Element(parent).appendChild(base);
    for (let subcat of subcats) {
      let catSubtitle = CreateText(subcat.subcat, "CodexSubcategories")
      let catSubarrow = CreateSpan("▶", "CodexArrowsSmall");
      catSubtitle.id = subcat.subcat + "Title";
      catSubarrow.id = subcat.subcat + "Button";
      catSubarrow.addEventListener("click", () => openEntityList(subcat.content, catSubarrow.id, catSubtitle.id));
      catSubtitle.onclick = function(e) {
        e.stopPropagation();
        renderCategoryContent(subcat.subcat, subcat.text, subcat.image);
      }
      catSubtitle.appendChild(catSubarrow);
      Element(base.id).appendChild(catSubtitle);
    }
  }
  else if (Element(id).textContent == "▼") {
    Element(id).textContent = "▶";
    Element(id + "Base").remove();
  }
}

function openEntityList(content, id, parent) {
  if (Element(id).textContent == "▶") {
    Element(id).textContent = "▼";
    let base = Create('div');
    base.id = id + "Base";
    Element(parent).appendChild(base);
    for (let entity of content) {
      let catEntity = CreateText(entity.key, "CodexEntities")
      catEntity.id = entity.key + "Entity";
      catEntity.style.textDecoration = "none";
      catEntity.onclick = function(e) {
        e.stopPropagation();
        FormCodexEntity(entity.key, entity.content, entity.tags, entity.image);
      }
      Element(base.id).appendChild(catEntity);
    }
  }
  else if (Element(id).textContent == "▼") {
    Element(id).textContent = "▶";
    Element(id + "Base").remove();
  }
}

function stop(e) {
  e.stopPropagation();
}

function createSearchedEntity(entity) {
  let catEntity = CreateText(entity.key, "CodexEntities")
  catEntity.id = entity.key + "SearchedEntity";
  catEntity.style.textDecoration = "none";
  catEntity.addEventListener("click", () => FormCodexEntity(entity.key, entity.content, entity.tags, entity.image));
  Element("contentScroller").appendChild(catEntity);
}

function FormCodexEntity(key, content, tags, image=null) {
  Element("content").textContent = "";
  Element("content").appendChild(CreateText(key, "CodexEntryTitle"));
  if((image == null || image == undefined) && debug) console.log('Entity' + `%c ${key}`, 'color: yellow;', 'has no image, if this is intentional, ignore this message.');
  Element("content").appendChild(ReadContent(content, image));
  if(tags != undefined) {
    let tagsText = "Tags: ";
    for (let tag of tags) {
      tagsText += tag.tag + ", ";
    }
    tagsText = tagsText.substring(0, tagsText.length - 2);
    Element("content").appendChild(CreateText(tagsText, "CodexEntities"));
  } else {
    if(debug) console.log('Entity' + `%c ${key}`, 'color: yellow;', 'has no tags, consider adding some to make searching easier');
  }

}

function CreateCodexImage(src) {
  let image = Create("img");
  let srcOf = src.split("|");
  image.classList.add("codexImage");
  if(imageExists(`resources/images/${srcOf[0]}.png`)) {
    image.src = `resources/images/${srcOf[0]}.png`;
  } else {
    image.src = imgMissing(srcOf[0])
  }
  image.style.borderColor = srcOf[1];
  image.style.boxShadow = `-2px 6px 4px 1px ${srcOf[2]}`;
  return image;
}

function renderCategoryContent(key, content, image) {
  Element("content").textContent = "";
  if((image == null || image == undefined) && debug) console.log('Entity' + `%c ${key}`, 'color: yellow;', 'has no image, if this is intentional, ignore this message.');
  Element("content").appendChild(CreateText(key, "CodexEntryTitle"));
  if(content) {
    Element("content").appendChild(ReadContent(content, image));
  }
  else if(debug) console.log('Entity' + `%c ${key}`, 'color: yellow;','has no text content, if this is intentional, ignore this message.');
}

function getMark(mark) {
  let result = "";
  if(mark.indexOf("s") != -1) {
    let size = mark.split("s")[1];
    result = ` font-size: ${size}px;`;
  }
  if(mark.indexOf("lg") != -1) {
    let amount = mark.split("lg")[1];
    result = ` letter-spacing: ${amount}px;`;
  }
  switch(mark) {
    case "B": result = " font-family: RobotoBold;"; break;
    case "BB": result = " font-family: RobotoBolder;"; break;
    case "M": result = " font-family: RobotoMedium;"; break;
    case "E": result = " font-family: Roboto;"; break;
    case "LL": result = " font-family: RobotoThin;"; break;
    case "I": result = " font-style: italic;"; break;
    case "OL": result = " text-decoration: overline;"; break;
    case "LT": result = " text-decoration: line-through;"; break;
  }
  return result;
}

function ReadContent(text, image) {
  let content = text.split("§");
  let textContent = Create('div');
  textContent.id = "CodexBaseText";
  if(image != null && image != undefined) textContent.appendChild(CreateCodexImage(image));
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
    if (colors.indexOf("%") != -1) {
      img = colors.split("%")[1];
      text = colors.split("%")[2];
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


function ToggleTags() {
  if (!tagSearch) {
    tagSearch = true;
    Element("contentSearchtagtoggle").style.boxShadow = "inset 0 0 10px 5px rgb(70, 69, 69), 0 0 2px 2px rgb(39, 201, 93)";
  } else if (tagSearch) {
    tagSearch = false;
    Element("contentSearchtagtoggle").style.boxShadow = "inset 0 0 10px 5px rgb(70, 69, 69), 0 0 2px 2px black";
  }
}

function SearchEntities() {
  if (Element('contentSearchfield').value == "") return CreateCodex();
  let searchValue = Element('contentSearchfield').value.toLowerCase();
  Element("contentScroller").textContent = "";
  for (let cats of codex) {
    for (let subcats of cats.subcats) {
      for (let content of subcats.content) {
        if (tagSearch == true && content.tags) {
          for (let tag of content.tags) {
            if (searchValue.length < 3) {
              if (tag.tag.startsWith(searchValue)) {
                createSearchedEntity(content);
              }
            } else {
              if (tag.tag.indexOf(searchValue) != -1) {
                createSearchedEntity(content);
              }
            }
          }
        } else if (tagSearch == false) {
          if (searchValue.length < 3) {
            if (content.key.toLowerCase().startsWith(searchValue)) {
              createSearchedEntity(content);
            }
          } else {
            if (content.key.toLowerCase().indexOf(searchValue) != -1) {
              createSearchedEntity(content);
            }
          }
        }
      }
    }
  }
}

CreateCodex();