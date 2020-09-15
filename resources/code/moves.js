

function CalculateDamage(damage, armor) {
    let newDamage = Math.ceil(damage * (1 +  (global.combat.actor.stats.str / 25 + global.combat.actor.stats.dex / 50)));
    newDamage = Math.ceil(newDamage - (newDamage * (armor/100)));
    return newDamage;
}

function PowerAtk(power) {
    let totalDamage = 0;
    for(let weapon of global.combat.actor.equipment) {
        if(weapon.dmg) {
            for(let dmg of weapon.dmg) {
                let percentage = global.combat.target.armor[dmg.type] * (power.armor_penetration / 100);
                let armour = global.combat.target.armor[dmg.type] - percentage;
                let dmgIncrease = dmg.value * (power.multiplier/100);
                totalDamage += CalculateDamage(dmgIncrease, armour);
            }
        }
    }
    return totalDamage;
}

function RegularAttack() {
    let totalDamage = 0;
    for(let weapon of global.combat.actor.equipment) {
        if(weapon.dmg) {
            for(let dmg of weapon.dmg) {
                let armour = global.combat.target.armor[dmg.type];
                totalDamage += CalculateDamage(dmg.value, armour);
            }
        }
    }
    return totalDamage;
}
