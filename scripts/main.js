import { 
  handleSliderScroll, 
  slideLeft, 
  slideRight, 
  carousel, 
  prevBtn, 
  nextBtn
} 
from './carousel.js'

import { openModal } from './modal.js';

const openModalBtn = document.getElementById('open-modal-btn');

// Carousel events
carousel.addEventListener('scroll', handleSliderScroll);
prevBtn.addEventListener('click', slideLeft);
nextBtn.addEventListener('click', slideRight);

// Modal event
openModalBtn.addEventListener('click', openModal);