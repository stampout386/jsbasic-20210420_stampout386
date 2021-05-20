import createElement from '../../assets/lib/create-element.js';


export default class ProductCard {
  constructor(product) {
    this._name = product.name;
    this._price = `€${product.price.toFixed(2)}`;
    this._category = product.category;
    this._image = product.image;
    this._id = product.id;
    
    this.elem = createElement(this._cartProductTemplate());
  
    this.button = this.elem.querySelector('.card__button')
    this.button.addEventListener('click', this._onClick); 
  }
 _cartProductTemplate(){
   return `<div class="card"><div class="card__top">
   <img src="/assets/images/products/${this._image}" class="card__image" alt="product">
   <span class="card__price">${this._price}</span>
 </div>
 <div class="card__body">
   <div class="card__title">${this._name}</div>
   <button type="button" class="card__button">
     <img src="/assets/images/icons/plus-icon.svg" alt="icon">
   </button>
 </div>
 </div>`;
 }

 _onClick = () => {
    const onButtonCustomClick = new CustomEvent('product-add',
     { detail: this._id,
       bubbles: true 
     });
     this.elem.dispatchEvent(onButtonCustomClick);
  };
}
