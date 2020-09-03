// § = make new span, / = isolate color, :break = line break / br, & = isolate function, % = isolate image
var codex = [
  {
    cat: "Gameplay",
    subcats: [
      {
        subcat: "Stats",
        content: [
          {
            key: "Health",
            content: "§/red/Health§ §%heart_icon_small%§ is the most basic §/yellow/stat§ in TOTE. When your §/red/health§ §%heart_icon_small%§ reaches 0, you are §/black/defeated§.",
            tags: [
              { tag: "health" },
              { tag: "stats" },
              { tag: "gameplay" }
            ]
          }
        ]
      }
    ]
  },
  {
    cat: "Characters",
    subcats: [
      {
        subcat: "Enemies",
        content: [
          {
            key: "Thief",
            content: "Thieves §%thief_icon_small%§ are the most common §/rgb(191,75,57)/enemy§ in §/rgb(74,181,186)/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§. §:break§ I §%heart_icon_small%§ you :) §:break§ Thieves are usually found threatening homeless people around the slums of most cities, or ambushing unsuspecting travelers among less travelled roads. §:break§ §:break§ Was that a line break? §:break§ §/blue/Yes§ §/green/It§ §/red/Was§ §:break§ §/green/&GetCodexEntity('Characters', 'Enemies', 'Goblin')&Goblin§ link.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
          {
            key: "Goblin",
            content: "Goblins §%goblin_icon_small%§ are §/brown/pieces of shit§ that plague §/cyan/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§ in every corner. They typically have §/red/30HP§ §%heart_icon_small%&GetCodexEntity('Gameplay', 'Stats', 'Health')&§.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
          {
            key: "Viktor Stahlhelm",
            content: "",
            tags: [
              {tag: "enemies"},
              {tag: "villain"},
              {tag: "humanoid"}
            ]
          }
        ]
      },
      {
        subcat: "Fluffy Bois",
        content: [
          {
            key: "Doggus Woggus",
            content: "Awww. Doggus is such a §/green/good boye§ :)",
            tags: [
              { tag: "fluffy" },
              { tag: "cute" },
              { tag: "canine" }
            ]
          },
        ]
      }
    ]
  },
  {
    cat: "Areas",
    subcats: [
      {
        subcat: "Helleria",
        content: [
          {
            key: "Hellerian Kingdom",
            content: "§/rgb(74,181,186)/Helleria§ is the largest kingdom located in the north of §/green/Vaduz§.",
            tags: [
              { tag: "helleria" },
              { tag: "kingdom" },
              { tag: "vaduz" }
            ]
          }
        ]
      },
      {
        subcat: "Rivet Woods",
        content: [
          {
            key: "Bank of Helleria",
            content: "§/gold/The bank operates on YOUR money!§",
            tags: [
              { tag: "currency" },
              { tag: "areas" },
              { tag: "rivet" }
            ]
          }
        ]
      }
    ]
  },
  {
    cat: "Events",
    subcats: [
      {
        subcat: "The Prelude (150-230)",
        content: []
      },
      {
        subcat: "The Great Terror (230-266)",
        content: [
          {
            key: "Assault on the Evertree (230)",
            content: "On this fateful day, §&GetCodexEntity('Characters', 'Enemies', 'Viktor Stahlhelm')&Viktor§, at the age of 26, invaded the Evertree and took its sap.§:break§ Viktor led the three great dark elf clans in a crusade against their hated enemies, the wood elves. The assault came as a surprise to the outnumbered wood elves guarding the Evertree, and their initial garrisons were overwhelmed in a few hours.§:break§ An alarm was sounded and the entire city was soon engulfed in total war, even women and children fighting to the death to defend the Evertree, for if it were to fall, all of the world would soon follow.§:break§ Though the defenders were able to stop the assault itself at the gates of the tree, Viktor and his most trusted entourage managed to breach a weak point and infiltrate the tree.§:break§ Viktor and his followers all drank the Evertree’s sap and gained immense powers, greater than any mortal should possess. They stashed as much sap as they could, and then broke out of the tree to join their army, which was nearing annihilation. §:break§ With their newly acquired powers, the leaders razed the city to the ground as they retreated with their weakened forces, taking multiple wood elf civilians and soldiers alike as their ‘trophies’.§:break§ The city was completely devastated, half of her population lying in a ditch and two thirds of her buildings in ruins.",
            tags: [
              {tag: "terror"},
              {tag: "event"},
              {tag: "evertree"}
            ]
          }
        ]
      },
      {
        subcat: "Dawn of Hope (266-present)",
        content: []
      }
    ]
  }
]