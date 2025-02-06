import { newCard } from "./addCard";
import { removeCard } from "./removeCard";

export function saveData() {
    window.addEventListener('beforeunload', () => {
        const data = {};
        const cards = document.querySelectorAll('.main__list-item')
        cards.forEach((card, index) => {
            const cardItem = card.querySelectorAll('.main__list-card');
            data[index] = []

            cardItem.forEach((item) => {
                const text = item.textContent;
                data[index].push(text)
            })
        })

        localStorage.setItem('data', JSON.stringify(data))
    })
}

export function loadData() {
  const json = localStorage.getItem("data");

  let data;
  try {
    data = JSON.parse(json);
  } catch (error) {
    console.log(error);
  }

  if (data) {
    Object.keys(data).forEach((key, index) => {
      const cardContainer = document.querySelectorAll(".main__list-item")[index];
      const container = cardContainer.querySelector(".main__list-container")
      // const addButton = cardContainer.querySelector(".card__widget--add");
      const arrayText = data[key];

      arrayText.forEach((text) => {
        const card = document.createElement("div");
        card.classList.add("main__list-card", "card");
        card.innerHTML = newCard(text);
        container.insertAdjacentElement("afterbegin", card);
        removeCard();
      });
    });
  }
}
