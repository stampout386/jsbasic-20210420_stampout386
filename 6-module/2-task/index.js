import createElement from '../../assets/lib/create-element.js';


export default class ProductCard {
  constructor(product) {
    this.name = product.name;
    this.price = `€${product.price.toFixed(2)}`;
    this.category = product.category;
    this.image = product.image;
    this.id = product.id;
    this.elem = document.createElement('div');
    this.elem.classList.add('card');
    this.elem.innerHTML = `
  <div class="card__top">
    <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
    <span class="card__price">${this.price}</span>
  </div>
  <div class="card__body">
    <div class="card__title">${this.name}</div>
    <button type="button" class="card__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
    `
    this.button = this.elem.querySelector('.card__button')
    this.button.addEventListener('click', () => this.onClick());  
  }
  onClick() {
     const onButtonCustomClick = new CustomEvent('product-add',
     { detail: this.id,
       bubbles: true 
     });
     this.elem.dispatchEvent(onButtonCustomClick);
  };
}
