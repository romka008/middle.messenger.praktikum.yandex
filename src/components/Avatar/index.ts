import Block from "../../modules/Block";
import template from "./avatar.hbs";
import "./avatar.css";

export class Avatar extends Block {
    constructor() {
        super({});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {});
    }
}
