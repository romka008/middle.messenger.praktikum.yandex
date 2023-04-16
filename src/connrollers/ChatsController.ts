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
}

export default new ChatsController();
