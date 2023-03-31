import Block from "../../modules/Block";
import template from "./backInChats.hbs";
import "./backInChats.css";

interface IBackInChatsProps {
    route?: string;
}

export class BackInChats extends Block<IBackInChatsProps> {
    constructor(props: IBackInChatsProps) {
        super({route: "./chats", ...props});
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
