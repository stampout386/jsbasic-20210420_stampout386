import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(this._render());
    this._buttonNavEvent = this._buttonNavEvent();
    this._categoriesEvent = this._categoriesEvent()
    }

  _navInner(){ 
    return this.categories.map(item => {
      return `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
    }).join('');

  }
  _ribbonInner(){
    return `<nav class="ribbon__inner">${this._navInner()}</nav>`
  }
  _render(){
    return `<div class="ribbon">
    <button class="ribbon__arrow ribbon__arrow_left ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    ${this._ribbonInner()}
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible ">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>
    `
  }
  _buttonNavEvent(){
    const buttonRight = this.elem.querySelector('.ribbon__arrow_right');
    const buttonLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    
    buttonRight.addEventListener('click', scrollEventRight);
    buttonLeft.addEventListener('click', scrollEventLeft);
    ribbonInner.addEventListener('scroll' , ribbonScrollInner );
    
    function ribbonScrollInner(){

        if (ribbonInner.scrollLeft > 0 ){
          buttonLeft.classList.add('ribbon__arrow_visible');
        } else {
          buttonLeft.classList.remove('ribbon__arrow_visible')
        }
        let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth
        
        if (scrollRight < 1){
          buttonRight.classList.remove('ribbon__arrow_visible')
        } else {
          buttonRight.classList.add('ribbon__arrow_visible')
        }
        
    }
    function scrollEventLeft(){
      ribbonInner.scrollBy(-350, 0); 
    }
    function scrollEventRight(){
      ribbonInner.scrollBy(350, 0); 
    }
  }
  _categoriesEvent(){
    const ribbonItem = [...this.elem.querySelectorAll('.ribbon__item')];
    ribbonItem.forEach(item =>{
      item.addEventListener('click', event => this._onClick(event))
    })
  }

  _itemClassAddActive(target){
    const ribbonItem = [...this.elem.querySelectorAll('.ribbon__item')];
    ribbonItem.forEach(item =>{
      if(item.classList.contains('ribbon__item_active') && item != target){
        item.classList.remove('ribbon__item_active');
      }
    })
  }

  _onClick(event){
    event.preventDefault();
    event.target.classList.add('ribbon__item_active');
    
    this._itemClassAddActive(event.target);
    

    const elemCustomClick = new CustomEvent('ribbon-select', { 
      detail: event.target.dataset.id, 
      bubbles: true 
    })
    this.elem.dispatchEvent(elemCustomClick);
  }
}
