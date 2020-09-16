let BV = {};

var texts = [
  {
    cat: "combat",
    texts: [
      {
        key: "attack",
        text: "Attempt to §/crimson/attack§ your foe using your weapon. §/red/Damage§ and §/cyan/accuracy§ depend on your §/green/skills§."
      },
      {
        key: "defense",
        text: "Guard against incoming §/crimson/attacks§ for 1 turn. §/green/Reduces§ §/red/damage§ by §/yellow/50%§ and §/green/lowers§ §/orange/threat§ by §/yellow/1§."
      },
      {
        key: "fierce-assault",
        text: "Dedicate your all to a massive §/crimson/attack§ that §/green/ignores§ armor for 1.25x damage! Cost: 10 §/cyan/mana§. Cooldown: 4 §/yellow/turns§."
      },
      {
        key: "mana-blast",
        text: "Concentrate your mana in one fierce blast. Cost: 25 §/cyan/mana§."
      },
      {
        key: "shield-bash",
        text: "Deal §/crimson/damage§ based on your equipped §/yellow/shield§ and §/yellow/stun§ enemy for 1 turn. Cooldown: 5 §/yellow/turns§."
      }
    ]
  },
  {
    cat: "battle",
    subcats: [
      {
        subcat: "combat-defend",
        trigger: "defend",
        texts: [
          {
            key: "combat-defend",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ focuses on defense, §/green/reducing§ all damage taken by 50%."
          }
        ]
      },
      {
        subcat: "combat-slash-hit",
        trigger: "nomiss slash land",
        texts: [
          {
            key: "combat-slash-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and rushes towards §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, unleashing a powerful slash. The slash §/orange/connects§ and deals §@var.BTV()§ §/red/damage§ to §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§"
          },
          {
            key: "combat-slash-hit-2",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ circles around §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ before gripping §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and striking §@var.OBJPRON(target)§. The blow §/orange/connects§ and deals §@var.BTV()§ §/red/damage§ to §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, who cringes in pain."
          }
        ]
      },
      {
        subcat: "combat-slash-miss",
        trigger: "miss slash land",
        texts: [
          {
            key: "combat-slash-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and rushes towards §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, unleashing a powerful slash. The slash §/orange/misses§, allowing §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ to get in position for counter attack!"
          }
        ]
      },
      {
        subcat: "combat-slash-blocked",
        trigger: "block slash land",
        texts: [
          {
            key: "combat-slash-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and rushes towards §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, unleashing a powerful slash. However, §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ blocks the attack with §@var.POSPRON(target)§ §/yellow/@var.TRGSHIELD()§ §#@var.TRGSHIELDIMG()#§, only taking §@var.BTV()§ §/red/damage§."
          }
        ]
      },
      {
        subcat: "combat-blunt-hit",
        trigger: "nomiss blunt land",
        texts: [
          {
            key: "combat-blunt-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with a nasty overhead swing. The strike §/orange/connects§ and deals §@var.BTV()§ §/red/damage§ to §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§"
          }
        ]
      },
      {
        subcat: "combat-blunt-miss",
        trigger: "miss blunt land",
        texts: [
          {
            key: "combat-blunt-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with a nasty overhead swing. The strike §/orange/misses§, passing mere inches from §@var.POSPRON(target)§ face."
          }
        ]
      },
      {
        subcat: "combat-blunt-block",
        trigger: "block blunt land",
        texts: [
          {
            key: "combat-blunt-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with a nasty overhead swing. However, §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ blocks the attack with §@var.POSPRON(target)§ §/yellow/@var.TRGSHIELD()§ §#@var.TRGSHIELDIMG()#§, only taking §@var.BTV()§ §/red/damage§."
          }
        ]
      },
      {
        subcat: "combat-fierce-assault-hit",
        trigger: "nomiss PowerAtk(Ability(`fierce-assault`).power) land",
        texts: [
          {
            key: "combat-fierce-assault-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and performs a §/orange/fierce§ assault on §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§. The §/yellow/assault§ renders §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ unable to defend, causing §@var.BTV()§ §/red/damage§ to §@var.OBJPRON(target)§."
          }
        ]
      },
      {
        subcat: "combat-fierce-assault-miss",
        trigger: "miss PowerAtk(Ability(`fierce-assault`).power) land",
        texts: [
          {
            key: "combat-fierce-assault-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and performs a §/orange/fierce§ assault on §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§. The §/yellow/assault§ goes wide and §/orange/misses§ §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§."
          }
        ]
      },
      {
        subcat: "combat-fierce-assault-block",
        trigger: "block PowerAtk(Ability(`fierce-assault`).power) land",
        texts: [
          {
            key: "combat-fierce-assault-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and performs a §/orange/fierce§ assault on §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§. However, §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ blocks the attack with §@var.POSPRON(target)§ §/yellow/@var.TRGSHIELD()§ §#@var.TRGSHIELDIMG()#§, only taking §@var.BTV()§ §/red/damage§."
          }
        ]
      },
      {
        subcat: "combat-smash-hit",
        trigger: "nomiss PowerAtk(Ability(`smash`).power) land",
        texts: [
          {
            key: "combat-smash-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with all of §@var.POSPRON(actor)§ strength. The §/yellow/smash§ crushes through §/@var.BTC(target)/@var.BTN(target)§'s §#@var.BTI(target)#§ armor, causing §@var.BTV()§ §/red/damage§ to §@var.OBJPRON(target)§."
          }
        ]
      },
      {
        subcat: "combat-smash-miss",
        trigger: "miss PowerAtk(Ability(`smash`).power) land",
        texts: [
          {
            key: "combat-smash-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with all of §@var.POSPRON(actor)§ strength. The §/yellow/smash§ whiffs past §/@var.BTC(target)/@var.BTN(target)§'s §#@var.BTI(target)#§, as §@var.SINPRON(target)§ deftly avoids it."
          }
        ]
      },
      {
        subcat: "combat-smash-block",
        trigger: "block PowerAtk(Ability(`smash`).power) land",
        texts: [
          {
            key: "combat-smash-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with all of §@var.POSPRON(actor)§ strength. However, §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ blocks the attack with §@var.POSPRON(target)§ §/yellow/@var.TRGSHIELD()§ §#@var.TRGSHIELDIMG()#§, only taking §@var.BTV()§ §/red/damage§."
          }
        ]
      },
      {
        subcat: "combat-target-death",
        trigger: "target death",
        texts: [
          {
            key: "combat-death-target-1",
            text: "§¤B-¤/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ §¤B-¤/crimson/is defeated and falls to§ §¤B-¤/crimson/@var.POSPRON(target)§ §¤B-¤/crimson/knees, collapsing to the ground shortly after.§"
          }
        ]
      },
      {
        subcat: "combat-actor-death",
        trigger: "actor death",
        texts: [
          {
            key: "combat-death-actor-1",
            text: "§¤B-¤/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ §¤B-¤/crimson/is defeated and falls to§ §¤B-¤/crimson/@var.POSPRON(actor)§ §¤B-¤/crimson/knees, collapsing to the ground shortly after.§"
          }
        ]
      }
    ]
  }
]

