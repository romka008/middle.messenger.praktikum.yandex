import Block from "../../../modules/Block";
import template from "./field.hbs";
import "./field.css";

interface IFieldProps {
    name: string;
    value: string;
    className?: string;
}

export class Field extends Block<IFieldProps> {
    constructor(props: IFieldProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
