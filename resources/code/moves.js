

function CalculateDamage(damage, armor, type) {
    let str = Math.ceil(global.combat.actor.stats.str * (1 + actorModifiers("str")));
    let dex = Math.ceil(global.combat.actor.stats.dex * (1 + actorModifiers("dex")));
    let newDamage = Math.ceil(damage * (1 + (str / 25 + dex / 50)));
    let newArmor = (armor / 100) * (1 + targetModifiers("armor"));
    newDamage = Math.ceil(newDamage - (newDamage * newArmor));
    newDamage = defenseModifiers(global.combat.target, type, newDamage);
    return newDamage;
}

function CalculateMagicalDamage(damage, armor, type) {
    let wis = Math.ceil(global.combat.actor.stats.wis * (1 + actorModifiers("wis")));
    let int = Math.ceil(global.combat.actor.stats.int * (1 + actorModifiers("int")));
    let newDamage = Math.ceil(damage * (1 + (int / 25 + wis / 50)));
    let newArmor = (armor / 100) * (1 + targetModifiers("armor"));
    newDamage = Math.ceil(newDamage - (newDamage * newArmor));
    newDamage = defenseModifiers(global.combat.target, type, newDamage);
    return newDamage;
}

function defenseModifiers(char, type, dmg) {
    let newDamage = dmg;
    for (let mod of char.modifiers) {
        if (mod.power) {
            for (let power of mod.power) {
                if (power.type == "defense") newDamage -= newDamage * (power.value / 100);
                else if (power.type == type) newDamage -= newDamage * (power.value / 100);
            }
        }
    }
    return Math.ceil(newDamage);
}

function targetModifiers(arg) {
    let totalModifier = 0;
    for (let mod of global.combat.target.modifiers) {
        if (mod.power) {
            for (let pow of mod.power) {
                if (pow.type == arg) {
                    totalModifier += pow.value / 100;
                }
            }
        }
    }
    return totalModifier;
}

function actorModifiers(arg) {
    let totalModifier = 0;
    for (let mod of global.combat.actor.modifiers) {
        if (mod.power) {
            for (let pow of mod.power) {
                if (pow.type == arg) {
                    totalModifier += pow.value / 100;
                }
            }
        }
    }
    return totalModifier;
}

function PowerAtk(power) {
    global.combat.crit = false;
    global.combat.blocked = false;
    if (AttackMissed()) return "miss";
    let totalDamage = 0;
    if (AttackBlocked()) {
        global.combat.blocked = true;
        for (let weapon of global.combat.actor.equipment) {
            if (weapon.dmg) {
                for (let dmg of weapon.dmg) {
                    let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
                    let armour = global.combat.target.armor[dmg.type] - percentage;
                    let dmgIncrease = dmg.value * (power.multiplier / 100);
                    totalDamage += CalculateDamage(dmgIncrease, armour, dmg.type) * targetBlock(dmg.type);
                }
            }
        }
    }
    else {
        if(AttackCrit()) global.combat.crit = true;
        for (let weapon of global.combat.actor.equipment) {
            if (weapon.dmg) {
                for (let dmg of weapon.dmg) {
                    let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
                    let armour = global.combat.target.armor[dmg.type] - percentage;
                    let dmgIncrease = dmg.value * (power.multiplier / 100);
                    if(global.combat.crit) totalDamage += CalculateDamage(dmgIncrease*global.combat.actor.critMulti, armour, dmg.type);
                    else totalDamage += CalculateDamage(dmgIncrease, armour, dmg.type);
                }
            }
        }
    }
    return Math.ceil(totalDamage);
}

function AttackSpell(power) {
    global.combat.crit = false;
    global.combat.blocked = false;
    if (AttackMissed()) return "miss";
    let totalDamage = 0;
    if (AttackBlocked()) {
        global.combat.blocked = true;
        for (dmg of power.values) {
            let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
            let armour = global.combat.target.armor[dmg.type] - percentage;
            let dmgIncrease = dmg.value * (power.multiplier / 100);
            totalDamage += CalculateMagicalDamage(dmgIncrease, armour, dmg.type) * targetBlock(dmg.type);
        }
    }
    else {
        if(AttackCrit()) global.combat.crit = true;
        for (let dmg of power.values) {
            let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
            let armour = global.combat.target.armor[dmg.type] - percentage;
            let dmgIncrease = dmg.value * (power.multiplier / 100);
            if(global.combat.crit) totalDamage += CalculateMagicalDamage(dmgIncrease*global.combat.actor.critMulti, armour, dmg.type);
            else totalDamage += CalculateMagicalDamage(dmgIncrease, armour, dmg.type);
        }
    }
    return Math.ceil(totalDamage);
}

