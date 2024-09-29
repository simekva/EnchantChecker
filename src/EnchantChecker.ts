import { fetchAndGetAllPlayersGear } from "./FetchPlayers";
import { Gem, Gear, Player } from "./FetchPlayers";
import * as readline from "readline";

var allPlayersGear: Player[] = [];

const subOptimalEnchantIDs: number[] = [
  16, 17, 2503, 18, 1843, 15, 3329, 3329, 3329, 3329, 3329, 3330, 3330, 3330,
  3330, 3330, 2841, 2841, 2841, 2841, 2841, 2792, 2792, 2792, 2792, 2792, 3797,
  3003, 3002, 3001, 2999, 3004, 3096, 3795, 4245, 4246, 4247, 3820, 3817, 3818,
  3819, 3794, 2998, 3793, 4248, 4250, 4249, 4199, 4197, 4205, 4201, 2591, 2586,
  2588, 2584, 2590, 2585, 2587, 2589, 2583, 247, 849, 904, 1887, 2657, 4076,
  3824, 3858, 4092, 255, 66, 724, 852, 929, 2649, 2940, 2939, 3244, 911, 464,
  2658, 2656, 1593, 1600, 4071, 4101, 924, 925, 923, 2648, 4065, 3231, 4095,
  4108, 4065, 4089, 41, 723, 905, 369, 2679, 2650, 2326, 255, 851, 907, 4093,
  66, 724, 852, 929, 1886, 2649, 1891, 2661, 248, 823, 856, 927, 1885, 2647, 44,
  63, 1950, 1951, 41, 242, 254, 850, 908, 2659, 3236, 24, 246, 843, 857, 913,
  1893, 3233, 2933, 3245, 4077, 4088, 4070, 847, 866, 928, 1891, 2661, 3252,
  3832, 4063, 247, 368, 4747, 983, 783, 744, 848, 884, 1889, 2662, 3294, 4087,
  2648, 2622, 256, 2463, 3825, 4072, 65, 903, 2664, 1257, 1441, 2619, 2620,
  2938, 3243, 4064, 3256, 910, 846, 845, 909, 844, 906, 865, 904, 1887, 2564,
  1594, 3829, 3249, 3231, 4082, 2935, 3234, 2617, 2322, 2937, 2614, 2615, 2616,
  856, 927, 684, 4075, 2934, 3238, 930, 2613, 3013, 3325, 3010, 3012, 3326,
  3720, 2746, 2747, 2748, 3718, 2745, 2929, 2929, 2928, 2928, 2930, 2930, 3229,
  2655, 2653, 848, 4073, 1888, 255, 851, 907, 66, 724, 852, 929, 43, 463, 1704,
  2982, 2980, 2997, 2991, 2993, 2995, 2986, 2978, 3875, 3807, 3876, 3806, 2981,
  2979, 2983, 2977, 2996, 2990, 2992, 2994, 2606, 2605, 2604, 2564, 2646, 2646,
  1103, 1103, 2670, 1606, 1606, 2667, 3828, 241, 943, 943, 805, 963, 1896, 2443,
  723, 1904, 2568, 255, 1903, 2567, 3844, 3844, 2668, 2668, 2669, 3846, 2671,
  3830, 2672, 2672, 3855, 4067, 4067, 2675, 1900, 3273, 854, 4074, 4074, 3225,
  3251, 3251, 4084, 4084, 4083, 4083, 3239, 3239, 1898, 3241, 3241, 4066, 4066,
  2674, 1899,
];

