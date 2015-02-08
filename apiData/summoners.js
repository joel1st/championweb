//https://oce.api.pvp.net/api/lol/static-data/oce/v1.2/summoner-spell?spellData=cooldown,sanitizedDescription&api_key=

module.exports = {
SummonerBoost: {
name: "Cleanse",
description: "Removes all disables and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
sanitizedDescription: "Removes all disables and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
cooldown: [
210
],
summonerLevel: 6,
id: 1,
key: "SummonerBoost"
},
SummonerTeleport: {
name: "Teleport",
description: "After channeling for 3.5 seconds, teleports your champion to target allied structure, minion, or ward.",
sanitizedDescription: "After channeling for 3.5 seconds, teleports your champion to target allied structure, minion, or ward.",
cooldown: [
300
],
summonerLevel: 6,
id: 12,
key: "SummonerTeleport"
},
SummonerPoroRecall: {
name: "To the King!",
description: "Quickly travel to the Poro King's side.",
sanitizedDescription: "Quickly travel to the Poro King's side.",
cooldown: [
10
],
summonerLevel: 1,
id: 30,
key: "SummonerPoroRecall"
},
SummonerDot: {
name: "Ignite",
description: "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
sanitizedDescription: "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
cooldown: [
180
],
summonerLevel: 10,
id: 14,
key: "SummonerDot"
},
SummonerHaste: {
name: "Ghost",
description: "Your champion can move through units and has 27% increased Movement Speed for 10 seconds",
sanitizedDescription: "Your champion can move through units and has 27% increased Movement Speed for 10 seconds",
cooldown: [
210
],
summonerLevel: 1,
id: 6,
key: "SummonerHaste"
},
SummonerHeal: {
name: "Heal",
description: "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
sanitizedDescription: "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
cooldown: [
300
],
summonerLevel: 1,
id: 7,
key: "SummonerHeal"
},
SummonerRevive: {
name: "Revive",
description: "Instantly revives your champion at your team's Summoner Platform and increases their Movement Speed for a short duration.",
sanitizedDescription: "Instantly revives your champion at your team's Summoner Platform and increases their Movement Speed for a short duration.",
cooldown: [
510
],
summonerLevel: 1,
id: 10,
key: "SummonerRevive"
},
SummonerSmite: {
name: "Smite",
description: "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
sanitizedDescription: "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
cooldown: [
90
],
summonerLevel: 10,
id: 11,
key: "SummonerSmite"
},
SummonerExhaust: {
name: "Exhaust",
description: "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.",
sanitizedDescription: "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.",
cooldown: [
210
],
summonerLevel: 4,
id: 3,
key: "SummonerExhaust"
},
SummonerPoroThrow: {
name: "Poro Toss",
description: "Throw a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
sanitizedDescription: "Throw a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
cooldown: [
20
],
summonerLevel: 1,
id: 31,
key: "SummonerPoroThrow"
},
SummonerMana: {
name: "Clarity",
description: "Restores 40% of your champion's maximum Mana. Also restores allies for 40% of their maximum Mana",
sanitizedDescription: "Restores 40% of your champion's maximum Mana. Also restores allies for 40% of their maximum Mana",
cooldown: [
180
],
summonerLevel: 1,
id: 13,
key: "SummonerMana"
},
SummonerBarrier: {
name: "Barrier",
description: "Shields your champion for 115-455 (depending on champion level) for 2 seconds.",
sanitizedDescription: "Shields your champion for 115-455 (depending on champion level) for 2 seconds.",
cooldown: [
210
],
summonerLevel: 4,
id: 21,
key: "SummonerBarrier"
},
SummonerClairvoyance: {
name: "Clairvoyance",
description: "Reveals a small area of the map for your team for 5 seconds.",
sanitizedDescription: "Reveals a small area of the map for your team for 5 seconds.",
cooldown: [
55
],
summonerLevel: 8,
id: 2,
key: "SummonerClairvoyance"
},
SummonerFlash: {
name: "Flash",
description: "Teleports your champion a short distance toward your cursor's location.",
sanitizedDescription: "Teleports your champion a short distance toward your cursor's location.",
cooldown: [
300
],
summonerLevel: 8,
id: 4,
key: "SummonerFlash"
},
SummonerOdinGarrison: {
name: "Garrison",
description: "Allied Turret: Grants massive regeneration for 8 seconds. Enemy Turret: Reduces damage dealt by 80% for 8 seconds.",
sanitizedDescription: "Allied Turret: Grants massive regeneration for 8 seconds. Enemy Turret: Reduces damage dealt by 80% for 8 seconds.",
cooldown: [
210
],
summonerLevel: 1,
id: 17,
key: "SummonerOdinGarrison"
}
};