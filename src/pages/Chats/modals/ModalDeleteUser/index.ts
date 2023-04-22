import Block from "../../../../modules/Block";
import template from "./modalDeleteUser.hbs";
import {Button} from "../../../../components/Button3";
import {Form} from "../../../../components/Form";
import {LabeledInput} from "../../../../components/LabeledInput";
import {closeModal} from "../../../../utils/helpers";
import UserController from "../../../../connrollers/UserController";
import {FoundListUsers} from "../../ChatListBlock/FoundListUsers";
import {store} from "../../../../modules/Store";
import {Input} from "../../../../components/Input";

import "../modals.css";

export class ModalDeleteUser extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.foundListDeleteUsers = new FoundListUsers({deleteModal: true});

        this.children.formDeleteUsers = new Form({
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
                            this._addChat(this.children.formDeleteUsers as Block);
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
                                ((this.children.formDeleteUsers as Block).children.inputs as Block[])[0].children
                                    .input as Input
                            ).value = "";
                            closeModal(document.querySelector(".modal-window__delete-user"));
                            store.set("foundUsers", []);
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