const subOptimalEnchantNames: string[] = [
  "16 Armor",
  "24 Armor",
  "3 Def",
  "32 Armor",
  "40 Armor",
  "8 Armor",
  "Borean Kit",
  "Borean Kit",
  "Borean Kit",
  "Borean Kit",
  "Borean Kit",
  "Heavy Borean Kit",
  "Heavy Borean Kit",
  "Heavy Borean Kit",
  "Heavy Borean Kit",
  "Heavy Borean Kit",
  "Heavy Knothide Kit",
  "Heavy Knothide Kit",
  "Heavy Knothide Kit",
  "Heavy Knothide Kit",
  "Heavy Knothide Kit",
  "Knothide Kit",
  "Knothide Kit",
  "Knothide Kit",
  "Knothide Kit",
  "Knothide Kit",
  "Arcanum of Dominance",
  "Arcanum of Ferocity",
  "Arcanum of Power",
  "Arcanum of Renewal",
  "Arcanum of the Defender",
  "Arcanum of the Gladiator",
  "Arcanum of the Outcast",
  "Arcanum of Triumph",
  "Arcanum of Vicious Intellect",
  "Arcanum of Vicious Agility",
  "Arcanum of Vicious Strength",
  "Arcanum of Burning Mysteries",
  "Arcanum of Torment",
  "Arcanum of the Stalwart Protector",
  "Arcanum of Blissful Mending",
  "Inscription of Dominance",
  "Inscription of Endurance",
  "Inscription of Triumph",
  "Greater Inscription of Vicious Intellect",
  "Greater Inscription of Vicious Agility",
  "Greater Inscription of Vicious Strength",
  "Inscription of Charged Lodestone",
  "Inscription of Unbreakable Quartz",
  "Inscription of Shattered Crystal",
  "Inscription of Jagged Stone",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Head/Legs - ZG",
  "Boots - 1 Agi",
  "Boots - 3 Agi",
  "Boots - 5 Agi",
  "Boots - 7 Agi",
  "Boots - 12 Agi",
  "Boots - 35 Agi",
  "Boots - 24 AP",
  "Boots - 5 Hit",
  "Boots - 50 Hit",
  "Boots - 3 Spi",
  "Boots - 1 Sta",
  "Boots - 3 Sta",
  "Boots - 5 Sta",
  "Boots - 7 Sta",
  "Boots - 12 Sta",
  "Boots - Boar's Speed",
  "Boots - Cat's Swiftness",
  "Boots - Greater Vitality",
  "Boots - Minor Speed",
  "Boots - Mount Speed",
  "Boots - Surefooted",
  "Boots - Vitality",
  "Bracers - 24 AP",
  "Bracers - 38 AP",
  "Bracers - 50 Crit",
  "Bracers - 65 Crit",
  "Bracers - 1 Def",
  "Bracers - 2 Def",
  "Bracers - 3 Def",
  "Bracers - 12 Def",
  "Bracers - 50 Dodge",
  "Bracers - 15 Expertise",
  "Bracers - 50 Expertise",
  "Bracers - 65 Haste",
  "Bracers - 50 Haste",
  "Bracers - 50 Hit",
  "Bracers - 5 HP",
  "Bracers - 3 Int",
  "Bracers - 5 Int",
  "Bracers - 12 Int",
  "Bracers - 6 mp5",
  "Bracers - 20 SP",
  "Bracers - 23 SP",
  "Bracers - 3 Spi",
  "Bracers - 5 Spi",
  "Bracers - 7 Spi",
  "Bracers - 50 Spi",
  "Bracers - 1 Sta",
  "Bracers - 3 Sta",
  "Bracers - 5 Sta",
  "Bracers - 7 Sta",
  "Bracers - 9 Sta",
  "Bracers - 12 Sta",
  "Bracers - 4 Stats",
  "Bracers - 6 Stats",
  "Bracers - 1 Str",
  "Bracers - 3 Str",
  "Bracers - 5 Str",
  "Bracers - 7 Str",
  "Bracers - 9 Str",
  "Bracers - 12 Str",
  "Chest - 10 Absorb",
  "Chest - 25 Absorb",
  "Chest - 15 Def",
  "Chest - 16 Def",
  "Chest - 5 HP",
  "Chest - 15 HP",
  "Chest - 25 HP",
  "Chest - 35 HP",
  "Chest - 50 HP",
  "Chest - 150 HP",
  "Chest - 200 HP",
  "Chest - 5 Mana",
  "Chest - 20 Mana",
  "Chest - 30 Mana",
  "Chest - 50 Mana",
  "Chest - 65 Mana",
  "Chest - 100 Mana",
  "Chest - 250 Mana",
  "Chest - 15 Resilience",
  "Chest - 20 Resilience",
  "Chest - 40 Resilience",
  "Chest - 40 Spi",
  "Chest - 55 Sta",
  "Chest - 1 Stats",
  "Chest - 2 Stats",
  "Chest - 3 Stats",
  "Chest - 4 Stats",
  "Chest - 6 Stats",
  "Chest - 8 Stats",
  "Chest - 10 Stats",
  "Chest - 15 Stats",
  "Cloak - 1 Agi",
  "Cloak - 12 Agi",
  "Cloak - 16 Agi",
  "Cloak - 16 Agi",
  "Cloak - 10 Armor",
  "Cloak - 20 Armor",
  "Cloak - 30 Armor",
  "Cloak - 50 Armor",
  "Cloak - 70 Armor",
  "Cloak - 120 Armor",
  "Cloak - 225 Armor",
  "Cloak - 50 Crit",
  "Cloak - 12 Def",
  "Cloak - 12 Dodge",
  "Cloak - 5 FR",
  "Cloak - 7 FR",
  "Cloak - 15 Haste",
  "Cloak - 30 Int",
  "Cloak - 1 Res",
  "Cloak - 3 Res",
  "Cloak - 7 Res",
  "Cloak - 15 Res",
  "Cloak - 15 Res",
  "Cloak - 15 Res",
  "Cloak - 15 Res",
  "Cloak - 20 Spell Pen",
  "Cloak - 35 Spell Pen",
  "Cloak - 70 Spell Pen",
  "Cloak - Shadow Armor",
  "Cloak - Stealth",
  "Gloves - 5 Fishing",
  "Gloves - 3 Herb",
  "Gloves - 5 Herb",
  "Gloves - 3 Mining",
  "Gloves - 5 Mining",
  "Gloves - 5 Skinn",
  "Gloves - 5 Agi",
  "Gloves - 7 Agi",
  "Gloves - 15 Agi",
  "Gloves - 26 AP",
  "Gloves - 35 AP",
  "Gloves - 16 Crit",
  "Gloves - 15 Expertise",
  "Gloves - 50 Expertise",
  "Gloves - 15 Hit",
  "Gloves - 20 Hit",
  "Gloves - 16 SP",
  "Gloves - 19 SP",
  "Gloves - 20 SP",
  "Gloves - 20 SP",
  "Gloves - 20 SP",
  "Gloves - 20 SP",
  "Gloves - 5 Str",
  "Gloves - 7 Str",
  "Gloves - 15 Str",
  "Gloves - 35 Str",
  "Gloves - Blasting",
  "Gloves - Gatherer",
  "Gloves - Mount Speed",
  "Gloves - Threat",
  "Legs - 40Sta/12Agi",
  "Legs - 45Sta/15Agi",
  "Legs - 40AP/10Crit",
  "Legs - 50AP/12Crit",
  "Legs - 55AP/15Crit",
  "Legs - Azure Thread",
  "Legs - Golden Thread",
  "Legs - Mystic Thread",
  "Legs - Runic Thread",
  "Legs - Shining Thread",
  "Legs - Silver Thread",
  "Ring - 2 Dmg",
  "Ring - 2 Dmg",
  "Ring - 12 SP",
  "Ring - 12 SP",
  "Ring - 12 SP",
  "Ring - 12 SP",
  "Shield - 12 Resilience",
  "Shield - 15 Block",
  "Shield - 18 Block",
  "Shield - 30 Armor",
  "Shield - 160 Armor",
  "Shield - 5 Res",
  "Shield - 3 Spi",
  "Shield - 5 Spi",
  "Shield - 7 Spi",
  "Shield - 1 Sta",
  "Shield - 3 Sta",
  "Shield - 5 Sta",
  "Shield - 7 Sta",
  "Shield - Iron Spike",
  "Shield - Mith Spike",
  "Shield - Thor Spike",
  "Greater of Discipline",
  "Greater of Faith",
  "Greater of the Blade",
  "Greater of the Knight",
  "Greater of the Oracle",
  "Greater of the Orb",
  "Greater of Vengeance",
  "Greater of Warding",
  "Lesser of Axe",
  "Lesser of the Crag",
  "Lesser of the Pinnacle",
  "Lesser of the Storm",
  "Shoulder - Aldor Hon",
  "Shoulder - Aldor Hon",
  "Shoulder - Aldor Hon",
  "Shoulder - Aldor Hon",
  "Shoulder - Scryer Hon",
  "Shoulder - Scryer Hon",
  "Shoulder - Scryer Hon",
  "Shoulder - Scryer Hon",
  "Shoulder - ZG",
  "Shoulder - ZG",
  "Shoulder - ZG",
  "Weapon - 15 Agi",
  "Weapon - 25 Agi",
  "Weapon - 25 Agi",
  "Weapon - 26 Agi",
  "Weapon - 26 Agi",
  "Weapon - 35 Agi",
  "Weapon - 50 AP",
  "Weapon - 50 AP",
  "Weapon - 70 AP",
  "Weapon - 85 AP",
  "Weapon - 2 Dmg",
  "Weapon - 3 Dmg",
  "Weapon - 3 Dmg",
  "Weapon - 4 Dmg",
  "Weapon - 7 Dmg",
  "Weapon - 9 Dmg",
  "Weapon - 7 Frost",
  "Weapon - 3 Int",
  "Weapon - 9 Int",
  "Weapon - 22 Int",
  "Weapon - 3 Spi",
  "Weapon - 9 Spi",
  "Weapon - 20 Spi",
  "Weapon - 45 Spi",
  "Weapon - 45 Spi",
  "Weapon - 20 Str",
  "Weapon - 20 Str",
  "Weapon - 40 SP",
  "Weapon - 40 SP",
  "Weapon - 50 SP",
  "Weapon - 50 SP",
  "Weapon - 54 SP",
  "Weapon - 54 SP",
  "Weapon - 69 SP",
  "Weapon - Avalanche",
  "Weapon - Avalanche",
  "Weapon - Battlemaster",
  "Weapon - Crusader",
  "Weapon - Deathfrost",
  "Weapon - Elemental",
  "Weapon - Elemental Slayer",
  "Weapon - Elemental Slayer",
  "Weapon - Executioner",
  "Weapon - Giant Slayer",
  "Weapon - Giant Slayer",
  "Weapon - Heartsong",
  "Weapon - Heartsong",
  "Weapon - Hurricane",
  "Weapon - Hurricane",
  "Weapon - Icebreaker",
  "Weapon - Icebreaker",
  "Weapon - Lifesteal",
  "Weapon - Lifeward",
  "Weapon - Lifeward",
  "Weapon - Mending",
  "Weapon - Mending",
  "Weapon - Spellsurge",
  "Weapon - Unholy",
];

