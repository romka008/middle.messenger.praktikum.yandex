import render from "./utils/renderDOM";

import {HomePage} from "./pages/Home";
import {Login} from "./pages/Login";
import {SignUp} from "./pages/SignUp";
import {PageNotFound} from "./pages/PageNotFound";
import {ErrorServer} from "./pages/ErrorServer";
import {Profile} from "./pages/Profile";
import {EditProfile} from "./pages/Profile/EditProfile";
import {EditPassword} from "./pages/Profile/EditPassword";
import {Chats} from "./pages/Chats";

window.addEventListener("DOMContentLoaded", () => {
    switch (window.location.pathname) {
        case "/login":
            render("#root", new Login());
            break;
        case "/signup":
            render("#root", new SignUp());
            break;
        case "/profile":
            render("#root", new Profile());
            break;
        case "/chats":
            render("#root", new Chats());
            break;
        case "/edit-data":
            render("#root", new EditProfile());
            break;
        case "/edit-password":
            render("#root", new EditPassword());
            break;
        case "/404":
            render("#root", new PageNotFound());
            break;
        case "/500":
            render("#root", new ErrorServer());
            break;
        default:
            render("#root", new HomePage());
            break;
    }
});
