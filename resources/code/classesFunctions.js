
function StatsForCharacters(char) {
    char.stats.maxhp = char.baseStats.maxhp;
    char.stats.maxmana = char.baseStats.maxmana;
    for(let stat in char.class.baseStats) {
        char.stats[stat] = char.baseStats[stat] + char.class.baseStats[stat] + char.race.baseStats[stat];
    }
    char.stats.maxhp += IncMaxHP(char.stats);
    char.stats.maxmana += IncMaxMana(char.stats);
    if(char == global.equipping) {
        AddEffectsToCharacter();
        RunMods();
    }
    RunBuffsAndDebuffs(char);
    for(let stat in char.race.multipliers) {
        char.stats[stat] = Math.ceil(char.stats[stat] * char.race.multipliers[stat]);
    }
    if(char.stats.maxhp < 0) char.stats.maxhp = 0;
    if(char.stats.maxmana < 0) char.stats.maxmana = 0;
    CreatePortraits();
}

function RunBuffsAndDebuffs(char) {
    for(let stat in char.stats) {
        char.stats[stat] = Math.floor(char.stats[stat] * (1 + statModifiers(char, stat)));
    }
}

function statModifiers(char, stat) {
    let total = 0;
    for(let mod of char.modifiers) {
        if(mod.power) {
            for(let pow of mod.power) {
                if(pow.type == stat) {
                    total += pow.value/100;
                }
            }
        }
    }
    return total;
}

function BaseStats(char) {
    char.baseStats = {
        vig: 0,
        str: 0,
        dex: 0,
        agi: 0,
        wis: 0,
        int: 0,
        fth: 0,
        acc: 0,
        spd: 0,
        maxhp: CalculateHPFromLevelAndClass(char),
        maxmana: CalculateMPFromLevelAndClass(char)
    }
    for(let stat in char.baseStats) {
        if(stat == "hp" || stat == "maxhp" || stat == "mana" || stat == "maxmana") continue;
        char.baseStats[stat] += char.xp.level;
    }
}

function Restore(char, stat) {
    return char.stats[stat] = char.stats['max' + stat];
}

function IncMaxHP(stats) {
    let incVal = 0;
    for(let stat in stats) {
        if(stat == "vig") incVal += runStatsForDiminish(stats, "vig");
        else if(stat == "str") incVal += runStatsForDiminish(stats, "str");
        else if(stat == "agi") incVal += runStatsForDiminish(stats, "agi");
    }
    return incVal;
}

function runStatsForDiminish(stats, stat) {
    let total = 0;
    for(let i=0; i<stats[stat]; i++) {
        if(i < 89) {
            switch(stat) {
                case "vig" : total += 33; break;
                case "str" : total += 6; break;
                case "agi" : total += 2.5; break;
            }
        }
        else if(i < 179) {
            switch(stat) {
                case "vig" : total += 27; break;
                case "str" : total += 4.7; break;
                case "agi" : total += 2; break;
            }
        }
        else if(i < 329) {
            switch(stat) {
                case "vig" : total += 21; break;
                case "str" : total += 3.5; break;
                case "agi" : total += 1.1; break;
            }
        }
        else if(i < 489) {
            switch(stat) {
                case "vig" : total += 15; break;
                case "str" : total += 2; break;
                case "agi" : total += 0.4; break;
            }
        }
        else if(i < 659) {
            switch(stat) {
                case "vig" : total += 11; break;
                case "str" : total += 1; break;
            }
        }
        else if(i < 789) {
            switch(stat) {
                case "vig" : total += 7; break;
            }
        }
    }
    return Math.floor(total);
}

function IncMaxMana(stats) {
    let incVal = 0;
    for(let stat in stats) {
        if(stat == "wis") incVal += 25*stats[stat];
        else if(stat == "int") incVal += 5*stats[stat];
        else if(stat == "fth") incVal += 2*stats[stat];
    }
    return incVal;
}

function CalculateHPFromLevelAndClass(char) {
    return char.xp.level * (10 + char.class.bonusStats.hp);
}

function CalculateMPFromLevelAndClass(char) {
    return char.xp.level * (5 + char.class.bonusStats.mana);
}

function RunStatsAll() {
    BaseStats(characters.player);
    StatsForCharacters(characters.player);
    Restore(characters.player, 'hp');
    Restore(characters.player, 'mana');
    for(let char of characters.allies) {
        BaseStats(char);
        StatsForCharacters(char);
        Restore(char, 'hp');
        Restore(char, 'mana');
    }
    for(let char of characters.enemies) {
        BaseStats(char);
        StatsForCharacters(char);
        Restore(char, 'hp');
        Restore(char, 'mana');
    }
    for(let char of summons) {
        BaseStats(char);
        StatsForCharacters(char);
        Restore(char, 'hp');
        Restore(char, 'mana');
    }
    CreatePortraits();
}

RunStatsAll();