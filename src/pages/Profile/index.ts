import Block from "../../modules/Block";
import template from "./profile.hbs";
import {Avatar} from "../../components/Avatar";
import {BackInChats} from "../../components/BackInChats";
import {ProfileField} from "../../components/ProfileField";
import {Field} from "../../components/ProfileField/Field/Field";
import authController from "../../connrollers/AuthController";
import {Button} from "../../components/Button3";
import router from "../../modules/Router";
import {connect} from "../../hoc/connect";

import "./profile.css";

class ProfileBase extends Block {
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

        this.children.editDataButton = new Button({
            label: "Изменить данные",
            className: "edit-data",
            events: {
                click: () => {
                    router.go("/settings/edit-profile");
                }
            }
        });

        this.children.editPasswordButton = new Button({
            label: "Изменить пароль",
            className: "edit-password",
            events: {
                click: () => {
                    router.go("/settings/edit-password");
                }
            }
        });

        this.children.logoutButton = new Button({
            label: "Выход",
            className: "logout",
            events: {
                click: () => {
                    authController.logout();
                }
            }
        });

        this.children.backInChats = new BackInChats({});
    }

    async componentDidMount(): Promise<void> {
        if (!this.props.data) {
            await authController.fetchUser();
        }
    }

    _setValue() {
        const setFieldValue = (field: string, value: string): void => {
            ((this.children[field] as Block).children.field as Block).setProps({"value": value});
        };

        setFieldValue("fieldEmail", this.props.data.email);
        setFieldValue("fieldLogin", this.props.data.login);
        setFieldValue("fieldFirstName", this.props.data.first_name);
        setFieldValue("fieldSecondName", this.props.data.second_name);
        setFieldValue("fieldDisplayName", this.props.data.display_name);
        setFieldValue("fieldPhone", this.props.data.phone);
        (this.children.fieldName as Block).setProps({value: this.props.data.first_name});

        // ((this.children["fieldEmail"] as Block).children.field as Block).setProps({"value": this.props.data.email});
        // ((this.children["fieldEmail"] as Block).children.field as Block).setProps({"value": this.props.data.email});
    }

    render() {
        if (this.props.data) {
            this._setValue();
        }
        return this.compile(template, {...this.props});
    }
}

const withUser = connect(state => ({...state.user}));

export const Profile = withUser(ProfileBase);
