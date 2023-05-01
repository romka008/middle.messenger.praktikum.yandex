import Block from "../../../../modules/Block";
import template from "./modalAddUser.hbs";
import {Button} from "../../../../components/Button3";
import {Form} from "../../../../components/Form";
import {LabeledInput} from "../../../../components/LabeledInput";
import {closeModal} from "../../../../utils/helpers";
import UserController from "../../../../connrollers/UserController";
import {FoundListUsers} from "../../ChatListBlock/FoundListUsers";
import {store} from "../../../../modules/Store";
import {Input} from "../../../../components/Input";

import "../modals.css";

export class ModalAddUser extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.foundListUsers = new FoundListUsers({});

        this.children.formAddChat = new Form({
            className: "modal__form",
            inputs: [
                new LabeledInput({
                    name: "login",
                    type: "text",
                    span: "Логин"
                })
                // new Input({
                //     name: "title",
                //     type: "text",
                //     className: "modal__text",
                //     placeholder: "..."
                // })
            ],

            buttons: [
                new Button({
                    className: "modal__send",
                    label: "Найти",
                    type: "submit",
                    events: {
                        click: e => {
                            e.preventDefault();
                            this._addChat(this.children.formAddChat as Block);
                        }
                    }
                }),

                new Button({
                    className: "button__close",
                    label: "Закрыть",
                    type: "submit",
                    events: {
                        click: e => {
                            e.preventDefault();
                            (
                                ((this.children.formAddChat as Block).children.inputs as Block[])[0].children
                                    .input as Input
                            ).value = "";
                            closeModal(document.querySelector(".modal-window__add-user"));
                            store.set("foundUsers", undefined);
                        }
                    }
                })
            ]
        });
    }

    _addChat(elem: Block) {
        const form = elem.element as HTMLFormElement;
        if (form) {
            const formData = new FormData(form);
            const formDataObj: Record<string, unknown> = {};
            formData.forEach((value, key) => (formDataObj[key] = value));
            if (formDataObj.login) {
                UserController.searchUsers(formDataObj.login as string).then(data => {
                    store.set("foundUsers", data);
                });
            }
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
