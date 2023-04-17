export class EventBus<Events extends string> {
    private readonly listeners: Record<string, Array<(...args: unknown[]) => void>>;
    constructor() {
        this.listeners = {};
    }

    // eslint-disable-next-line
    on(event: Events, callback: (...args: any[]) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]?.push(callback);
    }

    off(event: Events, callback: () => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]!.filter(listener => listener !== callback);
    }

    emit(event: Events, ...args: unknown[]) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
}
