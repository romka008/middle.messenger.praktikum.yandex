import Block from "../../modules/Block";
import template from "./input.hbs";
import "./input.css";

interface IInputProps {
    name: string;
    type: string;
    className?: string;
    value?: string;
    events?: {
        blur?: (e: Event) => void;
        focus?: (e: Event) => void;
    };
    placeholder?: string;
}

export class Input extends Block<IInputProps> {
    constructor(props: IInputProps) {
        super({placeholder: " ", ...props});
    }

    // get node() {
    //     const value = this.element.getElementsByTagName("input")[this.props.name];
    //     this.props.events.blur(value);
    //     console.log(value);

    //     return value;
    // }

    // get nodeError() {
    //     const value = this.element.getElementsByClassName("text-error")[0];
    //     console.log(value);

    //     return value;
    // }

    get value() {
        const value = (this.element as HTMLInputElement).value;

        return value;
    }

    set value(value: string) {
        if (typeof this.props.name === "number") {
            this.element!.getElementsByTagName("input")[this.props.name].value = value;
        }
    }

    // public getName() {
    //     return this.props.name;
    // }

    // protected init(): void {
    //     this.element.setAttribute("id", this.props.id);
    // }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
