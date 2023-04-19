import Block from "../../../modules/Block";
import template from "./chat.hbs";

import "./chat.css";
import {connect} from "../../../hoc/connect";

interface IChatProps {
    id: number;
    nameChat: string;
    lastMessage?: string | null;
    messageTime?: string;
    unreadCount?: number;
    events: {
        click: () => void;
    };
    activeChat?: number;
}

class ChatBase extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        // console.log(this.props);
        return this.compile(template, {...this.props, isAciveChat: this.props.id === this.props.activeChat});
    }
}

const withChat = connect(state => {
    return {activeChat: state.activeChat};
});

export const Chat = withChat(ChatBase as typeof Block);
