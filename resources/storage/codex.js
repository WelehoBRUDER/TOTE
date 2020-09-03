// § = make new span, / = isolate color, :break = line break / br, & = isolate function, % = isolate image
var codex = [
  {
    cat: "Gameplay",
    text: "Gameplay is the most §/green/basic§ thing in TOTE.",
    subcats: [
      {
        subcat: "Stats",
        text: "§/blue/Stats§ are cool yo.",
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
    text: "yes people in game yes",
    subcats: [
      {
        subcat: "Enemies",
        content: [
          {
            key: "Thief",
            content: "§:break§Thieves §%thief_icon_small%§ are the most common §/rgb(191,75,57)/enemy§ in §/rgb(74,181,186)/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§. §:break§ I §%heart_icon_small%§ you :) §:break§ Thieves are usually found threatening homeless people around the slums of most cities, or ambushing unsuspecting travelers among less travelled roads. §:break§ §:break§ Was that a line break? §:break§ §/blue/Yes§ §/green/It§ §/red/Was§ §:break§ §/green/&GetCodexEntity('Characters', 'Enemies', 'Goblin')&Goblin§ link.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
          {
            key: "Goblin",
            content: "§:break§Goblins §%goblin_icon_small%§ are §/brown/pieces of shit§ that plague §/cyan/&GetCodexEntity('Areas', 'Helleria', 'Hellerian Kingdom')&Helleria§ in every corner. They typically have §/red/30HP§ §%heart_icon_small%&GetCodexEntity('Gameplay', 'Stats', 'Health')&§.",
            tags: [
              { tag: "enemies" },
              { tag: "weak" },
              { tag: "humanoid" }
            ]
          },
          {
            key: "Viktor Stahlhelm",
            content: "§:break§Viktor is the main antagonist of TOTE, and is the reason for the Evertree’s tears.§:break§§:break§He seeks strength in order to create a better and more ‘just’ world, according to his own ideals. He made the Evertree’s strength his own in order to further this goal.§:break§§:break§Age: 62§:break§§:break§ Birthdate: 6th of Sepalus, 203",
            tags: [
              {tag: "enemies"},
              {tag: "villain"},
              {tag: "humanoid"}
            ]
          },
          {
            key: "Sand Witches",
            content: "§:break§Sand Witches are witches local to the desert in eastern midlands.",
            tags: [
              { tag: "desert" },
              { tag: "enemy"}
            ]
          },
          {
            key: "Sand Bitches",
            content: "§:break§Sand Bitches are desert rats under the control of §&GetCodexEntity('Characters','Enemies','Sand Witches')&Sand Witches§.",
            tags: [
              { tag: "desert"},
              { tag: "sandwitch"},
              { tag: "enemy"}
            ]
          }
        ]
      },
      {
        subcat: "Fluffy Bois",
        content: [
          {
            key: "Doggus Woggus",
            content: "§:break§Awww. Doggus is such a §/green/good boye§ :)",
            tags: [
              { tag: "fluffy" },
              { tag: "cute" },
              { tag: "canine" }
            ]
          },
          {
            key: "Kitty Witty",
            content: "§:break§Big Aww. Kitty is way better than §&GotCodexEntity('Characters','Fluffy Bois',Doggus Woggus'&Doggus§ :)."
          }
        ]
      }
    ]
  },
  {
    cat: "Races",
    text: "Learn about the races which live in Die Welt.",
    subcats: [
      {
        subcat: "Humans",
        content: [
          {
            key: "North folf",
            content: "§:break§Humans native to the northern parts of Die Welt.",
            tags: [
              { tag: "humans "}
            ]
          },
          {
            key: "Midland folk",
            content: "§:break§Humans native to the lower midlands of Die Welt.",
            tags: [
              { tag: "humans "}
            ]
          },
          {
            key: "Southeners",
            content: "§:break§Humans native to the warm southern regions on Die Welt.",
            tags: [
              { tag: "humans "}
            ]
          },
        ]
      },
      {
        subcat: "Elves",
          content: [
            {
              key: "Dark elves",
              content: "§:break§Dark elves seem to be kind of assholes. There used to be three tribes, but §/red/&GetCodexEntity('Characters','Enemies','Viktor Stahlhelm')&Viktor Stahlhelm§ united them and claimed the place of the chief.",
              tags: [
                { tag: "elves" },
                { tag: "viktor "}
              ]
            },
            {
              key: "Wood elves",
              content: "§:break§Wood elves used to live in Ewigerwald, in their village of §/green/&GetCodexEntity('Areas','Ewigerwald','Ewigerdorf')&Ewigerdorf§. Their whole existance was to protect the Evertree before §/red/&GetCodexEntity('Characters','Enemies','Viktor Stahlhelm')&Viktor Stahlhelm§ and the dark elves came and destroyed them. Most of the wood elves were killed in battle, but a few survived.",
              tags: [
                { tag: "elves" },
                { tag: "viktor "}
            ]
          },
        ]          
      },
      {
        subcat: "Yeeters",
          content: [
            {
              key:"Lanklets",
              content: "§:break§Lanklets are the lanky giants of the swaps, which cover parts of the southeastern midlands. Their tall builds are vital for survival in the bog.",
              tags: [

              ]
            },
            {
              key: "Dwarves",
              content: "§:break§Dwarves and their three clans habit the tall mountains in the northern parts of Die Welt.",
              tags: [

              ]
            }
          ]
          
      }
    ]
  },
  {
    cat: "Areas",
    text: "Discover the different areas in Die Welt.",
    subcats: [
      {
        subcat: "Helleria",
        content: [
          {
            key: "Hellerian Kingdom",
            content: "§:break§§/rgb(74,181,186)/Helleria§ is the largest kingdom located in the north of §/green/Vaduz§.",
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
            content: "§:break§§/gold/The bank operates on YOUR money!§",
            tags: [
              { tag: "currency" },
              { tag: "areas" },
              { tag: "rivet" }
            ]
          }
        ]
      },
      {
        subcat: "Ewigerwald",
        content: [
          {
            key: "Evertree",
            content: "§:break§Evertree on iso puu, joka itkee koska §/red/&GetCodexEntity('Characters', 'Enemies', 'Viktor Stahlhelm')&Bad Guy§ does bad guy things.",
            tags: [
              { tag: "forest" },
              { tag: "ewigerwald" },
              { tag: "bad guy" }
            ]
          },
          {
            key: "Ewigerdorf",
            content: "§:break§§:break§Ewigerdorf used to be a thriving §/gray/&GetCodexEntity('Races','Elves','Wood elves')&wood elf§ village with a kind-hearted community, but now only the ruins of this hidden place remain after the Assault on the Evertree in 230. The village was destroyed, and its people slain or kidnapped. The few remaining survivors hold great anger toward Victor Stahlhelm.§:break§§:break§ The ruins of Ewigerdorf reach around the Evertree. The wood elves built their homes to surround the sacred tree to protect its magic so vital to life on Die Welt.",
            tags: [
              { tag: "evertree"},
              { tag: "wood elf"},
              { tag: "ewigerwald"}
            ]
          }
        ]
      },
      {
        subcat: "Swamps",
        content: [
          {
            key: "Ululul",
            content: "§:break§Ululul is the home to §&GetCodexEntity('Races','Yeeters','Lanklets')&lanklets§, the giants of the swamps.",
            tags: [
              { tag: "swamp" },
              { tag: "lanklet"}
            ]
          },
          {
            key: "Swampf",
            content: "§:break§The area surrounding §&/orange/GetCodexEntity('Areas','Swamps','Ululul')&Ululul§. It's known all around Die Welt for its deadly bog in which only §&GetCodexEntity('Races','Yeeters','Lanklets')&lanklets§ thrive."
          }
        ]
      },
      {
        subcat: "North Mountains",
        content: [
          {
            key: "The Great Summits",
            content: "§:break§ The highest peaks in Die Welt. Only one clan of dwarves live near the top.",
            tags: [
              { tag: "dwarves"},
              { tag: "mountain"}
            ]
          },
          {
            key: "Harvould and surrounding areas",
            content: "§:break§The biggest of the three dwarven clans have made their homes into the tallest of the mountains, Harvould. Their city bears the same name. Another clan lives in the surrounding forest, their village dug under the ground. Their homes are a maze of carefully built tunnels only the clan can navigate in."
          }
        ]
      }
    ]
  },
  {
    cat: "Events",
    text: "What happened and when.",
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
            content: "§:break§On this fateful day, §/red/&GetCodexEntity('Characters', 'Enemies', 'Viktor Stahlhelm')&Viktor§, at the age of 26, invaded the Evertree and took its sap.§:break§§:break§ Viktor led the three great dark elf clans in a crusade against their hated enemies, the wood elves. The assault came as a surprise to the outnumbered wood elves guarding the Evertree, and their initial garrisons were overwhelmed in a few hours.§:break§§:break§ An alarm was sounded and the entire city was soon engulfed in total war, even women and children fighting to the death to defend the Evertree, for if it were to fall, all of the world would soon follow.§:break§§:break§ Though the defenders were able to stop the assault itself at the gates of the tree, Viktor and his most trusted entourage managed to breach a weak point and infiltrate the tree.§:break§§:break§ Viktor and his followers all drank the Evertree’s sap and gained immense powers, greater than any mortal should possess. They stashed as much sap as they could, and then broke out of the tree to join their army, which was nearing annihilation. §:break§§:break§ With their newly acquired powers, the leaders razed the city to the ground as they retreated with their weakened forces, taking multiple wood elf civilians and soldiers alike as their ‘trophies’.§:break§§:break§ The city was completely devastated, half of her population lying in a ditch and two thirds of her buildings in ruins."
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