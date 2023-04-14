import template from "./imageAvatar.hbs";

import "./imageAvatar.css";
import Block from "../../../modules/Block";

interface AvatarProps {
    path?: string;
    events: {
        click: (e: PointerEvent) => void;
    };
}

export class ImageAvatar extends Block {
    constructor(props: AvatarProps) {
        super({...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
