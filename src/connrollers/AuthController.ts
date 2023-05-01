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
                router.go("/messenger");
            })
            .catch(console.log);
    }

    async signin(data: ISigninData) {
        try {
            await this.api.signin(data);

            await this.fetchUser();
            router.go("/messenger");
        } catch (err) {
            store.set("user.hasError", true);
            console.error(err);
        }
    }

    logout() {
        this.api
            .logout()
            .then(() => {
                router.go("/");
            })
            .catch(console.log);
    }

    async fetchUser() {
        // store.set("user.isLoading", true);
        // console.log(store);
        // await this.api.getUser().then(user => {
        //     store.set("user.data", user);
        // });
        // console.log(store);
        // store.set("user.isLoading", false);

        // store.set("user.isLoading", true);
        // await this.api
        //     .getUser()
        //     .then(user => {
        //         store.set("user.data", user);
        //     })
        //     .finally(() => {
        //         setTimeout(() => store.set("user.isLoading", false), 0);
        //     });
        store.set("user.isLoading", true);
        await this.api
            .getUser()
            .then(user => {
                store.set("user.data", user);
            })
            .finally(() => {
                store.set("user.isLoading", false);
            });
    }
}

export default new AuthController();
