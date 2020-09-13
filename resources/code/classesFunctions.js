
function StatsForCharacters(char) {
    char.stats.maxhp = CalculateHPFromLevelAndClass(char);
    char.stats.maxmana = CalculateMPFromLevelAndClass(char);
    for(let stat in char.class.baseStats) {
        char.stats[stat] = char.class.baseStats[stat];
    }
    for(let stat in char.race.baseStats) {
        char.stats[stat] += char.race.baseStats[stat];
    }
    char.stats.maxhp += IncMaxHP(char.stats);
    char.stats.maxmana += IncMaxMana(char.stats);
    for(let stat in char.race.multipliers) {
        char.stats[stat] = Math.ceil(char.stats[stat] * char.race.multipliers[stat]);
    }
    char.stats.hp = char.stats.maxhp;
    char.stats.mana = char.stats.maxmana;
}

function IncMaxHP(stats) {
    let incVal = 0;
    for(let stat in stats) {
        if(stat == "vig") incVal += 25*stats[stat];
        else if(stat == "str") incVal += 10*stats[stat];
        else if(stat == "agi") incVal += 5*stats[stat];
    }
    return incVal;
}

function IncMaxMana(stats) {
    let incVal = 0;
    for(let stat in stats) {
        if(stat == "wis") incVal += 25*stats[stat];
        else if(stat == "int") incVal += 10*stats[stat];
        else if(stat == "fth") incVal += 5*stats[stat];
    }
    return incVal;
}

function CalculateHPFromLevelAndClass(char) {
    return char.xp.level * (50 + char.class.bonusStats.hp);
}

function CalculateMPFromLevelAndClass(char) {
    return char.xp.level * (20 + char.class.bonusStats.mana);
}

function RunStatsAll() {
    StatsForCharacters(characters.player);
    for(let char of characters.allies) {
        StatsForCharacters(char);
    }
    for(let char of characters.enemies) {
        StatsForCharacters(char);
    }
    CreatePortraits();
}

RunStatsAll();