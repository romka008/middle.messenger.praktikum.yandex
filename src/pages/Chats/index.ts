import Block from "../../modules/Block";
import template from "./chats.hbs";
import "./chats.css";

export class Chats extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, {});
    }
}
