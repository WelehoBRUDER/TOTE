class Stats {
    constructor(vig, str, dex, agi, wis, int, fth, acc, spd) {
    this.vig = vig,
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

const Classes = [
    {
        key: "Warrior",
        desc: "yes this is desc idk",
        baseStats: new Stats(3, 3, 1, 1, 1, 1, 1, 1),
        bonusStats: {hp: 50, mana: 0}
    }
]

function CharClass(key) {
    for(let Class of Classes) {
        if(Class.key == key) return Class;
    }
}

