import {connect} from "../../../hoc/connect";
import Block from "../../../modules/Block";
import template from "./foundListUsers.hbs";
import {FoundUser} from "./FoundUser";

import "./foundListUsers.css";
import {Button} from "../../Button3";

interface IFoundUser {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: null | string;
    avatar: null | string;
    email: string;
    phone: string;
}

interface IFoundListProps {
    foundUsers: IFoundUser[];
}

export class FoundListUsersBase extends Block<IFoundListProps> {
    constructor(props: IFoundListProps) {
        super(props);
    }
    init() {
        this.children.foundUsers = this.createListUsers(this.props);

        this.children.addUsers = new Button({
            label: "Добавить",
            events: {
                click: e => {
                    e.preventDefault();
                    const nodesSelectUsers = document.querySelectorAll(".select-user");
                    const listIdSelectUsers: string[] = [];
                    nodesSelectUsers.forEach(el => listIdSelectUsers.push(el.id));
                    console.log(listIdSelectUsers);
                }
            }
        });
    }

    createListUsers(props: IFoundListProps) {
        return (props.foundUsers || []).map(el => {
            // return foundListUsers.map(el => {
            return new FoundUser({
                id: el.id,
                login: el.login,
                events: {
                    click: () => {
                        // openModal(document.querySelector(".modal-window__add-user"));
                        document.getElementById(`${el.id}`)?.classList.toggle("select-user");
                    }
                }
            });
        });
    }

    protected componentDidUpdate(_oldProps: IFoundListProps, newProps: IFoundListProps): boolean {
        this.children.foundUsers = this.createListUsers(newProps);

        return true;
    }

    componentDidMount(): void {
        console.log("Mount FoundListUsers");
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}

const withFoundUsers = connect(state => {
    return {foundUsers: [...(state.foundUsers || [])]};
});

export const FoundListUsers = withFoundUsers(FoundListUsersBase as typeof Block);
