'use strict';

let px = 8;
let py = 4;

const map = Element('map');
const ctx = map.getContext('2d');
function DrawMap() {
  for (let y = 0; y < mapArray.length; y++) {
    for (let x = 0; x < mapArray[y].length; x++) {
      // // if(parseInt(mapArray[y][x]) == 0) img.src = "resources/images/tiles/water_tile.png";
      // // if(parseInt(mapArray[y][x]) == 1) img.src = "resources/images/tiles/grass_tile.png";
      // // if(parseInt(mapArray[y][x]) == 2) img.src = "resources/images/tiles/cobble_tile.png";
      // // if(parseInt(mapArray[y][x]) == 3) img.src = "resources/images/tiles/tree_tile.png";
      // img.src = GetImg();
      // console.log(x, y);
      // ctx.drawImage(img, x*80, y*80);
      setImage(x, y);
      function setImage(x, y) {
        let img = new Image();
        switch (mapArray[y][x]) {
          case 9:
            img.src = "resources/images/tiles/forbidden_tile.png";
            break;
          case 0:
            img.src = "resources/images/tiles/water_tile.png";
            break;
          case 1:
            img.src = "resources/images/tiles/grass_tile.png";
            break;
          case 2:
            img.src = "resources/images/tiles/cobble_tile.png";
            break;
          case 3:
            img.src = "resources/images/tiles/tree_tile.png";
            break;
        }
        img.onload = function () {
          ctx.drawImage(img, x * 80, y * 80);
          if (px == x && py == y) DrawPlayer();
        }
      }
    }
  }
}

function DrawPlayer() {
  let img = new Image();
  img.src = "resources/images/tiles/player_tile.png";
  img.onload = function () {
    ctx.drawImage(img, px * 80, py * 80);
  }
}

window.addEventListener("keydown", movement);

function movement(e) {
  if (e.key == "w" || e.key == "ArrowUp") {
    DrawImage(px, py);
    if (CanWalk(px, py - 1) && py - 1 > -1) py--;

  }
  else if (e.key == "s" || e.key == "ArrowDown") {
    DrawImage(px, py);
    if (CanWalk(px, py + 1) != 0 && py + 1 < 10) py++;

  }
  else if (e.key == "a" || e.key == "ArrowLeft") {
    DrawImage(px, py);
    if (CanWalk(px - 1, py) && px - 1 > -1) px--;

  }
  else if (e.key == "d" || e.key == "ArrowRight") {
    DrawImage(px, py);
    if (CanWalk(px + 1, py) && px + 1 < 16) px++;

  }
  DrawPlayer();
}

function CanWalk(x, y) {
  // I don't know why, but it just works like this.
  if((!mapArray[y]) || !mapArray[y][x]) return false;
  if (parseInt(mapArray[y][x]) == 0) return false;
  else if (parseInt(mapArray[y][x]) == 9) return false;
  else return true;
}

function DrawImage(x, y) {
  let img = new Image();
  switch (mapArray[y][x]) {
    case 0:
      img.src = "resources/images/tiles/water_tile.png";
      break;
    case 1:
      img.src = "resources/images/tiles/grass_tile.png";
      break;
    case 2:
      img.src = "resources/images/tiles/cobble_tile.png";
      break;
    case 3:
      img.src = "resources/images/tiles/tree_tile.png";
      break;
  }
  img.onload = function () {
    ctx.drawImage(img, x * 80, y * 80);
  }
}

DrawMap();