import Block from "../../../../modules/Block";
import template from "./chat.hbs";
import {connect} from "../../../../hoc/connect";
import {ImageAvatar} from "../../../../components/Avatar/ImageAvatar/ImageAvatar";

import "./chat.css";

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
    avatar: string | null;
}

class ChatBase extends Block<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }

    protected init(): void {
        this.children.imageAvatar = new ImageAvatar({
            path: this.props.avatar,
            classNameContainer: "chat-list-avatar-user"
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props, isAciveChat: this.props.id === this.props.activeChat});
    }
}

const withChat = connect(state => {
    return {activeChat: state.activeChat};
});

export const Chat = withChat(ChatBase as typeof Block);
