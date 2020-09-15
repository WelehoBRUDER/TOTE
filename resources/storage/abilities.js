const abilities = [
    {
        key: "fierce-assault",
        img: "icons/fierce_assault.png",
        power: {
          armor_penetration: 100,
          multiplier: 130
        },
        action: "PowerAtk(Ability(`fierce-assault`).power)"
    },
    {
        key: "shield-bash",
        img: "icons/shield_bash.png"
    },
    {
      key: "smash",
      power: {
        armor_penetration: 50,
        multiplier: 150
      },
      action: "PowerAtk(Ability(`smash`).power)"
    }
];

function Attack() {
  eval(abilities[0].action);
  eval(abilities[2].action);
}

const spells = [
    {
        key: "mana-blast",
        img: "icons/mana_blast.png"
    }
]

function Ability(key) {
    for(let abi of abilities) {
      if(abi.key == key) return abi;
    }
  }
  
  function Spell(key) {
    for(let spell of spells) {
      if(spell.key == key) return spell;
    }
  }
  