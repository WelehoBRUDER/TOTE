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
  constructor(key, name, price, level) {
    this.key = key,
      this.name = name,
      this.price = price,
      this.level = level
  }
}

class Armor extends Item {
  constructor(key, name, price, level, slot, armor, speed) {
    super(key, name, price, level),
      this.slot = slot,
      this.armor = armor
    this.speed = speed
  }
}

class Weapon extends Item {
  constructor(key, name, price, level, twohand, dmg, speed) {
    super(key, name, price, level),
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
    new Stats(8624, 10, 5, 5, 5, 5, 5, 5, 5, 0),
    [
      new Weapon("basic_iron_sword_0", "Rusty Iron Sword", 10, 0, false, [{ type: "slash", value: 5 }, { type: "thrust", value: 2 }], -1),
      new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
    ]),
  allies: [
    new Actor("ally_healer_kyn", "Kynier Haleforth", "healer",
      new Stats(50, 15, 3, 3, 3, 7, 7, 7, 5, 1),
      [
        new Weapon("basic_iron_dagger_0", "Rusty Iron Dagger", 5, 0, false, [{ type: "slash", value: 3 }, { type: "thrust", value: 1 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "cyan", "portrait_kynier_temp")
  ],
  enemies: [
    new Actor("enemy_rogue_thief", "Thief", "rogue",
      new Stats(99999, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        new Weapon("basic_iron_dagger_0", "Rusty Iron Dagger", 5, 0, false, [{ type: "slash", value: 3 }, { type: "thrust", value: 1 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "red", "portrait_thief_temp"),
    new Actor("enemy_warrior_goblin", "Goblin", "warrior",
      new Stats(60, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        new Weapon("basic_iron_mace_0", "Rusty Iron Mace", 5, 0, false, [{ type: "blunt", value: 6 }], 1),
        new Armor("basic_let_armor_1", "Crude Leather Armor", 25, 0, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0)
      ], "green", "portrait_goblin_temp"),
  ]
}

// var characters = [
//   {
//     key: "player",
//     name: player_name,
//     class: "warrior",
//     stats: {
//       hp: 50,
//       mana: 10
//     },
//     equipment: [
//       {
//         key: "basic_let_armor_0",
//         name: "Crude Leather Armor",
//         price: 25,
//         level: 0,
//         slot: "chest",
//         armor: {
//           slash: 5,
//           blunt: 10,
//           thrust: 3,
//           fire: 2,
//           frost: 5,
//           wind: 5,
//           water: 4,
//           shock: 8,
//           light: 5,
//           dark: 5
//         },
//       }
//     ]
//   },
//   {
//     key: "allies",
//     actors: [
//       {
//         key: "ally_01",
//         name: "Kynier Haleforth",
//         class: "healer",
//         slot: "chest",
//         stats: {
//           hp: 50,
//           mana: 10
//         },
//         equipment: [
//           {
//             key: "basic_let_armor_1",
//             name: "Crude Leather Armor",
//             price: 25,
//             level: 0,
//             armor: {
//               slash: 5,
//               blunt: 10,
//               thrust: 3,
//               fire: 2,
//               frost: 5,
//               wind: 5,
//               water: 4,
//               shock: 8,
//               light: 5,
//               dark: 5
//             },
//           }
//         ]
//       }
//     ]
//   },
//   {
//     key: "enemies",
//     actors: [
//       {
//         key: "enemy_01",
//         name: "Thief",
//         class: "rogue",
//         stats: {
//           hp: 40,
//           mana: 0
//         },
//         equipment: [
//           {
//             key: "basic_let_armor_1",
//             name: "Crude Leather Armor",
//             slot: "chest",
//             price: 25,
//             level: 0,
//             armor: {
//               slash: 5,
//               blunt: 10,
//               thrust: 3,
//               fire: 2,
//               frost: 5,
//               wind: 5,
//               water: 4,
//               shock: 8,
//               light: 5,
//               dark: 5
//             },
//           }
//         ]
//       }
//     ]
//   }
// ];