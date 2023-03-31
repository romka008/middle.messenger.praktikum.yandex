import template from "./inputBlock.hbs";
import Block from "../../../modules/Block";

interface IInputBlock {
    input: unknown;
    span: string;
    error?: string;
    events?: {
        focus: (e: Event) => void;
        blur: (e: Event) => void;
    };
}

export class InputBlock extends Block {
    constructor(props: IInputBlock) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
