import Block from "../../modules/Block";
import template from "./profileField.hbs";

import "./profileField.css";

interface IProfileFieldProps {
    nameField: string;
    textError?: string;
    field?: unknown;
}

export class ProfileField extends Block<IProfileFieldProps> {
    constructor(props: IProfileFieldProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
