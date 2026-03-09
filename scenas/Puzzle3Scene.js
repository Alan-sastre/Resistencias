import BasePuzzleScene from "./BasePuzzleScene.js";

const drawResistorUnit = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 54, y - 20, 108, 40, 15);
  g.fillStyle(0xeef7ff, 1);
  g.fillRoundedRect(x - 90, y - 6, 36, 12, 6);
  g.fillRoundedRect(x + 54, y - 6, 36, 12, 6);
  g.fillStyle(0x2b2f3a, 0.95);
  g.fillRect(x - 22, y - 20, 10, 40);
  g.fillStyle(0xb4652c, 0.95);
  g.fillRect(x - 2, y - 20, 10, 40);
  g.fillStyle(0xdbca71, 0.95);
  g.fillRect(x + 18, y - 20, 10, 40);
};

const drawColorCard = (g, x, y, color) => {
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 50, y - 42, 100, 84, 10);
  g.fillStyle(0x2b2f3a, 0.95);
  g.fillRect(x - 32, y - 30, 12, 60);
  g.fillStyle(0x7c4ba6, 0.95);
  g.fillRect(x - 14, y - 30, 12, 60);
  g.fillStyle(0x67b26f, 0.95);
  g.fillRect(x + 4, y - 30, 12, 60);
  g.fillStyle(0xdbca71, 0.95);
  g.fillRect(x + 22, y - 30, 12, 60);
};

const drawSeriesChain = (g, x, y, color) => {
  const dark = Phaser.Display.Color.ValueToColor(color).darken(16).color;
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 90, y - 6, 180, 12, 6);
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 66, y - 18, 36, 36, 12);
  g.fillRoundedRect(x - 18, y - 18, 36, 36, 12);
  g.fillRoundedRect(x + 30, y - 18, 36, 36, 12);
  g.fillStyle(dark, 0.95);
  g.fillRect(x - 56, y - 18, 8, 36);
  g.fillRect(x - 8, y - 18, 8, 36);
  g.fillRect(x + 40, y - 18, 8, 36);
};

const drawParallelBranch = (g, x, y, color) => {
  const dark = Phaser.Display.Color.ValueToColor(color).darken(20).color;
  g.fillStyle(0xa8bdcc, 1);
  g.fillRoundedRect(x - 64, y - 6, 128, 12, 6);
  g.fillRoundedRect(x - 64, y - 34, 12, 68, 6);
  g.fillRoundedRect(x + 52, y - 34, 12, 68, 6);
  g.fillStyle(color, 1);
  g.fillRoundedRect(x - 42, y - 26, 84, 18, 8);
  g.fillRoundedRect(x - 42, y + 8, 84, 18, 8);
  g.fillStyle(dark, 0.95);
  g.fillRect(x - 4, y - 26, 8, 18);
  g.fillRect(x - 4, y + 8, 8, 18);
};

const drawDecor = (decor) => {
  decor.fillStyle(0x1f3045, 1);
  decor.fillRoundedRect(350, 90, 580, 310, 24);
  decor.fillStyle(0x2b465a, 1);
  decor.fillRoundedRect(370, 110, 540, 270, 20);

  decor.fillStyle(0xeff6fb, 0.95);
  decor.fillRoundedRect(430, 134, 430, 222, 18);
  decor.lineStyle(4, 0xaec0cf, 0.7);
  decor.strokeRoundedRect(430, 134, 430, 222, 18);

  decor.fillStyle(0xdae8f2, 1);
  decor.fillRoundedRect(450, 154, 180, 86, 12);
  decor.fillRoundedRect(660, 154, 180, 86, 12);
  decor.fillRoundedRect(450, 250, 180, 86, 12);
  decor.fillRoundedRect(660, 250, 180, 86, 12);

  decor.fillStyle(0x7f96a7, 0.9);
  decor.fillRoundedRect(540, 146, 22, 10, 4);
  decor.fillRoundedRect(750, 146, 22, 10, 4);
  decor.fillRoundedRect(540, 336, 22, 10, 4);
  decor.fillRoundedRect(750, 336, 22, 10, 4);
};

export default class Puzzle3Scene extends BasePuzzleScene {
  constructor() {
    super({
      key: "Puzzle3Scene",
      nextSceneKey: null,
      decor: drawDecor,
      pieces: [
        {
          id: "resistorUnit",
          color: 0xd8b37d,
          draw: drawResistorUnit,
          targetX: 540,
          targetY: 198,
          startX: 105,
          startY: 110,
        },
        {
          id: "colorCard",
          color: 0xf4fafc,
          draw: drawColorCard,
          targetX: 750,
          targetY: 198,
          startX: 225,
          startY: 210,
        },
        {
          id: "seriesChain",
          color: 0xd6b07b,
          draw: drawSeriesChain,
          targetX: 540,
          targetY: 294,
          startX: 112,
          startY: 332,
        },
        {
          id: "parallelBranch",
          color: 0xd8b684,
          draw: drawParallelBranch,
          targetX: 750,
          targetY: 294,
          startX: 235,
          startY: 408,
        },
      ],
    });
  }
}
