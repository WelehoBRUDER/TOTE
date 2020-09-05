var player_name = "Henry the Harlot"; // Fallback name
var player_color = "rgb(100,100,100)";
var player_image = "portrait_player_temp";

class Actor {
  constructor(key, name, classvar, stats, equipment, color, image) {
    this.key = key,
      this.name = name,
      this.class = classvar,
      this.stats = stats,
      this.equipment = equipment,
      this.color = color,
      this.image = image
  }
}

class Player extends Actor {
  constructor(classvar, stats, equipment) {
    super("player", player_name, classvar, stats, equipment, player_color, player_image)
  }
}

class Enemy extends Actor {
  constructor(key, name, classvar, stats, equipment, color, image, modifiers, abilities) {
    super(key, name, classvar, stats, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities
  }
}

class Ally extends Actor {
  constructor(key, name, classvar, stats, equipment, color, image, modifiers, abilities, xp) {
    super(key, name, classvar, stats, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities,
    this.xp = xp
  }
}

class Stats {
  constructor(hp, mana, str, dex, agi, wis, int, fth, acc, spd) {
    this.hp = hp,
      this.mana = mana,
      this.str = str,
      this.dex = dex,
      this.agi = agi,
      this.wis = wis,
      this.int = int,
      this.fth = fth,
      this.acc = acc,
      this.spd = spd
  }
}


function LisaaJaPoista() {
  playerChar.equipment.splice(0, 1);
  playerChar.equipment.push(new Armor("basic_let_armor_1", "Rough Leather Armor", 50, 1, "chest", { slash: 5, blunt: 15, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }));
}

var characters = {
  player: new Player("warrior",
    new Stats(100, 10, 5, 5, 5, 5, 5, 5, 5, 0),
    [
      AddItem("rusty_iron_sword")
    ]),
  allies: [
    new Ally("ally_healer_christina", "Christina Schutzengel", "healer", 
    new Stats(60, 20, 3, 3, 3, 7, 7, 7, 5, 1), 
    [
      AddItem("broken_iron_dagger")
    ], "gold", "portrait_white_mage_temp", [], [], {points: 0, needed: 100, modifier: 1.00})
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
characters.player.xp = {points: 0, needed: 100, modifier: 1.00};
