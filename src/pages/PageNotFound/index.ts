import Block from "../../modules/Block";
import template from "./pageNotFound.hbs";
import "./pageNotFound.css";

export class PageNotFound extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, {});
    }
}
