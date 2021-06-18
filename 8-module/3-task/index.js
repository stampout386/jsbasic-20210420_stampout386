export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    let prod = this.cartItems.find(item => item.product.id === product.id);
    if(prod){
      prod.count++
    } else {
       this.cartItems.push({product : product, count: 1})
    }
    console.log(this.cartItems)
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
      console.log(this.cartItems)
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
    console.log(count);
    return count;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartItems.forEach(item => totalPrice += item.count*item.product.price);
    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

