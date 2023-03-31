import Block from "../../../modules/Block";

import template from "./editPassword.hbs";

import {Avatar} from "../../../components/Avatar";
import {Input} from "../../../components/Input";
import {Field} from "../../../components/ProfileField/Field";
import {ProfileField} from "../../../components/ProfileField";
import {BackInChats} from "../../../components/BackIiChats";
import "./editPassword.css";

export class EditPassword extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.avatar = new Avatar({});

        this.children.fieldName = new Field({
            name: "first_name",
            value: "Роман",
            className: "profile-name"
        });

        this.children.fieldOldPassword = new ProfileField({
            nameField: "Старый Пароль",
            field: new Input({
                name: "oldPassword",
                type: "password",
                value: "12345",
                className: "profile-field_value"
            })
        });

        this.children.fieldNewPassword = new ProfileField({
            nameField: "Новый Пароль",
            field: new Input({
                name: "newPassword",
                type: "password",
                value: "123456789",
                className: "profile-field_value"
            })
        });
        this.children.fieldAginNewPassword = new ProfileField({
            nameField: "Повторите новый пароль",
            field: new Input({
                name: "againNewPassword",
                type: "password",
                value: "123456789",
                className: "profile-field_value"
            })
        });

        this.children.backInChats = new BackInChats({});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
