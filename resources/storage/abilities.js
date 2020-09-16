const abilities = [
    {
        key: "fierce-assault",
        img: "icons/fierce_assault.png",
        power: {
          armor_penetration: 100,
          multiplier: 130
        },
        cost: {
          mana: 10,
          cd: 4
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
      cost: {
        mana: 0,
        cd: 5
      },
      action: "PowerAtk(Ability(`smash`).power)"
    },
    {
      key: "holy-smite",
      power: {
        armor_penetration: 0,
        multiplier: 150,
        type: "holy"
      },
      cost: {
        mana: 30,
        cd: 2
      },
      action: "OffensiveSpell(Ability(`holy-smite`).power)"
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
    },
    {
      key: "healing-light",
      power: {
        amount: 100
      },
      cost: {
        mana: 50,
        cd: 3
      },
      action: "HealingSpell(Ability(`healing-light`).power)"
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
  