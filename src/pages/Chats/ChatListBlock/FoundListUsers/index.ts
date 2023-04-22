import Block from "../../../../modules/Block";
import template from "./foundListUsers.hbs";
import {FoundUser} from "./FoundUser";
import {Button} from "../../../../components/Button3";
import ChatsController from "../../../../connrollers/ChatsController";
import {closeModal} from "../../../../utils/helpers";
import {connect} from "../../../../hoc/connect";
import {IFoundUser} from "../../../../modules/Store";

import "./foundListUsers.css";

interface IFoundListProps {
    foundUsers: IFoundUser[];
    activeChat: number;
    deleteModal: boolean;
}

export class FoundListUsersBase extends Block<IFoundListProps> {
    constructor(props: IFoundListProps) {
        super(props);
    }
    init() {
        this.children.foundUsers = this.createListUsers(this.props);

        this.children.addUsers = new Button({
            label: "Добавить",
            className: "button-add-users",
            events: {
                click: e => {
                    e.preventDefault();
                    const nodesSelectUsers = document.querySelectorAll(".select-user");
                    const listIdSelectUsers: number[] = [];
                    nodesSelectUsers.forEach(el => listIdSelectUsers.push(+el.id));

                    ChatsController.addUserToChat(this.props.activeChat, listIdSelectUsers);

                    closeModal(document.querySelector(".modal-window__add-user"));
                }
            }
        });

        this.children.deleteUsers = new Button({
            label: "Удалить",
            className: "button-add-users",
            events: {
                click: e => {
                    e.preventDefault();
                    const nodesSelectUsers = document.querySelectorAll(".select-user");
                    const listIdSelectUsers: number[] = [];
                    nodesSelectUsers.forEach(el => listIdSelectUsers.push(+el.id));
                    console.log(listIdSelectUsers);

                    ChatsController.deleteUsersFromChat(this.props.activeChat, listIdSelectUsers);

                    closeModal(document.querySelector(".modal-window__delete-user"));
                }
            }
        });
    }

    createListUsers(props: IFoundListProps) {
        return (props.foundUsers || []).map(el => {
            return new FoundUser({
                id: el.id,
                login: el.login,
                events: {
                    click: event => {
                        (event.target as HTMLElement)?.classList.toggle("select-user");
                        // document.getElementById(`${el.id}`)?.classList.toggle("select-user");
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
    return {
        foundUsers: [...(state.foundUsers || [])],
        activeChat: state.activeChat
    };
});

export const FoundListUsers = withFoundUsers(FoundListUsersBase as typeof Block);
