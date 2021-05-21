import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    
  }
open(){ 
  return `<div class="modal">
  
  <div class="modal__overlay"></div>

  <div class="modal__inner">
    <div class="modal__header">
      
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>

      <h3 class="modal__title">
        ${this.setTitle}
      </h3>
    </div>

    <div class="modal__body">
      ${this.setBody}
    </div>
  </div>

</div>`

} 
setTitle(titlle){
  return this.elem.querySelector('.modal__title').innerHTML = titlle;

}
setBody(html){
  return this.elem.querySelector('.modal__body').innerHTML = html;
}
}
