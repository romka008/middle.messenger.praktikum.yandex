import Block from "../../modules/Block";
import template from "./avatar.hbs";
import "./avatar.css";

interface AvatarProps {
    path?: string;
}

export class Avatar extends Block {
    constructor(props: AvatarProps) {
        super({...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
