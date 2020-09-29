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
      },
      {
        key: "summon-skeleton-warrior",
        text: "Summon §/yellow/Skeleton Warrior§ to aid you in this battle until victory or its death. Cost: 60 §/cyan/mana§. Cooldown: 8 §/yellow/turns§."
      },
      {
        key: "sunder",
        text: "Deal 60% §/crimson/damage§ to target and cause effect §/yellow/Sundered§ that lowers armor by 50% for 3 turns."
      },
      {
        key: "blinding-slash",
        text: `Deal 50% §/crimson/damage§ to target and cause effect §/yellow/blinded§ that lowers acc and dex by 70% for 2 turns.`
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
        subcat: "combat-sunder-hit",
        trigger: "nomiss PowerAtk(Ability(`sunder`).power) land",
        texts: [
          {
            key: "combat-sunder-hit-1",
            text: `§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and breaks a part of §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§'s armor.
                  §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ takes §@var.BTV()§ §/red/damage§.`
          }
        ]
      },
      {
        subcat: "combat-sunder-miss",
        trigger: "miss PowerAtk(Ability(`sunder`).power) land",
        texts: [
          {
            key: "combat-sunder-miss-1",
            text: `§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and dashes toward §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§. He misses and retreats,
                  and §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ is unbothered.`
          }
        ]
      },
      {
        subcat: "combat-sunder-block",
        trigger: "block PowerAtk(Ability(`sunder`).power) land",
        texts: [
          {
            key: "combat-sunder-block-1",
            text: `§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ grips §@var.POSPRON(actor)§ §/yellow/@var.ACTWEAPON()§ §#@var.ACTWEAPONIMG()#§ and dashes toward §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§.
                  But §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ was ready for the attack and manages to block §/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§'s attack, only taking §@var.BTV()§ §/red/damage§.`
          }
        ]
      },
      {
        subcat: "combat-bash-hit",
        trigger: "nomiss ShieldBash() land",
        texts: [
          {
            key: "combat-bash-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ bashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§, stunning §@var.OBJPRON(target)§ and dealing §@var.BTV()§ §/crimson/damage§."
          }
        ]
      },
      {
        subcat: "combat-bash-miss",
        trigger: "miss ShieldBash() land",
        texts: [
          {
            key: "combat-bash-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ tries to bash §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§, but misses and leaves §@var.OBJPRON(actor)§self wide open."
          }
        ]
      },
      {
        subcat: "combat-bash-block",
        trigger: "block ShieldBash() land",
        texts: [
          {
            key: "combat-bash-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ bashes §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§, but §@var.SINPRON(target)§ blocks the attack with §@var.OBJPRON(target)§ §/yellow/@var.TRGSHIELD()§ §#@var.TRGSHIELDIMG()#§, still getting stunned, but only taking §@var.BTV()§ §/crimson/damage§."
          }
        ]
      },
      {
        subcat: "combat-blinding-slash-hit",
        trigger: "nomiss PowerAtk(Ability(`blinding-slash`).power) land",
        texts: [
          {
            key: "combat-blinding-slash-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ strikes toward §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§ and deals §@var.BTV()§ §/crimson/damage§, leaving the §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ blinded."
          }
        ]
      },
      {
        subcat: "combat-blinding-slash-miss",
        trigger: "miss PowerAtk(Ability(`blinding-slash`).power) land",
        texts: [
          {
            key: "combat-blinding-slash-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ strikes toward §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§ but miscalculates the attack, missing §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ completely."
          }
        ]
      },
      {
        subcat: "combat-blinding-slash-block",
        trigger: "block PowerAtk(Ability(`blinding-slash`).power) land",
        texts: [
          {
            key: "combat-blinding-slash-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ strikes toward §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ with §@var.POSPRON(actor)§ §/yellow/@var.ACTSHIELD()§ §#@var.ACTSHIELDIMG()#§. §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ raises their shield just in time to block, still leaving them blinded, but only dealing §@var.BTV()§ §/crimson/damage§."
          }
        ]
      },
      {
        subcat: "combat-fireball-1-hit",
        trigger: "nomiss AttackSpell(Spell(`fireball-1`).power) land",
        texts: [
          {
            key: "combat-fireball-1-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ casts a fireball and hurls it at §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, dealing §@var.BTV()§ §/crimson/damage§."
          }
        ]
      },
      {
        subcat: "combat-fireball-1-miss",
        trigger: "miss AttackSpell(Spell(`fireball-1`).power) land",
        texts: [
          {
            key: "combat-fireball-1-miss-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ casts a fireball and hurls it at §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§, but the target runs for cover and avoids damage."
          }
        ]
      },
      {
        subcat: "combat-fireball-1-block",
        trigger: "block AttackSpell(Spell(`fireball-1`).power) land",
        texts: [
          {
            key: "combat-fireball-1-block-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ casts a fireball and hurls it at §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ who manages to block the attack. It still burns, making §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ take §@var.BTV()§ §/crimson/damage§."
          }
        ]
      },
      {
        subcat: "combat-armor-up-1-hit",
        trigger: "nomiss SupportSpell(Spell(`harden-1`).power) land",
        texts: [
          {
            key: "combat-armor-up-1-hit-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ casts a strenghtening spell on their armor."
          }
        ]
      },
      {
        subcat: "combat-heal-spell",
        trigger: "target heal",
        texts: [
          {
            key: "combat-heal-spell-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ heals §/@var.BTC(target)/@var.BTN(target)§ §#@var.BTI(target)#§ for §@var.BTV()§ health."
          }
        ]
      },
      {
        subcat: "combat-self-heal",
        trigger: "self heal",
        texts: [
          {
            key: "combat-self-heal-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ heals §@var.OBJPRON(actor)§self for §@var.BTV()§ health."
          }
        ]
      },
      {
        subcat: "combat-recover",
        trigger: "recover",
        texts: [
          {
            key: "combat-recover-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ spends some time recovering."
          }
        ]
      },
      {
        subcat: "combat-take-damage-turn",
        trigger: "everyturn",
        texts: [
          {
            key: "combat-take-damage-turn-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ takes §@var.BTV()§ §/crimson/damage!§"
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
      },
      {
        subcat: "combat-taunt",
        trigger: "Buff(Ability(`taunt-1`).power)",
        texts: [
          {
            key: "combat-taunt-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ begins drawing attention to §@var.OBJPRON(actor)§self by grunting and yelling, culminating in a taunt!"
          }
        ]
      },
      {
        subcat: "summoning",
        trigger: "summon",
        texts: [
          {
            key: "combat-summoning-1",
            text: "§/@var.BTC(actor)/@var.BTN(actor)§ §#@var.BTI(actor)#§ gathers §/cyan/mana§ between §@var.POSPRON(actor)§ palms, causing it to swirl. This creates a §/rgb(200, 50, 255)/portal§, and out of it appears §@var.ARTICLE(summoned)§ §/@var.SUMMONEDCOLOR()/@var.SUMMONEDNAME()§ §#@var.SUMMONEDIMAGE()#§!"
          }
        ]
      },
      {
        subcat: "no-debug-error",
        trigger: "nodebug error",
        texts: [
          {
            key: "no-debug-error-1",
            text: "Could not find appropriate text for §/@var.BTC(actor)/@var.BTN(actor)§'s §#@var.BTI(actor)#§ move!"
          }
        ]
      },
      {
        subcat: "debug-error",
        trigger: "debug error",
        texts: [
          {
            key: "debug-error-1",
            text: "§¤BB-I¤/red/ERROR MISSING TEXT!§ §¤BB-I¤/red/ THIS ERROR WILL BE FIXED BY ADDING COMBAT TEXTS FOR: § §¤BB-I¤/orange/@var.GEM()§. LATEST VALUE IS §@var.BTV()§!"
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

function GEM() {
  return BV.error;
}

function BTI(key) {
  let path = BV[key].image;
  if(path == undefined || BV[key].images) {
    if(global.combat.ally && global.combat.target != BV[key]) path = BV[key].images.friendly;
    else path = BV[key].images.hostile;
  }
  return path;
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

function SUMMONEDNAME() {
  return BV.summoned.name;
}

function SUMMONEDCOLOR() {
  return BV.summoned.color;
}

function SUMMONEDIMAGE() {
  if(global.combat.ally) return BV.summoned.images.friendly;
  else return BV.summoned.images.hostile;
}

function ARTICLE(key) {
  return BV[key].article;
}
