const abilities = [
    {
        key: "fierce-assault",
        img: "icons/fierce_assault.png"
    },
    {
        key: "shield-bash",
        img: "icons/shield_bash.png"
    }
];

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
  