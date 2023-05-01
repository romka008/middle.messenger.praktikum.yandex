import {store} from "../modules/Store";
import {WebSocketClient, WebSockets} from "../modules/WebSocketClient";
import ChatsController from "./ChatsController";

const CHAT_URL = "wss://ya-praktikum.tech/ws/chats/";

export interface IAcceptMessage {
    "content": string;
    "type": WebSockets;
    "time": string;
    "user_id": number;
    "id": number;
}

class MessageController {
    private sockets: Record<number, WebSocketClient> = {};
    private _webSocket: WebSocketClient;

    public connect(id: number, token: string) {
        if (this.sockets[id]) {
            return;
        }

        const userId = store.getState().user.data?.id;
        this._webSocket = new WebSocketClient(`${CHAT_URL}${userId}/${id}/${token}`);

        this.sockets[id] = this._webSocket;

        this._webSocket.onMessage = (acceptData: string) => {
            const data = JSON.parse(acceptData);

            if (Array.isArray(data)) {
                if (!data.length) {
                    store.set(`messages.${id}`, []);
                } else if (data[0].id === 0) {
                    store.set(`messages.${id}`, data);
                } else {
                    store.set(`messages.${id}`, [...data].reverse());
                }
            } else if (typeof data === "object" && data.type === "message") {
                const messages = [...store.getState().messages![id], data];
                store.set(`messages.${id}`, messages);
            }
        };
    }

    public getMessages(options: {offset: number}) {
        this._webSocket.send(
            JSON.stringify({
                content: options.offset.toString(),
                type: WebSockets.GETOLD
            })
        );
    }

    public close(id: number) {
        this.sockets[id].close();
    }

    public sendMessage(id: number, message: string) {
        const socket = this.sockets[id];

        if (!socket) {
            throw new Error(`Чат с ${id} не подключен`);
        }
        socket.send(
            JSON.stringify({
                content: message,
                type: WebSockets.MESSAGE
            })
        );

        ChatsController.getChats();
    }
}

export default new MessageController();
