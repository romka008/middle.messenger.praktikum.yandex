import {connect} from "../../hoc/connect";
import Block from "../../modules/Block";
import template from "./home.hbs";

export class HomePageBase extends Block {
    constructor() {
        super({});
    }

    render() {
        return this.compile(template, {});
    }
}

const withUser = connect(state => ({...state.user}));

export const HomePage = withUser(HomePageBase);
