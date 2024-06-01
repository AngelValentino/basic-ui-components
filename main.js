import { 
  handleSliderScroll, 
  slideLeft, 
  slideRight, 
  carousel, 
  prevBtn, 
  nextBtn} 
from './carousel.js'

carousel.addEventListener('scroll', handleSliderScroll)
prevBtn.addEventListener('click', slideLeft)
nextBtn.addEventListener('click', slideRight)