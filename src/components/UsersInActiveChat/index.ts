import Block from "../../modules/Block";
import template from "./usersInActiveChat.hbs";

import "./usersInActiveChat.css";

interface UsersInActiveChatProps {
    users: string[];
}

export class UsersInActiveChat extends Block<UsersInActiveChatProps> {
    constructor(props: UsersInActiveChatProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
