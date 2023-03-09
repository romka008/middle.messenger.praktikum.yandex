import {Button} from "./components/Button/button.js";
const Handlebars = require("handlebars");

import {sum} from "./modules/sum";

const root = document.querySelector("#root");
root.textContent = sum(7, -1).toString();
