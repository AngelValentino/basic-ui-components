export const prevBtn = document.getElementById('prev-btn');
export const nextBtn = document.getElementById('next-btn');
export const carousel = document.querySelector('.carousel__slider');

export function slideLeft() {
  carousel.scrollLeft -= carousel.children[0].clientWidth + 30;
}

export function slideRight() {
  carousel.scrollLeft += carousel.children[0].clientWidth + 30;
}

export function handleSliderScroll() {
  // Maximum scrollable width
  const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

  // Current scroll position
  const currentScrollLeft = carousel.scrollLeft;

  console.log('scroll')
  if (currentScrollLeft === maxScrollLeft) {
    // Scrolled to the maximum width
    console.log('Scrolled to the maximum width!');
    nextBtn.style.display = 'none';
  } 
  else if (currentScrollLeft < maxScrollLeft) {
    // There's still scroll left to the right
    nextBtn.style.display = 'initial';
  }

  if (currentScrollLeft === 0) {
    // Scrolled to the initial width
    console.log('Scrolled to the initial width!');
    prevBtn.style.display = 'none';
  } 
  else if (currentScrollLeft !== 0)
    // There's still scroll left to the left
    prevBtn.style.display = 'initial';
}
