import { Component } from "./Component";

export class Entity {
    private components: Map<string, Component> = new Map();

    addComponent<T extends Component>(component: T): T {
        const key = component.constructor.name;
        this.components.set(key, component);
        component.owner = this;
        return component;
    }

    getComponent<T extends Component>(ComponentClass: new (...args: any[]) => T): T | undefined {
        return this.components.get(ComponentClass.name) as T;
    }

    update(dt: number) {
        this.components.forEach(component => component.update(dt));
    }
}
