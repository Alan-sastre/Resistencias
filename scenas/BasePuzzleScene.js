export default class BasePuzzleScene extends Phaser.Scene {
  constructor(config) {
    super(config.key);
    this.nextSceneKey = config.nextSceneKey;
    this.piecesConfig = config.pieces;
    this.decorConfig = config.decor;
    this.placedPieces = 0;
    this.totalPieces = config.pieces.length;
    this.snapDistance = 55;
    this.completed = false;
    this.pieceSprites = [];
    this.guideHand = null;
    this.guideMoveTween = null;
    this.guidePulseTween = null;
  }

  preload() {
    if (!this.textures.exists("confetti-dot")) {
      const confetti = this.make.graphics({ x: 0, y: 0, add: false });
      confetti.fillStyle(0xffffff, 1);
      confetti.fillCircle(6, 6, 6);
      confetti.generateTexture("confetti-dot", 12, 12);
      confetti.destroy();
    }
  }

  create() {
    this.placedPieces = 0;
    this.completed = false;
    this.pieceSprites = [];
    this.guideHand = null;
    this.guideMoveTween = null;
    this.guidePulseTween = null;
    this.createBackdrop();
    this.createDecorIllustration();
    this.createPuzzlePieces();
    this.createGuideHand();

    this.input.on("drag", (_, gameObject, dragX, dragY) => {
      if (!gameObject.locked && !this.completed) {
        const halfWidth = (gameObject.displayWidth || 0) * 0.5;
        const halfHeight = (gameObject.displayHeight || 0) * 0.5;
        gameObject.x = Phaser.Math.Clamp(
          dragX,
          halfWidth,
          this.scale.width - halfWidth,
        );
        gameObject.y = Phaser.Math.Clamp(
          dragY,
          halfHeight,
          this.scale.height - halfHeight,
        );
      }
    });

    this.input.on("dragend", (_, gameObject) => {
      if (gameObject.locked || this.completed) {
        return;
      }

      const distance = Phaser.Math.Distance.Between(
        gameObject.x,
        gameObject.y,
        gameObject.targetX,
        gameObject.targetY,
      );

      if (distance < this.snapDistance) {
        gameObject.locked = true;
        gameObject.disableInteractive();
        this.tweens.add({
          targets: gameObject,
          x: gameObject.targetX,
          y: gameObject.targetY,
          angle: 0,
          scale: 1,
          duration: 180,
          ease: "Back.Out",
        });
        this.placedPieces += 1;
        if (this.placedPieces >= this.totalPieces) {
          this.handleCompletedPuzzle();
        } else {
          this.time.delayedCall(220, () => this.refreshGuideHand());
        }
      } else {
        this.tweens.add({
          targets: gameObject,
          x: gameObject.startX,
          y: gameObject.startY,
          angle: Phaser.Math.Between(-8, 8),
          duration: 240,
          ease: "Sine.Out",
        });
        this.time.delayedCall(260, () => this.refreshGuideHand());
      }
    });
  }

  createBackdrop() {
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x4aa9f0, 0x6cc5ff, 0xc8efff, 0xf0fbff, 1);
    bg.fillRect(0, 0, this.scale.width, this.scale.height);

    bg.fillStyle(0xffffff, 0.16);
    bg.fillEllipse(190, 118, 320, 70);
    bg.fillEllipse(720, 142, 410, 88);

    bg.fillStyle(0x96bed1, 0.42);
    bg.fillEllipse(240, this.scale.height - 152, 420, 92);
    bg.fillEllipse(730, this.scale.height - 145, 520, 108);

    bg.fillStyle(0x6a97ab, 0.5);
    bg.fillEllipse(190, this.scale.height - 114, 360, 92);
    bg.fillEllipse(610, this.scale.height - 108, 470, 104);

    bg.fillStyle(0x7fb96b, 1);
    bg.fillRoundedRect(0, this.scale.height - 140, this.scale.width, 150, 24);
    bg.fillStyle(0x70a85f, 0.45);
    bg.fillRoundedRect(0, this.scale.height - 102, this.scale.width, 64, 24);

    const sunHalo = this.add.circle(122, 90, 62, 0xffe9a0, 0.3);
    const sun = this.add.circle(122, 90, 42, 0xffd06b, 1);
    sun.setStrokeStyle(5, 0xfff1bf, 0.95);
    const sunCore = this.add.circle(112, 80, 14, 0xffffff, 0.25);
    this.tweens.add({
      targets: [sunHalo],
      alpha: { from: 0.22, to: 0.38 },
      scale: { from: 0.95, to: 1.06 },
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
    this.tweens.add({
      targets: sun,
      scale: { from: 0.95, to: 1.04 },
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
    this.tweens.add({
      targets: sunCore,
      alpha: { from: 0.15, to: 0.32 },
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });

    this.createCloud(180, 96, 1.05, 0.5, 46000);
    this.createCloud(500, 78, 0.85, 0.45, 52000);
    this.createCloud(820, 122, 1.22, 0.42, 60000);
    this.createCloud(1020, 90, 0.72, 0.4, 39000);

    this.createBird(390, 95, 1);
    this.createBird(430, 104, 0.8);
    this.createBird(470, 90, 0.95);

    const dust = this.add.particles(0, 0, "confetti-dot", {
      x: { min: 20, max: this.scale.width - 20 },
      y: { min: this.scale.height - 160, max: this.scale.height - 30 },
      lifespan: { min: 2200, max: 4200 },
      speedX: { min: -16, max: 22 },
      speedY: { min: -14, max: -4 },
      quantity: 1,
      frequency: 170,
      scale: { start: 0.5, end: 0.06 },
      alpha: { start: 0.12, end: 0 },
      tint: [0xdff4c9, 0xf2f9e6, 0xc8eab1],
      blendMode: "NORMAL",
    });
    dust.setDepth(1);
  }

  createDecorIllustration() {
    const decor = this.add.graphics();
    this.decorConfig(decor);
    decor.setAlpha(0.98);
    this.tweens.add({
      targets: decor,
      alpha: { from: 0.94, to: 1 },
      duration: 2100,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
  }

  createPuzzlePieces() {
    this.pieceSprites = [];
    this.piecesConfig.forEach((piece, index) => {
      const textureKey = `${this.scene.key}-${piece.id}`;
      this.createPieceTexture(textureKey, piece.draw, piece.color);
      this.drawSlot(piece);

      const sprite = this.add.image(piece.startX, piece.startY, textureKey);
      sprite.setScale(0.95);
      sprite.setInteractive({ draggable: true, useHandCursor: true });
      sprite.targetX = piece.targetX;
      sprite.targetY = piece.targetY;
      sprite.startX = piece.startX;
      sprite.startY = piece.startY;
      sprite.locked = false;
      sprite.setAngle(index % 2 === 0 ? -6 : 6);
      this.input.setDraggable(sprite);
      this.pieceSprites.push(sprite);
    });
  }

  createGuideHand() {
    this.guideHand = this.add.text(0, 0, "👆🏻", {
      fontSize: "52px",
    });
    this.guideHand.setOrigin(0.5);
    this.guideHand.setDepth(300);
    this.guideHand.setAlpha(0.95);
    this.guidePulseTween = this.tweens.add({
      targets: this.guideHand,
      scale: { from: 0.94, to: 1.06 },
      duration: 460,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
    this.time.addEvent({
      delay: 900,
      loop: true,
      callback: () => this.refreshGuideHand(),
    });
    this.refreshGuideHand();
  }

  getNextPiece() {
    return this.pieceSprites.find((piece) => !piece.locked);
  }

  refreshGuideHand() {
    if (!this.guideHand || this.completed) {
      return;
    }
    const nextPiece = this.getNextPiece();
    if (!nextPiece) {
      this.guideHand.setVisible(false);
      return;
    }
    const startX = nextPiece.x + 22;
    const startY = nextPiece.y - 28;
    const targetX = nextPiece.targetX + 22;
    const targetY = nextPiece.targetY - 28;
    this.guideHand.setVisible(true);
    this.guideHand.setPosition(startX, startY);
    if (this.guideMoveTween) {
      this.guideMoveTween.stop();
    }
    this.guideMoveTween = this.tweens.add({
      targets: this.guideHand,
      x: targetX,
      y: targetY,
      duration: 760,
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
  }

  drawSlot(piece) {
    const slot = this.add.graphics();
    slot.fillStyle(0x000000, 0.12);
    piece.draw(slot, piece.targetX + 5, piece.targetY + 6, 0x5e6f78);
    slot.fillStyle(0xe9f2f8, 0.58);
    slot.lineStyle(2.4, 0xa8bdcc, 0.62);
    piece.draw(slot, piece.targetX, piece.targetY, 0xdce7ef);
    slot.strokePath();
  }

  createCloud(x, y, scale, alpha, duration) {
    const cloud = this.add.graphics();
    cloud.fillStyle(0xffffff, alpha);
    cloud.fillEllipse(x - 34, y + 8, 68, 30);
    cloud.fillEllipse(x + 6, y, 90, 38);
    cloud.fillEllipse(x + 48, y + 8, 70, 30);
    cloud.fillStyle(0xddeaf5, alpha * 0.65);
    cloud.fillEllipse(x + 10, y + 14, 80, 18);
    cloud.setScale(scale);
    this.tweens.add({
      targets: cloud,
      x: -this.scale.width - 180,
      duration,
      repeat: -1,
      ease: "Linear",
      onRepeat: () => {
        cloud.x = this.scale.width + Phaser.Math.Between(120, 320);
        cloud.y = y + Phaser.Math.Between(-10, 10);
      },
    });
  }

  createBird(x, y, scale) {
    const bird = this.add.graphics();
    bird.lineStyle(3, 0x4d6473, 0.55);
    bird.lineBetween(-14, 0, 0, -8);
    bird.lineBetween(0, -8, 14, 0);
    bird.setPosition(x, y);
    bird.setScale(scale);
    this.tweens.add({
      targets: bird,
      y: y - 12,
      duration: Phaser.Math.Between(1300, 1900),
      yoyo: true,
      repeat: -1,
      ease: "Sine.InOut",
    });
  }

  createPieceTexture(key, drawFunction, color) {
    const g = this.make.graphics({ x: 0, y: 0, add: false });
    drawFunction(g, 90, 90, color);
    g.generateTexture(key, 180, 180);
    g.destroy();
  }

  launchConfetti() {
    const palette = [0xff6b6b, 0xffd93d, 0x6bcb77, 0x4d96ff, 0xd66efd];
    const particles = this.add.particles(0, 0, "confetti-dot", {
      x: { min: 40, max: this.scale.width - 40 },
      y: -20,
      lifespan: { min: 1200, max: 2100 },
      speedY: { min: 220, max: 420 },
      speedX: { min: -180, max: 180 },
      gravityY: 420,
      rotate: { min: -180, max: 180 },
      scale: { start: 1, end: 0.2 },
      quantity: 10,
      blendMode: "NORMAL",
      tint: palette,
      frequency: 45,
    });

    this.time.delayedCall(1400, () => particles.stop());
    this.time.delayedCall(2600, () => particles.destroy());
  }

  handleCompletedPuzzle() {
    this.completed = true;
    if (this.guideHand) {
      this.guideHand.setVisible(false);
    }
    if (this.guideMoveTween) {
      this.guideMoveTween.stop();
    }
    if (this.guidePulseTween) {
      this.guidePulseTween.stop();
    }
    this.launchConfetti();
    this.cameras.main.flash(250, 255, 255, 255, true);
    this.tweens.add({
      targets: this.cameras.main,
      zoom: { from: 1, to: 1.025 },
      duration: 320,
      yoyo: true,
      ease: "Sine.InOut",
    });

    if (this.nextSceneKey) {
      this.time.delayedCall(2300, () => {
        this.scene.start(this.nextSceneKey);
      });
    } else {
      this.time.delayedCall(1200, () => {
        this.showFinalCelebration();
      });
    }
  }

  showFinalCelebration() {
    this.launchConfetti();
    const overlay = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      0x0f1f2f,
      0.72,
    );
    overlay.setDepth(1000);

    const panel = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      610,
      260,
      0xffffff,
      0.96,
    );
    panel.setStrokeStyle(5, 0x8fb4c8, 0.9);
    panel.setDepth(1001);

    const title = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 - 50,
      "¡Felicidades!",
      {
        fontFamily: "Arial",
        fontSize: "54px",
        color: "#1f4a70",
        fontStyle: "bold",
      },
    );
    title.setOrigin(0.5);
    title.setDepth(1002);

    const subtitle = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 6,
      "Completaste todos los puzzles de resistencias",
      {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#2f5f82",
      },
    );
    subtitle.setOrigin(0.5);
    subtitle.setDepth(1002);

    const button = this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2 + 78,
      280,
      58,
      0x3a82cc,
      1,
    );
    button.setDepth(1002);
    button.setInteractive({ useHandCursor: true });

    const buttonLabel = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2 + 78,
      "Volver a jugar",
      {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#ffffff",
        fontStyle: "bold",
      },
    );
    buttonLabel.setOrigin(0.5);
    buttonLabel.setDepth(1003);

    button.on("pointerover", () => {
      button.setFillStyle(0x2f73b8, 1);
    });
    button.on("pointerout", () => {
      button.setFillStyle(0x3a82cc, 1);
    });
    button.on("pointerdown", () => {
      this.scene.start("PuzzleSolarScene");
    });
  }
}
