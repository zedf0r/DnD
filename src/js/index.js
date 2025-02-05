import css from "../css/main.css"
import { Popovers } from "./popovers/popover";

console.log('JS Init')

document.addEventListener("DOMContentLoaded", function () {
    const popover = new Popovers(document.querySelector('.main'));
    popover.buildPopover();
});