import Block from "../../../modules/Block";
import template from "./editProfile.hbs";
import {Avatar} from "../../../components/Avatar";
import {Input} from "../../../components/Input";
import {Field} from "../../../components/ProfileField/Field";
import {ProfileField} from "../../../components/ProfileField";
import {BackInChats} from "../../../components/BackInChats";
import {Button} from "../../../components/Button3";
import {blur, focus, validate} from "../../../utils/validate";
import {setError} from "../../../utils/setError";

import "./editProfile.css";
import {connect} from "../../../hoc/connect";
import AuthController from "../../../connrollers/AuthController";
import UserController from "../../../connrollers/UserController";
import {IEditProfileData} from "../../../api/UserApi";

export class EditProfileBase extends Block {
    constructor() {
        super({});
    }

    protected init(): void {
        this.children.button = new Button({
            label: "Сохранить",
            className: "save",
            type: "click",
            events: {
                click: e => {
                    e.preventDefault();

                    this.handleSubmit(e);
                }
            }
        });

        this.children.avatar = new Avatar({});

        this.children.fieldName = new Field({
            name: "first_name",
            value: "Роман",
            className: "profile-name"
        });

        this.children.fieldEmail = new ProfileField({
            nameField: "Почта",
            field: new Input({
                name: "email",
                type: "text",
                value: "pochta@yandex.ru",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldEmail as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldEmail as Block, e);
                    }
                }
            })
        });

        this.children.fieldLogin = new ProfileField({
            nameField: "Логин",
            field: new Input({
                name: "login",
                type: "text",
                value: "romka008",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldLogin as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldLogin as Block, e);
                    }
                }
            })
        });

        this.children.fieldFirstName = new ProfileField({
            nameField: "Имя",
            field: new Input({
                name: "first_name",
                type: "text",
                value: "Роман",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldFirstName as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldFirstName as Block, e);
                    }
                }
            })
        });

        this.children.fieldSecondName = new ProfileField({
            nameField: "Фамилия",
            field: new Input({
                name: "second_name",
                type: "text",
                value: "Андреевич",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldSecondName as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldSecondName as Block, e);
                    }
                }
            })
        });

        this.children.fieldDisplayName = new ProfileField({
            nameField: "Имя в чате",
            field: new Input({
                name: "display_name",
                type: "text",
                value: "romka008",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldDisplayName as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldDisplayName as Block, e);
                    }
                }
            })
        });

        this.children.fieldPhone = new ProfileField({
            nameField: "Телефон",
            field: new Input({
                name: "phone",
                type: "text",
                value: "+7 (999)-999-99-99",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldPhone as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldPhone as Block, e);
                    }
                }
            })
        });

        this.children.backInChats = new BackInChats({});
    }

    private handleSubmit = (evt: PointerEvent): void => {
        evt.preventDefault();

        const inputValue: IEditProfileData = {} as IEditProfileData;

        let errors = 0;

        for (const key in this.children) {
            const item = this.children[key];
            if (item instanceof ProfileField) {
                const input = item.element!.getElementsByClassName("text-input")[0];
                const name = (input as HTMLInputElement).name;
                const value = (input as HTMLInputElement).value;

                inputValue[name as "first_name" | "second_name" | "login" | "email" | "phone"] = value;

                const [statusValid, objErrors] = validate({[name]: value});
                if (!statusValid) errors++;
                setError(item.element, objErrors[name]);
            }
        }

        const isValid = errors === 0;

        if (isValid) {
            console.log(inputValue);
            UserController.editProfile(inputValue);
        }
    };

    async componentDidMount(): Promise<void> {
        await AuthController.fetchUser();
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
        (this.children.avatar as Block).setProps({path: this.props.data.avatar});
    }

    render() {
        if (this.props.data) {
            this._setValue();
        }
        return this.compile(template, {...this.props});
    }
}

const withUser = connect(state => ({...state.user}));

export const EditProfile = withUser(EditProfileBase);
