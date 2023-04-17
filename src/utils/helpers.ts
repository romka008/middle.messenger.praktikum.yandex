// eslint-disable-next-line
export type Indexed<T = any> = {
    [key in string]: T;
};

function isPlainObject(value: unknown): value is Indexed {
    return (
        typeof value === "object" &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === "[object Object]"
    );
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = rhs[key];
        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            // if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== "string") {
        return new Error("path must be string");
    }

    if (typeof object !== "object" || object === null) {
        return object;
    }

    const result = path.split(".").reduceRight<Indexed>(
        (acc, key) => ({
            [key]: acc
        }),
        // eslint-disable-next-line
        value as any
    );
    return merge(object as Indexed, result);
}

export function trim(string: string, chars?: string): string {
    if (string && !chars) {
        return string.trim();
    }

    const reg = new RegExp(`[${chars}]`, "gi");
    return string.replace(reg, "");
}

export function cloneDeep<T extends object = object>(obj: T) {
    if (typeof obj !== "object" || obj === null) {
        return obj;
    }

    // eslint-disable-next-line
    let copy: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
        const value = obj[key];
        copy[key] = cloneDeep(value as object);
    }
    return copy;
}

// eslint-disable-next-line
type StringIndexed = Record<string, any>;

const obj: StringIndexed = {
    key: 1,
    key2: "test",
    key3: false,
    key4: true,
    key5: [1, 2, 3],
    key6: {a: 1},
    key7: {b: {d: 2}}
};

// key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2

export function queryStringify(data: StringIndexed): string | never {
    if (typeof data !== "object") {
        throw new Error("input must be an object");
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
        const value = data[key];
        const endLine = index < keys.length - 1 ? "&" : "";

        if (Array.isArray(value)) {
            const arrayValue = value.reduce<StringIndexed>(
                (result, arrData, index) => ({
                    ...result,
                    [`${key}[${index}]`]: arrData
                }),
                {}
            );

            return `${result}${queryStringify(arrayValue)}${endLine}`;
        }

        if (typeof value === "object") {
            const objValue = Object.keys(value || {}).reduce<StringIndexed>(
                (result, objKey) => ({
                    ...result,
                    [`${key}[${objKey}]`]: value[objKey]
                }),
                {}
            );

            return `${result}${queryStringify(objValue)}${endLine}`;
        }

        return `${result}${key}=${value}${endLine}`;
    }, "");
}

export function addPreLoader() {
    (document.querySelector("body") as HTMLElement).classList.add("pre-loader");
}

export function removePreLoader() {
    (document.querySelector("body") as HTMLElement).classList.remove("pre-loader");
}

export const getTime = (str: string) => {
    const date = new Date(str);
    return `${date.getHours()}:${date.getMinutes()}`;
};

export const openModal = (a: Element | null) => {
    a?.classList.add("modal__open");
    document.querySelector(".wrapper")?.classList.add("wrapper__dark__background");
    (document.querySelector(".chat-page") as HTMLElement).style.opacity = "0.4";
};

export const closeModal = (a: Element | null) => {
    a?.classList.remove("modal__open");
    document.querySelector(".wrapper")?.classList.remove("wrapper__dark__background");
    (document.querySelector(".chat-page") as HTMLElement).style.opacity = "1";
};
