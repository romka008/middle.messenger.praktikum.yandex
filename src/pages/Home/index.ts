// import {connect} from "../../hoc/connect";
import Block from "../../modules/Block";
import template from "./home.hbs";

export class HomePage extends Block {
    constructor() {
        super({});
    }

    render() {
        console.log(this);
        return this.compile(template, {});
    }
}

// const withUser = connect(state => ({...state.user}));

// export const HomePage = withUser(HomePageBase);
