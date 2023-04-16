import {BaseApi} from "./BaseAPI";

export interface IChats {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: {
            first_name: string;
            second_name: string;
            avatar: string;
            email: string;
            login: string;
            phone: string;
        };
        time: string;
        content: string;
    };
}

export class ChatsApi extends BaseApi {
    constructor() {
        super("/chats");
    }

    getChats() {
        return this.http.get<IChats[]>("");
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}
