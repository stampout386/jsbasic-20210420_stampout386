import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modalDiv = createElement(this._render());
    this.button = this.close();
    this.key = this._closeEscape();
    console.log(this.modalDiv)
  }

_render(){
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
    
  </div>
  </div>

</div>`
}  
open(){ 
document.body.append(this.modalDiv);
document.body.classList.add('is-modal-open')
} 
setTitle(titlle){
  this.modalDiv.querySelector('.modal__title').innerHTML = titlle;

 }
setBody(html){
  let modalBody = document.createElement('div');
  modalBody.append(html);
  this.modalDiv.querySelector('.modal__body').append(modalBody);
}

close(){
  this.modalDiv.querySelector('.modal__close').addEventListener('click', this._modalClose);
  
  document.body.classList.remove('is-modal-open')
  this.modalDiv.remove();
  
} 
_closeEscape(){
  document.addEventListener('keydown', this._keyDownClose, { once : true})
}

_keyDownClose=(event)=>{
  if(event.code === 'Escape'){
    this.modalDiv.remove();
    document.body.classList.remove('is-modal-open')
  } 
}

_modalClose = () =>{
  this.modalDiv.remove();
  document.body.classList.remove('is-modal-open')
 }
}
