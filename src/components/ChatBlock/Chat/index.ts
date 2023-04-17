import Block from "../../../modules/Block";
import template from "./chat.hbs";

import "./chat.css";

interface IChatProps {
    nameChat: string;
    lastMessage?: string | null;
    messageTime?: string;
    unreadCount?: number;
}

export class Chat extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
