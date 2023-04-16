import Block from "../../modules/Block";
import template from "./chatBlock.hbs";
import {connect} from "../../hoc/connect";
import {Chat} from "./Chat";

import "./chatBlock.css";

interface IChatBlockProps {
    chats: IChat[];
    link?: Block;
}

interface IChat {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | {content: string; id: number; time: string};
    title: string;
    unread_count: number;
}
export class ChatBlockBase extends Block<IChatBlockProps> {
    constructor(props: IChatBlockProps) {
        super(props);
    }

    protected init(): void {
        this.children.chats = this.setChats(this.props);
    }

    protected componentDidUpdate(_oldProps: IChatBlockProps, newProps: IChatBlockProps): boolean {
        this.children.chats = this.setChats(newProps);

        return true;
    }

    setChats(chats: IChatBlockProps) {
        // console.log(chats);
        return (chats.chats || []).map(el => {
            return new Chat({
                nameChat: el.title,
                lastMessage: el.last_message?.content,
                messageTime: el.last_message?.time,
                unreadCount: el.unread_count
            });
        });
    }

    protected render(): DocumentFragment {
        // console.log(this.props.chats);
        // console.log(this);
        return this.compile(template, {...this.props});
    }
}

const withChats = connect(state => {
    return {chats: [...(state.chats || [])]};
});

export const ChatBlock = withChats(ChatBlockBase as typeof Block);
