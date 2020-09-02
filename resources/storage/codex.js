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
        content: []
      },
      {
        subcat: "Dawn of Hope (266-present)",
        content: []
      }
    ]
  }
]