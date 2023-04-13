import Block from "./Block";

interface IBlockConstructor<P extends Record<string, any> = any> {
    new (props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

function render(rootSelector: string, component: Block) {
    const root = document.querySelector(rootSelector);

    if (root === null) {
        throw new Error(`Селектор "${rootSelector}" не найден`);
    }

    root.innerHTML = "";
    root.appendChild(component.getContent()!);

    component.dispatchComponentDidMount();

    return root;
}

class Route {
    private _pathname: string;
    private readonly _blockClass: IBlockConstructor;
    private _block: Block | null = null;
    private readonly _props: {rootQuery: string};
    constructor(pathname: string, blockClass: IBlockConstructor, props: {rootQuery: string}) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._block = null;
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        this._block = null;
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            render(this._props.rootQuery, this._block);
            return;
        }
    }
}

export class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private _rootQuery: string;
    private history = window.history;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    public use(pathname: string, block: IBlockConstructor) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new Router("#root");
