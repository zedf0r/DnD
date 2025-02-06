import { removeCard } from "./removeCard";

export function dragAndDrop() {
  const items = document.querySelector(".main__list");
  const itemsElement = items.querySelectorAll('.main__list-container');
  let actualElement;
  let offsetX = 0;
  let offsetY = 0;

  const onMouseUp = (e) => {
    if (!actualElement) return;
    const mouseUpItem = e.target.closest('.main__list-card')
    const mouseUpContainer = e.target.closest('.main__list-item')

    if (mouseUpItem) {
      const container = mouseUpContainer.querySelector('.main__list-container');
      console.log(container)
      container.insertBefore(actualElement, mouseUpItem)
    } 
    else if (!mouseUpItem && mouseUpContainer) {
      const container = mouseUpContainer.querySelector('.main__list-container')
      container.appendChild(actualElement)
    }

    actualElement.classList.remove('dragged');

    actualElement = undefined;

    document.documentElement.removeEventListener('mouseup', onMouseUp)
    document.documentElement.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = (e) => {
    if (!actualElement) return;

    actualElement.style.top = (e.clientY - offsetY) + 'px';
    actualElement.style.left = (e.clientX - offsetX) + 'px';
  }

  items.addEventListener('mousedown', (e) => {
    actualElement = e.target.closest('.main__list-card')
    const buttonClose = e.target.closest('.main__list-card--close')

    if (buttonClose) {
      removeCard()
    } else if (!actualElement) {
      return
    } else if (actualElement) {
      e.preventDefault()
      offsetX = e.clientX - actualElement.getBoundingClientRect().left
      offsetY = e.clientY - actualElement.getBoundingClientRect().top
      actualElement.classList.add('dragged')
      document.documentElement.addEventListener('mouseup', onMouseUp)
      document.documentElement.addEventListener('mousemove', onMouseMove)
    }
  })
}
