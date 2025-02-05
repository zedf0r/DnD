import { experiments } from "webpack";
import { Popovers } from "../popovers/popover";

describe('Popover test', () => {
    document.body.innerHTML = '<main class="main"></main>';
    const main = document.querySelector('.main');
    const popover = new Popovers(main);
    const button = main.querySelector('.button');

    test('Popover show', () => {
        popover.buildPopover();
        button.click();
        const container = main.querySelector('.container');

        expect(container).toBeTruthy();
    })

    test('Popover close', () => {
        popover.buildPopover();
        button.click();
        button.click();
        const container = main.querySelector('.container');
        expect(container.classList.contains('visible')).toBe(true)
    })
})