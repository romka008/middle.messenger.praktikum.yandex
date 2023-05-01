import Block from "../modules/Block";

export default function render(rootSelector: string, component: Block) {
    const root = document.querySelector(rootSelector);

    if (root === null) {
        throw new Error(`Селектор "${rootSelector}" не найден`);
    }

    root.innerHTML = "";

    root.appendChild(component.getContent()!);

    component.dispatchComponentDidMount();

    return root;
}
