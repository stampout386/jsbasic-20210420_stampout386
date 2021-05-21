import createElement from '../../assets/lib/create-element.js';



export default class Carousel {
  constructor(slides) {
    this.elem = createElement(this._sliderTemplate());
    this.slides = slides;
    this.elem.innerHTML += this._divInner();
    this.buttonSlideEvent = this._buttonSlideEvent();
    this.buttonSliderEvent = this._buttonSliderEvent();
  }


  _sliderTemplate(){
    return `<div class="carousel"><div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
  </div></div>`
  }
  _divInner(){ 
    return `<div class="carousel__inner">${this._slideInner()}</div>`
  }
  _slideInner() {return this.slides.map(slide =>{
    return `<div class="carousel__slide" data-id="${slide.id}">
 <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
 <div class="carousel__caption">
   <span class="carousel__price">€${slide.price.toFixed(2)}</span>
   <div class="carousel__title">${slide.name}</div>
   <button type="button" class="carousel__button">
     <img src="/assets/images/icons/plus-icon.svg" alt="icon">
   </button>
 </div>
</div>`
   })
   .join('');
  }
  _buttonSliderEvent(){
    const buttonRight = this.elem.querySelector('.carousel__arrow_right');
    const buttonLeft = this.elem.querySelector('.carousel__arrow_left');
    const carouselDiv = this.elem.querySelector('.carousel__inner');
    const carouselSlide = [...this.elem.querySelectorAll('.carousel__slide')];
      
      let posX = 0;
    
      if (posX === 0 ) {
        buttonLeft.style.display = 'none';
      } 
     buttonLeft.addEventListener('click', carouselEventLeft );
     buttonRight.addEventListener('click', carouselEventRight );
    
     function carouselEventLeft(){
      posX = posX + carouselDiv.offsetWidth;
      carouselDiv.style.transform = `translateX(${posX}px)`;
      
      if (posX === 0) {
        buttonLeft.style.display = 'none';
      } else {
        buttonRight.style.display = '';
        
      }
       
     }
     
     function carouselEventRight(){
      posX = posX - carouselDiv.offsetWidth;
      carouselDiv.style.transform = `translateX(${posX}px)`;
      
      if (posX === - (carouselSlide.length - 1) * carouselDiv.offsetWidth) {
        buttonRight.style.display = 'none';
      } else {
        buttonLeft.style.display = '';
      }
       
     }
  }
  _buttonSlideEvent(){
    const divCarouselSlide = [...this.elem.querySelectorAll('.carousel__slide')];
    
    divCarouselSlide.forEach(slide => {
      this.button = slide.querySelector('.carousel__button');
      this.button.addEventListener('click', (event) => this._onClick(event)); 
    })
  }
  _onClick(event) {
  let slide = {id : event.target.closest('.carousel__slide').dataset.id};
  const buttonSlideCustomClick = new CustomEvent("product-add", { detail: slide.id, bubbles: true });
   this.elem.dispatchEvent(buttonSlideCustomClick);
  }
};
