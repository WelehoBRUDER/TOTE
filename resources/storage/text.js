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
        subcat: "combat-slash-hit",
        trigger: "nomiss slash land",
        texts: [
          {
            key: "combat-slash-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ and rushes towards §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, unleashing a powerful slash. The slash §/orange/connects§ and deals §@var.BTV()§ §/red/damage§ to §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§"
          },
          {
            key: "combat-slash-hit-2",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ circles around §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ before gripping §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ and striking §@var.OBJPRON(target)§. The blow §/orange/connects§ and deals §@var.BTV()§ §/red/damage§ to §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, who cringes in pain."
          }
        ]
      },
      {
        subcat: "combat-slash-miss",
        trigger: "miss slash land",
        texts: [
          {
            key: "combat-slash-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ and rushes towards §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, unleashing a powerful slash. The slash §/orange/misses§, allowing §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ to get in position for counter attack!"
          }
        ]
      },
      {
        subcat: "combat-fierce-assault-hit",
        trigger: "nomiss PowerAtk(Ability(`fierce-assault`).power) land",
        texts: [
          {
            key: "combat-fierce-assault-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ and performs a §/orange/fierce§ assault on §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§. The §/yellow/assault§ renders §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ unable to defend, causing §@var.BTV()§ §/red/damage§ to §@var.OBJPRON(target)§."
          }
        ]
      },
      {
        subcat: "combat-smash-hit",
        trigger: "nomiss PowerAtk(Ability(`smash`).power) land",
        texts: [
          {
            key: "combat-fierce-assault-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ and smashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with all of §@var.POSPRON(actor)§ strength. The §/yellow/smash§ crushes through §/@var.BTC(target)/@var.BTN(target)§'s §#@var.BTI(target)#§ armor, causing §@var.BTV()§ §/red/damage§ to §@var.OBJPRON(target)§."
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

function BTV() {
  return BV.value;
}

function ACTWEAPON() {
  for(let wep of BV.actor.equipment) {
    if(wep.dmg) return wep.name;
  }
}

function TRGWEAPON() {
  for(let wep of BV.target.equipment) {
    if(wep.dmg) return wep.name;
  }
}