let illegalEnchants: string = "";

function checkEnchants() {
  let playersChecked: number = 0;
  allPlayersGear.forEach((player) => {
    player.gear.forEach((gear) => {
      if (subOptimalEnchantIDs.includes(gear.permanentEnchant)) {
        illegalEnchants +=
          player.name +
          ": " +
          gear.name +
          ". ID: " +
          +gear.id +
          ". " +
          "SUBOPTIMAL ENCHANT: " +
          subOptimalEnchantNames.at(
            subOptimalEnchantIDs.indexOf(gear.permanentEnchant)
          ) +
          ". ID: " +
          gear.permanentEnchant +
          "\n" +
          "\n";
      }
    });
    playersChecked++;
  });
  console.log("Checked " + playersChecked + "/10 players." + "\n");
}

async function GetSuboptimalEnchants(
  raidId: string,
  ApiKey: string
): Promise<string> {
  allPlayersGear = await fetchAndGetAllPlayersGear(raidId, ApiKey);
  checkEnchants();
  return illegalEnchants;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let raidId: string | undefined = "";

let apiKey: string | undefined = "";

function askQuestion(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}

async function main() {
  try {
    const raidLogUrl = await askQuestion("Input raidlogs URL: ");
    const raidId = raidLogUrl.split("/").at(4);

    if (!raidId) {
      console.log("Invalid raidlog URL.");
      return;
    }

    const apiKey = await askQuestion("Input API key: ");

    if (!apiKey) {
      console.log("API key is required.");
      return;
    }

    const result = await GetSuboptimalEnchants(raidId, apiKey);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
}

main();
