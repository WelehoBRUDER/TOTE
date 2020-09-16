var player_name = "Hennri Bauer"; // Fallback name
var player_color = "rgb(100,100,100)";
var player_image = "portraits/portrait_player_temp";


class Actor {
  /**
 * Summary.
 *
 * Description.
 *
 * @param {String}  key           key is a short name used to identify the actor.
 * @param {String}  name          The actor's name, displayed to the user.
 * @param {Object}  race          Object detailing the actor's race.
 * @param {Object}  Class         Object detailing the actor's class.
 * @param {Array}   equipment     Actor's equipment, fill with item objects.
 * @param {String}  color         Actor color, used for actor name.
 * @param {String}  image         Path to the actor's portrait. 
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 */
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
  /**
 * @extends Actor
 */
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
      AddItem("rusty_iron_bastard_sword"),
      AddItem("broken_iron_shield"),
      AddItem("leather_chest"),
    ], {}, {objective: "him", possesive: "his", singular: "he"}),
  allies: [
    new Ally("christina_healer", "Christina Schutzengel", Race("Human"), CharClass("Healer"), [
      AddItem("wooden_healing_staff"),
      AddItem("leather_chest"),
    ], "gold", "portraits/portrait_white_mage_temp", [], [], {points: 0, needed: 100, modifier: 1.00, level: 1}, {},
    {objective: "her", possesive: "her", singular: "she"}, true)
  ],
  enemies: [
    new Enemy("goblin_simp", "Goblin Simp",  Race("Goblin"), CharClass("Warrior"), 
    [
      AddItem("wooden_club"),
      AddItem("leather_helmet"),
      AddItem("leather_chest"),
    ], "rgb(51, 102, 0)", "portraits/portrait_goblin_temp", [], [Ability("smash")], [], {level: 1},
    {}, {objective: "the simp", possesive: "its", singular: "the simp"}),

    new Enemy("goblin_queen", "Goblin Queen",  Race("Goblin Queen"), CharClass("Warrior"), 
    [
      AddItem("rusty_iron_bastard_sword"),
      AddItem("leather_helmet"),
      AddItem("leather_chest"),
    ], "rgb(34,139,34)", "portraits/portrait_goblin_queen", [], [], [], {level: 5},
    {}, {objective: "her majesty", possesive: "her majesty's", singular: "her majesty"}),

    new Enemy("goblin_king", "Goblin King",  Race("Goblin King"), CharClass("Brawler"), 
    [
      AddItem("rusty_iron_bastard_sword"),
      AddItem("leather_chest"),
      AddItem("leather_helmet"),
      AddItem("leather_gloves"),
      AddItem("leather_boots")
    ], "rgb(154,205,50)", "portraits/portrait_goblin_king", [], [], [], {level: 5},
    {}, {objective: "him", possesive: "his", singular: "he"}),
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

