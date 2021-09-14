const openModal = document.querySelectorAll('.open-modal');
const closeModal = document.querySelector('.close-modal');
const modalContainer = document.querySelector('#modal-container');
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.left');
const nextButton = document.querySelector('.right');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

openModal.forEach(image => image.addEventListener('click', () => {
  modalContainer.classList.add('show');
}))

closeModal.addEventListener('click', () => {
  modalContainer.classList.remove('show');    
})

// arrange slides next to each other
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
}

slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left; +')'
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide'); 
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide-dot');
  targetDot.classList.add('current-slide-dot');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if(targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length -1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

// click right button, and move to next slide

//move to the next slide
nextButton.addEventListener('click', event => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current-slide-dot');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

// move to the prev slide
prevButton.addEventListener('click', event => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling; 
  const currentDot = dotsNav.querySelector('.current-slide-dot');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevButton, nextButton, prevIndex)
})

// when I click the nav indicators, move to that slide

dotsNav.addEventListener('click', event => {
  // what indicator was click on?
  const targetDot = event.target.closest('button');
  if(!targetDot) return;
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide-dot');
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})