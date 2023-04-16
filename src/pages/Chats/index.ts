import Block from "../../modules/Block";
import template from "./chats.hbs";
import {Input} from "../../components/Input";
import {InputSearch} from "../../components/Input/InputSearch";
import {ChatBlock} from "../../components/ChatBlock";
import {Button} from "../../components/Button3";
import {Form} from "../../components/Form";
import {Messages} from "../../components/Messages";
import {Message} from "../../components/Messages/Message";
import statusMessageIcon from "../../assets/icons/read.svg";
import cameraImage from "../../assets/image/cameraImg.png";
import router from "../../modules/Router";
import ChatsController from "../../connrollers/ChatsController";

import "./chats.css";

export class Chats extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.linkProfile = new Button({
            label: "Профиль &gt;",
            className: "link-profile",
            events: {
                click: () => {
                    router.go("/profile");
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
                placeholder: "Поиск"
            })
        });

        this.children.сhatBlock = new ChatBlock({});

        ChatsController.getChats();

        this.children.form = new Form({
            className: "send-message-form",
            inputs: [
                new Input({
                    name: "message",
                    type: "text",
                    className: "input-message",
                    placeholder: "Сообщение"
                })
            ],

            button: new Button({
                className: "send-message",
                svg: `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 6L1 11" stroke="white" stroke-width="1.6"/>
            </svg>`,
                type: "submit",
                events: {
                    click: e => {
                        e.preventDefault();
                        const form = document.querySelector("form");
                        if (form) {
                            const formData = new FormData(form);
                            const formDataObj: Record<string, unknown> = {};
                            formData.forEach((value, key) => (formDataObj[key] = value));
                            console.log(formDataObj);
                        }
                    }
                }
            })
        });
        this.children.inputSendMessage = new Input({
            name: "message",
            type: "text",
            className: "input-message",
            placeholder: "Сообщение"
        });
        this.children.buttonSendMessage = new Button({
            className: "send-message",
            svg: `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 6L1 11" stroke="white" stroke-width="1.6"/>
            </svg>`,
            events: {
                click: e => {
                    e.preventDefault();

                    console.log((this.children.inputSendMessage as Input).value);
                }
            }
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
