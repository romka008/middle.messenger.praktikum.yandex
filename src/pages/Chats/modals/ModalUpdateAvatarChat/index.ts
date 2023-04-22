import Block from "../../../../modules/Block";
import template from "./modalUpdateAvatarChat.hbs";
import {Button} from "../../../../components/Button3";
import {closeModal} from "../../../../utils/helpers";
import {store} from "../../../../modules/Store";
import ChatsController from "../../../../connrollers/ChatsController";

import "../modals.css";

export class ModalUpdateAvatarChat extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.sendFile = new Button({
            className: "modal__send",
            label: "Отправить",
            type: "submit",
            events: {
                click: e => {
                    e.preventDefault();

                    const chatId = store.getState().activeChat;

                    const form = document.getElementById("form-update-avatar-chat");
                    if (form && chatId) {
                        const formData = new FormData(form as HTMLFormElement);
                        formData.append("chatId", String(chatId));
                        ChatsController.updateAvatar(formData);
                    }
                    this.clearInput();
                    closeModal(document.querySelector(".modal-window__updata-avatar-chat"));
                }
            }
        });

        this.children.closeModal = new Button({
            className: "button__close",
            label: "Закрыть",
            type: "submit",
            events: {
                click: e => {
                    e.preventDefault();
                    this.clearInput();
                    closeModal(document.querySelector(".modal-window__updata-avatar-chat"));
                }
            }
        });
    }

    clearInput() {
        const inputModal = document.getElementById("avatar-chat-modal") as HTMLInputElement;
        if (inputModal) {
            inputModal.value = "";
        }
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
