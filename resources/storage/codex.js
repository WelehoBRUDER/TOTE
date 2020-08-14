// § = make new span, / = isolate color, :break = line break / br
var codex = [
  {
    cat: "Characters",
    subcats: [
      {
        subcat: "Enemies",
        content: [
          {
            key: "Thief",
            content: "Thieves are the most common §/rgb(191,75,57)/enemy§ in §/rgb(74,181,186)/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§. Thieves are usually found threatening homeless people around the slums of most cities, or ambushing unsuspecting travelers among less travelled roads. §:break§ §:break§ Was that a line break? §:break§ §/blue/Yes§ §/green/It§ §/red/Was§ §:break§ §/green/&GetCodexEntity('Characters', 'Enemies', 'Goblin')&Goblin§ link.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
          {
            key: "Goblin",
            content: "Goblins are §/brown/pieces of shit§ that plague §/cyan/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§ in every corner. They typically have §/red/30HP§.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
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
  }
]