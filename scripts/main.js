import { 
  Carousel,
  carouselImages
} 
from './components/Carousel.js'

import {
  accordionData,
  Accordion
} from './components/Accordion.js'

import { 
  openModal 
} from './modal.js';

import { 
  Slider,
  imagesUrls
} from './components/Slider.js';

import { 
  Tabs, 
  tabsData 
} from './components/Tabs.js';

const carouselLm = document.getElementById('carousel');
const openModalBtn = document.getElementById('open-modal-btn');
const accordionContainerLm = document.getElementById('accordion-container');
const imageSliderLm = document.getElementById('image-slider');
const tabsLm = document.getElementById('tabs');

// Carousel
new Carousel(carouselLm, carouselImages);

// Modal
openModalBtn.addEventListener('click', openModal);

// Accordion
new Accordion(accordionContainerLm, accordionData);

// Image slider
new Slider(imageSliderLm, imagesUrls);

// Tabs
new Tabs(tabsLm, tabsData);