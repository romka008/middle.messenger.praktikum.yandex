import Block from "../../modules/Block";
import template from "./chatBlock.hbs";

import "./chatBlock.css";

interface IChatBlockProps {
    chats: Block[];
    link?: Block;
}

export class ChatBlock extends Block<IChatBlockProps> {
    constructor(props: IChatBlockProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
