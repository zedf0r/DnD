import { removeCard } from "./removeCard";

export function addForm() {
  const form = `
    <input type="text" placeholder="Enter a title for this card">
    <div class="main__list-buttons">
        <div class="buttons-add">
            <button type="submit">Add Card</button>
            <div class="button-close">
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="main__list-menu options">
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
    `;

  const cards = document.querySelectorAll(".main__list-item");
  removeCard();
  cards.forEach((card) => {
    const cardButton = card.querySelector(".card__widget--add");
    const cardContainer = card.querySelector(".main__list-container");
    cardButton.addEventListener("click", () => {
      const formInHtml = card.querySelector(".main__list-form");
      if (!formInHtml) {
        const formElement = document.createElement("form");

        formElement.classList.add("main__list-form");
        formElement.innerHTML = form;
        cardContainer.insertAdjacentElement("beforeend", formElement);

        formElement.addEventListener("submit", (e) => {
          e.preventDefault();
          const input = formElement.querySelector("input");

          if (!input.value) return;

          const listItem = document.createElement("div");

          listItem.classList.add("main__list-card");
          listItem.innerHTML = newCard(input.value);

          formElement.insertAdjacentElement("beforebegin", listItem);
          formElement.remove();
          removeCard();
        });
      } else {
        return;
      }
    });
  });
}

export const newCard = (text) => `
    <div class="main__list-card--info card">
        <span>${text}</span>
    </div>
    <div class="main__list-card--close button-close hidden">
        <div></div>
        <div></div>
    </div>
`;
