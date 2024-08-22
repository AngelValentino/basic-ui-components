
import { handleSwipe } from "./utils.js";

const imageContainerLm = document.getElementById('image-slider__img-container');
const imageSliderControlsLm = document.getElementById('image-slider__controls');
const imageSliderLm = document.getElementById('image-slider');

const imagesUrls = [
  './images/scotland.png',
  './images/scotland-2.png',
  './images/scotland-3.png'
];

let imageIndex = 0;

export function initSlider() {
  imageContainerLm.innerHTML = imagesUrls.map((url, i) => {
    return `
      <img 
        role="tabpanel" 
        id="hero-slider__item-${i + 1}" 
        aria-hidden="${imageIndex !== i}" 
        aria-roledescription="slide"
        aria-label="${i + 1} of ${imagesUrls.length}"
        class="image-slider__img" src="${url}" 
        alt="">
      </img>`;
  }).join('');
}

export function initControls() {
  imageSliderControlsLm.innerHTML = imagesUrls.map((_, i) => {
    return `
      <li role="presentation">
        <button 
          role="tab" 
          aria-selected=${i === imageIndex}
          aria-controls="hero-slider__item-${i + 1}"
          aria-label="Show image ${i + 1}."
          class="image-slider__control-btn" 
          data-index="${i}">
        </button>
      </li>
    `;
  
  }).join('');
}

export function updateSliderControls() {
  const controls = [...imageSliderControlsLm.querySelectorAll('button')];
  controls.forEach((control) => {
    if (Number(control.dataset.index) === imageIndex) {
      control.classList.add('active');
      control.ariaSelected = true;
    } 
    else {
      control.classList.remove('active');
      control.ariaSelected = false;
    }
  })
}

function updateSliderImage() {
  const images = [...imageContainerLm.children]
  images.forEach((image, i) => {
    image.style.transform = `translateX(${-100 * imageIndex}%)`;
    image.ariaHidden = i !== imageIndex
  })

  updateSliderControls();
}

export function scrollLeft() {
  if (imageIndex === 0) {
    imageIndex = imagesUrls.length -1;
  } 
  else {
    imageIndex--;
  }
  updateSliderImage();
}

export function scrollRight() {
  if (imageIndex === imagesUrls.length - 1) {
    imageIndex = 0;
  } 
  else {
    imageIndex++;
  }
  updateSliderImage();
}

export function setSlide(e) {
  if (e.target.classList.contains('image-slider__control-btn')) {
    imageIndex = Number(e.target.dataset.index);
    updateSliderImage();
  }
}

export function addSwipeEventsToSlider() {
  const {
    handleTouchStart, 
    handleTouchMove, 
    handleTouchEnd
  } = handleSwipe(scrollRight, scrollLeft);

  imageSliderLm.addEventListener('touchstart', handleTouchStart, { passive: true });
  imageSliderLm.addEventListener('touchmove', handleTouchMove, { passive: true });
  imageSliderLm.addEventListener('touchend', handleTouchEnd);
}