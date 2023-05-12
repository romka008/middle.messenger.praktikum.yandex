import Block from "../../modules/Block";
import template from "./link.hbs";
import "./link.css";
import {PropsWithRouter, withRouter} from "../../hoc/withRouter";

interface ILinkProps extends PropsWithRouter {
    route: string;
    value: string;
    className?: string;
    events?: {
        click: () => void;
    };
}

export class BaseLink extends Block<ILinkProps> {
    constructor(props: ILinkProps) {
        super({
            ...props,
            events: {
                click: () => this.navigate()
            }
        });
    }

    navigate() {
        this.props.router.go(this.props.route);
    }

    protected render(): DocumentFragment {
        console.log(this.props);
        return this.compile(template, {...this.props});
    }
}

export const Link = withRouter(BaseLink);
