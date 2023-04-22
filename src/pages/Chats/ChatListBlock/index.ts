import Block from "../../../modules/Block";
import template from "./chatListBlock.hbs";
import {IInfoChat, store} from "../../../modules/Store";
import {connect} from "../../../hoc/connect";
import {getTime} from "../../../utils/helpers";
import ChatsController from "../../../connrollers/ChatsController";
import {Chat} from "./Chat";

import "./chatListBlock.css";

interface IChatListBlockProps {
    chats: IInfoChat[];
}

export class ChatListBlockBase extends Block<IChatListBlockProps> {
    constructor(props: IChatListBlockProps) {
        super(props);
    }

    protected init(): void {
        this.children.chats = this.setChats(this.props);
    }

    protected componentDidUpdate(_oldProps: IChatListBlockProps, newProps: IChatListBlockProps): boolean {
        this.children.chats = this.setChats(newProps);

        return true;
    }

    setChats(chats: IChatListBlockProps) {
        return (chats.chats || []).map(el => {
            const message = el.last_message?.content;
            const content = message && message.length > 27 ? message.slice(0, 27) + "..." : message;
            return new Chat({
                id: el.id,
                nameChat: el.title,
                lastMessage: content,
                messageTime: el.last_message?.time ? getTime(el.last_message?.time) : "",
                unreadCount: el.unread_count,
                avatar: el.avatar,
                events: {
                    click: () => {
                        store.set("activeChat", el.id);
                        ChatsController.getUsersToChat(el.id);
                    }
                }
            });
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}

const withChats = connect(state => {
    return {chats: [...(state.chats || [])]};
});

export const ChatListBlock = withChats(ChatListBlockBase as typeof Block);
