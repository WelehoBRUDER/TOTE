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
    new Actor("ally_healer_kyn", "Kynier Haleforth", "healer",
      new Stats(50, 15, 3, 3, 3, 7, 7, 7, 5, 1),
      [
        AddItem("broken_iron_dagger"),
        AddItem("leather_chest"),
      ], "cyan", "portrait_kynieer_temp"),
    new Actor("ally_ranger_tontu", "Tontu Waldbruder", "ranger",
    new Stats(60, 10, 3, 6, 6, 5, 5, 4, 7, 2),
    [
      AddItem("broken_iron_dagger")
    ], "lime", "portrait_tontu_temp")
  ],
  enemies: [
    new Actor("enemy_rogue_thief", "Thief", "rogue",
      new Stats(45, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        AddItem("broken_iron_dagger"),
        AddItem("leather_chest"),
      ], "red", "portrait_thief_temp"),
    new Actor("enemy_warrior_goblin", "Goblin", "warrior",
      new Stats(60, 5, 5, 5, 5, 5, 5, 5, 5, 0),
      [
        AddItem("rusty_iron_bastard_sword"),
        AddItem("leather_chest"),
      ], "green", "portrait_goblin_temp"),
    new Actor("enemy_main_villain", "Viktor Stahlhelm", "warlock", 
      new Stats(6000, 4000, 80, 80, 60, 95, 95, 100, 70, 5),
      [
        AddItem("broken_iron_dagger")
      ], "black", "portrait_bigbad_temp"),
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
