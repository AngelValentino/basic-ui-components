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


import { handleSwipe } from './utils.js';


const openModalBtn = document.getElementById('open-modal-btn');
const accordionContainerLm = document.getElementById('accordion-container');

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

//TODO Add image slider UI component
  //TODO Organize the code into its specific file
  //TODO Add remaining accessibility
//TODO Add tabs UI component

const imagesUrls = [
  './images/scotland.png',
  './images/scotland-2.png',
  './images/scotland-3.png',
];

const imageSliderLm = document.getElementById('image-slider');
const imageContainerLm = document.getElementById('image-slider__img-container');
const imageSliderControlsLm = document.getElementById('image-slider__controls');

let imageIndex = 0;

function initSlider() {
  imageContainerLm.innerHTML = imagesUrls.map((url, i) => {
    return `<img aria-hidden="${imageIndex !== i}" class="image-slider__img" src="${url}" alt=""></img>`;
  }).join('');
}

initSlider()

imageSliderControlsLm.innerHTML = imagesUrls.map((_, i) => {
  return `<button class="image-slider__control-btn" data-index="${i}"></button>`
}).join('')

imageSliderControlsLm.addEventListener('click', e => {
  if (e.target.classList.contains('image-slider__control-btn')) {
    imageIndex = Number(e.target.dataset.index);
    updateImage();
  }
})

updateControls()

function updateControls() {
  const controls = [...imageSliderControlsLm.children];
  controls.forEach((control) => {
    if (Number(control.dataset.index) === imageIndex) {
      control.classList.add('active');
    } else {
      control.classList.remove('active');
    }
  })
}


function updateImage() {
  const images = [...imageContainerLm.children]
  images.forEach((image, i) => {
    image.style.transform = `translateX(${-100 * imageIndex}%)`;
    image.ariaHidden = i !== imageIndex
  })

  updateControls();
}

function scrollLeft() {
  if (imageIndex === 0) {
    imageIndex = imagesUrls.length -1;
  } 
  else {
    imageIndex--;
  }
  updateImage();
}

function scrollRight() {
  if (imageIndex === imagesUrls.length - 1) {
    imageIndex = 0;
  } 
  else {
    imageIndex++;
  }
  updateImage();
}

imageSliderLm.addEventListener('click', e => {
  if (e.target.closest('.image-slider__prev-btn')) {
    console.log('scroll left');
    scrollLeft();
  } 
  else if (e.target.closest('.image-slider__next-btn')) {
    console.log('scroll right');
    scrollRight();
  }
});


const {
  handleTouchStart, 
  handleTouchMove, 
  handleTouchEnd
} = handleSwipe(scrollRight, scrollLeft);

imageSliderLm.addEventListener('touchstart', handleTouchStart, { passive: true });
imageSliderLm.addEventListener('touchmove', handleTouchMove, { passive: true });
imageSliderLm.addEventListener('touchend', handleTouchEnd);

// Carousel events
carousel.addEventListener('scroll', handleSliderScroll);
prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);

// Modal event
openModalBtn.addEventListener('click', openModal);

// Accordion events
const accordionPanelLms = document.querySelectorAll('.accordion-panel');
addAccordionEvents(accordionPanelLms, '.accordion-panel', '.accordion__title-container', '.accordion__content-wrapper', true);