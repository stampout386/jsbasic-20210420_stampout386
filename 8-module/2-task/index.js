import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(this._render());
    this._renderCard()
  }
_render(){
  return `<div class="products-grid">
  <div class="products-grid__inner">
  </div>
</div>`
}

_renderCard(){
  let gridDiv = this.elem.querySelector('.products-grid__inner')
  this.products.forEach(element => {
    const card = new ProductCard(element);
    gridDiv.append(card.elem);
  });
}
updateFilter(filters){
  
  Object.assign(this.filters, filters);
    this.renderContent();

  }

renderContent(){
  this.elem.querySelector('.products-grid__inner').innerHTML = '';
  for (let product of this.products) {
    if (this.filters.noNuts && product.nuts) {continue;}
    if (this.filters.vegeterianOnly && !product.vegeterian) {continue;}
    if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {continue;}
    if (this.filters.category && product.category != this.filters.category) {continue;}
    console.log(product)
    const card = new ProductCard(product); 
    this.elem.querySelector('.products-grid__inner').append(card.elem);
     } 
  }    
}


