const statuses = [
  {
    key: "combat-guard",
    img: "icons/combat/defense_buff.png",
    power: [
      {type: "defense", value: 50},
      {type: "threat", value: -1}
    ],
    last: 0,
    text: "§¤s13-¤This character is defending and takes 50% less damage.§"
  },
  {
    key: "stun",
    img: "icons/combat/stun.png",
    recover: true,
    last: 1,
    text: "§¤s13-¤This character is stunned and unable to move!§"
  },
  {
    key: "armor-up-1",
    img: "icons/combat/armor_buff.png",
    power: [
      {type: "armor", value: 25}
    ],
    last: 3
  },
  {
    key: "armor-down-1",
    img: "icons/combat/armor_debuff.png",
    power: [
      {type: "armor", value: -50}
    ],
    last: 3,
    text: "§¤s13-¤This character's armor has been sundered,§ §¤s13-¤/red/reducing§ §¤s13-¤its effectiviness to 50%!§"
  },
  {
    key: "blinded-1",
    img: "icons/combat/blinded.png",
    power: [
      {type: "acc", value: -70},
      {type: "dex", value: -70}
    ],
    last: 2,
    text: "§¤s13-¤This character is blinded and gets a -70%§ §¤s13-¤/red/penalty§ §¤s13-¤to strength and dexterity!§"
  },
  {
    key: "burning-1",
    img: "icons/combat/burning.png",
    power: [
      {type: "fire", value: 15},
    ],
    everyTurn: true,
    last: 3,
    text: "This character is §/orange/burning§ and takes 15 damage every turn."
  }
]

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
        cooldown: 0,
        action: "PowerAtk(Ability(`fierce-assault`).power)"
    },
    {
        key: "shield-bash",
        img: "icons/shield_bash.png",
        cost: {
          mana: 0,
          cd: 4
        },
        status: Status(`stun`),
        cooldown: 0,
        action: "ShieldBash()"
    },
    {
      key: "sunder",
      img: "icons/sunder.png",
      power: {
        armor_penetration: 0,
        multiplier: 60
      },
      cost: {
        mana: 15,
        cd: 4
      },
      status: Status(`armor-down-1`),
      cooldown: 0,
      action: "PowerAtk(Ability(`sunder`).power)"
    },
    {
      key: "blinding-slash",
      img: "icons/blinding_slash.png",
      power: {
        armor_penetration: 0,
        multiplier: 50
      },
      cost: {
        mana: 10,
        cd: 3
      },
      status: Status(`blinded-1`),
      cooldown: 0,
      action: "PowerAtk(Ability(`blinding-slash`).power)"
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
      cooldown: 0,
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
      cooldown: 0,
      action: "OffensiveSpell(Ability(`holy-smite`).power)"
    },
    {
      key: "summon-skeleton-warrior",
      img: "icons/summon_skeleton_warrior.png",
      no_target: true,
      cost: {
        mana: 60,
        cd: 8
      },
      cooldown: 0,
      action: "Summoning(summon(`summon_skeleton_warrior`))"
    },
    {
      key: "summon-earth-golem",
      img: "icons/summon_earth_golem.png",
      no_target: true,
      cost: {
        mana: 500,
        cd: 13
      },
      cooldown: 0,
      action: "Summoning(summon(`summon_earth_golem`))"
    }
];

function Attack() {
  eval(abilities[0].action);
  eval(abilities[2].action);
}

function summon(key) {
  for(let summon of summons) {
    if(summon.key == key) return summon;
  }
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
      cooldown: 0,
      action: "HealingSpell(Spell(`healing-light`).power)"
    },
    {
      key: "dim-healing-light",
      power: {
        amount: 50
      },
      cost: {
        mana: 10,
        cd: 2
      },
      cooldown: 0,
      action: "HealingSpell(Spell(`dim-healing-light`).power)"
    },
    {
      key: "fireball-1",
      img: "icons/tinder.png",
      power: {
        values: [
          {type: "fire", value: 10}
        ],
        armor_penetration: 0,
        multiplier: 100
      },
      cost: {
        mana: 50,
        cd: 4
      },
      status: Status(`burning-1`),
      cooldown: 0,
      action: "AttackSpell(Spell(`fireball-1`).power)"
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

  