function targetBlock(type) {
    for (let eq of global.combat.target.equipment) {
        if (eq.slot == "shield") {
            for (let armor in eq.armor) {
                if (armor == type) return eq.armor[armor] / 100;
            }
        }
    }
}

function Summoning(char) {
    let copy = deepCopy(char);
    return copy;
}

function RegularAttack() {
    global.combat.crit = false;
    global.combat.blocked = false;
    let totalDamage = 0;
    if (AttackMissed()) return "miss";
    if (AttackBlocked()) {
        global.combat.blocked = true;
        for (let weapon of global.combat.actor.equipment) {
            if (weapon.dmg) {
                for (let dmg of weapon.dmg) {
                    let armour = global.combat.target.armor[dmg.type];
                    totalDamage += (CalculateDamage(dmg.value, armour) * targetBlock(dmg.type));
                }
            }
        }
    } else {
        if(AttackCrit()) global.combat.crit = true;
        for (let weapon of global.combat.actor.equipment) {
            if (weapon.dmg) {
                for (let dmg of weapon.dmg) {
                    let armour = global.combat.target.armor[dmg.type];
                    if(global.combat.crit) totalDamage += CalculateDamage(dmg.value*global.combat.actor.critMulti, armour);
                    else totalDamage += CalculateDamage(dmg.value, armour);
                }
            }
        }
    }
    return Math.ceil(totalDamage);
}

function ShieldBash() {
    global.combat.crit = false;
    global.combat.blocked = false;
    let totalDamage = 0;
    if (AttackMissed()) return "miss";
    if (AttackBlocked()) {
        global.combat.blocked = true;
        for (let shield of global.combat.actor.equipment) {
            if (shield.damage) {
                for (let dmg of shield.damage) {
                    let armour = global.combat.target.armor[dmg.type];
                    totalDamage += (CalculateDamage(dmg.value, armour) * targetBlock(dmg.type));
                }
            }
        }
    } else {
        if(AttackCrit()) global.combat.crit = true;
        for (let shield of global.combat.actor.equipment) {
            if (shield.damage) {
                for (let dmg of shield.damage) {
                    let armour = global.combat.target.armor[dmg.type];
                    if(global.combat.crit) totalDamage += CalculateDamage(dmg.value*global.combat.actor.critMulti, armour);
                    else totalDamage += CalculateDamage(dmg.value, armour);
                }
            }
        }
    }
    return Math.ceil(totalDamage);
}

function AttackMissed() {
    let agi = global.combat.target.stats.agi;
    let acc = global.combat.actor.stats.acc;
    if (agi > global.combat.actor.stats.acc) {
        if (((global.combat.target.stats.agi - global.combat.actor.stats.acc) / 250) >= Math.random()) {
            return true;
        }
        else return false;
    }
}

function AttackCrit() {
    if(global.combat.actor.critChance / 100 >= Math.random()) {
        return true;
    }
    else return false;
}

function AttackBlocked() {
    if (TargetNoShield()) return false;
    else {
        for (let eq of global.combat.target.equipment) {
            if (eq.slot == "shield") {
                if ((eq.blockChance / 100) >= Math.random()) return true;
                else return false;
            }
        }
    }
}

function TargetNoShield() {
    for (let shield of global.combat.target.equipment) {
        if (shield.slot == "shield") return false;
    }
    return true;
}

function HealingSpell(power) {
    if (power.amount) return power.amount;
    else if (power.percent) {
        return PercentOf(power.percent, global.combat.target.stats.maxhp);
    }
}

function SupportSpell(power) {
    if(power?.amount) return power?.amount;
}

function Defend() {
    return Status("combat-guard");
}

function Buff(power) {
    if(power?.amount) return power?.amount;
}

function SwordRainUltimate() {
    AddToRound(UltEquipped(), )
}


function Status(key) {
    for (let stat of statuses) {
        if (stat.key == key) {
            let copy = deepCopy(stat);
            copy.last += 1;
            return copy;
        }
    }
}
