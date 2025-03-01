import { removeCard } from "./removeCard";

export function dragAndDrop() {
  const items = document.querySelector(".main__list");
  let actualElement;
  let cloneElement;
  let offsetX = 0;
  let offsetY = 0;
  
  const placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  placeholder.style.display = 'none'

  const onMouseUp = (e) => {
    if (!actualElement) return;

    actualElement.classList.remove('opacity-card');
    cloneElement.remove();

    const mouseUpItem = e.target.closest('.main__list-card')
    const mouseUpContainer = e.target.closest('.main__list-item')

    if (mouseUpItem) {
      placeholder.replaceWith(actualElement)
    } 
    else if (!mouseUpItem && mouseUpContainer) {
      const container = mouseUpContainer.querySelector('.main__list-container')
      container.appendChild(actualElement)
    }

    actualElement.classList.remove('dragged');

    actualElement = undefined;
    cloneElement = undefined;
    placeholder.remove();
    document.documentElement.removeEventListener('mouseup', onMouseUp)
    document.documentElement.removeEventListener('mousemove', onMouseMove)
  }

  const onMouseMove = (e) => {
    if (!cloneElement) return;

    cloneElement.style.top = (e.clientY - offsetY) + 'px';
    cloneElement.style.left = (e.clientX - offsetX) + 'px';

    const hoveredCard = e.target.closest('.main__list-card:not(.opacity-card)')
    const hoveredContainer = e.target.closest('.main__list-container')
    const hoveredItem = e.target.closest('.main__list-item')

    if (hoveredCard) {
      const rect = hoveredCard.getBoundingClientRect();
      const isAfter = e.clientY > rect.top + rect.height / 2;
      
      if (isAfter) {
        hoveredCard.insertAdjacentElement('beforebegin', placeholder);
        placeholder.style.display = 'block'
      }
    } 

    // #Код который ломает логику добавление placeholder (Placeholder начинает перебегать то вверх, то вниз)

    // else if (hoveredContainer) {
    //   hoveredContainer.appendChild(placeholder)
    // } else if (hoveredItem) {
    //     const nullContainer = hoveredItem.querySelector('.main__list-container');
    //     nullContainer.appendChild(placeholder)
    // } 

  }

  items.addEventListener('mousedown', (e) => {
    actualElement = e.target.closest('.main__list-card')
    cloneElement = actualElement.cloneNode(true)
    const container = e.target.closest('.main__list-container')
    const buttonClose = e.target.closest('.main__list-card--close')
    if (buttonClose) {
      removeCard()
      return
    } else if (!actualElement) {
      return
    } else if (actualElement) {
      e.preventDefault() 
      container.appendChild(cloneElement);

      actualElement.classList.add('opacity-card');
      cloneElement.classList.add('dragged');

      offsetX = e.clientX - actualElement.getBoundingClientRect().left
      offsetY = e.clientY - actualElement.getBoundingClientRect().top

      cloneElement.style.top = actualElement.getBoundingClientRect().top + 'px';
      cloneElement.style.left = actualElement.getBoundingClientRect().left + 'px';

      document.documentElement.addEventListener('mouseup', onMouseUp)
      document.documentElement.addEventListener('mousemove', onMouseMove)
    }
  })
}
