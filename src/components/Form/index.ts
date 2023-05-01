import Block from "../../modules/Block";
import template from "./form.hbs";
import {LabeledInput} from "../LabeledInput";
import "./form.css";
import {Input} from "../Input";
import {Button} from "../Button3";

interface IFormProps {
    inputs: LabeledInput[] | Input[];
    buttons?: Block | Button[];
    link?: Block;
    className?: string;
    id?: string;
}

export class Form extends Block<IFormProps> {
    constructor(props: IFormProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
