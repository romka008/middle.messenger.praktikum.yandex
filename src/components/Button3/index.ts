import Block from "../../modules/Block";
import template from "./button.hbs";
import "./button.module.css";

interface ButtonProps {
    type?: string;
    label: string;
    className?: string;
    pattern?: string;
    events: {
        click: (e: PointerEvent) => void;
    };
}

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({type: "button", ...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
