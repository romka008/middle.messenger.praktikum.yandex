const checkPattern = (name: string, target: string) => {
    if (!target) return "Поле не может быть пустым";

    switch (true) {
        case name === "first_name" || name === "second_name":
            // eslint-disable-next-line
            if (/[ `!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?~]/.test(target)) {
                return "Не должно быть пробелов и спецсимволов (допустим только дефис)";
            } else if (!/^[A-ZА-Я0-9][a-zа-я0-9\s-]*$/.test(target)) {
                return "Только первая буква должна быть заглавной";
            } else if (!/^\S*$/.test(target)) {
                return "Не должно быть пробелов";
            } else if (/\d/.test(target)) {
                return "Не должно быть цифр";
            }
            return "";

        case name === "email":
            return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(target) ? "" : "Email недействителен";

        case name === "login":
            if (!/.{3,20}/.test(target)) {
                return "От 3 до 20 символов";
            } else if (!/^[\w-]*$/.test(target)) {
                // eslint-disable-next-line
                return `Только из букв и цифр, не должно быть пробелов и спецсимволов (допустим только "-" и "_")`;
            } else if (/^\d+$/.test(target)) {
                return "Не может состоять только из цифр";
            }
            return "";

        case name === "password":
            return /^(?=.*\d)(?=.*[A-Z]).{8,40}$/.test(target)
                ? ""
                : "От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";

        case name === "phone":
            return /^(\+?\d{10,14})$/.test(target)
                ? ""
                : "От 10 до 15 символов, состоит из цифр, может начинается с плюса";

        default:
            return "";
    }
};

export const validate = (targetObj: Record<string, string>) => {
    // eslint-disable-next-line
    const temp: any = [];

    for (const key in targetObj) {
        if (key === "again_password") {
            temp[key] = targetObj[key] === targetObj["password"] ? "" : "Пароли не совпадают";
        } else {
            temp[key] = checkPattern(key, targetObj[key]);
        }
    }
    console.log({...temp});
    return [Object.values(temp).every(x => x === ""), {...temp}];
};
