import Block from "../../../../modules/Block";
import template from "./modalCreateChat.hbs";
import {Button} from "../../../../components/Button3";
import {Form} from "../../../../components/Form";
import ChatsController from "../../../../connrollers/ChatsController";
import {LabeledInput} from "../../../../components/LabeledInput";
import {closeModal} from "../../../../utils/helpers";

import "../modals.css";

export class ModalCreateChat extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.formAddChat = new Form({
            className: "modal__form",
            inputs: [
                new LabeledInput({
                    name: "title",
                    type: "text",
                    span: "Заголовок"
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
                    label: "Добавить чат",
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
                            closeModal(document.querySelector(".modal-window__create-chat"));
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
            if (formDataObj.title) {
                ChatsController.createChat(formDataObj as {title: string});
                closeModal(document.querySelector(".modal-window__create-chat"));
            }
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
