const ai_templates = [
  {
    for: "Goblin",
    class_templates: [
      {
        key: "Warrior",
        ai_templates: [
          {
            key: "taunter",
            behavior: {
              buff_self: 50,
              attack_enemy: 30
            }
          },
          {
            key: "fighter",
            behavior: {
              buff_self: 30,
              attack_enemy: 50
            }
          }
        ]
      }
    ]
  },
  {
    for: "Goblin King",
    class_templates: [
      {
        key: "Brawler",
        ai_templates: [
          {
            key: "taunter",
            behavior: {
              buff_self: 60,
              attack_enemy: 35
            }
          },
          {
            key: "fighter",
            behavior: {
              buff_self: 35,
              attack_enemy: 70
            }
          }
        ]
      }
    ]
  }
];