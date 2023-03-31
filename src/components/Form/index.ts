import Block from "../../modules/Block";
import template from "./form.hbs";
import {LabeledInput} from "../LabeledInput";
import "./form.css";

interface IFormProps {
    inputs: LabeledInput[];
    button?: Block;
    link?: Block;
}

export class Form extends Block<IFormProps> {
    constructor(props: IFormProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
