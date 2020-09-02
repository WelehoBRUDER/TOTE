'use strict';

// This file is used to execute map actions, and must thus be loaded after map

function MapAction(x, y) {
  IsEntrance(x, y);
  switch (mapArrays[int].map[y][x]) {
    case 2:
      break;
    case 3:
      break;
  }
}


function IsEntrance(x, y) {
  for (let i = 0; i < mapArrays[int].entrances.length; i++) {
    if (mapArrays[int].entrances[i].x == x && mapArrays[int].entrances[i].y == y) {
      characters.player.map = mapArrays[int].entrances[i].tar;
      characters.player.cords.x = mapArrays[int].entrances[i].tarX;
      characters.player.cords.y = mapArrays[int].entrances[i].tarY;
      global.time.minute += 10;
      GlobalUpdate();
      DrawMap();
      return;
    }
  }
}