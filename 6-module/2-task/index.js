import createElement from '../../assets/lib/create-element.js';

let product = {
  name: "Laab kai chicken salad", // название товара
  price: 10, // цена товара
  category: "salads", // категория, к которой он относится, нам это понадобится чуть позже
  image: "laab_kai_chicken_salad.png", // название картинки товара
  id: "laab-kai-chicken-salad" // уникальный идентификатор товара, нужен для добавления товара в корзину
}

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
     const buttonCard = this.button;
     const onButtonCustomClick = new CustomEvent('product-add',
     { detail: this.id,
       bubbles: true 
     });
     buttonCard.dispatchEvent(onButtonCustomClick);
    
  }

  // buttonEvent(){
  //   const cartButton = document.querySelector('.card__button');
  //   cartButton.addEventListener('click', this._onButtonClick);
  // }
  // _onButtonClick(){
     
  // }
  
  
}
