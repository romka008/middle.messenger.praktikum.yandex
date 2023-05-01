import template from "./inputSearch.hbs";
import Block from "../../../modules/Block";
import {Input} from "../";

import "./inputSearch.css";

interface IInputSearch {
    input: Input;
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
