var player_name = "Adventurer Avanti"; // Fallback name
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

class Item {
  constructor(key, name, price, level, img, amount) {
    this.key = key,
      this.name = name,
      this.price = price,
      this.level = level,
      this.img = img,
      this.amount = amount
  }
}

class Armor extends Item {
  constructor(key, name, price, level, img, amount, slot, armor, speed) {
    super(key, name, price, level, img, amount),
      this.slot = slot,
      this.armor = armor,
      this.speed = speed
  }
}

class Weapon extends Item {
  constructor(key, name, price, level, img, amount, twohand, dmg, speed) {
    super(key, name, price, level, img, amount),
      this.twohand = twohand,
      this.dmg = dmg,
      this.speed = speed
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
      new Weapon("basic_iron_sword_0", "Rusty Iron Sword", 10, 0, "rusty_iron_sword_1", 1, false, [{ type: "slash", value: 5 }, { type: "thrust", value: 2 }], -1),
      new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "rusty_iron_ring_1", 1, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
    ]),
  allies: [
    new Actor("ally_healer_kyn", "Kynier Haleforth", "healer",
      new Stats(50, 15, 3, 3, 3, 7, 7, 7, 5, 1),
      [
        new Weapon("basic_iron_dagger_0", "Rusty Iron Dagger", 5, 0, "rusty_iron_ring_1", 1, false, [{ type: "slash", value: 3 }, { type: "thrust", value: 1 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "rusty_iron_ring_1", 1, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "cyan", "portrait_kynier_temp")
  ],
  enemies: [
    new Actor("enemy_rogue_thief", "Thief", "rogue",
      new Stats(45, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        new Weapon("basic_iron_dagger_0", "Rusty Iron Dagger", 5, 0, "rusty_iron_ring_1", 1, false, [{ type: "slash", value: 3 }, { type: "thrust", value: 1 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "rusty_iron_ring_1", 1, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "red", "portrait_thief_temp"),
    new Actor("enemy_warrior_goblin", "Goblin", "warrior",
      new Stats(60, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        new Weapon("basic_iron_mace_0", "Rusty Iron Mace", 5, 0, "rusty_iron_ring_1", 1, false, [{ type: "blunt", value: 6 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "rusty_iron_ring_1", 1, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "green", "portrait_goblin_temp"),
  ]
}

characters.player.cords = { x: 8, y: 4 };
characters.player.map = "Forlorn Plains";
characters.player.lit = false;
characters.player.inventory = [
  new Weapon("broken_iron_sword_0", "Broken Iron Sword", 30, 1, "rusty_iron_sword_1", 1, false, [{ type: "slash", value: 4 }, { type: "thrust", value: 1 }], -1),
  new Armor("broken_iron_shield_0", "Broken Iron Shield", 20, 1, "rusty_iron_shield_1", 1, "shield", { slash: 7, blunt: 6, thrust: 6, fire: 4, frost: 4, wind: 4, water: 4, shock: 1, light: 3, dark: 3 }, -1),
  new Item("rusty_iron_ring_0", "Rusty Iron Ring", 15, 1, "rusty_iron_ring_1", 3)
];
