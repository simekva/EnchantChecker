import axios, { AxiosResponse, AxiosError } from "axios";

interface CastsReponse {
  events: Array<any>;
}

export interface Gem {
  id: number;
}

export interface Gear {
  id: number;
  slot: number;
  gems: Gem[];
  name: string;
  permanentEnchant: number;
}

export interface Player {
  name: string;
  icon: string;
  gear: Gear[];
}

interface ApiResponse {
  entries: Player[];
}

var playersArray: Player[] = [];

const baseUrlStart = "https://www.warcraftlogs.com:443/v1/report/tables/casts/";
const baseUrlMiddle = "?translate=true&api_key=";
const baseUrlEnd = "&start=0&end=999999999999";

async function fetchFromApi(raidId: string, ApiKey: string) {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(
      baseUrlStart + raidId + baseUrlMiddle + ApiKey + baseUrlEnd
    );

    const players = response.data.entries;

    console.log(players);

    players.forEach((player: Player) => {
      console.log("Found player: " + player.name);
      playersArray.push(player);
    });
  } catch (err: AxiosError | any) {
    console.log(err.message);
  } finally {
    console.log("Found " + playersArray.length + " players.");
  }
}

// Return gear from one player based on name with itemID, itemslot, gemIDs, and enchantIDs
function getGearFromPlayerByName(name: string): Gear[] {
  const player = playersArray.find((player) => player.name == name);

  if (player) {
    return player.gear
      ? player.gear.map((gear) => ({
          id: gear.id || 0,
          slot: gear.slot || 0,
          name: gear.name || "",
          gems: gear.gems
            ? gear.gems.map((gem) => ({
                id: gem.id || 0,
              }))
            : [],
          permanentEnchant: gear.permanentEnchant || 0,
        }))
      : [];
  } else {
    return [];
  }
}

async function getAllPlayersGear(
  raidId: string,
  ApiKey: string
): Promise<Player[]> {
  await fetchFromApi(raidId, ApiKey);
  return playersArray.map((player) => ({
    playerName: player.name,
    icon: player.icon,
    name: player.name,
    gear: player.gear.map((gear) => ({
      id: gear.id || 0,
      slot: gear.slot || 0,
      name: gear.name || "",
      gems: gear.gems
        ? gear.gems.map((gem) => ({
            id: gem.id || 0,
          }))
        : [],
      permanentEnchant: gear.permanentEnchant || 0,
    })),
  }));
}

// Usage:
// async function main() {
// const allPlayersGear = await fetchAndGetAllPlayersGear();
//}
export async function fetchAndGetAllPlayersGear(
  raidId: string,
  ApiKey: string
): Promise<Player[]> {
  return getAllPlayersGear(raidId, ApiKey);
}
