import Block from "../../modules/Block";
import template from "./errorServer.hbs";
import "./errorServer.css";

export class ErrorServer extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, {});
    }
}
