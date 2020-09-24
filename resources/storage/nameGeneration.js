'use strict';

const CreateName = (char)=>{
  for(let cat of names) {
    if(char.race.key.indexOf(cat.key) != -1) {
      for(let pool of cat.pools) {
        console.log(pool.pool);
        if(pool.pool == char.namePool) {
          let nameString = `${pool.names[Random(pool.names.length)]} the ${char.name}`;
          console.log(nameString);
          return nameString;
        }
      }
    }
  }
}


// All of these names are placeholders, used for testing.
const names = [
  {
    key: "Goblin",
    pools: [
      {
        pool: "men",
        names: [
          "Wuigs",
          "Breg",
          "Biang",
          "Fucs",
          "Gus",
          "Uhkalx",
          "Chaaklusz",
          "Starkos",
          "Pruirtalx",
          "Dulsyrx",
          "Xuis",
          "Iats",
          "Gralx",
          "Vreag",
          "Kikt",
          "Zidurt",
          "Slivrikt",
          "Glagmog",
          "Fiveang",
          "Iobkalx",
          "Brusb",
          "Grasz",
          "Vegz",
          "Frulx",
          "Krioz",
          "Hodnard",
          "Craazet",
          "Juiveecs",
          "Keettiats",
          "Vruirlact"
        ]
      },
      {
        pool: "women",
        names: [
          "Penx",
          "Kolt",
          "Sweanq",
          "Stiofs",
          "Vreels",
          "Capvyf",
          "Taarmiq",
          "Braaruq",
          "Phurees",
          "Fulalkai",
          "Swuldai",
          "Gafee",
          "Flilma",
          "Gief",
          "Tronq",
          "Klepolk",
          "Brobuh",
          "Shieldoizzia",
          "Fieftuh",
          "Bhekuft",
          "Trelme",
          "Srosee",
          "Theft",
          "Lun",
          "Daz",
          "Boirkofai",
          "Wutulk",
          "Chosrishee",
          "Leesbarxe",
          "Jolkinq"
        ]
      }
    ]
  }
];