import Block from "../modules/Block";
import Router from "../modules/Router";

export interface PropsWithRouter {
    router: typeof Router;
}
// eslint-disable-next-line
export const withRouter = (Component: typeof Block<any>) => {
    // eslint-disable-next-line
    type Props = typeof Component extends typeof Block<infer P extends Record<string, any>> ? P : any;

    return class WithRouter extends Component {
        constructor(props: Props & PropsWithRouter) {
            super({...props, router: Router});
        }
    };
};
