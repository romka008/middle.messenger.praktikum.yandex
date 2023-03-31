import Block from "../../../modules/Block";
import template from "./editProfile.hbs";
import {Avatar} from "../../../components/Avatar";
import {Input} from "../../../components/Input";
import {Field} from "../../../components/ProfileField/Field";
import {ProfileField} from "../../../components/ProfileField";
import {BackInChats} from "../../../components/BackIiChats";
import {Button} from "../../../components/Button3";
import {validate} from "../../../utils/validate";
import {setError} from "../../../utils/setError";

import "./editProfile.css";

export class EditProfile extends Block {
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

        this.children.avatar = new Avatar();

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
                        this.blur(this.children.fieldEmail as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldEmail as Block, e);
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
                        this.blur(this.children.fieldLogin as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldLogin as Block, e);
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
                        this.blur(this.children.fieldFirstName as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldFirstName as Block, e);
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
                        this.blur(this.children.fieldSecondName as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldSecondName as Block, e);
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
                        this.blur(this.children.fieldDisplayName as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldDisplayName as Block, e);
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
                        this.blur(this.children.fieldPhone as Block, e);
                    },
                    focus: e => {
                        this.focus(this.children.fieldPhone as Block, e);
                    }
                }
            })
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

                const [statusValid, objErrors] = validate({[name]: value});
                if (!statusValid) errors++;
                setError(item.element, objErrors[name]);
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
