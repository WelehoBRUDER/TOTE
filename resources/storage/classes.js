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
    },
    {
        key: "Healer",
        desc: "rgfgs",
        baseStats: new Stats(1,1,1,1,3,3,3,1,1),
        bonusStats: {hp: 20, mana: 30}
    },
    {
        key: "Rogue",
        desc: "emo",
        baseStats: new Stats(1,1,3,3,1,1,1,1,1),
        bonusStats: {hp:30, mana:20 }
    },
    {
        key: "Ranger",
        desc: "uwu",
        baseStats: new Stats(1,1,1,3,1,1,1,3,3),
        bonusStats: {hp: 40, mana: 10}
    },
    {
        key: "Brawler",
        desc: "heh lol piplip juo paljon",
        baseStats: new Stats(3,3,0,2,0,0,0,0,3),
        bonusStats: {hp: 75, mana: 5}
    },
    {
        key: "Necromancer",
        desc: "lol",
        baseStats: new Stats(1,1,3,1,3,3,0,1,1),
        bonusStats: {hp: 20, mana: 40}
    }
]

function CharClass(key) {
    for(let Class of Classes) {
        if(Class.key == key) return Class;
    }
}

