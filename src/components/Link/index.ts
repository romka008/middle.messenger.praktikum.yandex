import Block from "../../modules/Block";
import template from "./link.hbs";
import "./link.css";

interface ILinkProps {
    route: string;
    value: string;
    className?: string;
}

export class Link extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super(props);
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
