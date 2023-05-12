import Block from "../../modules/Block";
import template from "./avatar.hbs";
import {Button} from "../Button3";
import UserController from "../../connrollers/UserController";
import {ImageAvatar} from "./ImageAvatar/ImageAvatar";
import {connect} from "../../hoc/connect";

import "./avatar.css";

interface AvatarProps {
    path?: string;
}

export class AvatarBase extends Block {
    constructor(props: AvatarProps) {
        super({...props});
    }

    protected init(): void {
        this.children.sendFile = new Button({
            label: "Отправить",
            events: {
                click: e => {
                    e.preventDefault();

                    const form = document.querySelector("form");
                    if (form) {
                        const formData = new FormData(form);
                        UserController.editAvatar(formData);
                    }
                }
            }
        });

        this.children.imageAvatar = new ImageAvatar({
            events: {
                click: e => {
                    e.preventDefault();

                    const formElement = document.getElementById("myUserForm");

                    if (formElement) {
                        formElement.style.visibility = "visible";
                    }
                }
            }
        });
    }

    render() {
        (this.children.imageAvatar as Block).setProps({path: this.props.avatar});
        return this.compile(template, {...this.props});
    }
}

const withUser = connect(state => ({...state.user.data}));

export const Avatar = withUser(AvatarBase);
