'use strict';

// This file is used to create the tile map and move around it

const map = Element('map');
const ctx = map.getContext('2d');
var canMove = true;

let int = 0;

// Gets the int of a map based on its key
function GetMap(key) {
  for (let i = 0; i < mapArrays.length; i++) {
    if (mapArrays[i].key == key) int = i;
  }
}

// Creates the initial map
function DrawMap() {
  GetMap(characters.player.map);
  for (let y = 0; y < mapArrays[int].map.length; y++) {
    for (let x = 0; x < mapArrays[int].map[y].length; x++) {
      setImage(x, y);
      function setImage(x, y) {
        let img = new Image();
        switch (mapArrays[int].map[y][x]) {
          case 9:
            img.src = "resources/images/tiles/" + global.tile_pack + "/forbidden_tile.png";
            break;
          case 0:
            img.src = "resources/images/tiles/" + global.tile_pack + "/water_tile.png";
            break;
          case 1:
            img.src = "resources/images/tiles/" + global.tile_pack + "/grass_tile.png";
            break;
          case 2:
            img.src = "resources/images/tiles/" + global.tile_pack + "/cobble_tile.png";
            break;
          case 3:
            img.src = "resources/images/tiles/" + global.tile_pack + "/tree_tile.png";
            break;
        }
        img.onload = function () {
          ctx.drawImage(img, x * 80, y * 80, 80, 80);
          if (characters.player.cords.x == x && characters.player.cords.y == y && !characters.player.lit) DrawPlayer();
          else if (characters.player.cords.x == x && characters.player.cords.y == y && characters.player.lit) DrawPlayerHighlight();
        }
      }
    }
  }
}

// Draws the player character over an existing tile
function DrawPlayer() {
  let img = new Image();
  img.src = "resources/images/tiles/" + global.tile_pack + "/player_tile.png";
  img.onload = function () {
    ctx.drawImage(img, characters.player.cords.x * 80, characters.player.cords.y * 80, 80, 80);
  }
}

// Draws the player character over an existing tile with a highlight.
function DrawPlayerHighlight() {
  let img = new Image();
  img.src = "resources/images/tiles/" + global.tile_pack + "/playerHighlight_tile.png";
  img.onload = function () {
    ctx.drawImage(img, characters.player.cords.x * 80, characters.player.cords.y * 80, 80, 80);
  }
}

window.addEventListener("keydown", movement);

function NotMoveKey(key) {
  if (key != "w" && key != "a" && key != "s" && key != "d" && key != "ArrowUp" && key != "ArrowLeft" && key != "ArrowDown" && key != "ArrowRight") return true;
  else return false;
}

function ResetMove() {
  canMove = true;
}

// Dictates the player character's movement
function movement(e) {
  if(global.onmap == false) return;
  if(!canMove) return;
  // Rejecting incorrect inputs
  if (NotMoveKey(e.key) && e.key != " " && e.key != "Enter") return
  // Enter is the "map action", if the tile has an action it will be performed
  if (e.key == "Enter") MapAction(characters.player.cords.x, characters.player.cords.y);
  // Toggle highlight
  else if (e.key == " ") {
    DrawImage(characters.player.cords.x, characters.player.cords.y);
    characters.player.lit = !characters.player.lit;
  }
  else if (e.key == "w" || e.key == "ArrowUp") {
    DrawImage(characters.player.cords.x, characters.player.cords.y);
    if (CanWalk(characters.player.cords.x, characters.player.cords.y - 1) && characters.player.cords.y - 1 > -1) characters.player.cords.y--;
    if (CanWalk(characters.player.cords.x, characters.player.cords.y - 1) && characters.player.cords.y - 1 > -1) {
      global.time += 5;
      canMove = false;
      setTimeout(ResetMove, 300);
    } 
  }
  else if (e.key == "s" || e.key == "ArrowDown") {
    DrawImage(characters.player.cords.x, characters.player.cords.y);
    if (CanWalk(characters.player.cords.x, characters.player.cords.y + 1) != 0 && characters.player.cords.y + 1 < 10) characters.player.cords.y++;
    if (CanWalk(characters.player.cords.x, characters.player.cords.y + 1) != 0 && characters.player.cords.y + 1 < 10) {
      global.time += 5;
      canMove = false;
      setTimeout(ResetMove, 300);
    } 

  }
  else if (e.key == "a" || e.key == "ArrowLeft") {
    DrawImage(characters.player.cords.x, characters.player.cords.y);
    if (CanWalk(characters.player.cords.x - 1, characters.player.cords.y) && characters.player.cords.x - 1 > -1) characters.player.cords.x--;
    if (CanWalk(characters.player.cords.x - 1, characters.player.cords.y) && characters.player.cords.x - 1 > -1) {
      global.time += 5;
      canMove = false;
      setTimeout(ResetMove, 300);
    } 
  }
  else if (e.key == "d" || e.key == "ArrowRight") {
    DrawImage(characters.player.cords.x, characters.player.cords.y);
    if (CanWalk(characters.player.cords.x + 1, characters.player.cords.y) && characters.player.cords.x + 1 < 16) characters.player.cords.x++;
    if (CanWalk(characters.player.cords.x + 1, characters.player.cords.y) && characters.player.cords.x + 1 < 16) {
      global.time += 5;
      canMove = false;
      setTimeout(ResetMove, 300);
    } 
  }
  GlobalUpdate();
  if (!characters.player.lit && e.key != "Enter") DrawPlayer();
  else if (characters.player.lit && e.key != "Enter") DrawPlayerHighlight();
}

function CanWalk(x, y) {
  // I don't know why, but it just works like this.
  if ((!mapArrays[int].map[y]) || !mapArrays[int].map[y][x]) return false;
  if (parseInt(mapArrays[int].map[y][x]) == 0) return false;
  else if (parseInt(mapArrays[int].map[y][x]) == 9) return false;
  else return true;
}

// Draws a single tile again, used while moving
function DrawImage(x, y) {
  let img = new Image();
  switch (mapArrays[int].map[y][x]) {
    case 0:
      img.src = "resources/images/tiles/" + global.tile_pack + "/water_tile.png";
      break;
    case 1:
      img.src = "resources/images/tiles/" + global.tile_pack + "/grass_tile.png";
      break;
    case 2:
      img.src = "resources/images/tiles/" + global.tile_pack + "/cobble_tile.png";
      break;
    case 3:
      img.src = "resources/images/tiles/" + global.tile_pack + "/tree_tile.png";
      break;
  }
  img.onload = function () {
    ctx.drawImage(img, x * 80, y * 80, 80, 80);
  }
}

DrawMap();