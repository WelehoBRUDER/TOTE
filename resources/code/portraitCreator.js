function CreatePortrait(character) {
  let portrait = Create('div');
  portrait.id = character.key + "_Portrait";
  let name = character.name;
  console.log(name.length);
  if (name.length > 18) {
    name = name.substring(0, 17);
    name += "...";
  }
  portrait.innerHTML = `
    <div class="portrait_background">
      <p class="portrait_title">${name}</p>
      <img src="resources/images/portraits/${character.image}.png" class="portrait_image">
      <div class="hpbarbg"></div>
      <div class="hpbarfill"></div>
      <div class="mpbarbg"></div>
      <div class="mpbarfill"></div>
      <div class="statusEffects"></div>
    </div>
  `;
  Element("allyportraits").appendChild(portrait);
}

CreatePortrait(characters.player);
CreatePortrait(characters.allies[0]);
CreatePortrait(characters.enemies[0]);

// <div class="portrait_background">
//   <div class="hpbarbg"></div>
//   <div class="hpbarfill"></div>
//   <div class="mpbarbg"></div>
//   <div class="mpbarfill"></div>
//   <img src="resources/images/portraits/${character.image}.png" class="portrait_image">
//   <img src="resources/images/icons/${character.class}_icon.png" class="portrait_class">
//   </div>