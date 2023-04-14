import Block from "../../modules/Block";
import template from "./backInChats.hbs";
import "./backInChats.css";
import {Button} from "../Button3";
import router from "../../modules/Router";

interface IBackInChatsProps {
    route?: string;
}

export class BackInChats extends Block<IBackInChatsProps> {
    constructor(props: IBackInChatsProps) {
        super({route: "./chats", ...props});
    }

    protected init(): void {
        this.children.backInChatsButton = new Button({
            className: "arrow",
            events: {
                click: () => {
                    router.go("/chats");
                }
            },
            svg: `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"></path>
                  </svg>`
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
