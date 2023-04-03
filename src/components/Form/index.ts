import Block from "../../modules/Block";
import template from "./form.hbs";
import {LabeledInput} from "../LabeledInput";
import "./form.css";
import {Input} from "../Input";

interface IFormProps {
    inputs: LabeledInput[] | Input[];
    button?: Block;
    link?: Block;
    className?: string;
}

export class Form extends Block<IFormProps> {
    constructor(props: IFormProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
