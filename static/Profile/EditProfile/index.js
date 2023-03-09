import {Button} from "../../../src/components/Button/Button";

const root = document.querySelector(".profile-save");
console.log(root);
root.innerHTML = Button({text: "Сохранить"});
console.log(root);
