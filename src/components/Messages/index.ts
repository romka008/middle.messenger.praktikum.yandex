import Block from "../../modules/Block";
import template from "./messages.hbs";
import {Message} from "./Message";

import "./messages.css";

interface IMessagesProps {
    messages: Message[];
}

export class Messages extends Block<IMessagesProps> {
    constructor(props: IMessagesProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
