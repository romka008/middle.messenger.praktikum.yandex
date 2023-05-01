import {Login} from "./pages/Login";
import {SignUp} from "./pages/Signup/Signup";
import {PageNotFound} from "./pages/PageNotFound";
import {ErrorServer} from "./pages/ErrorServer";
import {Profile} from "./pages/Profile";
import {EditProfile} from "./pages/Profile/EditProfile";
import {EditPassword} from "./pages/Profile/EditPassword";
import {Chats} from "./pages/Chats";
import Router from "./modules/Router";
import authController from "./connrollers/AuthController";

enum Routes {
    Login = "/",
    Register = "/sign-up",
    Profile = "/settings",
    Messenger = "/messenger",
    EditProfile = "/settings/edit-profile",
    EditPassword = "/settings/edit-password",
    PageNotFound = "/404",
    ErrorServer = "/500"
}

window.addEventListener("DOMContentLoaded", async () => {
    Router.use(Routes.Login, Login)
        .use(Routes.Register, SignUp)
        .use(Routes.Profile, Profile)
        .use(Routes.EditProfile, EditProfile)
        .use(Routes.EditPassword, EditPassword)
        .use(Routes.Messenger, Chats)
        .use(Routes.PageNotFound, PageNotFound)
        .use(Routes.ErrorServer, ErrorServer);

    let isProtectedRoute = true;
    switch (window.location.pathname) {
        // case Routes.Home:
        case Routes.Login:
        case Routes.Register:
            isProtectedRoute = false;
            break;
    }

    try {
        await authController.fetchUser();
        Router.start();

        if (!isProtectedRoute) {
            Router.go(Routes.Profile);
        }
    } catch (e) {
        Router.start();
        if (isProtectedRoute) {
            Router.go(Routes.Login);
        }
    }
});
