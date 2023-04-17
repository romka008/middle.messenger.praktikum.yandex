import Block from "../../modules/Block";
import template from "./signup.hbs";
import {Button} from "../../components/Button3";
import {Input} from "../../components/Input";
import {blur, focus, validate} from "../../utils/validate";
import {LabeledInput} from "../../components/LabeledInput";
import {setError} from "../../utils/setError";
import {Link} from "../../components/Link";
import authController from "../../connrollers/AuthController";

import "./signup.css";
import {ISignupData} from "../../api/AuthApi";

export class SignUp extends Block {
    constructor() {
        super({});
    }
    init() {
        this.children.button = new Button({
            label: "Регистрация",
            className: "signin-form__submit",
            type: "submit",
            events: {
                click: e => {
                    console.log("Регистрация");
                    this.handleSubmit(e);
                }
            }
        });

        this.children.email = new LabeledInput({
            name: "email",
            type: "text",
            span: "Почта",
            blur: e => {
                blur(this.children.email as Block, e);
            },
            focus: e => {
                focus(this.children.email as Block, e);
            }
        });

        this.children.login = new LabeledInput({
            name: "login",
            type: "text",
            span: "Логин",
            blur: e => {
                blur(this.children.login as Block, e);
            },
            focus: e => {
                focus(this.children.login as Block, e);
            }
        });

        this.children.firstName = new LabeledInput({
            name: "first_name",
            type: "text",
            span: "Имя",
            blur: e => {
                blur(this.children.firstName as Block, e);
            },
            focus: e => {
                focus(this.children.firstName as Block, e);
            }
        });

        this.children.secondName = new LabeledInput({
            name: "second_name",
            type: "text",
            span: "Фамилия",
            blur: e => {
                blur(this.children.secondName as Block, e);
            },
            focus: e => {
                focus(this.children.secondName as Block, e);
            }
        });

        this.children.phone = new LabeledInput({
            name: "phone",
            type: "text",
            span: "Телефон",
            blur: e => {
                blur(this.children.phone as Block, e);
            },
            focus: e => {
                focus(this.children.phone as Block, e);
            }
        });

        this.children.password = new LabeledInput({
            name: "password",
            type: "password",
            span: "Пароль",
            blur: e => {
                blur(this.children.password as Block, e);
            },
            focus: e => {
                focus(this.children.password as Block, e);
            }
        });

        this.children.againPassword = new LabeledInput({
            name: "again_password",
            type: "password",
            span: "Пароль",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const valuePassword = ((this.children.password as this).children.input as Input).value;

                const [, objErrors] = validate({["password"]: valuePassword, [target.name]: target.value});
                setError((this.children.againPassword as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const valuePassword = ((this.children.password as this).children.input as Input).value;

                const [, objErrors] = validate({["password"]: valuePassword, [target.name]: target.value});
                setError((this.children.againPassword as Block).element, objErrors[target.name]);
            }
        });

        this.children.link = new Link({
            route: "/login",
            value: "Войти",
            className: "link-block"
        });
    }

    private handleSubmit = (evt: PointerEvent): void => {
        evt.preventDefault();

        const inputValue: ISignupData = {} as ISignupData;

        let errors = 0;

        for (const key in this.children) {
            const item = this.children[key];
            if (item instanceof LabeledInput) {
                const input = item.element!.getElementsByClassName("text-input")[0];
                const name = (input as HTMLInputElement).name;
                const value = (input as HTMLInputElement).value;

                inputValue[
                    name as "first_name" | "second_name" | "login" | "email" | "password" | "again_password" | "phone"
                ] = value;

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
            authController.signup(inputValue);
        }
    };

    componentDidMount(): void {
        console.log("Mount SignUp");
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
