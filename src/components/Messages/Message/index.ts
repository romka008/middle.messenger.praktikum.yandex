import Block from "../../../modules/Block";
import template from "./message.hbs";

import "./message.css";

interface IMessageProps {
    time: string;
    partner?: boolean;
    message?: string;
    image?: string;
    statusMessage?: string;
}

export class Message extends Block<IMessageProps> {
    render() {
        return this.compile(template, this.props);
    }
}
