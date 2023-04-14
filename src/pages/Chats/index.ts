import Block from "../../modules/Block";
import template from "./chats.hbs";
import {Input} from "../../components/Input";
import {InputSearch} from "../../components/Input/InputSearch";
import {ChatBlock} from "../../components/ChatBlock";
import {Chat} from "../../components/ChatBlock/Chat";
import {Button} from "../../components/Button3";
import {Form} from "../../components/Form";
import {Messages} from "../../components/Messages";
import {Message} from "../../components/Messages/Message";
import statusMessageIcon from "../../assets/icons/read.svg";
import cameraImage from "../../assets/image/cameraImg.png";
import router from "../../modules/Router";

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
        this.children.сhatBlock = new ChatBlock({
            chats: [
                new Chat({
                    nameChat: "Андрей",
                    previewMessage: "Изображение",
                    messageTime: "10:49",
                    countNonReadMessage: "2"
                }),
                new Chat({
                    nameChat: "Киноклуб",
                    previewMessage: "Вы: стикер",
                    messageTime: "12:00",
                    countNonReadMessage: "3"
                }),
                new Chat({
                    nameChat: "Илья",
                    previewMessage: "Друзья, у меня для вас особенный выпуск новостей!...",
                    messageTime: "15:12",
                    countNonReadMessage: "4"
                }),
                new Chat({
                    nameChat: "Вадим",
                    previewMessage: "Вы: Круто!",
                    messageTime: "Пт",
                    countNonReadMessage: "1"
                }),
                new Chat({
                    nameChat: "тет-а-теты",
                    previewMessage: "И Human Interface Guidelines и Material Design рекомендуют...",
                    messageTime: "Ср",
                    countNonReadMessage: "4"
                }),
                new Chat({
                    nameChat: "1, 2, 3",
                    previewMessage: "Миллионы россиян ежедневно проводят десятки часов свое...",
                    messageTime: "Пн",
                    countNonReadMessage: "3"
                }),
                new Chat({
                    nameChat: "Design Destroyer",
                    previewMessage: "В 2008 году художник Jon Rafman  начал собирать...",
                    messageTime: "Пн",
                    countNonReadMessage: "1"
                })
            ]
        });

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
