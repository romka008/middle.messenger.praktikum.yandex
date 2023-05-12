import Block from "../../modules/Block";
import template from "./chats.hbs";
import {Input} from "../../components/Input";
import {InputSearch} from "../../components/Input/InputSearch";
import {ChatListBlock} from "./ChatListBlock";
import {Button} from "../../components/Button3";
import addChat from "../../assets/icons/addUserIcon.svg";
import router from "../../modules/Router";
import ChatsController from "../../connrollers/ChatsController";
import {ModalCreateChat} from "./modals/ModalCreateChat";
import {openModal} from "../../utils/helpers";
import {ModalAddUser} from "./modals/ModalAddUser";
import {MainBlockChat} from "./MainBlockChat/MainBlockChat";
import {ModalDeleteUser} from "./modals/ModalDeleteUser";
import {ModalUpdateAvatarChat} from "./modals/ModalUpdateAvatarChat";
import {ImageAvatar} from "../../components/Avatar/ImageAvatar/ImageAvatar";

import "./chats.css";

export class Chats extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.mainBlockChat = new MainBlockChat({});
        this.children.linkProfile = new Button({
            label: "Профиль &gt;",
            className: "link-profile",
            events: {
                click: () => {
                    router.go("/settings");
                }
            }
        });
        this.children.modalCreateChat = new ModalCreateChat();
        this.children.modalAddUser = new ModalAddUser();
        this.children.modalDeleteUser = new ModalDeleteUser();
        this.children.modalUpdateAvatarChat = new ModalUpdateAvatarChat();

        this.children.imageAvatar = new ImageAvatar({
            events: {
                click: e => {
                    e.preventDefault();
                    openModal(document.querySelector(".modal-window__updata-avatar-chat"));
                }
            }
        });

        this.children.buttonShowAddChatMenu = new Button({
            label: "+",
            className: "chat-page__add-chat",
            events: {
                click: () => {
                    document.querySelector(".add-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonShowModalAddChat = new Button({
            label: "Добавить чат",
            className: "item-menu",
            svg: addChat,
            events: {
                click: () => {
                    openModal(document.querySelector(".modal-window__create-chat"));
                    document.querySelector(".add-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.inputSearch = new InputSearch({
            classname: "search-block",
            input: new Input({
                name: "search",
                type: "text",
                className: "search-chat",
                placeholder: "Поиск",
                events: {
                    change: () => {
                        const {value} = (this.children.inputSearch as Block).children.input as Input;
                        if (value) {
                            ChatsController.getChatsByTitle(value);
                        } else {
                            ChatsController.getChats();
                        }
                    }
                }
            })
        });

        this.children.сhatListBlock = new ChatListBlock({});

        ChatsController.getChats();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
