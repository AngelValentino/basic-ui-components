import { 
  Carousel,
  carouselImages
} 
from './carousel.js'

import {
  accordionData,
  Accordion
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
const carouselLm = document.getElementById('carousel');

//TODO Add tabs

// Carousel
new Carousel(carouselLm, carouselImages);

// Modal event
openModalBtn.addEventListener('click', openModal);

// Accordion
new Accordion(accordionContainerLm, accordionData);

// Image slider
new Slider(imageSliderLm, imagesUrls);