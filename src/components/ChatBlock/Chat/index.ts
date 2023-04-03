import Block from "../../../modules/Block";
import template from "./chat.hbs";

import "./chat.css";

interface IChatProps {
    nameChat: string;
    previewMessage: string;
    messageTime?: string;
    countNonReadMessage?: string;
}

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
