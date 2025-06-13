import { Card } from "@/types";

// King of Nothing Cards
export const kingOfNothingCards: Card[] = [
  {
    id: "nothing-castle",
    name: "Castle",
    type: "Base",
    description: "Hurls a stone projectile onto your enemies.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-castle.jpg",
  },
  {
    id: "nothing-soldier",
    name: "Soldier",
    type: "Troop",
    description: "Well-balanced melee troop.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-soldier.jpg",
  },
  {
    id: "nothing-paladin",
    name: "Paladin",
    type: "Troop",
    description: "Highly defensive melee troop.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-paladin.jpg",
  },
  {
    id: "nothing-archer",
    name: "Archer",
    type: "Troop",
    description: "Deals weak but fast ranged damage.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-archer.jpg",
  },
  {
    id: "nothing-scout-tower",
    name: "Scout Tower",
    type: "Tower",
    description: "Shoots powerful single-target arrows.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-scout-tower.jpg",
  },
  {
    id: "nothing-farm",
    name: "Farm",
    type: "Building",
    description: "Every year, adds +1 unit to one adjacent troop.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-farm.jpg",
  },
  {
    id: "nothing-wildcard",
    name: "Wildcard",
    type: "Tome",
    description: "Levels up target plot.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-wildcard.jpg",
  },
  {
    id: "nothing-blacksmith",
    name: "Blacksmith",
    type: "Building",
    description:
      "Every year, adds +2% attack damage to adjacent troops and constructions.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-blacksmith.jpg",
  },
  {
    id: "nothing-steel-coat",
    name: "Steel Coat",
    type: "Enchantment",
    description:
      "Cancels the first hit the target unit would take every battle.",
    kingId: "king-of-nothing",
    assetPath: "/assets/king-of-nothing-steel-coat.jpg",
  },
];

// King of Spells Cards
export const kingOfSpellsCards: Card[] = [
  {
    id: "spells-citadel",
    name: "Citadel",
    type: "Base",
    description: "Strikes your opponents with chaining lightning bolts.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-citadel.jpg",
  },
  {
    id: "spells-wizard",
    name: "Wizard",
    type: "Troop",
    description: "Ranged troop. Casts powerful attacks at a slow rate.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-wizard.jpg",
  },
  {
    id: "spells-warlock",
    name: "Warlock",
    type: "Troop",
    description: "Sturdy troop that deals melee area damage.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-warlock.jpg",
  },
  {
    id: "spells-static",
    name: "Static",
    type: "Enchantment",
    description:
      "Unit's attacks trigger a lightning chain. Deals +1 damage and +1 chain per stack.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-static.jpg",
  },
  {
    id: "spells-offering",
    name: "Offering",
    type: "Tome",
    description: "Destroy target plot to receive 3 random tome cards.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-offering.jpg",
  },
  {
    id: "spells-combustion",
    name: "Combustion",
    type: "Enchantment",
    description:
      "Unit causes area damage equal to 20% of its attack when it kills an enemy.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-combustion.jpg",
  },
  {
    id: "spells-shaman",
    name: "Shaman",
    type: "Troop",
    description: "Buffs allies attack damage based on its own damage.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-shaman.jpg",
  },
  {
    id: "spells-library",
    name: "Library",
    type: "Building",
    description:
      "Every year, has a 50% chance of duplicating an enchantment of one adjacent troop.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-library.jpg",
  },
  {
    id: "spells-spire",
    name: "Spire",
    type: "Tower",
    description: "Heals your units that are closest to death during battle.",
    kingId: "king-of-spells",
    assetPath: "/assets/king-of-spells-spire.jpg",
  },
];

// King of Greed Cards
export const kingOfGreedCards: Card[] = [
  {
    id: "greed-palace",
    name: "Palace",
    type: "Base",
    description:
      "Casts a ray that insta-kills target. Golden enemies drop gold.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-palace.jpg",
  },
  {
    id: "greed-beacon",
    name: "Beacon",
    type: "Building",
    description:
      "Every year, adds +2% attack speed to adjacent troops and constructions.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-beacon.jpg",
  },
  {
    id: "greed-vault",
    name: "Vault",
    type: "Building",
    description: "Receive +3 gold at the end of every year.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-vault.jpg",
  },
  {
    id: "greed-dispenser",
    name: "Dispenser",
    type: "Tower",
    description:
      "Single-target tower. Gains +1% attack speed for each 1 gold you receive.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-dispenser.jpg",
  },
  {
    id: "greed-midas-touch",
    name: "Midas Touch",
    type: "Enchantment",
    description:
      "When this troop kills, there's a 2% chance to receive 1 gold.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-midas-touch.jpg",
  },
  {
    id: "greed-mortgage",
    name: "Mortgage",
    type: "Tome",
    description:
      "Destroy target plot to receive 30 gold for each level it had.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-mortgage.jpg",
  },
  {
    id: "greed-over-invest",
    name: "Over-Invest",
    type: "Tome",
    description:
      "Spend 30 gold to increase every stat of a troop or tower by 15%.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-over-invest.jpg",
  },
  {
    id: "greed-mercenary",
    name: "Mercenary",
    type: "Troop",
    description:
      "Strong but fickle warriors for hire. You always have 1 unit for each 15 gold you own.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-mercenary.jpg",
  },
  {
    id: "greed-thief",
    name: "Thief",
    type: "Troop",
    description: "Assassin troop that jumps to enemy's backline.",
    kingId: "king-of-greed",
    assetPath: "/assets/king-of-greed-thief.jpg",
  },
];

