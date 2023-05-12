import Block from "../../../modules/Block";
import template from "./imageAvatar.hbs";

import "./imageAvatar.css";

interface IImageAvatarProps {
    path?: string | null;
    events?: {
        click: (e: PointerEvent) => void;
    };
    classNameContainer?: string;
}

export class ImageAvatar extends Block<IImageAvatarProps> {
    constructor(props: IImageAvatarProps) {
        super({...props});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
