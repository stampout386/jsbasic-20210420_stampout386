function initCarousel() {
  const buttonRight = document.querySelector('.carousel__arrow_right');
  const buttonLeft = document.querySelector('.carousel__arrow_left');
  const carouselDiv = document.querySelector('.carousel__inner');
  const carouselSlide = [...document.querySelectorAll('.carousel__slide')];
  let posX = 0;

  if (posX === 0 ) {
    buttonLeft.style.display = 'none';
  } 
  

  buttonLeft.addEventListener('click', () => {
    
    posX = posX + carouselDiv.offsetWidth;
    carouselDiv.style.transform = `translateX(${posX}px)`;
    
    if (posX === 0) {
      buttonLeft.style.display = 'none';
    } else {
      buttonRight.style.display = '';
      
    }
    
  });

  buttonRight.addEventListener('click', () => {
    posX = posX - carouselDiv.offsetWidth;
    carouselDiv.style.transform = `translateX(${posX}px)`;
    
    if (posX === - (carouselSlide.length - 1) * carouselDiv.offsetWidth) {
      buttonRight.style.display = 'none';
    } else {
      buttonLeft.style.display = '';
    }

  });
}

