import BasePuzzleScene from "./BasePuzzleScene.js";

const drawResistorBody = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 52, y - 26, 104, 52, 20);
  g.fillStyle(0xffffff, 0.28);
  g.fillRoundedRect(x - 36, y - 16, 72, 12, 6);
};

const drawLeftLead = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRect(x - 58, y - 6, 116, 12);
  g.fillCircle(x - 58, y, 6);
  g.fillCircle(x + 58, y, 6);
};

const drawRightLead = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRect(x - 58, y - 6, 116, 12);
  g.fillCircle(x - 58, y, 6);
  g.fillCircle(x + 58, y, 6);
};

const drawBandPack = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 40, y - 22, 80, 44, 12);
  g.fillStyle(0x2e3a46, 0.95);
  g.fillRect(x - 26, y - 22, 10, 44);
  g.fillStyle(0xc07f30, 0.95);
  g.fillRect(x - 5, y - 22, 10, 44);
  g.fillStyle(0xcfc978, 0.95);
  g.fillRect(x + 16, y - 22, 10, 44);
};

const drawDecor = (decor) => {
  decor.fillStyle(0x223141, 1);
  decor.fillRoundedRect(350, 90, 580, 310, 24);
  decor.fillStyle(0x1b2734, 1);
  decor.fillRoundedRect(370, 110, 540, 270, 20);

  decor.fillStyle(0x8aa7bb, 1);
  decor.fillRoundedRect(378, 238, 88, 16, 8);
  decor.fillRoundedRect(814, 238, 88, 16, 8);
  decor.fillRoundedRect(612, 170, 16, 70, 8);
  decor.fillRoundedRect(612, 236, 16, 54, 8);

  decor.fillStyle(0xd7b27a, 1);
  decor.fillRoundedRect(460, 214, 360, 64, 22);
  decor.fillStyle(0x5c3a2a, 0.9);
  decor.fillRect(560, 214, 16, 64);
  decor.fillRect(610, 214, 16, 64);
  decor.fillRect(660, 214, 16, 64);
};

export default class PuzzleSolarScene extends BasePuzzleScene {
  constructor() {
    super({
      key: "PuzzleSolarScene",
      nextSceneKey: "Puzzle2Scene",
      decor: drawDecor,
      pieces: [
        {
          id: "leftLead",
          color: 0x8ea4b5,
          draw: drawLeftLead,
          targetX: 430,
          targetY: 246,
          startX: 120,
          startY: 120,
        },
        {
          id: "body",
          color: 0xd8b784,
          draw: drawResistorBody,
          targetX: 640,
          targetY: 246,
          startX: 235,
          startY: 210,
        },
        {
          id: "rightLead",
          color: 0x8ea4b5,
          draw: drawRightLead,
          targetX: 850,
          targetY: 246,
          startX: 118,
          startY: 332,
        },
        {
          id: "bands",
          color: 0xdeb27f,
          draw: drawBandPack,
          targetX: 640,
          targetY: 246,
          startX: 235,
          startY: 410,
        },
      ],
    });
  }
}
