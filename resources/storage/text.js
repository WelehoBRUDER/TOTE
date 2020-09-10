

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
      },
    ]
  }
]

function GetActorWeapon(Actor) {
  for(let wep of Actor.equipment) {
    if(wep.dmg) return wep;
  }
}