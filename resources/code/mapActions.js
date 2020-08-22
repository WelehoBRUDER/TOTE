'use strict';

// This file is used to execute map actions, and must thus be loaded after map

function MapAction(x, y) {
  IsEntrance(x, y);
  switch (mapArrays[int].map[y][x]) {
    case 2:
      console.log('You are standing on cobblestone!');
      break;
    case 3:
      console.log('Tree of Wisdom!');
      break;
  }
}


function IsEntrance(x, y) {
  console.log("!");
  for (let i = 0; i < mapArrays[int].entrances.length; i++) {
    console.log(int);
    console.log(mapArrays[int].entrances[i]);
    if (mapArrays[int].entrances[i].x == x && mapArrays[int].entrances[i].y == y) {
      characters.player.map = mapArrays[int].entrances[i].tar;
      characters.player.cords.x = mapArrays[int].entrances[i].tarX;
      characters.player.cords.y = mapArrays[int].entrances[i].tarY;
      DrawMap();
      return;
    }
  }
}