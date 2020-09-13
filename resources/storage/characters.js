var player_name = "Hennri Bauer"; // Fallback name
var player_color = "rgb(100,100,100)";
var player_image = "portraits/portrait_player_temp";

class Actor {
  constructor(key, name, race, Class, equipment, color, image) {
    this.key = key,
      this.name = name,
      this.race = race,
      this.class = Class,
      this.equipment = equipment,
      this.color = color,
      this.image = image
  }
}

class Player extends Actor {
  constructor(Class, equipment, stats, pron) {
    super("player", player_name, Race("Human"), Class, equipment, player_color, player_image)
    this.stats = stats
    this.pron = pron
  }
}

class Enemy extends Actor {
  constructor(key, name, race, Class, equipment, color, image, modifiers, abilities, statBonuses, xp, stats, pron) {
    super(key, name, race, Class, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities,
    this.statBonuses = statBonuses,
    this.xp = xp,
    this.stats = stats,
    this.pron = pron
  }
}

class Ally extends Actor {
  constructor(key, name, race, Class, equipment, color, image, modifiers, abilities, xp, stats, pron, ai) {
    super(key, name, race, Class, equipment, color, image),
    this.modifiers = modifiers,
    this.abilities = abilities,
    this.xp = xp,
    this.stats = stats,
    this.pron = pron,
    this.ai = ai
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
    ], {}, {objective: "him", possesive: "his", singular: "he"}),
  allies: [
    new Ally("christina_healer", "Christina Schutzengel", Race("Human"), CharClass("Healer"), [
      AddItem("broken_iron_dagger")
    ], "gold", "portraits/portrait_white_mage_temp", [], [], {points: 0, needed: 100, modifier: 1.00, level: 1}, {},
    {objective: "her", possesive: "her", singular: "she"}, true)
  ],
  enemies: [
    new Enemy("goblin_simp", "Goblin Simp",  Race("Goblin"), CharClass("Warrior"), 
    [
      AddItem("broken_iron_sword")
    ], "rgb(51, 102, 0)", "portraits/portrait_goblin_temp", [], [Ability("fierce-assault")], [], {level: 1},
    {}, {objective: "him", possesive: "his", singular: "he"}),
    new Enemy("goblin_queen", "Goblin Queen",  Race("Goblin Queen"), CharClass("Warrior"), 
    [
      AddItem("broken_iron_sword")
    ], "rgb(51, 102, 0)", "portraits/portrait_goblin_queen", [], [], [], {level: 5},
    {}, {objective: "her", possesive: "her", singular: "she"}),
    new Enemy("goblin_king", "Goblin King",  Race("Goblin King"), CharClass("Brawler"), 
    [
      AddItem("broken_iron_sword")
    ], "rgb(51, 102, 0)", "portraits/portrait_goblin_king", [], [], [], {level: 5},
    {}, {objective: "him", possesive: "his", singular: "he"})
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
characters.player.abilities = [Ability("fierce-assault"), Ability("shield-bash")];
characters.player.spells = [Spell("mana-blast")];

characters.player.abilities[0].equipped = true;
characters.player.abilities[0].slot = 1;
characters.player.abilities[1].equipped = true;
characters.player.abilities[1].slot = 4;
characters.player.spells[0].equipped = true;
characters.player.spells[0].slot = 1;

