import template from "./inputSearch.hbs";
import Block from "../../../modules/Block";

import "./inputSearch.css";

interface IInputSearch {
    input: unknown;
    classname?: string;
    // events?: {
    //     focus: (e: Event) => void;
    //     blur: (e: Event) => void;
    // };
}

export class InputSearch extends Block {
    constructor(props: IInputSearch) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