/* TEMPLATES */
// Actor (name and image): 
// §/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§
// Target (name and image):
// §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§
/* TEMPLATES */

function UpdateBV() {
  BV = global.combat;
}

function BTC(key) {
  return BV[key].color;
}

function  BTN(key) {
  return BV[key].name;
}

function BTI(key) {
  return BV[key].image;
}

function BC(key) {
  return BV[key];
}

function POSPRON(key) {
  return BV[key].pron.possesive;
}

function OBJPRON(key) {
  return BV[key].pron.objective;
}

function SINPRON(key) {
  return BV[key].pron.singular;
}

function BTV() {
  return BV.value;
}

function ACTWEAPON() {
  for(let wep of BV.actor.equipment) {
    if(wep.dmg) return wep.name;
  }
}

function ACTWEAPONIMG() {
  for(let wep of BV.actor.equipment) {
    if(wep.dmg) return wep.img;
  }
}

function TRGWEAPON() {
  for(let wep of BV.target.equipment) {
    if(wep.dmg) return wep.name;
  }
}

function TRGWEAPONIMG() {
  for(let wep of BV.target.equipment) {
    if(wep.dmg) return wep.img;
  }
}

function ACTSHIELD() {
  for(let shield of BV.actor.equipment) {
    if(shield.slot == "shield") return shield.name;
  }
}

function TRGSHIELD() {
  for(let shield of BV.target.equipment) {
    if(shield.slot == "shield") return shield.name;
  }
}

function ACTSHIELDIMG() {
  for(let shield of BV.actor.equipment) {
    if(shield.slot == "shield") return shield.img;
  }
}

function TRGSHIELDIMG() {
  for(let shield of BV.target.equipment) {
    if(shield.slot == "shield") return shield.img;
  }
}