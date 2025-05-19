import { Entity } from "./Entity";

export abstract class Component {
    owner: Entity | null = null;
    abstract update(dt: number): void;
}