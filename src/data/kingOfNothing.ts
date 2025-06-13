import { King, Card } from "@/types";

export const kingOfNothingCards: Card[] = [
  {
    id: "nothing-castle",
    name: "Castle",
    type: "Base",
    description:
      "Base card. Its active skill makes the player shoot boulders that cause fixed AoE damage to enemies.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-castle.jpg",
    stats: {
      health: 100,
      damage: 25,
      range: 3,
    },
    effects: [
      {
        type: "active_ability",
        value: "boulder_attack",
        description: "Shoots boulders with AoE damage",
      },
    ],
  },
  {
    id: "nothing-soldier",
    name: "Soldier",
    type: "Troop",
    description:
      "Well balanced melee unit with standard attacks. Troop starts with 9 units. Gains 3 extra units and a stat increment every level up.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-soldier.jpg",
    stats: {
      units: 9,
      damage: 10,
      health: 15,
      range: 1,
    },
    effects: [
      {
        type: "level_scaling",
        value: "+3 units per level",
        description: "Gains 3 extra units and stat increment per level",
      },
    ],
  },
  {
    id: "nothing-paladin",
    name: "Paladin",
    type: "Troop",
    description:
      "Highly defensive melee unit. Troop starts with 3 units. Gains 3 extra units and a stat increment every level up.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-paladin.jpg",
    stats: {
      units: 3,
      damage: 15,
      health: 40,
      range: 1,
    },
    effects: [
      {
        type: "level_scaling",
        value: "+3 units per level",
        description: "Gains 3 extra units and stat increment per level",
      },
      {
        type: "defensive",
        value: "high_armor",
        description: "Highly defensive unit with increased survivability",
      },
    ],
  },
  {
    id: "nothing-archer",
    name: "Archer",
    type: "Troop",
    description:
      "Deals weak but fast ranged damage. Troop starts with 9 units. Gains 3 extra units and a stat increment every level up.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-archer.jpg",
    stats: {
      units: 9,
      damage: 8,
      health: 10,
      range: 3,
    },
    effects: [
      {
        type: "level_scaling",
        value: "+3 units per level",
        description: "Gains 3 extra units and stat increment per level",
      },
      {
        type: "ranged_attack",
        value: "fast_attack_speed",
        description: "Fast but weak ranged attacks",
      },
    ],
  },
  {
    id: "nothing-scout-tower",
    name: "Scout Tower",
    type: "Tower",
    description: "Shoots powerful single-target arrows.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-scout-tower.jpg",
    stats: {
      damage: 30,
      range: 4,
      health: 50,
    },
    effects: [
      {
        type: "single_target",
        value: "high_damage",
        description: "Powerful single-target ranged attacks",
      },
    ],
  },
  {
    id: "nothing-farm",
    name: "Farm",
    type: "Building",
    description: "Every turn, adds +1 unit to one adjacent army.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-farm.jpg",
    stats: {
      health: 30,
    },
    effects: [
      {
        type: "passive_buff",
        value: "+1 unit per turn",
        description: "Adds +1 unit to adjacent army each turn",
      },
      {
        type: "adjacency",
        value: "troop_boost",
        description: "Must be adjacent to troop cards to function",
      },
    ],
  },
  {
    id: "nothing-blacksmith",
    name: "Blacksmith",
    type: "Building",
    description:
      "Every turn, adds +2% attack damage to adjacent units and towers.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-blacksmith.jpg",
    stats: {
      health: 35,
    },
    effects: [
      {
        type: "passive_buff",
        value: "+2% attack per turn",
        description: "Increases attack damage of adjacent units and towers",
      },
      {
        type: "adjacency",
        value: "damage_boost",
        description: "Affects adjacent units and towers",
      },
    ],
  },
  {
    id: "nothing-wildcard",
    name: "Wildcard",
    type: "Tome",
    description: "Levels up target plot.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-wildcard.jpg",
    effects: [
      {
        type: "instant_effect",
        value: "level_up_plot",
        description: "Instantly levels up the target plot",
      },
    ],
  },
  {
    id: "nothing-steel-coat",
    name: "Steel Coat",
    type: "Enchantment",
    description: "Cancels the first hit this unit would take every battle.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-steel-coat.jpg",
    effects: [
      {
        type: "defensive_enchantment",
        value: "first_hit_immunity",
        description: "Negates the first hit taken each battle",
      },
    ],
  },
];

export const kingOfNothing: King = {
  id: "king-of-nothing",
  name: "King of Nothing",
  archetype: "Balanced Starter",
  difficulty: "Beginner",
  description:
    "The King of Nothing is an all-around balanced king with a straightforward set of cards. It is considered the best deck for newcomers due to its simple mechanics and lack of reliance on specialized strategies. While it lacks standout combos or power spikes, it makes up for it with consistency and versatility.",
  cardPool: kingOfNothingCards,
  uniqueDecrees: [],
  perkTree: [],
  assets: {
    portrait: "/assets/king-of-nothing-king.jpg",
    cards: {
      "nothing-castle": "/assets/king-of-nothing-castle.jpg",
      "nothing-soldier": "/assets/king-of-nothing-soldier.jpg",
      "nothing-paladin": "/assets/king-of-nothing-paladin.jpg",
      "nothing-archer": "/assets/king-of-nothing-archer.jpg",
      "nothing-scout-tower": "/assets/king-of-nothing-scout-tower.jpg",
      "nothing-farm": "/assets/king-of-nothing-farm.jpg",
      "nothing-blacksmith": "/assets/king-of-nothing-blacksmith.jpg",
      "nothing-wildcard": "/assets/king-of-nothing-wildcard.jpg",
      "nothing-steel-coat": "/assets/king-of-nothing-steel-coat.jpg",
    },
  },
};
