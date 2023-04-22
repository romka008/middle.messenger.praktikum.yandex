import {ChatsApi} from "../api/ChatsApi";
import {store} from "../modules/Store";
import MessageController from "./MessageController";

class ChatsController {
    private api: ChatsApi;
    constructor() {
        this.api = new ChatsApi();
    }

    async getChats() {
        try {
            const chats = await this.api.getChats();
            chats.forEach(async chat => {
                const token = await this.getToken(chat.id);

                MessageController.connect(chat.id, token);
            });
            store.set("chats", chats);
        } catch (err) {
            console.error(err);
        }
    }

    async createChat(data: {title: string}) {
        try {
            await this.api.create(data);

            this.getChats();
        } catch (err) {
            console.error(err);
        }
    }

    async deleteChat(data: {id: number}) {
        try {
            await this.api.delete(data);

            this.getChats();
        } catch (err) {
            console.error(err);
        }
    }

    async getChatsByTitle(title: string) {
        try {
            const chats = await this.api.getChatsByTitle(title);
            store.set("chats", chats);
        } catch (err) {
            console.error(err);
        }
    }

    getToken(id: number) {
        return this.api.getToken(id);
    }

    async getUsersToChat(id: number) {
        try {
            const usersInActiveChat = await this.api.getUsersToChat(id);

            store.set("usersInActiveChat", usersInActiveChat);
        } catch (err) {
            console.error(err);
        }
    }

    async addUserToChat(id: number, usersId: number[]) {
        try {
            await this.api.addUsersToChat(id, usersId);
            this.getUsersToChat(id);
            if (usersId.length > 0) {
                alert("Пользователи добавлены, скорее всего!");
            }
        } catch (err) {
            console.error(err);
        }
    }

    async deleteUsersFromChat(id: number, usersId: number[]) {
        try {
            await this.api.deleteUsersFromChat(id, usersId);
            this.getUsersToChat(id);
            if (usersId.length > 0) {
                alert("Пользователи удалены, скорее всего!");
            }
        } catch (err) {
            console.error(err);
        }
    }
}

export default new ChatsController();