// King of Blood Cards
export const kingOfBloodCards: Card[] = [
  {
    id: "blood-pagoda",
    name: "Pagoda",
    type: "Base",
    description: "Summons imps onto the battlefield.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-pagoda.jpg",
  },
  {
    id: "blood-bomber",
    name: "Bomber",
    type: "Troop",
    description: "Runs towards the enemy and explodes, dealing area damage.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-bomber.jpg",
  },
  {
    id: "blood-imp",
    name: "Imp",
    type: "Troop",
    description: "Fast and aggressive troop with many small units.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-imp.jpg",
  },
  {
    id: "blood-carnage",
    name: "Carnage",
    type: "Enchantment",
    description: "Unit explodes when killed, dealing 10% HP as area damage.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-carnage.jpg",
  },
  {
    id: "blood-sacrifice",
    name: "Sacrifice",
    type: "Tome",
    description: "Destroy target plot to level up adjacent plots.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-sacrifice.jpg",
  },
  {
    id: "blood-vampirism",
    name: "Vampirism",
    type: "Enchantment",
    description: "Unit's attacks heal it for 25% of damage dealt.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-vampirism.jpg",
  },
  {
    id: "blood-mangler",
    name: "Mangler",
    type: "Tower",
    description:
      "Area damage turret. Every year, sacrifices an adjacent unit per level to gain +2 damage.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-mangler.jpg",
  },
  {
    id: "blood-cemetery",
    name: "Cemetery",
    type: "Tower",
    description:
      "If an adjacent unit dies in battle, summons an imp to fight in its place.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-cemetery.jpg",
  },
  {
    id: "blood-demons-altar",
    name: "Demon's Altar",
    type: "Tower",
    description:
      "Summons one demon per level. For each dead ally, grows permanently 0.5% stronger.",
    kingId: "king-of-blood",
    assetPath: "/assets/king-of-blood-demons-altar.jpg",
  },
];

// King of Nature Cards
export const kingOfNatureCards: Card[] = [
  {
    id: "nature-treant",
    name: "Treant",
    type: "Base",
    description: "Creates a healing area on the ground.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-treant.jpg",
  },
  {
    id: "nature-mycelium",
    name: "Mycelium",
    type: "Tower",
    description:
      "Summons a fighting spore every 9 seconds in battle. Spores accumulate every battle.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-mycelium.jpg",
  },
  {
    id: "nature-clone",
    name: "Clone",
    type: "Tome",
    description: "Clone the card of the selected plot.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-clone.jpg",
  },
  {
    id: "nature-elf",
    name: "Elf",
    type: "Troop",
    description: "Ranged sniper troop. Always attacks the most distant target.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-elf.jpg",
  },
  {
    id: "nature-boar",
    name: "Boar",
    type: "Troop",
    description:
      "Can be mounted by adjacent troops. For each 1 HP it has, increases rider stats by 1%.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-boar.jpg",
  },
  {
    id: "nature-orchard",
    name: "Orchard",
    type: "Tower",
    description: "Creates roots that trap enemies. 3 roots per level.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-orchard.jpg",
  },
  {
    id: "nature-procreate",
    name: "Procreate",
    type: "Tome",
    description: "Add 9 units to the selected troop.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-procreate.jpg",
  },
  {
    id: "nature-forest",
    name: "Forest",
    type: "Building",
    description: "Every year, adds +2% HP to adjacent troops.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-forest.jpg",
  },
  {
    id: "nature-poison-vial",
    name: "Poison Vial",
    type: "Enchantment",
    description: "Unit's attacks apply 1 poison stack to the enemy.",
    kingId: "king-of-nature",
    assetPath: "/assets/king-of-nature-poison-vial.jpg",
  },
];

