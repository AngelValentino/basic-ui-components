import { 
  handleSliderScroll, 
  slideLeft, 
  slideRight, 
  carousel, 
  prevBtn, 
  nextBtn
} 
from './carousel.js'

import {
  addAccordionEvents,
  accordionData
} from './accordion.js'

import { 
  openModal 
} from './modal.js';

const openModalBtn = document.getElementById('open-modal-btn');
const accordionContainerLm = document.getElementById('accordion-container');

accordionContainerLm.innerHTML = accordionData.map(({ id, title, description }) => (
  `
    <li class="accordion-panel">
      <div aria-controls="accordion-content-wrapper-${id}" aria-expanded="false" class="accordion__title-container">
        <h2 class="accordion-title">
          ${title}
        </h2>
        <svg aria-hidden="true" focusable="false" role="presentation" class="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 328l144-144l144 144" />
        </svg>
      </div>
      <div id="accordion-content-wrapper-${id}" class="accordion-content-wrapper" aria-hidden="true">
        <div>
          <div class="accordion-content">
          ${description}
          </div>
        </div>
      </div>
    </li>
  `
)).join('');

//TODO Refactor and improve carousel syles and logic

// Carousel events
carousel.addEventListener('scroll', handleSliderScroll);
prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);

// Modal event
openModalBtn.addEventListener('click', openModal);

// Accordion events
const accordionPanelLms = document.querySelectorAll('.accordion-panel');
addAccordionEvents(accordionPanelLms, '.accordion-panel', '.accordion__title-container', true);