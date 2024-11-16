import { toggleModalEvents, toggleModalFocus } from "./utils.js";

let closeModalTimId;

export function openModal() {
  const eventsHandler = {};

  const modalContainerLm = document.getElementById('modal');
  const modalContentLm = document.getElementById('modal__content');
  const modalOverlayLm = document.getElementById('modal__overlay');
  const modalBtns = [...modalContentLm.querySelectorAll('button')];
  const closeModalBtn = document.getElementById('modal__close-btn');

  // Open modal
  document.body.style.overflow = 'hidden'
  clearTimeout(closeModalTimId)
  modalContainerLm.style.display = 'flex';
  toggleModalFocus('add', closeModalBtn);
  // Timeout is needed to properly play animations after changing the element's display
  setTimeout(() => {
    modalContentLm.style.transform = 'scale(1)';
    modalContentLm.style.opacity = 1;
    modalOverlayLm.style.opacity = 1;
  });

  // Close modal
  function closeModal() {
    document.body.style.overflow = '';
    modalContentLm.style.transform = 'scale(0)';
    modalOverlayLm.style.opacity = 0;
    modalContentLm.style.opacity = 0;

    closeModalTimId = setTimeout(() => {
      modalContainerLm.style.display = 'none';
      toggleModalFocus('return');
    }, 250);
    
    // Remove event listeners
    toggleModalEvents(eventsHandler, 'remove', null, modalBtns, modalContentLm, modalContainerLm);
  }
 
  // Add event listeners
  toggleModalEvents(eventsHandler, 'add', closeModal, modalBtns, modalContentLm, modalContainerLm, '.modal__overlay');
}