import {AuthApi, ISigninData, ISignupData} from "../api/AuthApi";
import router from "../modules/Router";
import {store} from "../modules/Store";

class AuthController {
    private api: AuthApi;
    constructor() {
        this.api = new AuthApi();
    }

    signup(data: ISignupData) {
        this.api
            .signup(data)
            .then(() => {
                router.go("/profile");
            })
            .catch(console.log);
    }

    async signin(data: ISigninData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();
            router.go("/profile");
        } catch (err) {
            store.set("user.hasError", true);
            console.error(err);
        }
    }

    logout() {
        this.api
            .logout()
            .then(() => {
                router.go("/login");
            })
            .catch(console.log);
    }

    async fetchUser() {
        store.set("user.isLoading", true);
        await this.api.getUser().then(user => {
            store.set("user.data", user);
        });
        store.set("user.isLoading", false);
    }
}

export default new AuthController();
