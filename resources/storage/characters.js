var player_name = "Henry the Harlot"; // Fallback name
var player_color = "rgb(100,100,100)";
var player_image = "portrait_player_temp";

class Actor {
  constructor(key, name, Class, equipment, color, image) {
    this.key = key,
      this.name = name,
      this.class = Class,
      this.equipment = equipment,
      this.color = color,
      this.image = image
  }
}

class Player extends Actor {
  constructor(Class, equipment, stats) {
    super("player", player_name, Class, equipment, player_color, player_image)
    this.stats = stats
  }
}

class Enemy extends Actor {
  constructor(key, name, Class, equipment, color, image, modifiers, abilities, statBonuses, level, stats) {
    super(key, name, Class, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities,
    this.statBonuses = statBonuses,
    this.level = level,
    this.stats = stats
  }
}

class Ally extends Actor {
  constructor(key, name, Class, equipment, color, image, modifiers, abilities, xp, stats) {
    super(key, name, Class, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities,
    this.xp = xp,
    this.stats = stats
  }
}


function LisaaJaPoista() {
  playerChar.equipment.splice(0, 1);
  playerChar.equipment.push(new Armor("basic_let_armor_1", "Rough Leather Armor", 50, 1, "chest", { slash: 5, blunt: 15, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }));
}

var characters = {
  player: new Player(CharClass("Warrior"),
    [
      AddItem("rusty_iron_sword")
    ], {}),
  allies: [
  ],
  enemies: [
  ]
}

characters.player.cords = { x: 8, y: 4 };
characters.player.map = "Forlorn Plains";
characters.player.lit = false;
characters.player.inventory = [
  AddItem("broken_iron_sword"),
  AddItem("broken_iron_dagger"),
  AddItem("rusty_iron_bastard_sword"),
  AddItem("leather_chest"),
  AddItem("leather_helmet"),
  AddItem("leather_gloves"),
  AddItem("leather_boots"),
  AddItem("magical_chestplate")
];
characters.player.xp = {points: 0, needed: 100, modifier: 1.00, level: 1};
characters.player.abilities = [Ability("fierce-assault")];
characters.player.spells = [Spell("mana-blast")];

characters.player.abilities[0].equipped = true;
characters.player.abilities[0].slot = 1;
characters.player.spells[0].equipped = true;
characters.player.spells[0].slot = 1;

function Ability(key) {
  for(let abi of abilities) {
    if(abi.key == key) return abi;
  }
}

function Spell(key) {
  for(let spell of spells) {
    if(spell.key == key) return spell;
  }
}
