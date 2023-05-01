import Block from "../../../modules/Block";
import template from "./MainBlockChat.hbs";
import attachmentIcon from "../../../assets/icons/attachmentIcon.svg";
import paramsIcon from "../../../assets/icons/paramsIcon.svg";
import addUserIcon from "../../../assets/icons/addUserIcon.svg";
import deleteUserIcon from "../../../assets/icons/deleteUserIcon.svg";
import sendIcon from "../../../assets/icons/sendIcon.svg";
import readIcon from "../../../assets/icons/read.svg";
import doNotReadIcon from "../../../assets/icons/doNotReadIcon.svg";
import deleteChatIcon from "../../../assets/icons/deleteIcon.svg";
import {Button} from "../../../components/Button3";
import {getTime, openModal} from "../../../utils/helpers";
import {Messages} from "../../../components/Messages";
import {Message} from "../../../components/Messages/Message";
import {InputSearch} from "../../../components/Input/InputSearch";
import {Input} from "../../../components/Input";
import {Form} from "../../../components/Form";
import {connect} from "../../../hoc/connect";
import {IInfoChat, IMessage, IUserInActiveChat} from "../../../modules/Store";
import ChatsController from "../../../connrollers/ChatsController";
import MessageController from "../../../connrollers/MessageController";
import {UsersInActiveChat} from "../../../components/UsersInActiveChat";
import {ImageAvatar} from "../../../components/Avatar/ImageAvatar/ImageAvatar";

import "./MainBlockChat.css";

interface MainBlockChatProps {
    chats: IInfoChat[] | [];
    usersInActiveChat: IUserInActiveChat[];
    messages: IMessage[] | [];
    dataActiveChat?: IInfoChat;
    userId: number;
}

class MainBlockChatBase extends Block<MainBlockChatProps> {
    constructor(props: MainBlockChatProps) {
        super({...props});
    }

    protected init(): void {
        this.children.imageAvatar = this.createImageAvatar(this.props);

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
                    openModal(document.querySelector(".modal-window__delete-user"));
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
                    if (this.props.dataActiveChat?.id) {
                        ChatsController.deleteChat({id: this.props.dataActiveChat.id});
                        MessageController.close(this.props.dataActiveChat.id);
                    }
                }
            }
        });

        this.children.messages = this.createMessages(this.props);

        this.children.usersInActiveChat = this.createUsersInActiveChat(this.props);

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
                                const dataActiveChatId = this.props.dataActiveChat?.id;
                                if ((formDataObj.message as string).length > 0 && dataActiveChatId) {
                                    MessageController.sendMessage(dataActiveChatId, formDataObj.message as string);
                                    // eslint-disable-next-line
                                    (this.children.formSendMessage as any).children.inputs[0].value = "";
                                }
                            }
                        }
                    }
                })
            ]
        });
    }

    protected componentDidUpdate(_oldProps: MainBlockChatProps, newProps: MainBlockChatProps): boolean {
        this.children.messages = this.createMessages(newProps);
        this.children.usersInActiveChat = this.createUsersInActiveChat(newProps);
        this.children.avatar = this.createImageAvatar(newProps);

        return true;
    }

    createImageAvatar(props: MainBlockChatProps) {
        return new ImageAvatar({
            path: props.dataActiveChat?.avatar,
            classNameContainer: "chat-avatar-user",
            events: {
                click: e => {
                    e.preventDefault();
                    openModal(document.querySelector(".modal-window__updata-avatar-chat"));
                }
            }
        });
    }

    createUsersInActiveChat(props: MainBlockChatProps) {
        return new UsersInActiveChat({
            users: (props.usersInActiveChat ? props.usersInActiveChat : []).map(data => {
                return data.login;
            })
        });
    }

    createMessages(props: MainBlockChatProps) {
        const activeChatID = this?.props?.dataActiveChat?.id;
        return new Messages({
            messages: (activeChatID ? props.messages : []).map(data => {
                return new Message({
                    ...data,
                    textMessage: data.content,
                    statusMessage: data.is_read ? readIcon : doNotReadIcon,
                    time: getTime(data.time),
                    partner: props.userId !== data.user_id
                });
            })
        });
    }

    render() {
        return this.compile(template, {...this.props});
    }
}

const withDataForChat = connect(state => {
    return {
        chats: [...(state.chats || [])],
        usersInActiveChat: state.usersInActiveChat || [],
        messages: (state.messages || {})[state.activeChat] || [],
        dataActiveChat: state.chats.find((chat: IInfoChat) => chat.id === state.activeChat),
        userId: state.user.data?.id
    };
});

export const MainBlockChat = withDataForChat(MainBlockChatBase as typeof Block);
