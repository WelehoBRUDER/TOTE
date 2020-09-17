

function CalculateDamage(damage, armor, type) {
    let newDamage = Math.ceil(damage * (1 +  (global.combat.actor.stats.str / 25 + global.combat.actor.stats.dex / 50)));
    newDamage = Math.ceil(newDamage - (newDamage * (armor/100)));
    newDamage = defenseModifiers(global.combat.target, type, newDamage);
    return newDamage;
}

function defenseModifiers(char, type, dmg) {
    let newDamage = dmg;
    for(let mod of char.modifiers) {
        if(mod.power) {
            for(let power of mod.power) {
                if(power.type == "defense") newDamage -= newDamage * (power.value/100);
                else if(power.type == type) newDamage -= newDamage * (power.value/100);
            }
        }
    }
    return Math.ceil(newDamage);
}

function PowerAtk(power) {
    global.combat.blocked = false;
    if(AttackMissed()) return "miss";
    let totalDamage = 0;
    if(AttackBlocked()) {
        global.combat.blocked = true;
        for(let weapon of global.combat.actor.equipment) {
            if(weapon.dmg) {
                for(let dmg of weapon.dmg) {
                    let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
                    let armour = global.combat.target.armor[dmg.type] - percentage;
                    let dmgIncrease = dmg.value * (power.multiplier/100);
                    totalDamage += CalculateDamage(dmgIncrease, armour, dmg.type) * targetBlock(dmg.type);
                }
            }
        }
    }
    else {
        for(let weapon of global.combat.actor.equipment) {
            if(weapon.dmg) {
                for(let dmg of weapon.dmg) {
                    let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
                    let armour = global.combat.target.armor[dmg.type] - percentage;
                    let dmgIncrease = dmg.value * (power.multiplier/100);
                    totalDamage += CalculateDamage(dmgIncrease, armour, dmg.type);
                }
            }
        }
    }
    return Math.ceil(totalDamage);
}

function targetBlock(type) {
    for(let eq of global.combat.target.equipment) {
        if(eq.slot == "shield") {
            for(let armor in eq.armor) {
                if(armor == type) return eq.armor[armor]/100;
            }
        }
    }
}

function Summoning(char) {
    let copy = JSON.parse(JSON.stringify(char));
    return copy;
}

function RegularAttack() {
    global.combat.blocked = false;
    let totalDamage = 0;
    if(AttackMissed()) return "miss";
    if(AttackBlocked()) {
        global.combat.blocked = true;
        for(let weapon of global.combat.actor.equipment) {
            if(weapon.dmg) {
                for(let dmg of weapon.dmg) {
                    let armour = global.combat.target.armor[dmg.type];
                    totalDamage += (CalculateDamage(dmg.value, armour) * targetBlock(dmg.type));
                }
            }
        }
    } else {
        for(let weapon of global.combat.actor.equipment) {
            if(weapon.dmg) {
                for(let dmg of weapon.dmg) {
                    let armour = global.combat.target.armor[dmg.type];
                    totalDamage += CalculateDamage(dmg.value, armour);
                }
            }
        }
    }
    return Math.ceil(totalDamage);
}

function AttackMissed() {
    if(global.combat.target.stats.agi > global.combat.actor.stats.acc) {
        if(((global.combat.target.stats.agi - global.combat.actor.stats.acc) / 100) >= Math.random()) {
            return true;
        }
        else return false;
    }
}

function AttackBlocked() {
    if(TargetNoShield()) return false;
    else {
        for(let eq of global.combat.target.equipment) {
            if(eq.slot == "shield") {
                if((eq.blockChance/100) >= Math.random()) return true;
                else return false;
            }
        }
    }
}

function TargetNoShield() {
    for(let shield of global.combat.target.equipment) {
        if(shield.slot == "shield") return false;
    }
    return true;
}

function Defend() {
    return Status("combat-guard");
}

function Status(key) {
    for(let stat of statuses) {
        if(stat.key == key) {
            let copy = JSON.parse(JSON.stringify(stat));
            return copy;
        }
    }
}
