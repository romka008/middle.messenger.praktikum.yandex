import Block from "../../modules/Block";
import template from "./chats.hbs";
import {Input} from "../../components/Input";
import {InputSearch} from "../../components/Input/InputSearch";
import {ChatBlock} from "../../components/ChatBlock";
import {Button} from "../../components/Button3";
import {Messages} from "../../components/Messages";
import {Message} from "../../components/Messages/Message";
import statusMessageIcon from "../../assets/icons/read.svg";
import addChat from "../../assets/icons/addUserIcon.svg";
import cameraImage from "../../assets/image/cameraImg.png";
import router from "../../modules/Router";
import ChatsController from "../../connrollers/ChatsController";
import {ModalCreateChat} from "./modals/ModalCreateChat";
import {openModal} from "../../utils/helpers";
import {ModalAddUser} from "./modals/ModalAddUser";
import {MainBlockChat} from "./MainBlockChat";

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
                    router.go("/profile");
                }
            }
        });
        this.children.modalCreateChat = new ModalCreateChat();
        this.children.modalAddUser = new ModalAddUser();

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

        this.children.messages = new Messages({
            messages: [
                new Message({
                    message: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то 
                        момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем 
                        чтоастронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще 
                        находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
                        <br /><br />
                        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
                        никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе
                        за 45000 евро.`,
                    time: "11:56",
                    partner: true
                }),
                new Message({
                    image: cameraImage,
                    time: "11:56",
                    partner: true
                }),

                new Message({
                    message: "Круто!",
                    statusMessage: statusMessageIcon,
                    time: "12:00"
                })
            ]
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
                        console.log(value);
                        if (value) {
                            ChatsController.getChatsByTitle(value);
                        } else {
                            ChatsController.getChats();
                        }
                    }
                }
            })
        });

        this.children.сhatBlock = new ChatBlock({});

        ChatsController.getChats();
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
