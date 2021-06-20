import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    let carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(carousel.elem); //  карусель

    let ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem); // менюшка верхняя
    

    let config = {
      steps: 5, // количество шагов слайдера, начинаются с нуля, т.е. шаги в этом случае будут 0-1-2-3-4
      value: 3, // начальное значение, текущий выбранный шаг
    } 
    let stepSlider = new StepSlider(config);                                 // слайдер остроты
    document.querySelector('[data-slider-holder]').append(stepSlider.elem);

   let cartIcon = new CartIcon();
   document.querySelector('[data-cart-icon-holder]').append(cartIcon.elem);

   let cart = new Cart(cartIcon);

   let response = await fetch('products.json');
   let cartArr = await response.json();
   
   let productsGrid = new ProductsGrid(cartArr);
   document.querySelector('[data-products-grid-holder]').append(productsGrid.elem);

   productsGrid.updateFilter({
    noNuts: document.getElementById('nuts-checkbox').checked,
    vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
    maxSpiciness: stepSlider.value,
    category: ribbonMenu.value
  });

  document.body.addEventListener('product-add',(item)=>{
     cartArr.forEach(element => {
       if(element.id === item.detail){
         cart.addProduct(element);
       }
     });
  });
  
  document.querySelector('[data-slider-holder]').addEventListener('slider-change',(e)=>{
    productsGrid.updateFilter({
      maxSpiciness: e.detail // значение остроты из события 'slider-change'
    });
  })

  document.querySelector('[data-ribbon-holder]').addEventListener('ribbon-select',(e)=>{
    productsGrid.updateFilter({
      category: e.detail
    });
  })

  document.body.addEventListener('change',(e)=>{
   let nuts =  document.querySelector('#nuts-checkbox').checked;
   let vegeterian = document.querySelector('#vegeterian-checkbox').checked;
   console.log(nuts);
   console.log(vegeterian);

    if(e.target.id === 'nuts-checkbox'){
      productsGrid.updateFilter({
        noNuts: nuts,
      });
    }
    if(e.target.id === 'vegeterian-checkbox'){
      productsGrid.updateFilter({
        vegeterianOnly: vegeterian,
      });
    }
    
  })

  }
}
