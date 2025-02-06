export function removeCard() {
    const cards = document.querySelectorAll('.main__list-item');

    cards.forEach(card => {
        const cardsItem = card.querySelectorAll('.main__list-card');

        cardsItem.forEach(item => {
            const cardClose = item.querySelector('.main__list-card--close')

            cardClose.addEventListener('click', () => {
                item.remove()
            })
        })
    })
}