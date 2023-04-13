import {ISigninData, ISignupData} from "../api/AuthApi";
import {IEditPasswordData, IEditProfileData, UserApi} from "../api/UserApi";
import router from "../modules/Router";
import {store} from "../modules/Store";

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
}

export default new UserController();
