import {queryStringify} from "./queryStringify";

enum METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

type Options = {
    method?: string;
    // eslint-disable-next-line
    data?: any;
    headers?: Record<string, string>;
    timeout?: number;
    retries?: number;
};

type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.GET}, options.timeout);

    post: HTTPMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.POST}, options.timeout);

    put: HTTPMethod = (url, options = {}) => this.request(url, {...options, method: METHODS.PUT}, options.timeout);

    delete: HTTPMethod = (url, options = {}) =>
        this.request(url, {...options, method: METHODS.DELETE}, options.timeout);

    async request(url: string, options: Options = {}, timeout = 5000): Promise<unknown> {
        const {retries = 1} = options;

        const error = (err: Error) => {
            const count = retries - 1;
            if (!count) {
                throw err;
            }
            return this.request(url, {
                ...options,
                retries: count
            });
        };

        try {
            return await this.mainRequest(url, options, timeout);
        } catch (err) {
            return error(err);
        }
    }
    // request(url: string, options: Options = {}, timeout = 5000): Promise<unknown> {
    //     const {retries = 1} = options;

    //     const error = (err: Error) => {
    //         const count = retries - 1;
    //         if (!count) {
    //             throw err;
    //         }
    //         return this.request(url, {
    //             ...options,
    //             retries: count
    //         });
    //     };

    //     return this.mainRequest(url, options, timeout).catch(error);
    // }

    mainRequest = (url: string, options: Options = {}, timeout = 5000) => {
        const {headers = {}, method, data} = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject("No method");
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                // должен быть "Document | XMLHttpRequestBodyInit | null | undefined"
                xhr.send(data);
            }
        });
    };
}

export default HTTPTransport;
