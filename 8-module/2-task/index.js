import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(this._render());
    this._renderCard(this.products)
  }
_render(){
  return `<div class="products-grid">
  <div class="products-grid__inner">
  </div>
</div>`
}

_renderCard(prod){
  let gridDiv = this.elem.querySelector('.products-grid__inner')
  prod.forEach(element => {
    const card = new ProductCard(element);
    gridDiv.append(card.elem);
  });
}
updateFilter(filters){
  if (filters.noNuts){
   const nuts = this.products.filter(item => !item.nuts)
  return this.products = nuts;
}
if (filters.vegeterianOnly){
  const vegeterian = this.products.filter(item => item.vegeterian)
  console.log(vegeterian)
  console.log(this.elem.querySelectorAll('.card'))
  this._renderCard(vegeterian);
}
  
  
}




}
