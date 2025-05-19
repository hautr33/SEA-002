import { Entity } from "./Entity";

export class World {
    private entities: Entity[] = [];

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    update(dt: number) {
        this.entities.forEach(entity => entity.update(dt));
    }
}
