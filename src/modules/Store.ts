import {IUser} from "../api/AuthApi";
import {set} from "../utils/helpers";
import {EventBus} from "./EventBus";

export enum StoreEvents {
    Updated = "updated"
}

export interface IInfoChat {
    avatar: null | string;
    created_by: number;
    id: number;
    last_message: null | {content: string; id: number; time: string};
    title: string;
    unread_count: number;
}

export interface IUserInActiveChat {
    avatar: null | string;
    display_name: null | string;
    email: string;
    first_name: string;
    id: number;
    login: string;
    phone: string;
    role: "admin" | "regular";
    second_name: string;
}

export interface IMessage {
    chat_id: number;
    content: string;
    file: null | string;
    id: number;
    is_read: boolean;
    time: string;
    type: string;
    user_id: number;
}

export interface IFoundUser {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: null | string;
    avatar: null | string;
    email: string;
    phone: string;
}

interface IState {
    user: {
        data: null | IUser;
        isLoading: boolean;
        hasError: boolean;
    };
    chats: IInfoChat[] | [];
    foundUsers: IFoundUser[] | [];
    activeChat: number | null;
    messages?: Record<number, IMessage[]>;
    usersInActiveChat?: IUserInActiveChat[] | [];
}

const inintialState: IState = {
    user: {
        data: null,
        isLoading: true,
        hasError: false
    },
    chats: [],
    foundUsers: [],
    activeChat: null,
    messages: {},
    usersInActiveChat: []
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

export {store};
