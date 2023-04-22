import Block from "../../modules/Block";
import template from "./backInChats.hbs";
import {Button} from "../Button3";
import router from "../../modules/Router";
import backIcon from "../../assets/icons/backIcon.svg";

import "./backInChats.css";

interface IBackInChatsProps {
    route?: string;
}

export class BackInChats extends Block<IBackInChatsProps> {
    constructor(props: IBackInChatsProps) {
        super({route: "./messenger", ...props});
    }

    protected init(): void {
        this.children.backInChatsButton = new Button({
            className: "arrow",
            events: {
                click: () => {
                    router.go("/messenger");
                }
            },
            svg: backIcon
        });
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
