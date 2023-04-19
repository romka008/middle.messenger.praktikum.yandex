import Block from "../../../modules/Block";
import template from "./mainBlockChat.hbs";
import attachmentIcon from "../../../assets/icons/attachmentIcon.svg";
import paramsIcon from "../../../assets/icons/paramsIcon.svg";
import addUserIcon from "../../../assets/icons/addUserIcon.svg";
import deleteUserIcon from "../../../assets/icons/deleteUserIcon.svg";
import cameraImage from "../../../assets/image/cameraImg.png";
import sendIcon from "../../../assets/icons/sendIcon.svg";
import statusMessageIcon from "../../../assets/icons/read.svg";
import deleteChatIcon from "../../../assets/icons/deleteIcon.svg";
import {Button} from "../../../components/Button3";
import {openModal} from "../../../utils/helpers";
import {Messages} from "../../../components/Messages";
import {Message} from "../../../components/Messages/Message";
import {InputSearch} from "../../../components/Input/InputSearch";
import {Input} from "../../../components/Input";
import {Form} from "../../../components/Form";
import {connect} from "../../../hoc/connect";
import {IInfoChat} from "../../../modules/Store";
import ChatsController from "../../../connrollers/ChatsController";

import "./mainBlockChat.css";

class MainBlockChatBase extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.buttonShowAddChatMenu = new Button({
            label: "+",
            className: "chat-page__add-chat",
            events: {
                click: () => {
                    document.querySelector(".add-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonShowAttachmentMenu = new Button({
            className: "icon-attachment",
            svg: attachmentIcon,
            events: {
                click: () => {
                    document.querySelector(".add-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonShowParamsChatMenu = new Button({
            className: "chat-page__params-chat",
            svg: paramsIcon,
            events: {
                click: () => {
                    document.querySelector(".params-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonShowModalAddUser = new Button({
            label: "Добавить пользователя",
            svg: addUserIcon,
            className: "item-menu",
            events: {
                click: () => {
                    openModal(document.querySelector(".modal-window__add-user"));
                    document.querySelector(".params-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonShowModalDeleteUser = new Button({
            label: "Удалить пользователя",
            svg: deleteUserIcon,
            className: "item-menu",
            events: {
                click: () => {
                    openModal(document.querySelector(".modal-window__create-chat"));
                    document.querySelector(".params-chat__menu")?.classList.toggle("menu-visible");
                }
            }
        });

        this.children.buttonDeleteChat = new Button({
            label: "Удалить чат",
            svg: deleteChatIcon,
            className: "item-menu",
            events: {
                click: () => {
                    ChatsController.deleteChat({id: this.props.dataActiveChat.id});
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

        this.children.formSendMessage = new Form({
            id: "form-message",
            className: "send-message-form",
            inputs: [
                new Input({
                    name: "message",
                    type: "text",
                    className: "input-message",
                    placeholder: "Сообщение"
                })
            ],

            buttons: [
                new Button({
                    className: "send-message",
                    svg: sendIcon,
                    type: "submit",
                    events: {
                        click: e => {
                            e.preventDefault();
                            const form = document.getElementById("form-message");
                            if (form) {
                                const formData = new FormData(form as HTMLFormElement);
                                const formDataObj: Record<string, unknown> = {};
                                formData.forEach((value, key) => (formDataObj[key] = value));
                                console.log(formDataObj);
                            }
                        }
                    }
                })
            ]
        });
    }

    render() {
        // console.log(this.props);
        return this.compile(template, {...this.props});
    }
}

const withDataForChat = connect(state => {
    return {
        chats: [...(state.chats || [])],
        messages: [...(state.messages || [])],
        dataActiveChat: state.chats.find((chat: IInfoChat) => chat.id === state.activeChat),
        userId: state.user.data.id
    };
});

export const MainBlockChat = withDataForChat(MainBlockChatBase as typeof Block);