// King of Stone Cards
export const kingOfStoneCards: Card[] = [
  {
    id: "stone-stronghold",
    name: "Stronghold",
    type: "Base",
    description: "Summons towers that shoot nearby enemies.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-stronghold.jpg",
  },
  {
    id: "stone-cauldron",
    name: "Cauldron",
    type: "Building",
    description:
      "Adjacent plots' attacks now deal poison damage. One poison stack per level.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-cauldron.jpg",
  },
  {
    id: "stone-trebuchet",
    name: "Trebuchet",
    type: "Tower",
    description:
      "Multi-projectile tower. Shoots one extra projectile per construction in your kingdom.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-trebuchet.jpg",
  },
  {
    id: "stone-quarry",
    name: "Quarry",
    type: "Building",
    description: "Adds +2% damage to all towers and base every year.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-quarry.jpg",
  },
  {
    id: "stone-earthworks",
    name: "Earthworks",
    type: "Enchantment",
    description:
      "Unlocks target's adjacent plots. Target's cards return to your hand, up to 3 copies.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-earthworks.jpg",
  },
  {
    id: "stone-ballista",
    name: "Ballista",
    type: "Troop",
    description: "Ranged troop that shoots huge bolts with piercing damage.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-ballista.jpg",
  },
  {
    id: "stone-trapper",
    name: "Trapper",
    type: "Troop",
    description:
      "Builds traps that inflict damage. Untriggered traps accumulate between battles.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-trapper.jpg",
  },
  {
    id: "stone-wallmaker",
    name: "Wallmaker",
    type: "Building",
    description: "Builds defensive walls in your kingdom.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-wallmaker.jpg",
  },
  {
    id: "stone-flamethrower",
    name: "Flametower",
    type: "Tower",
    description:
      "A mobile tower that moves onto the battlefield to burn enemies.",
    kingId: "king-of-stone",
    assetPath: "/assets/king-of-stone-flamethrower.jpg",
  },
];

// King of Progress Cards
export const kingOfProgressCards: Card[] = [
  {
    id: "progress-mothership",
    name: "Mothership",
    type: "Base",
    description:
      "Flies toward enemies like a unit. Can be controlled on the battlefield.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-mothership.jpg",
  },
  {
    id: "progress-executioner",
    name: "Executioner",
    type: "Troop",
    description:
      "Ranged troop. Always attacks the enemy with the lowest health.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-executioner.jpg",
  },
  {
    id: "progress-defender",
    name: "Defender",
    type: "Troop",
    description:
      "Tanker unit that doesn't attack but reflects all taken damage.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-defender.jpg",
  },
  {
    id: "progress-lab-rat",
    name: "Lab Rat",
    type: "Troop",
    description:
      "Disposable melee troop. Levels up whenever adjacent plots level up, with no max level.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-lab-rat.jpg",
  },
  {
    id: "progress-concabulator",
    name: "Concabulator",
    type: "Building",
    description:
      "When this building reaches level 3, it levels up all your plots.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-concabulator.jpg",
  },
  {
    id: "progress-reinforce",
    name: "Reinforce",
    type: "Enchantment",
    description: "Unit gains +1% damage whenever any plot levels up.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-reinforce.jpg",
  },
  {
    id: "progress-precision",
    name: "Precision",
    type: "Enchantment",
    description: "Unit's first hit is always critical.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-precision.jpg",
  },
  {
    id: "progress-converter",
    name: "Converter",
    type: "Tower",
    description:
      "Turns enemies into rats fighting for you. Rats inherit Converter's stats.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-converter.jpg",
  },
  {
    id: "progress-overhaul",
    name: "Overhaul",
    type: "Tome",
    description:
      "Destroy target plot to level up two random plots. Each use, one more plot is leveled up.",
    kingId: "king-of-progress",
    assetPath: "/assets/king-of-progress-overhaul.jpg",
  },
];

// Neutral Cards
export const neutralCards: Card[] = [
  // {
  //   id: "neutral-razing",
  //   name: "Razing",
  //   type: "Tome",
  //   description: "Destroys target plot Forever. Automatically triggers a Royal Council event.",
  //   kingId: "neutral",
  //   assetPath: "/assets/razing.jpg",
  // },
  {
    id: "neutral-scapegoat",
    name: "Scapegoat",
    type: "Troop",
    description:
      "Passive backline unit. If killed in battle, generates 3 gold per level.",
    kingId: "neutral",
    assetPath: "/assets/scapegoat.jpg",
  },
  {
    id: "neutral-shrine",
    name: "Shrine",
    type: "Building",
    description:
      "Spends 9 gold every year to level up one random plot. Costs 3 less gold per level.",
    kingId: "neutral",
    assetPath: "/assets/shrine.jpg",
  },
];

// Combine all cards
export const allCards: Card[] = [
  ...kingOfNothingCards,
  ...kingOfSpellsCards,
  ...kingOfGreedCards,
  ...kingOfBloodCards,
  ...kingOfNatureCards,
  ...kingOfStoneCards,
  ...kingOfProgressCards,
  ...neutralCards,
];

// King color mapping for UI theming
export const kingColors = {
  "king-of-nothing": "nothing",
  "king-of-spells": "spells",
  "king-of-greed": "greed",
  "king-of-blood": "blood",
  "king-of-nature": "nature",
  "king-of-stone": "stone",
  "king-of-progress": "progress",
  neutral: "stone",
} as const;
