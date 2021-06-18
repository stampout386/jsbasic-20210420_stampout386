import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let prod = this.cartItems.find(item => item.product.id === product.id);
    if(prod){
      prod.count++
    } else {
       this.cartItems.push({product : product, count: 1})
    }
    let cartItem = this.cartItems;
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let prod = this.cartItems.find(item => item.product.id === productId)
    
    prod.count = prod.count + amount;
    
    if(prod.count === 0){
        let index = this.cartItems.indexOf(prod);
        this.cartItems.splice(index,1)
      }
    let cartItem = this.cartItems;
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if(this.cartItems.length === 0 ){
      return true
    }
    return false
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.count)
    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.count*item.product.price);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    
    modal.setTitle('Your order');
    
    let modalBody = createElement('<div></div>');
    
    this.cartItems.forEach(item => {
       modalBody.append(this.renderProduct(item.product, item.count))
    })
    modalBody.append(this.renderOrderForm())
    modal.setBody(modalBody);
    modal.open();
    
    
    let cartProd = [...document.querySelectorAll('.cart-product')];
    
    cartProd.forEach(item =>{
      let buttonPlus = item.querySelector('.cart-counter__button_plus')
      let buttonMinus = item.querySelector('.cart-counter__button_minus')
      buttonPlus.addEventListener('click',()=>{
        this.updateProductCount(item.dataset.productId, 1)
      })
      buttonMinus.addEventListener('click',()=>{
        this.updateProductCount(item.dataset.productId, -1)
      })
    })

  const form = document.querySelector('.cart-form');
  form.addEventListener('submit', (event)=>{this.onSubmit(event)});
   
  }

  onProductUpdate(cartItem) {

   if (document.querySelector('body').classList.contains("is-modal-open")){   // перерисовка модального окна
    this.cartItems.forEach(item => {
   let productId = item.product.id ; 
   let modalBody = document.querySelector('.modal__body') ;
   let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`) ;
   let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`) ; 
   let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
   
   productCount.innerHTML = item.count;
   productPrice.innerHTML = `€${(item.count*item.product.price).toFixed(2)}`;
   infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    })

   let divProduct = document.querySelectorAll('.cart-product'); // удаление элементов  DOM
   for (let i = 0; i < divProduct.length; i++) {
     const element = divProduct[i];
     let cartItemArr = cartItem.map(item =>{
         return item.product.id
     })
     if(cartItemArr.includes(element.dataset.productId) != true){
         element.remove();
     }
   }
   if(this.cartItems.length === 0){                    // закрытие модального окна
    document.querySelector('.modal').remove();
    document.body.classList.remove('is-modal-open');
   }
  }
    this.cartIcon.update(this);
}

  onSubmit(event) {
    event.preventDefault();
    const form = document.querySelector('.cart-form');
    const button = form.querySelector('.button');
    button.classList.add('is-loading');
    const formData = new FormData(form);
    
    fetch('https://httpbin.org/post',{
      body: formData,
      method: 'POST',
    })
    .then(()=>{
      document.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
      this.cartItems = [];
      this.onProductUpdate(this.cartItem)

      let modal = new Modal();
      modal.setTitle('Success!');
      let modalBody = createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`);
    modal.setBody(modalBody);
    modal.open();
    })
    

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

