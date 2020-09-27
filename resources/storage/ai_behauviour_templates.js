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
              attack_enemy: 10
            }
          },
          {
            key: "fighter",
            behavior: {
              buff_self: 10,
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
              attack_enemy: 10
            }
          },
          {
            key: "fighter",
            behavior: {
              buff_self: 10,
              attack_enemy: 70
            }
          }
        ]
      }
    ]
  }
];