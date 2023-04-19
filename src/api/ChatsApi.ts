import {BaseApi} from "./BaseAPI";
import {queryStringify} from "../utils/helpers";

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

    getChatsByTitle(title: string) {
        return this.http.get<IChats[]>(`?${queryStringify({title})}`);
    }

    create(data: {title: string}) {
        return this.http.post("", data);
    }

    delete(data: {id: number}) {
        return this.http.delete("", {chatId: data.id});
    }

    read = undefined;
    update = undefined;
}
