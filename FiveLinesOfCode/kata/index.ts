const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}
abstract class Tile {
  isAir() { return false; }
  isFlux() { return false; }
  isUnbreakable() { return false; }
  isPlayer() { return false; }
  isStone() { return false; }
  isBox() { return false; }
  isKey1() { return false; }
  isKey2() { return false; }
  isFallingStone() { return false; }
  isFallingBox() { return false; }
  isLock1() { return false; }
  isLock2() { return false; }
  color(g: CanvasRenderingContext2D) { return; }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    map[y][x].color(g);
  }
  isEdible() { return false; }
  isPushable() { return false; }
  moveHorizontal(dx: number) { return; }
}
class Air extends Tile {
  isAir() { return true; }
  isEdible() { return true; }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}
class Flux extends Tile {
  isFlux() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ccffcc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return true; }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}
class Unbreakable extends Tile {
  isUnbreakable() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#999999';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
class Player extends Tile {
  isPlayer() { return true; }
}
class Stone extends Tile {
  isStone() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPushable() { return true; }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
}
class Box extends Tile {
  isBox() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#8b4513';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isPushable() {
    return true;
  }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
}
class Key1 extends Tile {
  isKey1() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
}
class Key2 extends Tile {
  isKey2() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
}
class FallingStone extends Tile {
  isFallingStone() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#0000cc';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
class FallingBox extends Tile {
  isFallingBox() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#8b4513';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
class Lock1 extends Tile {
  isLock1() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#ffcc00';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}
class Lock2 extends Tile {
  isLock2() { return true; }
  color(g: CanvasRenderingContext2D) {
    g.fillStyle = '#00ccff';
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    map[y][x].color(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}


enum RawInput {
  Up,
  DOWN,
  Left,
  RIGHT,
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][];
function assertExhaustive(x: never): never {
  throw new Error('Unexpected object: ' + x);
}
function transformTile(title: RawTile) {
  switch (title) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone();
    case RawTile.FALLING_STONE:
      return new FallingStone();
    case RawTile.BOX:
      return new Box();
    case RawTile.FALLING_BOX:
      return new FallingBox();
    case RawTile.KEY1:
      return new Key1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      return assertExhaustive(title);
  }
}

function trnasformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}
function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveHorizontal(dx: number) {
  map[playery][playerx + dx].moveHorizontal(dx);
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux() || map[playery + dy][playerx] === new Air()) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1()) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}

function update() {
  handleInputs();
  updatemap();
}

function updatemap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(y, x);
    }
  }
}

function updateTile(y: number, x: number) {
  if ((map[y][x].isStone()  || map[y][x].isFallingStone()) && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingStone();
    map[y][x] = new Air();
  } else if ((map[y][x].isBox() || map[y][x].isFallingBox()) && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone();
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box();
  }
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;
  handle(): void;
}

class Right implements Input {
  isRight() {
    return true;
  }

  isLeft() {
    return false;
  }

  isUp() {
    return false;
  }

  isDown() {
    return false;
  }

  handle() {
    moveHorizontal(1);
  }
}
class Left implements Input {
  isRight() {
    return false;
  }

  isLeft() {
    return true;
  }

  isUp() {
    return false;
  }

  isDown() {
    return false;
  }

  handle() {
    moveHorizontal(-1);
  }
}
class Up implements Input {
  isRight() {
    return false;
  }

  isLeft() {
    return false;
  }

  isUp() {
    return true;
  }

  isDown() {
    return false;
  }

  handle() {
    moveVertical(-1);
  }
}

class Down implements Input {
  isRight() {
    return false;
  }

  isLeft() {
    return false;
  }

  isUp() {
    return false;
  }

  isDown() {
    return true;
  }

  handle() {
    moveVertical(1);
  }
}

function draw() {
  let g = getGraphics();

  drawMap(g);
  drawPlayer(g);
}

function getGraphics() {
  let canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
  let g = canvas.getContext('2d');

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = '#ff0000';
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  trnasformMap();
  gameLoop();
};

const LEFT_KEY = 'ArrowLeft';
const UP_KEY = 'ArrowUp';
const RIGHT_KEY = 'ArrowRight';
const DOWN_KEY = 'ArrowDown';
window.addEventListener('keydown', e => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down());
});
