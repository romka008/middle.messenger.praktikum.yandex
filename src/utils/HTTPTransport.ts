import {queryStringify} from "./helpers";

enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

type Options = {
    method: METHODS;
    contentType?: string;
    // eslint-disable-next-line
    data?: any;
};

export default class HTTPTransport {
    static API_URL = "https://ya-praktikum.tech/api/v2";
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(url: string, data?: unknown): Promise<Response> {
        const newUrl = data ? `?${url}${queryStringify(data)}` : url;
        return this.request(this.endpoint + newUrl);
    }

    public post<Response = void>(url: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + url, {
            method: METHODS.POST,
            data
        });
    }

    public put<Response = void>(url: string, data: unknown, contentType?: string): Promise<Response> {
        return this.request(this.endpoint + url, {
            method: METHODS.PUT,
            contentType,
            data
        });
    }

    public delete<Response>(url: string, data: unknown): Promise<Response> {
        return this.request(this.endpoint + url, {
            method: METHODS.DELETE,
            data
        });
    }

    private request<Response>(url: string, options: Options = {method: METHODS.GET}): Promise<Response> {
        const {method, data, contentType} = options;
        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error("No method"));
                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({reason: "abort"});
            xhr.onerror = () => reject({reason: "network error"});
            xhr.ontimeout = () => reject({reason: "timeout"});

            xhr.withCredentials = true;
            xhr.responseType = "json";
            if (contentType === "FormData") {
                xhr.send(data);
                return;
            } else {
                xhr.setRequestHeader("Content-Type", "application/json");
            }

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
