import { Component } from "../core/Component";

type Animation = {
    image: HTMLImageElement;
    frameCount: number;
    frameDuration: number;
    frameWidth: number;
};

export class SpriteComponent extends Component {
    public x = 0;
    public y = 0;
    public width = 100;
    public height = 100;

    private animations: Map<string, Animation> = new Map();
    private currentAnimation: string = "";
    private currentFrame = 0;
    private elapsedTime = 0;

    addAnimation(name: string, src: string, frameCount: number, frameDuration = 100) {
        const img = new Image();
        img.src = src;

        img.onload = () => {
            const frameWidth = img.width / frameCount;
            this.animations.set(name, { image: img, frameCount, frameDuration, frameWidth });

            if (!this.currentAnimation) {
                this.playAnimation(name);
            }
        };
    }

    playAnimation(name: string) {
        if (this.currentAnimation !== name && this.animations.has(name)) {
            this.currentAnimation = name;
            this.currentFrame = 0;
            this.elapsedTime = 0;
        }
    }

    update(dt: number): void {
        const ctx = SpriteComponent.getContext();
        const anim = this.animations.get(this.currentAnimation);

        if (!ctx || !anim || !anim.image.complete) return;

        this.elapsedTime += dt;
        if (this.elapsedTime >= anim.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % anim.frameCount;
            this.elapsedTime = 0;
        }

        ctx.drawImage(
            anim.image,
            this.currentFrame * anim.frameWidth, 0,
            anim.frameWidth, anim.image.height,
            this.x, this.y,
            this.width, this.height
        );
    }

    static getContext(): CanvasRenderingContext2D | null {
        const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
        return canvas ? canvas.getContext("2d") : null;
    }
}
