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

class Equipment extends Item {
  constructor(key, name, price, level, img, amount, grade) {
    super(key, name, price, level, img, amount),
    this.grade = grade
  }
}

class Armor extends Equipment {
  constructor(key, name, price, level, img, amount, grade, slot, armor, speed, effects) {
    super(key, name, price, level, img, amount, grade),
      this.slot = slot,
      this.armor = armor,
      this.speed = speed,
      this.effects = effects
  }
}

class Weapon extends Equipment {
  constructor(key, name, price, level, img, amount, grade, twohand, dmg, speed, effects) {
    super(key, name, price, level, img, amount, grade),
      this.twohand = twohand,
      this.dmg = dmg,
      this.speed = speed,
      this.effects = effects
  }
}

class Effect {
  constructor(key, type, action, value) {
    this.key = key,
    this.type = type,
    this.action = action,
    this.value = value
  }
}

function AddItem(key) {
  let copy;
  for(let item of items) {
    if(item.key == key) copy = JSON.parse(JSON.stringify(item));
  }
  return copy;
}

const items = [
  new Weapon("broken_iron_sword", "Broken Iron Sword", 10, 1, "items/broken_iron_sword_1", 1, 1, false, [{ type: "slash", value: 4 }, { type: "thrust", value: 1 }], -1),
  new Weapon("wooden_club", "Wooden Club", 10, 1, "items/wooden_club", 1, 1, false, [{ type: "blunt", value: 5 }], -1),
  new Weapon("rusty_iron_sword", "Rusty Iron Sword", 25, 1, "items/rusty_iron_sword_1", 1, 1, false, [{type: "slash", value: 6}, {type: "thrust", value: 2}], -1),
  new Weapon("broken_iron_dagger", "Broken Iron Dagger", 8, 1, "items/rusty_iron_sword_1", 1, 1, false, [{type: "slash", value: 3}, {type: "thrust", value: 1}], 1),
  new Weapon("rusty_iron_bastard_sword", "Rusty Bastard Sword", 40, 1, "items/rusty_iron_sword_1", 1, 1, true, [{type: "slash", value: 8}, {type: "thrust", value: 3}], -2),
  new Armor("broken_iron_shield", "Broken Iron Shield", 10, 1, "items/broken_iron_shield_1", 1, 1, "shield", { slash: 52, blunt: 49, thrust: 50, fire: 26, frost: 17, wind: 61, water: 39, shock: 11, light: 15, dark: 14 }, -1),
  new Armor("leather_chest", "Leather Chestplate", 15, 1, "items/leather_chestplate", 1, 1, "chest", { slash: 5, blunt: 10, thrust: 3, fire: 2, frost: 5, wind: 5, water: 4, shock: 8, light: 5, dark: 5 }, 0),
  new Armor("leather_helmet", "Leather Helmet", 10, 1, "items/leather_helmet", 1, 1, "helmet", { slash: 3, blunt: 6, thrust: 2, fire: 2, frost: 3, wind: 4, water: 2, shock: 3, light: 4, dark: 4 }, 0),
  new Armor("leather_gloves", "Leather Gloves", 10, 1, "items/leather_gloves", 1, 1, "gloves", { slash: 2, blunt: 4, thrust: 1, fire: 2, frost: 2, wind: 3, water: 1, shock: 2, light: 3, dark: 2 }, 0),
  new Armor("leather_boots", "Leather Boots", 12, 1, "items/leather_boots", 1, 1, "feet", { slash: 4, blunt: 5, thrust: 2, fire: 2, frost: 4, wind: 4, water: 4, shock: 5, light: 5, dark: 5 }, 0, [new Effect("hinc_mp_10", "maxmana", "increase", 10)]),
  new Armor("magical_chestplate", "Magical Chestplate", 500, 5, "items/rusty_iron_ring_1", 1, 8, "chest", {slash: 40, blunt: 50, thrust: 20, fire: 20, frost: 40, wind: 40, water: 40, shock: 50, light: 50, dark: 50}, 3, [new Effect("inc_str_5", "str", "increase", 5), new Effect("inc_hp_125", "maxhp", "increase", 125), new Effect("inc_mp_150", "maxmana", "increase", 150)])
];



