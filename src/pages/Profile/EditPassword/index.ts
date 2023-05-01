import Block from "../../../modules/Block";

import template from "./editPassword.hbs";

import {Avatar} from "../../../components/Avatar";
import {Input} from "../../../components/Input";
import {Field} from "../../../components/ProfileField/Field/Field";
import {ProfileField} from "../../../components/ProfileField";
import {BackInChats} from "../../../components/BackInChats";
import "./editPassword.css";
import {blur, focus, validate} from "../../../utils/validate";
import {setError} from "../../../utils/setError";
import {Button} from "../../../components/Button3";
import {IEditPasswordData} from "../../../api/UserApi";
import UserController from "../../../connrollers/UserController";
import {connect} from "../../../hoc/connect";
import AuthController from "../../../connrollers/AuthController";

class EditPasswordBase extends Block {
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
                placeholder: "Старый пароль",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldOldPassword as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldOldPassword as Block, e);
                    }
                }
            })
        });

        this.children.fieldNewPassword = new ProfileField({
            nameField: "Новый Пароль",
            field: new Input({
                name: "password",
                type: "password",
                placeholder: "Новый пароль",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldNewPassword as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldNewPassword as Block, e);
                    }
                }
            })
        });
        this.children.fieldAginNewPassword = new ProfileField({
            nameField: "Повторите новый пароль",
            field: new Input({
                name: "again_password",
                type: "password",
                placeholder: "Повторите новый пароль",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        blur(this.children.fieldAginNewPassword as Block, e);
                    },
                    focus: e => {
                        focus(this.children.fieldAginNewPassword as Block, e);
                    }
                }
            })
        });

        this.children.buttonSaveNewPassword = new Button({
            label: "Сохранить",
            className: "profile-save_newpassword",
            type: "click",
            events: {
                click: e => {
                    e.preventDefault();

                    this.handleSubmit(e);
                }
            }
        });

        this.children.backInChats = new BackInChats({});
    }

    private handleSubmit = (evt: PointerEvent): void => {
        evt.preventDefault();

        const inputValue: Record<string, string> = {};

        let errors = 0;

        for (const key in this.children) {
            const item = this.children[key];
            if (item instanceof ProfileField) {
                const input = item.element!.getElementsByClassName("text-input")[0];
                const name = (input as HTMLInputElement).name;
                const value = (input as HTMLInputElement).value;

                inputValue[name] = value;

                if (name === "again_password") {
                    const [statusValid, objErrors] = validate({
                        ["password"]: inputValue["password"],
                        [name]: value
                    });
                    if (!statusValid) errors++;
                    setError(item.element, objErrors[name]);
                } else {
                    const [statusValid, objErrors] = validate({[name]: value});
                    if (!statusValid) errors++;
                    setError(item.element, objErrors[name]);
                }
            }
        }

        const isValid = errors === 0;

        if (isValid) {
            const responseData: IEditPasswordData = {} as IEditPasswordData;
            for (const key in inputValue) {
                if (Object.prototype.hasOwnProperty.call(inputValue, key)) {
                    const el = inputValue[key];
                    if (key === "oldPassword") {
                        responseData[key] = el;
                    } else if (key === "password") {
                        responseData["newPassword"] = el;
                    }
                }
            }
            console.log(inputValue);
            UserController.editPassword(responseData);
        }
    };

    async componentDidMount(): Promise<void> {
        await AuthController.fetchUser();
    }

    render() {
        if (this.props.data) {
            (this.children.avatar as Block).setProps({path: this.props.data.avatar});
        }
        return this.compile(template, {...this.props});
    }
}

const withUser = connect(state => ({...state.user}));

export const EditPassword = withUser(EditPasswordBase);
