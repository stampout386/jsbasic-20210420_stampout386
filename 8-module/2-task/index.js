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
  if (filters.noNuts){
   const nuts = this.products.filter(item => !item.nuts)
   this.elem.querySelector('.products-grid__inner').innerHTML ='';
   nuts.forEach(element => {
    const card = new ProductCard(element);
    this.elem.querySelector('.products-grid__inner').append(card.elem);
  });
  console.log(nuts)
}
  if (filters.vegeterianOnly){
  const vegeterian = this.products.filter(item => item.vegeterian)
  
  this.elem.querySelector('.products-grid__inner').innerHTML ='';
 
  vegeterian.forEach(element => {
    const card = new ProductCard(element);
    this.elem.querySelector('.products-grid__inner').append(card.elem);
  });
  
}
  if(filters.maxSpiciness){
    const maxSpiciness = this.products.filter(item => item.spiciness <= filters.maxSpiciness)
    
    this.elem.querySelector('.products-grid__inner').innerHTML ='';
    
    maxSpiciness.forEach(element => {
      const card = new ProductCard(element);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
 }
  if(filters.category){
    const category = this.products.filter(item => item.category === filters.category)
    console.log(category)

    this.elem.querySelector('.products-grid__inner').innerHTML ='';
    
    category.forEach(element => {
      const card = new ProductCard(element);
      this.elem.querySelector('.products-grid__inner').append(card.elem);
    });
  } 
  

  
   }




}
