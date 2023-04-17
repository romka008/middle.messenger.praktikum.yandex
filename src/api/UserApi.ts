import {BaseApi} from "./BaseAPI";

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface IEditProfileData {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
}

export interface IEditPasswordData {
    oldPassword: string;
    newPassword: string;
}

export class UserApi extends BaseApi {
    constructor() {
        super("/user");
    }

    editProfile(data: IEditProfileData) {
        return this.http.put<IUser>("/profile", data);
    }

    editPassword(data: IEditPasswordData) {
        return this.http.put("/password", data);
    }

    editAvatar(data: FormData) {
        return this.http.put<IUser>("/profile/avatar", data, "FormData");
    }

    create = undefined;
    read = undefined;
    update = undefined;
    delete = undefined;
}
