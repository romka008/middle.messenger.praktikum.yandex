export enum WebSockets {
    MESSAGE = "message",
    PING = "ping",
    GETOLD = "get old"
}

export class WebSocketClient {
    private webSocket: WebSocket;
    private ping: number;
    constructor(private url: string) {
        this.webSocket = new WebSocket(this.url);

        this.webSocket.onopen = () => {
            this.getMessages({offset: 0});
            this.ping = setInterval(() => {
                this.webSocket.send(
                    JSON.stringify({
                        type: WebSockets.PING
                    })
                );
            }, 10000);
            console.log("WebSocket соединение открыто!");
        };

        this.webSocket.onclose = () => {
            clearInterval(this.ping);
            console.log("WebSocket соединение закрыто!");
        };

        this.webSocket.onerror = () => {
            console.error("WebSocket, произошла ошибка!");
        };

        this.webSocket.onmessage = event => {
            this.onMessage(event.data);
        };
    }
    // eslint-disable-next-line
    public onMessage(acceptData: string) {}
    // eslint-disable-next-line
    public onOpen() {}
    public getMessages(options: {offset: number}) {
        this.webSocket.send(
            JSON.stringify({
                content: options.offset.toString(),
                type: WebSockets.GETOLD
            })
        );
    }

    public send(data: string) {
        this.webSocket.send(data);
    }

    public close() {
        this.webSocket.close();
    }
}
