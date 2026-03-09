import BasePuzzleScene from "./BasePuzzleScene.js";

const drawNode = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillCircle(x, y, 24);
  g.fillStyle(0xffffff, 0.25);
  g.fillCircle(x - 7, y - 7, 8);
};

const drawResistorTop = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 54, y - 22, 108, 44, 16);
  g.fillStyle(0x3d3025, 0.95);
  g.fillRect(x - 18, y - 22, 10, 44);
  g.fillStyle(0xaf5d2f, 0.95);
  g.fillRect(x + 2, y - 22, 10, 44);
};

const drawResistorBottom = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 54, y - 22, 108, 44, 16);
  g.fillStyle(0x202934, 0.92);
  g.fillRect(x - 24, y - 22, 10, 44);
  g.fillStyle(0xd3b45f, 0.95);
  g.fillRect(x + 6, y - 22, 10, 44);
};

const drawLinkWire = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 58, y - 9, 116, 18, 9);
  g.fillCircle(x - 58, y, 9);
  g.fillCircle(x + 58, y, 9);
};

const drawDecor = (decor) => {
  decor.fillStyle(0x183543, 1);
  decor.fillRoundedRect(350, 90, 580, 310, 24);
  decor.fillStyle(0x20495a, 1);
  decor.fillRoundedRect(374, 114, 532, 262, 18);

  decor.fillStyle(0x7fb6b5, 1);
  decor.fillRoundedRect(430, 168, 300, 16, 8);
  decor.fillRoundedRect(430, 304, 300, 16, 8);
  decor.fillRoundedRect(422, 174, 16, 136, 8);
  decor.fillRoundedRect(722, 174, 16, 136, 8);

  decor.fillStyle(0xd9b482, 1);
  decor.fillRoundedRect(510, 170, 150, 42, 16);
  decor.fillRoundedRect(510, 272, 150, 42, 16);
  decor.fillStyle(0x5f3f2e, 0.9);
  decor.fillRect(558, 170, 12, 42);
  decor.fillRect(598, 170, 12, 42);
  decor.fillRect(558, 272, 12, 42);
  decor.fillRect(598, 272, 12, 42);
};

export default class Puzzle2Scene extends BasePuzzleScene {
  constructor() {
    super({
      key: "Puzzle2Scene",
      nextSceneKey: "Puzzle3Scene",
      decor: drawDecor,
      pieces: [
        {
          id: "node",
          color: 0x7fb6b5,
          draw: drawNode,
          targetX: 430,
          targetY: 242,
          startX: 120,
          startY: 110,
        },
        {
          id: "resistorTop",
          color: 0xd8b381,
          draw: drawResistorTop,
          targetX: 585,
          targetY: 191,
          startX: 232,
          startY: 210,
        },
        {
          id: "resistorBottom",
          color: 0xd8b381,
          draw: drawResistorBottom,
          targetX: 585,
          targetY: 293,
          startX: 120,
          startY: 332,
        },
        {
          id: "linkWire",
          color: 0x7fb6b5,
          draw: drawLinkWire,
          targetX: 780,
          targetY: 242,
          startX: 235,
          startY: 408,
        },
      ],
    });
  }
}
