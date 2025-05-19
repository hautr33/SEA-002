import { ButtonComponent } from "./components/ButtonComponent";
import { SpriteComponent } from "./components/SpriteComponent";
import { Entity } from "./core/Entity";
import { World } from "./core/World";

let lastTime = performance.now();

const world = new World();
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

const bgImage = new Image();
bgImage.src = "/assets/background.png";

const player = new Entity();
const sprite = player.addComponent(new SpriteComponent());
sprite.width = 300;
sprite.height = 300;
sprite.x = canvas.width / 2 - sprite.width / 2;
sprite.y = canvas.height - sprite.height;
world.addEntity(player);

sprite.addAnimation("idle", "/assets/player/idle.png", 18, 100);
sprite.addAnimation("run", "/assets/player/run.png", 12, 100);
sprite.addAnimation("run-left", "/assets/player/run-left.png", 12, 100);

let isMoving = false
let isMoveLeft = false
let bgOffsetX = 0;
const moveStep = 5;

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    isMoveLeft = true;
    isMoving = true;
  }
  if (e.key === "ArrowRight") {
    isMoveLeft = false;
    isMoving = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    isMoveLeft = false;
    isMoving = false;
  }
});

new ButtonComponent("←", () => {
  isMoveLeft = true;
  isMoving = true;
}, canvas.width - 250, canvas.height - 50);

new ButtonComponent("Stop", () => {
  isMoveLeft = false;
  isMoving = false;
}, canvas.width - 175, canvas.height - 50);

new ButtonComponent("→", () => {
  isMoveLeft = false;
  isMoving = true;
}, canvas.width - 85, canvas.height - 50);

function gameLoop(currentTime: number) {
  const dt = currentTime - lastTime;
  lastTime = currentTime;

  const context = SpriteComponent.getContext();
  if (isMoving) {
    if (isMoveLeft) {
      sprite.playAnimation("run-left");
      bgOffsetX -= moveStep;
    } else {
      sprite.playAnimation("run");
      bgOffsetX += moveStep;
    }
  } else {
    sprite.playAnimation("idle");
  }
  if (context && bgImage.complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const imgAspect = bgImage.width / bgImage.height;
    const targetHeight = canvas.height;
    const targetWidth = imgAspect * targetHeight;

    let startX = -bgOffsetX % targetWidth;
    if (startX > 0) startX -= targetWidth;

    for (let x = startX; x < canvas.width; x += targetWidth) {
      context.drawImage(bgImage, x, 0, targetWidth, targetHeight);
    }

    world.update(dt);
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);