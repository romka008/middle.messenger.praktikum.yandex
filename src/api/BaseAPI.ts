import HTTPTransport from "../utils/HTTPTransport";

export abstract class BaseApi {
    protected http: HTTPTransport;

    protected constructor(endpoint: string) {
        this.http = new HTTPTransport(endpoint);
    }

    public abstract create?(data: unknown): Promise<unknown>;

    public abstract read?(identifier?: string): Promise<unknown>;

    public abstract update?(identifier: string, data: unknown): Promise<unknown>;

    public abstract delete?(data: unknown): Promise<unknown>;
}
