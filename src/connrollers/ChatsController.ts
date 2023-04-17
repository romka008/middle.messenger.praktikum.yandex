import {ChatsApi} from "../api/ChatsApi";
import {store} from "../modules/Store";

class ChatsController {
    private api: ChatsApi;
    constructor() {
        this.api = new ChatsApi();
    }

    async getChats() {
        const chats = await this.api.getChats();
        console.log(chats);
        store.set("chats", chats);
    }

    async createChat(data: {title: string}) {
        await this.api.create(data);

        this.getChats();
    }
}

export default new ChatsController();
