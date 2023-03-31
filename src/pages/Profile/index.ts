import Block from "../../modules/Block";
import template from "./profile.hbs";
import {Avatar} from "../../components/Avatar";
import {Link} from "../../components/Link";
import {BackInChats} from "../../components/BackIiChats";
import {ProfileField} from "../../components/ProfileField";
import {Field} from "../../components/ProfileField/Field";

import "./profile.css";

export class Profile extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.avatar = new Avatar();

        this.children.fieldName = new Field({
            name: "first_name",
            value: "Роман",
            className: "profile-name"
        });

        this.children.fieldEmail = new ProfileField({
            nameField: "Почта",
            field: new Field({
                name: "email",
                value: "pochta@yandex.ru"
            })
        });

        this.children.fieldLogin = new ProfileField({
            nameField: "Логин",
            field: new Field({
                name: "login",
                value: "romka008"
            })
        });

        this.children.fieldFirstName = new ProfileField({
            nameField: "Имя",
            field: new Field({
                name: "first_name",
                value: "Роман"
            })
        });
        this.children.fieldSecondName = new ProfileField({
            nameField: "Фамлия",
            field: new Field({
                name: "second_name",
                value: "Андреевич"
            })
        });

        this.children.fieldDisplayName = new ProfileField({
            nameField: "Имя в чате",
            field: new Field({
                name: "display_name",
                value: "romka008"
            })
        });
        this.children.fieldPhone = new ProfileField({
            nameField: "Телефон",
            field: new Field({
                name: "phone",
                value: "+7 (999)-999-99-99"
            })
        });

        this.children.linkEditData = new Link({
            route: "./edit-data",
            value: "Изменить данные",
            className: "edit-data"
        });

        this.children.linkEditPassword = new Link({
            route: "./edit-password",
            value: "Изменить пароль",
            className: "edit-password"
        });

        this.children.linkLogout = new Link({
            route: "./logout",
            value: "Выход",
            className: "logout"
        });

        this.children.backInChats = new BackInChats({});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
