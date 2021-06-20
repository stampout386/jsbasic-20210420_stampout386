import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value }) {
     this.steps = steps;
     this.value = value;
     this.elem = createElement(this._render());
     this._sliderClick();
     this._onPointerDown();
     
  }

_onPointerDown(){
  let thumb = this.elem.querySelector('.slider__thumb');
  thumb.ondragstart = () => false;
  thumb.addEventListener('pointerdown', this._onPointerMove)
}
_onPointerMove=(event)=>{
  this.elem.classList.add('slider_dragging');
 
  
    let left = event.clientX - this.elem.getBoundingClientRect().left;  
  
    let leftRelative = left / this.elem.offsetWidth;
    let thumb = this.elem.querySelector('.slider__thumb');
    
    if (leftRelative < 0) {
     leftRelative = 0;
     }

     if (leftRelative > 1) {
     leftRelative = 1;
     }

      let leftPercents = leftRelative * 100;
      
      let progress = this.elem.querySelector('.slider__progress');
      
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;  
      
      this.elem.querySelector('.slider__value').innerHTML = value;

      let divSteps = this.elem.querySelector('.slider__steps');
      let arrSteps = [...divSteps.querySelectorAll('span')];
      for (let i = 0; i < arrSteps.length; i++) {
      arrSteps[i].classList.remove('slider__step-active')
      if(value ===  i){arrSteps[i].classList.add('slider__step-active');}
      }
      
      document.addEventListener('pointermove', this._onPointerMove);
      document.addEventListener('pointerup', this._onPointerUp,{once: true});

}
_onPointerUp=(event)=>{
  document.removeEventListener('pointermove', this._onPointerMove)
  this.elem.classList.remove('slider_dragging')
  
  let left = event.clientX - this.elem.getBoundingClientRect().left; 
  let leftRelative = left / this.elem.offsetWidth;  
  
  if (leftRelative < 0) {
    leftRelative = 0;
    }

    if (leftRelative > 1) {
    leftRelative = 1;
    }

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;



            const valueSl = this.elem.querySelector('.slider__value').textContent;
            const drugCustomEvent = new CustomEvent('slider-change', { 
            detail: +valueSl,
            bubbles: true 
          })
          this.elem.dispatchEvent(drugCustomEvent);

}

 

  _render(){
    
    let segments = this.steps - 1;
    let valuePercents = this.value / segments * 100;


    return `<div class="slider">
    <div class="slider__thumb" style="left:${valuePercents}%">
      <span class="slider__value">${this.value}</span>
    </div>
    <div class="slider__progress" style="width:${valuePercents}%"></div>
    <div class="slider__steps">
       ${this._renderSliderSteps()}
    </div>
  </div>`
  }

 _renderSliderSteps(){
  let stepsSpan = '';
  for (let i = 0; i < this.steps-1; i++) {
    if(i === this.value){
      stepsSpan += `<span class ='slider__step-active'></span>`
    }
    stepsSpan += `<span></span>`
  }
   
  console.log(stepsSpan)

    return stepsSpan;
  }

_sliderClick(){
  this.elem.addEventListener('click', this._onClick)
}

_onClick = (event) => {
  let left = event.clientX - this.elem.getBoundingClientRect().left;
  let leftRelative = left / this.elem.offsetWidth;
  let segments = this.steps - 1;
  let approximateValue = leftRelative * segments;
  let value = Math.round(approximateValue);
  let valuePercents = value / segments * 100;

  this.elem.querySelector('.slider__value').innerHTML = value;

  let divSteps = this.elem.querySelector('.slider__steps');
  let arrSteps = [...divSteps.querySelectorAll('span')];
  for (let i = 0; i < arrSteps.length; i++) {
     arrSteps[i].classList.remove('slider__step-active')
    if(value ===  i){arrSteps[i].classList.add('slider__step-active');}
    }


  let thumb = this.elem.querySelector('.slider__thumb');
  let progress = this.elem.querySelector('.slider__progress')  

thumb.style.left = `${valuePercents}%`;
progress.style.width = `${valuePercents}%`;

const elemCustomClick = new CustomEvent('slider-change', { 
  detail: value,
  bubbles: true 
})

this.elem.dispatchEvent(elemCustomClick);
    }
}

