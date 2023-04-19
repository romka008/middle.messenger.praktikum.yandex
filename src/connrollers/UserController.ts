import {IEditPasswordData, IEditProfileData, UserApi} from "../api/UserApi";
import router from "../modules/Router";
import AuthController from "./AuthController";

class UserController {
    private api: UserApi;
    constructor() {
        this.api = new UserApi();
    }

    editProfile(data: IEditProfileData) {
        this.api
            .editProfile(data)
            .then(() => {
                router.go("/profile");
            })
            .catch(console.log);
    }

    editPassword(data: IEditPasswordData) {
        this.api
            .editPassword(data)
            .then(() => {
                router.go("/profile");
            })
            .catch(console.log);
    }

    async editAvatar(avatar: FormData) {
        await this.api.editAvatar(avatar);

        await AuthController.fetchUser();
    }

    searchUsers(login: string) {
        return this.api.search(login);
    }
}

export default new UserController();
