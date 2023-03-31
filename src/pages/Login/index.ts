import Block from "../../modules/Block";
import template from "./login.hbs";
import {Button} from "../../components/Button3";
import {LabeledInput} from "../../components/LabeledInput";
import {setError} from "../../utils/setError";
import {validate} from "../../utils/validate";
import {Link} from "../../components/Link";

import "./login.css";

export class Login extends Block {
    constructor() {
        super({});
    }
    init() {
        this.children.button = new Button({
            label: "Авторизоваться",
            className: "login-form__submit",
            type: "click",
            events: {
                click: e => {
                    e.preventDefault();

                    this.handleSubmit();
                }
            }
        });

        // this.children.loginInput2 = new InputBlock({
        //     span: "Логин2",
        //     input: new Input({
        //         name: "login",
        //         type: "text",
        //         span: "dsfdsf",

        //         events: {
        //             blur: e => {
        //                 const [statusError, objErrors] = validate({[e.target.name]: e.target.value});
        //                 setError((this.children.loginInput2 as Block).element, objErrors[e.target.name]);
        //             },
        //             focus: e => {
        //                 const [statusError, objErrors] = validate({[e.target.name]: e.target.value});

        //                 setError((this.children.loginInput2 as Block).element, objErrors[e.target.name]);
        //             }
        //         }
        //     })
        // });

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

        this.children.link = new Link({
            route: "./signup",
            value: "Нет аккаунта?",
            className: "center"
        });
    }

    private handleSubmit = (): void => {
        const inputValue: Record<string, string> = {};

        let errors = 0;

        for (const key in this.children) {
            const item = this.children[key];
            if (item instanceof LabeledInput) {
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

    // protected removeChildrenListenersBlur() {
    //     Object.entries(this.children).forEach(elem => {
    //         const item = elem[1];
    //         if (item instanceof LabeledInput) {
    //             console.log(item);
    //             (item.children.input as Block).setProps({events: () => {}});
    //         }
    //     });
    // }

    componentDidMount(): void {
        console.log("Mount Login");
    }

    protected render(): DocumentFragment {
        return this.compile(template, {...this.props});
    }
}
