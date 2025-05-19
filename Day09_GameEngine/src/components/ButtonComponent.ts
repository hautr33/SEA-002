import { Component } from "../core/Component";

export class ButtonComponent extends Component {
    constructor(label: string, onClick: () => void, x: number, y: number) {
        super();

        const button = document.createElement("button");
        button.innerText = label;
        button.style.position = "absolute";
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
        button.style.padding = "10px 20px";

        button.onclick = onClick;
        document.body.appendChild(button);
    }

    update(dt: number): void {
    }
}
