import Block from "../../../../../modules/Block";
import template from "./foundUser.hbs";

import "./foundUser.css";

interface IFoundUserProps {
    id: number;
    login: string;
    events: {
        click: (event: PointerEvent) => void;
    };
    first_name?: string;
    second_name?: string;
    display_name?: null | string;
    avatar?: null | string;
    email?: string;
    phone?: string;
}

export class FoundUser extends Block<IFoundUserProps> {
    constructor(props: IFoundUserProps) {
        super(props);
    }

    componentDidMount(): void {
        console.log("Mount FoundUser");
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
