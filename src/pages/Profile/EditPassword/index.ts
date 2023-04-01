import Block from "../../../modules/Block";

import template from "./editPassword.hbs";

import {Avatar} from "../../../components/Avatar";
import {Input} from "../../../components/Input";
import {Field} from "../../../components/ProfileField/Field";
import {ProfileField} from "../../../components/ProfileField";
import {BackInChats} from "../../../components/BackIiChats";
import "./editPassword.css";
import {validate} from "../../../utils/validate";
import {setError} from "../../../utils/setError";
import {Button} from "../../../components/Button3";

export class EditPassword extends Block {
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

        this.children.fieldOldPassword = new ProfileField({
            nameField: "Старый Пароль",
            field: new Input({
                name: "oldPassword",
                type: "password",
                value: "12345",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        this.blur(this.children.fieldOldPassword as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldOldPassword as Block, e);
                    }
                }
            })
        });

        this.children.fieldNewPassword = new ProfileField({
            nameField: "Новый Пароль",
            field: new Input({
                name: "password",
                type: "password",
                value: "123456789",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        this.blur(this.children.fieldNewPassword as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldNewPassword as Block, e);
                    }
                }
            })
        });
        this.children.fieldAginNewPassword = new ProfileField({
            nameField: "Повторите новый пароль",
            field: new Input({
                name: "again_password",
                type: "password",
                value: "123456789",
                className: "profile-field_value",
                events: {
                    blur: e => {
                        this.blur(this.children.fieldAginNewPassword as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldAginNewPassword as Block, e);
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

    blur(elem: Block, event: Event) {
        const target = event.target as HTMLInputElement;
        const [, objErrors] = validate({[target.name]: target.value});

        setError(elem.element, objErrors[target.name]);
    }

    focus(elem: Block, event: Event) {
        const target = event.target as HTMLInputElement;
        const [, objErrors] = validate({[target.name]: target.value});

        setError(elem.element, objErrors[target.name]);
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
            console.log(inputValue);
        }
    };

    render() {
        return this.compile(template, {...this.props});
    }
}
