import Block from "../../modules/Block";
import template from "./label.hbs";
import {Input} from "../Input";

import "./labelInput.css";

interface ILabeledInputProps {
    name: string;
    type: string;
    span: string;
    error?: string;
    value?: string;
    inputClassName?: string;
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
}

export class LabeledInput extends Block<ILabeledInputProps> {
    constructor(props: ILabeledInputProps) {
        super(props);
    }

    protected init(): void {
        const {name, type} = this.props;
        this.children.input = new Input({
            name,
            type,

            events: {
                blur: e => {
                    return this.props.blur(e);
                },
                focus: e => {
                    return this.props.focus(e);
                }
            }
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
