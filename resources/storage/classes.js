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

const Races = [
    {
        key: "Human",
        desc: "Humans are natural predators equipped with tremendous endurance and vitality, seemingly incapable of dying from severe injuries and chasing their goal with such strength and determination that a horde of humans seems like an unstoppable wave, capable of sweeping all that stand in front of them.",
        baseStats: new Stats(2, 0, 1, 1, 0, 1, 0, 2, -1),
        multipliers: {
        },
        xpReward: 50,
    },
    {
        key: "Goblin",
        desc: "Goblins are nimble creatures of short stature that possess low intelligence, strength and constitution.",
        baseStats: new Stats(-1, -1, 3, 3, -1, -1, -1, 0, 1),
        multipliers: {
            maxhp: 0.28,
            maxmana: 0.75
        },
        xpReward: 20
    },
    {
        key: "Goblin Queen",
        desc: "Queens are alpha females of the goblin family, ruling over clans alongside their equals - the goblin kings.",
        baseStats: new Stats(2, 2, 5, 5, 3, 3, 3, 5, 4),
        multipliers: {
            maxhp: 0.67,
            maxmana: 0.91
        },
        xpReward: 80
    },
    {
        key: "Goblin King",
        desc: "Kings are alpha males of the goblin family, ruling over clans alongside their equals - the goblin queens.",
        baseStats: new Stats(5, 5, 2, 2, 2, 1, 0, 1, 1),
        multipliers: {
            maxhp: 0.92,
            maxmana: 0.74
        },
        xpReward: 80
    }
]

const Classes = [
    {
        key: "Warrior",
        desc: "yes this is desc idk",
        baseStats: new Stats(3, 3, 1, 1, 1, 1, 1, 1, 1),
        bonusStats: {hp: 50, mana: 0},
        threat: 25,
        role: "offense",
        abilities: [
            Ability("fierce-assault"),
            Ability("shield-bash")
        ]
    },
    {
        key: "Healer",
        desc: "rgfgs",
        baseStats: new Stats(1,1,1,1,3,3,3,1,1),
        bonusStats: {hp: 20, mana: 30},
        threat: -25,
        role: "support"
    },
    {
        key: "Rogue",
        desc: "emo",
        baseStats: new Stats(1,1,3,3,1,1,1,1,1),
        bonusStats: {hp:30, mana:20 },
        threat: 10
    },
    {
        key: "Ranger",
        desc: "uwu",
        baseStats: new Stats(1,1,1,3,1,1,1,3,3),
        bonusStats: {hp: 40, mana: 10},
        threat: 10
    },
    {
        key: "Brawler",
        desc: "heh lol piplip juo paljon",
        baseStats: new Stats(3,3,0,2,0,0,0,0,3),
        bonusStats: {hp: 75, mana: 5},
        threat: 40,
        role: "offense"
    },
    {
        key: "Necromancer",
        desc: "lol",
        baseStats: new Stats(1,1,3,1,3,3,0,1,1),
        bonusStats: {hp: 20, mana: 40},
        threat: 10
    }
]

function CharClass(key) {
    for(let Class of Classes) {
        if(Class.key == key) return Class;
    }
}

function Race(key) {
    for(let Race of Races) {
        if(Race.key == key) return Race;
    }
}



