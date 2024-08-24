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

import { 
  Slider,
  imagesUrls
} from './slider.js';


const openModalBtn = document.getElementById('open-modal-btn');
const accordionContainerLm = document.getElementById('accordion-container');
const imageSliderLm = document.getElementById('image-slider');


accordionContainerLm.innerHTML = accordionData.map(({ id, title, description }) => (
  `
    <li class="accordion-panel">
      <div aria-controls="accordion__content-wrapper-${id}" aria-expanded="false" class="accordion__title-container">
        <h2 class="accordion-title">
          ${title}
        </h2>
        <svg aria-hidden="true" focusable="false" role="presentation" class="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 328l144-144l144 144" />
        </svg>
      </div>
      <div id="accordion__content-wrapper-${id}" class="accordion__content-wrapper" aria-hidden="true">
        <div>
          <div class="accordion__content">
          ${description}
          </div>
        </div>
      </div>
    </li>
  `
)).join('');


//TODO Refactor components into classes
//TODO Add tabs

// Image slider
new Slider(imageSliderLm, imagesUrls);

// Carousel
carousel.addEventListener('scroll', handleSliderScroll);
prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);




// Modal event
openModalBtn.addEventListener('click', openModal);

// Accordion events
const accordionPanelLms = document.querySelectorAll('.accordion-panel');
addAccordionEvents(accordionPanelLms, '.accordion-panel', '.accordion__title-container', '.accordion__content-wrapper', true);