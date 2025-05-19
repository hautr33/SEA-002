# Day 09: Game Engine | 16/05/2025
- Create a game engine that includes two components: Sprite and Button.
- Use that game engine to develop a mini-game.
## Class Description
### 1. Component
File: `src/core/Component.ts`
- Base class for all components.
- Provides the update lifecycle method for each frame.
- Holds a reference to its owning Entity.

Properties:
- `owner: Entity | null` — Reference to the entity this component is attached to.

Methods:
- `abstract update(dt: number): void` — Called every frame and implement logic.

### 2. Entity
File: `src/core/Entity.ts`
- Represents a game object composed of multiple components.

Methods:
- `addComponent<T extends Component>(component: T): T` - Adds a component to the entity.
- `getComponent<T extends Component>(ComponentClass): T | undefined` - Retrieves a component by its class.
- `update(dt: number)` - Updates all attached components.

### 3. World
File: `src/core/World.ts`
- Manages all entities in the game world.

Methods:
- `addEntity(entity: Entity)` — Adds an entity to the world.
- `update(dt: number)` — Updates all entities.

### 4. SpriteComponent
File: `src/components/SpriteComponent.ts`
- Handles rendering animated sprites on a canvas.

Properties:
- `x, y` — Position of the sprite.
- `width, height` — Size of the sprite.

Methods:
- `addAnimation(name: string, src: string, frameCount: number, frameDuration?: number)` - Adds a new animation with a sprite sheet.
- `playAnimation(name: string)` -  Plays a specific animation.
- `update(dt: number)` - Handles frame updates and renders the sprite.

### 5. ButtonComponent
File: `src/components/ButtonComponent.ts`
- Creates and manages a simple HTML button.

Constructor:
```
new ButtonComponent(label: string, onClick: () => void, x: number, y: number)
```
- `label` - Text displayed on the button.
- `onClick` - Callback when the button is clicked.
- `x, y` - Position of the button.

Properties:
- `x, y` — Position of the sprite.
- `width, height` — Size of the sprite.