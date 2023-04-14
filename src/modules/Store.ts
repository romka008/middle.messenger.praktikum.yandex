import {IUser} from "../api/AuthApi";
import {set} from "../utils/helpers";
import Block from "./Block";
import {EventBus} from "./EventBus";

export enum StoreEvents {
    Updated = "updated"
}

interface IState {
    user: {
        data: null | IUser;
        isLoading: boolean;
        hasError: boolean;
    };
}

const inintialState: IState = {
    user: {
        data: null,
        isLoading: true,
        hasError: false
    }
};

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus<string> {
    private state = inintialState;

    public set(path: string, value: unknown) {
        set(this.state, path, value);
        // метод EventBus
        this.emit(StoreEvents.Updated, this.state);
    }

    public getState() {
        return this.state;
    }
}

const store = new Store();

// eslint-disable-next-line
export const withStore = (mapStateToProps: (state: IState) => any) => {
    return (Component: typeof Block) => {
        return class WithStore extends Component {
            // eslint-disable-next-line
            constructor(props: any) {
                const mappedState = mapStateToProps(store.getState());
                super({...props, ...mappedState});

                store.on(StoreEvents.Updated, newState => {
                    const newMappedState = mapStateToProps(newState);
                    this.setProps(newMappedState);
                });
            }
        };
    };
};

export {store};
