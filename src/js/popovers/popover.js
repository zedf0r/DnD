export class Popovers {
    constructor(name) {
        this.name = name
        if (this.name) this.init()
    }

    static get markup() {
        return `
        <button class="main__button button" type="button" title="popover" data-content="Lorem, ipsum dolor sit amet consectetur adipisicing.">Click to toggle popover</button>
        `
    }

    popoverMarkup(popoverButton) {
        return `
        <div class="popover">
            <div class="popover__title">${popoverButton.getAttribute('title')}</div>
            <div class="popover__text">${popoverButton.getAttribute('data-content')}</div>
        </div>
        `
    }

    init() {
        this.name.innerHTML = Popovers.markup;
    }

    buildPopover() {
        const popoverButton = this.name.querySelector('.button');

        popoverButton.addEventListener('click', () => {
            const createPopover = document.createElement('div');
            createPopover.classList.add('container', 'visible')
            
            const container = this.name.querySelector('.container');

            if (this.name.querySelector('.popover')) {
                container.classList.add('visible')
                const closePopover = setInterval(() => {
                    container.remove()
                    clearInterval(closePopover)
                },300)
            } else {
                createPopover.innerHTML = this.popoverMarkup(popoverButton);
                this.name.appendChild(createPopover);

                const {bottom} = popoverButton.getBoundingClientRect();

                createPopover.style.left = -createPopover.offsetWidth / 2 + popoverButton.offsetWidth / 2 + "px";
                createPopover.style.bottom = bottom + 5 + "px"
                createPopover.classList.remove('visible')
            }

        })
    }
    
}