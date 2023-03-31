import Block from "../../modules/Block";
import template from "./signUp.hbs";
import {Button} from "../../components/Button3";
import {Input} from "../../components/Input";
import {validate} from "../../utils/validate";
import {LabeledInput} from "../../components/LabeledInput";
import {setError} from "../../utils/setError";
import {Link} from "../../components/Link";

import "./signup.css";

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
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.email as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.email as Block).element, objErrors[target.name]);
            }
        });

        this.children.login = new LabeledInput({
            name: "login",
            type: "text",
            span: "Логин",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.login as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.login as Block).element, objErrors[target.name]);
            }
        });

        this.children.firstName = new LabeledInput({
            name: "first_name",
            type: "text",
            span: "Имя",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.firstName as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.firstName as Block).element, objErrors[target.name]);
            }
        });

        this.children.secondName = new LabeledInput({
            name: "second_name",
            type: "text",
            span: "Фамилия",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.secondName as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.secondName as Block).element, objErrors[target.name]);
            }
        });

        this.children.phone = new LabeledInput({
            name: "phone",
            type: "text",
            span: "Телефон",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.phone as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.phone as Block).element, objErrors[target.name]);
            }
        });

        this.children.password = new LabeledInput({
            name: "password",
            type: "password",
            span: "Пароль",
            blur: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.password as Block).element, objErrors[target.name]);
            },
            focus: e => {
                const target = e.target as HTMLInputElement;
                const [, objErrors] = validate({[target.name]: target.value});

                setError((this.children.password as Block).element, objErrors[target.name]);
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
            className: "center"
        });
    }

    private handleSubmit = (evt: PointerEvent): void => {
        evt.preventDefault();

        const inputValue: Record<string, string> = {};

        let errors = 0;

        for (const key in this.children) {
            const item = this.children[key];
            if (item instanceof LabeledInput) {
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

    componentDidMount(): void {
        console.log("Mount SignUp");
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
