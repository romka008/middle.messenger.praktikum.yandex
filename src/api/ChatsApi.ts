import {BaseApi} from "./BaseAPI";
import {IInfoChat, IUserInActiveChat} from "../modules/Store";

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
        return this.http.get<IChats[]>("", {title});
    }

    create(data: {title: string}) {
        return this.http.post("", data);
    }

    delete(data: {id: number}) {
        return this.http.delete("", {chatId: data.id});
    }

    async getToken(id: number) {
        const response = await this.http.post<{token: string}>(`/token/${id}`);

        return response.token;
    }

    getUsersToChat(id: number) {
        return this.http.get<IUserInActiveChat[]>(`/${id}/users`);
    }

    addUsersToChat(id: number, usersID: number[]) {
        return this.http.put("/users", {users: usersID, chatId: id});
    }

    deleteUsersFromChat(id: number, usersID: number[]) {
        return this.http.delete("/users", {users: usersID, chatId: id});
    }

    updateAvatar(data: FormData) {
        return this.http.put<IInfoChat>("/avatar", data, "FormData");
    }

    read = undefined;
    update = undefined;
}
