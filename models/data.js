"use strict";
   var champList = {
      "Aatrox": {
         "id": 266,
         "title": "the Darkin Blade",
         "name": "Aatrox",
         "key": "Aatrox"
      },
      "Thresh": {
         "id": 412,
         "title": "the Chain Warden",
         "name": "Thresh",
         "key": "Thresh"
      },
      "Tryndamere": {
         "id": 23,
         "title": "the Barbarian King",
         "name": "Tryndamere",
         "key": "Tryndamere"
      },
      "Gragas": {
         "id": 79,
         "title": "the Rabble Rouser",
         "name": "Gragas",
         "key": "Gragas"
      },
      "Cassiopeia": {
         "id": 69,
         "title": "the Serpent's Embrace",
         "name": "Cassiopeia",
         "key": "Cassiopeia"
      },
      "Ryze": {
         "id": 13,
         "title": "the Rogue Mage",
         "name": "Ryze",
         "key": "Ryze"
      },
      "Poppy": {
         "id": 78,
         "title": "the Iron Ambassador",
         "name": "Poppy",
         "key": "Poppy"
      },
      "Sion": {
         "id": 14,
         "title": "The Undead Juggernaut",
         "name": "Sion",
         "key": "Sion"
      },
      "Annie": {
         "id": 1,
         "title": "the Dark Child",
         "name": "Annie",
         "key": "Annie"
      },
      "Nautilus": {
         "id": 111,
         "title": "the Titan of the Depths",
         "name": "Nautilus",
         "key": "Nautilus"
      },
      "Karma": {
         "id": 43,
         "title": "the Enlightened One",
         "name": "Karma",
         "key": "Karma"
      },
      "Lux": {
         "id": 99,
         "title": "the Lady of Luminosity",
         "name": "Lux",
         "key": "Lux"
      },
      "Ahri": {
         "id": 103,
         "title": "the Nine-Tailed Fox",
         "name": "Ahri",
         "key": "Ahri"
      },
      "Olaf": {
         "id": 2,
         "title": "the Berserker",
         "name": "Olaf",
         "key": "Olaf"
      },
      "Viktor": {
         "id": 112,
         "title": "the Machine Herald",
         "name": "Viktor",
         "key": "Viktor"
      },
      "Anivia": {
         "id": 34,
         "title": "the Cryophoenix",
         "name": "Anivia",
         "key": "Anivia"
      },
      "Garen": {
         "id": 86,
         "title": "The Might of Demacia",
         "name": "Garen",
         "key": "Garen"
      },
      "Singed": {
         "id": 27,
         "title": "the Mad Chemist",
         "name": "Singed",
         "key": "Singed"
      },
      "Lissandra": {
         "id": 127,
         "title": "the Ice Witch",
         "name": "Lissandra",
         "key": "Lissandra"
      },
      "Maokai": {
         "id": 57,
         "title": "the Twisted Treant",
         "name": "Maokai",
         "key": "Maokai"
      },
      "Morgana": {
         "id": 25,
         "title": "Fallen Angel",
         "name": "Morgana",
         "key": "Morgana"
      },
      "Evelynn": {
         "id": 28,
         "title": "the Widowmaker",
         "name": "Evelynn",
         "key": "Evelynn"
      },
      "Fizz": {
         "id": 105,
         "title": "the Tidal Trickster",
         "name": "Fizz",
         "key": "Fizz"
      },
      "Heimerdinger": {
         "id": 74,
         "title": "the Revered Inventor",
         "name": "Heimerdinger",
         "key": "Heimerdinger"
      },
      "Zed": {
         "id": 238,
         "title": "the Master of Shadows",
         "name": "Zed",
         "key": "Zed"
      },
      "Rumble": {
         "id": 68,
         "title": "the Mechanized Menace",
         "name": "Rumble",
         "key": "Rumble"
      },
      "Sona": {
         "id": 37,
         "title": "Maven of the Strings",
         "name": "Sona",
         "key": "Sona"
      },
      "Mordekaiser": {
         "id": 82,
         "title": "the Master of Metal",
         "name": "Mordekaiser",
         "key": "Mordekaiser"
      },
      "KogMaw": {
         "id": 96,
         "title": "the Mouth of the Abyss",
         "name": "Kog'Maw",
         "key": "KogMaw"
      },
      "Katarina": {
         "id": 55,
         "title": "the Sinister Blade",
         "name": "Katarina",
         "key": "Katarina"
      },
      "Lulu": {
         "id": 117,
         "title": "the Fae Sorceress",
         "name": "Lulu",
         "key": "Lulu"
      },
      "Ashe": {
         "id": 22,
         "title": "the Frost Archer",
         "name": "Ashe",
         "key": "Ashe"
      },
      "Karthus": {
         "id": 30,
         "title": "the Deathsinger",
         "name": "Karthus",
         "key": "Karthus"
      },
      "Alistar": {
         "id": 12,
         "title": "the Minotaur",
         "name": "Alistar",
         "key": "Alistar"
      },
      "Darius": {
         "id": 122,
         "title": "the Hand of Noxus",
         "name": "Darius",
         "key": "Darius"
      },
      "Vayne": {
         "id": 67,
         "title": "the Night Hunter",
         "name": "Vayne",
         "key": "Vayne"
      },
      "Udyr": {
         "id": 77,
         "title": "the Spirit Walker",
         "name": "Udyr",
         "key": "Udyr"
      },
      "Varus": {
         "id": 110,
         "title": "the Arrow of Retribution",
         "name": "Varus",
         "key": "Varus"
      },
      "Leona": {
         "id": 89,
         "title": "the Radiant Dawn",
         "name": "Leona",
         "key": "Leona"
      },
      "Jayce": {
         "id": 126,
         "title": "the Defender of Tomorrow",
         "name": "Jayce",
         "key": "Jayce"
      },
      "Syndra": {
         "id": 134,
         "title": "the Dark Sovereign",
         "name": "Syndra",
         "key": "Syndra"
      },
      "Pantheon": {
         "id": 80,
         "title": "the Artisan of War",
         "name": "Pantheon",
         "key": "Pantheon"
      },
      "Riven": {
         "id": 92,
         "title": "the Exile",
         "name": "Riven",
         "key": "Riven"
      },
      "Khazix": {
         "id": 121,
         "title": "the Voidreaver",
         "name": "Kha'Zix",
         "key": "Khazix"
      },
      "Corki": {
         "id": 42,
         "title": "the Daring Bombardier",
         "name": "Corki",
         "key": "Corki"
      },
      "Caitlyn": {
         "id": 51,
         "title": "the Sheriff of Piltover",
         "name": "Caitlyn",
         "key": "Caitlyn"
      },
      "Azir": {
         "id": 268,
         "title": "the Emperor of the Sands",
         "name": "Azir",
         "key": "Azir"
      },
      "Nidalee": {
         "id": 76,
         "title": "the Bestial Huntress",
         "name": "Nidalee",
         "key": "Nidalee"
      },
      "Galio": {
         "id": 3,
         "title": "the Sentinel's Sorrow",
         "name": "Galio",
         "key": "Galio"
      },
      "Kennen": {
         "id": 85,
         "title": "the Heart of the Tempest",
         "name": "Kennen",
         "key": "Kennen"
      },
      "Veigar": {
         "id": 45,
         "title": "the Tiny Master of Evil",
         "name": "Veigar",
         "key": "Veigar"
      },
      "Gnar": {
         "id": 150,
         "title": "the Missing Link",
         "name": "Gnar",
         "key": "Gnar"
      },
      "Graves": {
         "id": 104,
         "title": "the Outlaw",
         "name": "Graves",
         "key": "Graves"
      },
      "Malzahar": {
         "id": 90,
         "title": "the Prophet of the Void",
         "name": "Malzahar",
         "key": "Malzahar"
      },
      "Vi": {
         "id": 254,
         "title": "the Piltover Enforcer",
         "name": "Vi",
         "key": "Vi"
      },
      "Kayle": {
         "id": 10,
         "title": "The Judicator",
         "name": "Kayle",
         "key": "Kayle"
      },
      "Irelia": {
         "id": 39,
         "title": "the Will of the Blades",
         "name": "Irelia",
         "key": "Irelia"
      },
      "LeeSin": {
         "id": 64,
         "title": "the Blind Monk",
         "name": "Lee Sin",
         "key": "LeeSin"
      },
      "Elise": {
         "id": 60,
         "title": "The Spider Queen",
         "name": "Elise",
         "key": "Elise"
      },
      "Volibear": {
         "id": 106,
         "title": "the Thunder's Roar",
         "name": "Volibear",
         "key": "Volibear"
      },
      "Nunu": {
         "id": 20,
         "title": "the Yeti Rider",
         "name": "Nunu",
         "key": "Nunu"
      },
      "TwistedFate": {
         "id": 4,
         "title": "the Card Master",
         "name": "Twisted Fate",
         "key": "TwistedFate"
      },
      "Jax": {
         "id": 24,
         "title": "Grandmaster at Arms",
         "name": "Jax",
         "key": "Jax"
      },
      "Shyvana": {
         "id": 102,
         "title": "the Half-Dragon",
         "name": "Shyvana",
         "key": "Shyvana"
      },
      "Kalista": {
         "id": 429,
         "title": "the Spear of Vengeance",
         "name": "Kalista",
         "key": "Kalista"
      },
      "DrMundo": {
         "id": 36,
         "title": "the Madman of Zaun",
         "name": "Dr. Mundo",
         "key": "DrMundo"
      },
      "Brand": {
         "id": 63,
         "title": "the Burning Vengeance",
         "name": "Brand",
         "key": "Brand"
      },
      "Diana": {
         "id": 131,
         "title": "Scorn of the Moon",
         "name": "Diana",
         "key": "Diana"
      },
      "Sejuani": {
         "id": 113,
         "title": "the Winter's Wrath",
         "name": "Sejuani",
         "key": "Sejuani"
      },
      "Vladimir": {
         "id": 8,
         "title": "the Crimson Reaper",
         "name": "Vladimir",
         "key": "Vladimir"
      },
      "Zac": {
         "id": 154,
         "title": "the Secret Weapon",
         "name": "Zac",
         "key": "Zac"
      },
      "RekSai": {
         "id": 421,
         "title": "the Void Burrower",
         "name": "Rek'Sai",
         "key": "RekSai"
      },
      "Quinn": {
         "id": 133,
         "title": "Demacia's Wings",
         "name": "Quinn",
         "key": "Quinn"
      },
      "Akali": {
         "id": 84,
         "title": "the Fist of Shadow",
         "name": "Akali",
         "key": "Akali"
      },
      "Tristana": {
         "id": 18,
         "title": "the Megling Gunner",
         "name": "Tristana",
         "key": "Tristana"
      },
      "Hecarim": {
         "id": 120,
         "title": "the Shadow of War",
         "name": "Hecarim",
         "key": "Hecarim"
      },
      "Sivir": {
         "id": 15,
         "title": "the Battle Mistress",
         "name": "Sivir",
         "key": "Sivir"
      },
      "Lucian": {
         "id": 236,
         "title": "the Purifier",
         "name": "Lucian",
         "key": "Lucian"
      },
      "Rengar": {
         "id": 107,
         "title": "the Pridestalker",
         "name": "Rengar",
         "key": "Rengar"
      },
      "Warwick": {
         "id": 19,
         "title": "the Blood Hunter",
         "name": "Warwick",
         "key": "Warwick"
      },
      "Skarner": {
         "id": 72,
         "title": "the Crystal Vanguard",
         "name": "Skarner",
         "key": "Skarner"
      },
      "Malphite": {
         "id": 54,
         "title": "Shard of the Monolith",
         "name": "Malphite",
         "key": "Malphite"
      },
      "Yasuo": {
         "id": 157,
         "title": "the Unforgiven",
         "name": "Yasuo",
         "key": "Yasuo"
      },
      "Xerath": {
         "id": 101,
         "title": "the Magus Ascendant",
         "name": "Xerath",
         "key": "Xerath"
      },
      "Teemo": {
         "id": 17,
         "title": "the Swift Scout",
         "name": "Teemo",
         "key": "Teemo"
      },
      "Nasus": {
         "id": 75,
         "title": "the Curator of the Sands",
         "name": "Nasus",
         "key": "Nasus"
      },
      "Renekton": {
         "id": 58,
         "title": "the Butcher of the Sands",
         "name": "Renekton",
         "key": "Renekton"
      },
      "Draven": {
         "id": 119,
         "title": "the Glorious Executioner",
         "name": "Draven",
         "key": "Draven"
      },
      "Shaco": {
         "id": 35,
         "title": "the Demon Jester",
         "name": "Shaco",
         "key": "Shaco"
      },
      "Swain": {
         "id": 50,
         "title": "the Master Tactician",
         "name": "Swain",
         "key": "Swain"
      },
      "Ziggs": {
         "id": 115,
         "title": "the Hexplosives Expert",
         "name": "Ziggs",
         "key": "Ziggs"
      },
      "Janna": {
         "id": 40,
         "title": "the Storm's Fury",
         "name": "Janna",
         "key": "Janna"
      },
      "Talon": {
         "id": 91,
         "title": "the Blade's Shadow",
         "name": "Talon",
         "key": "Talon"
      },
      "Orianna": {
         "id": 61,
         "title": "the Lady of Clockwork",
         "name": "Orianna",
         "key": "Orianna"
      },
      "FiddleSticks": {
         "id": 9,
         "title": "the Harbinger of Doom",
         "name": "Fiddlesticks",
         "key": "FiddleSticks"
      },
      "Fiora": {
         "id": 114,
         "title": "the Grand Duelist",
         "name": "Fiora",
         "key": "Fiora"
      },
      "Rammus": {
         "id": 33,
         "title": "the Armordillo",
         "name": "Rammus",
         "key": "Rammus"
      },
      "Chogath": {
         "id": 31,
         "title": "the Terror of the Void",
         "name": "Cho'Gath",
         "key": "Chogath"
      },
      "Leblanc": {
         "id": 7,
         "title": "the Deceiver",
         "name": "LeBlanc",
         "key": "Leblanc"
      },
      "Soraka": {
         "id": 16,
         "title": "the Starchild",
         "name": "Soraka",
         "key": "Soraka"
      },
      "Zilean": {
         "id": 26,
         "title": "the Chronokeeper",
         "name": "Zilean",
         "key": "Zilean"
      },
      "Nocturne": {
         "id": 56,
         "title": "the Eternal Nightmare",
         "name": "Nocturne",
         "key": "Nocturne"
      },
      "Jinx": {
         "id": 222,
         "title": "the Loose Cannon",
         "name": "Jinx",
         "key": "Jinx"
      },
      "Yorick": {
         "id": 83,
         "title": "the Gravedigger",
         "name": "Yorick",
         "key": "Yorick"
      },
      "Urgot": {
         "id": 6,
         "title": "the Headsman's Pride",
         "name": "Urgot",
         "key": "Urgot"
      },
      "MissFortune": {
         "id": 21,
         "title": "the Bounty Hunter",
         "name": "Miss Fortune",
         "key": "MissFortune"
      },
      "MonkeyKing": {
         "id": 62,
         "title": "the Monkey King",
         "name": "Wukong",
         "key": "MonkeyKing"
      },
      "Blitzcrank": {
         "id": 53,
         "title": "the Great Steam Golem",
         "name": "Blitzcrank",
         "key": "Blitzcrank"
      },
      "Shen": {
         "id": 98,
         "title": "Eye of Twilight",
         "name": "Shen",
         "key": "Shen"
      },
      "Braum": {
         "id": 201,
         "title": "the Heart of the Freljord",
         "name": "Braum",
         "key": "Braum"
      },
      "XinZhao": {
         "id": 5,
         "title": "the Seneschal of Demacia",
         "name": "Xin Zhao",
         "key": "XinZhao"
      },
      "Twitch": {
         "id": 29,
         "title": "the Plague Rat",
         "name": "Twitch",
         "key": "Twitch"
      },
      "MasterYi": {
         "id": 11,
         "title": "the Wuju Bladesman",
         "name": "Master Yi",
         "key": "MasterYi"
      },
      "Taric": {
         "id": 44,
         "title": "the Gem Knight",
         "name": "Taric",
         "key": "Taric"
      },
      "Amumu": {
         "id": 32,
         "title": "the Sad Mummy",
         "name": "Amumu",
         "key": "Amumu"
      },
      "Gangplank": {
         "id": 41,
         "title": "the Saltwater Scourge",
         "name": "Gangplank",
         "key": "Gangplank"
      },
      "Trundle": {
         "id": 48,
         "title": "the Troll King",
         "name": "Trundle",
         "key": "Trundle"
      },
      "Kassadin": {
         "id": 38,
         "title": "the Void Walker",
         "name": "Kassadin",
         "key": "Kassadin"
      },
      "Velkoz": {
         "id": 161,
         "title": "the Eye of the Void",
         "name": "Vel'Koz",
         "key": "Velkoz"
      },
      "Zyra": {
         "id": 143,
         "title": "Rise of the Thorns",
         "name": "Zyra",
         "key": "Zyra"
      },
      "Nami": {
         "id": 267,
         "title": "the Tidecaller",
         "name": "Nami",
         "key": "Nami"
      },
      "JarvanIV": {
         "id": 59,
         "title": "the Exemplar of Demacia",
         "name": "Jarvan IV",
         "key": "JarvanIV"
      },
      "Ezreal": {
         "id": 81,
         "title": "the Prodigal Explorer",
         "name": "Ezreal",
         "key": "Ezreal"
      }
   };


   var newChampion = {
      key:"",
      name:"",
      roleTitle:""//leave blank
   };

   var roleList =  {
	'Top':'TOP',
	'Middle' : 'MIDDLE',
	'Support': 'DUO_SUPPORT',
	'ADC': 'DUO_CARRY',
	'Jungle': 'JUNGLE',
   'top':'TOP',
   'middle' : 'MIDDLE',
   'support': 'DUO_SUPPORT',
   'adc': 'DUO_CARRY',
   'jungle': 'JUNGLE',
   'adcsupport': 'ADCSUPPORT',
   'synergy':'SYNERGY'
	};

	var roleKey =  {
	'TOP':'Top',
	'MIDDLE' : 'Middle',
	'DUO_SUPPORT': 'Support',
	'DUO_CARRY': 'ADC',
	'JUNGLE': 'Jungle',
   'ADCSUPPORT': 'adcsupport',
   'SYNERGY':'synergy'
	};



   var determineKey = function(id){
      for(var champ in champList){
         if(champList.hasOwnProperty(champ)){
            if(id === champList[champ].id){
               return champList[champ].key;
            }
         }
      }
   };

   var core = {
      updating : (process.env.NODE_ENV === 'updating'),
      gamesAnalyzed:"3,134,260",
      patch:"5.4",
      ddPatch:"5.4.1",
      patchHistory: ["4.21","5.1","5.2","5.3","5.4"],
      masteryOrder: ['Offense','Defense','Utility']
   };

   exports.core = core;
   exports.newChampion = newChampion;
   exports.champList = champList;
   exports.roleList = roleList;
   exports.roleKey = roleKey;
   exports.determineKey = determineKey;
